# 🤖 Gemini Chatbot with ReactJS + Flask

Một chatbot AI thông minh sử dụng **Google Gemini 2.0 Flash API**, được xây dựng bằng **ReactJS (frontend)** và **Flask (backend)**.  
Dự án này cho phép người dùng gửi tin nhắn hoặc hình ảnh để AI trả lời hoặc mô tả trực tiếp.

---

## 🌟 Tính năng nổi bật

- 💬 Chat thời gian thực với mô hình **Gemini 2.0 Flash** của Google  
- 🖼️ Gửi ảnh và xem **thumbnail preview** trực tiếp trong hộp chat  
- 🧠 Xử lý đa phương tiện (text + image) với phản hồi nhanh  
- 🧩 Kết nối React ↔ Flask thông qua REST API  
- 🔒 Bảo mật API key bằng `.env`  
- ⚡ Cấu trúc tách biệt frontend/backend dễ mở rộng và triển khai  

---

## 🗂️ Cấu trúc dự án
```
Gemini_ChatBot_With_ReactJS/
│
├── backend/                 # Flask API server
│   ├── app.py               # Flask main app (AI API logic)
│   ├── requirements.txt     # Các thư viện Python cần thiết
│   └── .env                 # (ẩn) Chứa GEMINI_API_KEY
│
├── frontend/                # ReactJS UI
│   ├── src/
│   │   ├── App.js
│   │   └── components/
│   │       └── ChatBox.js
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
└── README.md
```
## ⚙️ Cài đặt & chạy dự án

### 🔹 1. Backend (Flask)

**Tạo môi trường ảo & cài dependencies**
```
cd backend
python -m venv .venv
source .venv/bin/activate      # macOS/Linux
.venv\Scripts\activate         # Windows
pip install -r requirements.txt
```
**Tạo file .env trong thư mục backend**
```
GEMINI_API_KEY=YOUR_GEMINI_API_KEY
```

**Chạy server flask**
```
python app.py
```

### 🔹 2. Frontend (ReactJS)

**Cài đặt dependencies**
```
cd frontend
npm install
```

**Chạy development server**
```
npm run dev
```

