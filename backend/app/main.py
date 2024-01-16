from fastapi import FastAPI
from typing import Optional
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


responses = {
    "안녕": "안녕하세요!",
    "넌 뭐하는 애니?": "제가 뭘 어쨌다구요?",
    "내가 너 때문에 미치겠다.": "그러시던가요",
    "안녕히 계세요": "안녕히 가세요!",
}


@app.post("/chat")
async def chat(user_input: Optional[str] = None):
    if user_input is None:
        return {"message": "입력된 메시지가 없습니다."}
    response = responses.get(user_input.strip(), "뭔 소리에요?")
    print(response)
    return {"User": user_input, "도봉이": response}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
