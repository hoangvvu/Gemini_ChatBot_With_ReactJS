from flask import Flask, request, jsonify
from flask_cors import CORS
from google import genai
from dotenv import load_dotenv
import os
import base64

# Load biến môi trường
load_dotenv()

app = Flask(__name__)

# ✅ Bật CORS cho React frontend
CORS(app, resources={r"/api/*": {"origins": ["http://localhost:3000", "http://127.0.0.1:3000"]}})

# ✅ Lấy API key
API_KEY = os.getenv("GEMINI_API_KEY")
if not API_KEY:
    raise ValueError("❌ Thiếu GEMINI_API_KEY trong file .env")

# ✅ Khởi tạo Gemini client
client = genai.Client(api_key=API_KEY)


@app.route("/api/chat", methods=["POST"])
def chat():
    message = request.form.get("message", "").strip()
    image = request.files.get("image")

    if not message and not image:
        return jsonify({"reply": "⚠️ Vui lòng nhập tin nhắn hoặc tải ảnh."})

    try:
        # 🖼️ Nếu có ảnh
        if image:
            image_bytes = image.read()
            response = client.models.generate_content(
                model="gemini-2.0-flash",
                contents=[
                    {
                        "role": "user",
                        "parts": [
                            {"text": message or "Mô tả hình ảnh này"},
                            {
                                "inline_data": {
                                    "mime_type": image.mimetype,
                                    "data": image_bytes
                                }
                            }
                        ]
                    }
                ],
            )
        # 💬 Nếu chỉ có văn bản
        else:
            response = client.models.generate_content(
                model="gemini-2.0-flash",
                contents=[
                    {"role": "user", "parts": [{"text": message}]}
                ]
            )

        return jsonify({"reply": response.text})

    except Exception as e:
        print("🔥 Lỗi khi gọi Gemini:", str(e))
        return jsonify({"reply": f"❌ Lỗi server: {str(e)}"})


# ✅ Thêm header CORS thủ công cho chắc
@app.after_request
def add_cors_headers(response):
    response.headers["Access-Control-Allow-Origin"] = "http://localhost:3000"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
    response.headers["Access-Control-Allow-Methods"] = "POST, GET, OPTIONS"
    return response


if __name__ == "__main__":
    app.run(debug=True)
