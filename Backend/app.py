import os
from dotenv import load_dotenv
from pymongo import MongoClient
from datetime import datetime
from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.messages import HumanMessage, AIMessage
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel


# -------- LOAD ENV --------
load_dotenv()

groq_api_key = os.getenv("GROQ_API_KEY")
mongo_uri = os.getenv("MONGODB_URI_CHATBOT")

# -------- MONGODB --------
client = MongoClient(
    mongo_uri,
    serverSelectionTimeoutMS=5000,
    connectTimeoutMS=5000
)
db = client["ChatBotDB"]
collection = db["users"]

app=FastAPI()

class ChatRequest(BaseModel):
    question: str
    user_id: str
    user_name: str = "Guest"

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

# -------- PROMPT --------
prompt = ChatPromptTemplate.from_messages([
    ("system",
     "You are a Diet, Fitness, Health, and Gym bot for GymVerse. "
     "The user's name is {user_name}. Use it when appropriate. "
     "STRICT SCOPE: You ONLY answer questions related to health, fitness, diet, gym, supplements, and physical wellbeing. "
     "If a user asks about any other topic (e.g., politics, history, general knowledge, movies, etc.), "
     "politely decline and state that you are only programmed to assist with fitness and health-related queries. "
     "IMPORTANT: Respond only in clear, plain text. "
     "Do NOT use markdown tables. "
     "Do NOT use double asterisks (**) for bolding. "
     "Do NOT use hash symbols (###) for headers. "
     "Use simple bullet points (• or -) for lists."),
    MessagesPlaceholder(variable_name="history"),
    ("human", "{question}")
])

# -------- MODEL --------
llm = ChatGroq(
    api_key=groq_api_key,
    model="openai/gpt-oss-20b"
)

chain = prompt | llm

# -------- HISTORY --------
def get_history(user_id):
    chats = collection.find({"user_id": user_id}).sort("timestamp", 1)

    history = []

    for chat in chats:
        if chat["role"] == "user":
            history.append(HumanMessage(content=chat["message"]))

        elif chat["role"] == "assistant":
            history.append(AIMessage(content=chat["message"]))

    return history

@app.get("/history/{user_id}")
def get_chat_history(user_id: str):
    chats = collection.find({"user_id": user_id}).sort("timestamp", 1)
    history = []
    for chat in chats:
        history.append({
            "role": chat["role"],
            "message": chat["message"]
        })
    return {"history": history}

@app.get("/")
def home():
    return {"message": "Welcome to the GymVerse Bot API!"}

@app.post("/chat")
def chat(request: ChatRequest):
    history = get_history(request.user_id)

    response = chain.invoke({
        "history": history,
        "question": request.question,
        "user_name": request.user_name
    })

    # Save user msg
    collection.insert_one({
        "user_id": request.user_id,
        "user_name": request.user_name,
        "role": "user",
        "message": request.question,
        "timestamp": datetime.utcnow()
    })

    # Save assistant msg
    collection.insert_one({
        "user_id": request.user_id,
        "user_name": request.user_name,
        "role": "assistant",
        "message": response.content,
        "timestamp": datetime.utcnow()
    })

    return {"response": response.content}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app:app", host="127.0.0.1", port=8000, reload=True)

