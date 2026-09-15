from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import mysql.connector
import os
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    return mysql.connector.connect(
        host=os.getenv("DB_HOST", "mysql"),
        user=os.getenv("DB_USER", "todo_user"),
        password=os.getenv("DB_PASSWORD", "password123"),
        database=os.getenv("DB_NAME", "todo_db")
    )

class TodoCreate(BaseModel):
    title: str

@app.get("/todos")
def get_todos():
    db = get_db()
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT id, title, completed FROM todos")
    result = cursor.fetchall()
    cursor.close()
    db.close()
    return result

@app.post("/todos")
def add_todo(todo: TodoCreate):
    db = get_db()
    cursor = db.cursor()
    cursor.execute("INSERT INTO todos (title, completed) VALUES (%s, %s)", (todo.title, False))
    db.commit()
    todo_id = cursor.lastrowid
    cursor.close()
    db.close()
    return {"id": todo_id, "title": todo.title, "completed": False}

@app.put("/todos/{todo_id}")
def toggle_todo(todo_id: int):
    db = get_db()
    cursor = db.cursor()
    cursor.execute("UPDATE todos SET completed = NOT completed WHERE id = %s", (todo_id,))
    db.commit()
    cursor.close()
    db.close()
    return {"message": "Updated"}

@app.delete("/todos/{todo_id}")
def delete_todo(todo_id: int):
    db = get_db()
    cursor = db.cursor()
    cursor.execute("DELETE FROM todos WHERE id = %s", (todo_id,))
    db.commit()
    cursor.close()
    db.close()
    return {"message": "Deleted"}
