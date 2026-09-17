from fastapi import FastAPI
import httpx

app = FastAPI(title = "Local API Gateway")
BACKEND_URL = "http://localhost:9000" #fastapi
BACKEND_URL2 = "http://localhost:9100"#fastapi2

@app.get("/api/products")
async def products():
    async with httpx.AsyncClient() as client:
        response = await client.get(
            f"{BACKEND_URL}/products"
        )
    return response.json()

@app.get("/api/productos")
async def productos():
    async with httpx.AsyncClient() as client:
        response = await client.get(
            f"{BACKEND_URL2}/productos"
        )
    return response.json()

@app.get("/api/orders")
async def orders():
    async with httpx.AsyncClient() as client:
        response = await client.get(
            f"{BACKEND_URL}/orders"
        )
    return response.json()

@app.get("/api/ordenes")
async def orderenes():
    async with httpx.AsyncClient() as client:
        response = await client.get(
            f"{BACKEND_URL}/ordenes"
        )
    return response.json()