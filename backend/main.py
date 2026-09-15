from fastapi import FastAPI

app = FastAPI(
    title="Todo Application API",
    description="Backend API for the Todo application",
    version="1.0.0"
)


@app.get("/")
def root():
    return {
        "message": "Todo API is running",
        "version": "1.0.0"
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy"
    }

@app.get("/test")
def test_api():
    return {
        "message": "Frontend can communicate with the backend"
    }