# 🧭 TRAVINAI - Nền tảng Du lịch Thông minh (AI Travel Assistant)

**TRAVINAI** là một nền tảng du lịch tích hợp AI, giúp người dùng:
- Khám phá địa điểm nổi bật tại Việt Nam 🌴  
- Dự đoán chi phí du lịch 💰  
- Tra cứu thời tiết theo vị trí hiện tại ☀️  
- Dịch ngôn ngữ và đọc giọng nói bằng AI 🎙️  
- Quản trị dữ liệu người dùng và địa điểm qua trang **Admin Panel** ⚙️  

---

## 🚀 Công nghệ sử dụng

### 🧩 Frontend (ReactJS)
- React + TailwindCSS + Lucide Icons  
- React Leaflet (bản đồ tương tác OpenStreetMap)  
- A-Frame (trải nghiệm VR 360°)  
- Axios (giao tiếp API)  
- LocalStorage / Context API (quản lý Auth)  

### ⚙️ Backend (Flask)
- Flask REST API  
- SQLite / SQL Server (qua `pyodbc` hoặc `sqlite3`)  
- Gemini / OpenAI API (phân tích AI, dịch, dự đoán chi phí)  
- Flask-CORS (hỗ trợ cross-origin cho React)  

### 🗄️ Database
Cấu trúc trong file [`hackathonDB.sql`](./hackathonDB.sql):

- `Users` — thông tin tài khoản (admin / user)  
- `Places` — địa điểm du lịch  
- `Images` — ảnh minh họa cho từng địa điểm  
- `Reviews` — đánh giá người dùng  

---

## 📦 Cấu trúc thư mục

```bash
hackathon/
├── backend/
│   ├── app.py                # Flask backend chính
│   ├── auth_routes.py        # Xử lý đăng nhập / đăng ký / đổi mật khẩu
│   ├── static/
│   │   └── Images/           # Lưu ảnh địa điểm (Ben_Tre-1.jpg, Ha_Long_Bay-1.jpg, ...)
│   └── hackathonDB.sql       # Cấu trúc & dữ liệu mẫu
│
└── front/
    ├── src/
    │   ├── App.js            # Thành phần chính (router + logic)
    │   ├── components/
    │   │   ├── ExplorePage.js
    │   │   ├── AuthModals.js
    │   │   ├── ChatBox.js
    │   │   ├── ProfileModal.jsx
    │   │   └── utils/
    │   │       └── media.js  # Hàm toImg() xử lý URL ảnh
    │   └── admin/
    │       └── AdminLayout.jsx
    ├── package.json
    └── public/
        └── index.html
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
### 🔹 Tính năng nổi bật
1. Trang chủ (HomePage)

- Tìm kiếm địa điểm bằng AI (/api/search-places)

- Hiển thị thời tiết hiện tại (OpenWeather API)

- Kết quả hiển thị ảnh, mô tả, và liên kết đến chi tiết địa điểm

2. Bản đồ (MapPage)
   
- Hiển thị bản đồ Leaflet với vị trí người dùng

- Popup thông tin thời tiết, gợi ý du lịch dựa trên nhiệt độ

4. Chat AI (ChatBox)
   
- Giao tiếp với AI 

- Gửi văn bản hoặc ảnh để AI phân tích / gợi ý
  
6. Phiên dịch (TranslatePage)
   
- Dịch tự động (auto detect language → tiếng Việt hoặc ngược lại)
  
- Đọc to bằng giọng nói (SpeechSynthesis API)
  
7. Dự đoán chi phí du lịch (CostPage)
   
- Nhập điểm đi, điểm đến, số người, số ngày
  
- AI phân tích chi phí di chuyển, ăn ở, vé, tổng chi phí
  
- Hiển thị biểu đồ phân tích và gợi ý tối ưu
  
8. Quản trị viên (Admin Panel)
  
- Quản lý người dùng 👥
  
- Quản lý địa điểm 📍
  
- Quản lý đánh giá ⭐
  
- Thống kê AI và xu hướng tìm kiếm

