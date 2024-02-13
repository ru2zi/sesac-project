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
        reply = "I don't know"

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