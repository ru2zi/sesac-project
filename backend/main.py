from typing import Optional
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import openai
from dotenv import load_dotenv
from scipy.spatial.distance import cosine
from datetime import datetime
import os
from openai import OpenAI
from pydantic import BaseModel
import json
from py_hanspell.hanspell import spell_checker
from pydantic import BaseModel

from dotenv import load_dotenv, find_dotenv
load_dotenv(find_dotenv('data/practice/.env'))
from openai import OpenAI

client = OpenAI()
openai.api_key  = os.getenv('OPENAI_API_KEY')

class ChatInput(BaseModel):
    user_input: Optional[str] = None


client = OpenAI()
load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_embedding(text, model="text-embedding-ada-002"):
    text = text.replace("\n", " ")
    return client.embeddings.create(input=[text], model=model).data[0].embedding


def create_context(question, df, max_len=4000):
    q_embedding = (
        client.embeddings.create(input=question, model="text-embedding-ada-002")
        .data[0]
        .embedding
    )
    df["distances"] = df["embedding"].apply(lambda x: cosine(q_embedding, x))
    cur_len = 0
    context_parts = []
    for _, row in df.sort_values("distances", ascending=True).iterrows():
        cur_len += row["n_tokens"] + 4
        if cur_len > max_len:
            break
        context_parts.append(row["text"])
    return "\n\n===\n\n".join(context_parts)


def answer_question(question, df, max_len=4000, debug=False):
    context = create_context(question, df, max_len=max_len)
    if debug:
        print("Context:\n" + context)

    try:
        response = client.chat.completions.create(
            model="ft:gpt-3.5-turbo-0613:sesac::8lBIAPD3",
            messages=[
                {
                    "role": "system",
                    "content": "Answer the question based on the context below, try to explain anyway but if the question can't be answered based on the context, say \"I don't know\"\n\n",
                },
                {
                    "role": "user",
                    "content": f"Context: {context}\n\n---\n\n Question: {question}, 한국어로 번역해서 대답해줘.",
                },
            ],
            temperature=0.6,
        )
        return response.choices[0].message.content
    except Exception as e:
        print("Error occurred:", e)
        return "잘 모르겠다..!"


# 아래 함수가 핵심이다. 나머지 함수는 보조 목적으로 사용하는 함수다.

@app.post("/reset_chat_history")
async def reset_chat_history():
    data = []  # 초기화 된 데이터

    # Save the data
    with open('chat_history.txt', 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False)

    return {"status": "Chat history reset successfully"}


@app.post("/chat")
async def chat(input_data: ChatInput):
    user_input = input_data.user_input
    df = pd.read_pickle("../data/processed/react-processed.pkl")

    if user_input is None:
        return {"message": "입력된 메시지가 없습니다."}
    
    sample = {
        'title': [user_input], 
        'date': [datetime.now()]
    }
    
    test_messages = []
    test_messages.append({"role": "system", "content": "You are a helpful Personal assistant. You are to extract the personal experience from each of the posting provided."})
    test_messages.append({"role": "user", "content": f"Title: {sample['title'][0]}\nPosting date: {sample['date'][0]}\n\nPersonal experience: "})
    
    try:
        response = openai.chat.completions.create(
            model="ft:gpt-3.5-turbo-0613:sesac::8lBIAPD3", messages=test_messages, temperature=0.6, max_tokens=2000
        )
        reply = response.choices[0].message.content
    except Exception as e:
        print("Error occurred:", e)
        reply = "잘 모르겠다..!"

    # Load existing data
    try:
        with open('chat_history.txt', 'r', encoding='utf-8') as f:
            data = json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        data = []

    # Add new data
    data.append({
        'index': len(data),
        'User': user_input,
        '도봉이': reply
    })

    # Save the data
    with open('chat_history.txt', 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False)

    return {"User": user_input, "도봉이": reply}

# 메시지 교정을 위한 입력 모델을 추가합니다.
class CorrectionInput(BaseModel):
    message: str

@app.post("/correct_message")
async def correct_message(correction_data: CorrectionInput):
    # 클라이언트로부터 받은 메시지를 교정합니다.
    spelled_sent = spell_checker.check(correction_data.message)
    corrected_message = spelled_sent.checked

    # 교정된 메시지를 반환합니다.
    return {"corrected_message": corrected_message}


@app.get("/chat_history")
async def get_chat_history():
    with open('chat_history.txt', 'r', encoding='utf-8') as f:
        data = json.load(f)
    return data


# Run the server
if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
