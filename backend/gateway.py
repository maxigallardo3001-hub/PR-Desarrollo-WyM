import os 
import secrets 
import httpx

# LLama a Vault Server como primer elemento, y un backend como segundo 

from fastapi import (
    FastAPI,
    Header,
    HTTPException,
    Depends,
    Request,
    Response
)

from fastapi.security import (
    HTTPBearer,
    HTTPAuthorizationCredentials
)

app = FastAPI(title= "Local API GateWay")

security = HTTPBearer(
    auto_error=False
)

VAULT_ADDR = os.getenv(
    "VAULT_ADDR", "http://localhost:8200"
)

VAULT_TOKEN = os.getenv(
    "VAULT_TOKEN"
)

if not VAULT_TOKEN:
    raise RuntimeError(
        "VAULT TOKEN no está configurado"
    )

async def get_gateway_secrets():
    url = (
        f"{VAULT_ADDR}" #"http://localhost:8200"
        "v1/secret/data/gateway"
    )
    headers = {
        "X-Vault-Token": VAULT_TOKEN
    }
    async with httpx.AsyncClient(timeout=5.0) as client:
        response = await client.get(
            url,
            headers #Mismo nombre funciona con el mismo atributo si ya fue definido
        )
    if response.status != 200:
        raise HTTPException(
            status_code=500,
            detail = f"No fue posible acceder a Vault: {response}"
        )
    vault_response = response.json()
    return vault_response["data"]["data"]

async def authenticate_client (
        credentials: HTTPAuthorizationCredentials = Depends(security)
): 
    if credentials is None:
        raise HTTPException(
            status_code=401,
            detail="Bearer token requeridi"
        )
    vault_secrets = (
        await get_gateway_secrets() #client_token
    )
    expected_token = vault_secrets["client_token"]
    recieved_token = credentials.credentials
    valid = secrets.compare_digest(recieved_token,expected_token)
    if not valid:
        raise HTTPException(status_code=401,detail="Token invalido")
    return {
        "client_id" : "student-client", #Servicios de autenticacion de usuario
        "backend_secret" : vault_secrets["backend_shared_secret"]
    }



BACKEND_URL = "http://localhost:9000" #FastApi 
BACKEND_URL2 = "http://localhost:9100" #FastApi2

@app.api_route(
    "/api/{path:path}", #products,health,orders
    methods=["GET","POST","PUT","PATCH","DELETE"]
)
async def proxy(
    path:str,
    request: Request,
    auth = Depends(authenticate_client)
):
    target_url = (
        f"{BACKEND_URL}/{path}" #Call http://localhost:8000/api/products -> http://localhost:9000/products
    )
    body = await request.body()
    gateway_headers = {
        "X-Gateway-Secret":
        auth["backend_secret"], #gateway-api-secret-456
        "X-Authenticated-Client":
        auth["cliend_id"]
    }
    content_type = request.headers.get("content-type")
    if content_type:
        gateway_headers["content-type"] = content_type
    try:
        async with httpx.AsyncClient(timeout=10.0) as client:
            upstream = await client.request(
                 methods= request.method,
                 url = target_url,
                 params = request.query_params,
                 content=body,
                 headers=gateway_headers
            )
    except httpx.RequestError:
        raise HTTPException(
            status_code= 502,
            detail="Backend no disponible"
        )
    response_headers= {}
    if "content-type" in upstream.headers:
        response_headers["content-type"] = upstream.headers["content-type"]
    return Response(
        content= upstream.content,
        status_code= upstream.status_code,
        headers= upstream.headers
    )
