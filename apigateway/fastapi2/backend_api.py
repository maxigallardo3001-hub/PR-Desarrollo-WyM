from fastapi import FastAPI

app = FastAPI(
    title="Backend API Español",
    description="API ubicada en local host enrutada por API Gateway"
)

@app.get("/health")
def health():
    return {
        "status": "OK",
        "serivce": "Backend API"
    }
@app.get("/productos")
def productos():
    return {
        "productos": [
            {"id": 1, "nombre": "Notebook", "precio": 90000},
            {"id": 2, "nombre": "Monitor", "precio": 25000},
        ]
    }

@app.get("/ordenes")
def ordenes():
    return {
        "ordenes": [
            {"id": 1001, "estado": "paid"},
            {"id": 1002, "estado": "pending"}
        ]
    }
