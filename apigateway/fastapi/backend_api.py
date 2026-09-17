from fastapi import FastAPI

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
def products():
    return {
        "products": [
            {"id": 1, "name": "Notebook", "price": 90000},
            {"id": 2, "name": "Monitor", "price": 25000},
        ]
    }

@app.get("/orders")
def orders():
    return {
        "orders": [
            {"id": 1001, "status": "paid"},
            {"id": 1002, "status": "pending"}
        ]
    }
