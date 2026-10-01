from fastapi import FastAPI,HTTPExcepction, Header

app = FastAPI(
    title="Backend API Ingles",
    description="API ubicada en local host enrutada por API Gateway"
)

@app.get("/health")
def health():
    return {
        "status": "OK",
        "serivce": "Backend API"
    }
@app.get("/products")
def products(
    x_authenticated_client: str | None = Header(default=None),
    x_authenticated_user: str | None = Header(default=None),
    x_authenticated_roles: str | None = Header(default=None),
):
    return {
        "identity":{
            "client_id": x_authenticated_client,
            "username": x_authenticated_user,
            "roles": x_authenticated_roles
        },
        "products": [
            {"id": 1, "name": "Notebook", "price": 90000},
            {"id": 2, "name": "Monitor", "price": 25000},
        ]
    }

@app.get("/orders")
def orders(
    x_authenticated_client: str | None = Header(default=None),
    x_authenticated_user: str | None = Header(default=None),
    x_authenticated_roles: str | None = Header(default=None),
):
    return {
        "identity":{
                    "client_id": x_authenticated_client,
                    "username": x_authenticated_user,
                    "roles": x_authenticated_roles
        },
        "orders": [
            {"id": 1001, "status": "paid"},
            {"id": 1002, "status": "pending"}
        ]
    }
