import React, { useState } from "react";
import axios from "axios";

function ChatBox() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSend = async () => {
    if (!message && !image) return;

    const formData = new FormData();
    if (message) formData.append("message", message);
    if (image) formData.append("image", image);

    setChat([...chat, { user: "me", text: message, img: preview }]);
    setMessage("");
    setImage(null);
    setPreview(null);
    setLoading(true);

    try {
      const res = await axios.post("http://127.0.0.1:5000/api/chat", formData);
      setChat((prev) => [...prev, { user: "ai", text: res.data.reply }]);
    } catch (error) {
      setChat((prev) => [
        ...prev,
        { user: "ai", text: "❌ Lỗi kết nối server hoặc API." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#1E1E1E",
        padding: "20px",
        borderRadius: "10px",
        width: "500px",
      }}
    >
      <h2 style={{ color: "#fff", textAlign: "center" }}>AI</h2>

      <div
        style={{
          backgroundColor: "#222",
          color: "#fff",
          height: "400px",
          overflowY: "auto",
          padding: "10px",
          borderRadius: "10px",
          marginBottom: "10px",
        }}
      >
        {chat.length === 0 ? (
          <p style={{ color: "#aaa" }}>💬 Hãy nhập tin nhắn hoặc gửi ảnh để bắt đầu</p>
        ) : (
          chat.map((msg, i) => (
            <div key={i} style={{ marginBottom: "10px" }}>
              <strong style={{ color: msg.user === "me" ? "#0f0" : "#0af" }}>
                {msg.user === "me" ? "Bạn" : "AI"}:
              </strong>
              <p style={{ margin: "5px 0" }}>{msg.text}</p>
              {msg.img && (
                <img
                  src={msg.img}
                  alt="preview"
                  style={{
                    width: "120px",
                    height: "120px",
                    borderRadius: "8px",
                    objectFit: "cover",
                  }}
                />
              )}
            </div>
          ))
        )}
        {loading && <p style={{ color: "#ccc" }}>⏳ Đang xử lý...</p>}
      </div>

      {/* Nhập tin nhắn */}
      <div style={{ display: "flex", gap: "10px" }}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Nhập tin nhắn..."
          style={{
            flex: 1,
            padding: "8px",
            borderRadius: "5px",
            border: "none",
          }}
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ color: "white" }}
        />
        <button
          onClick={handleSend}
          disabled={loading}
          style={{
            backgroundColor: "#0f9d58",
            color: "white",
            border: "none",
            padding: "8px 16px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Gửi
        </button>
      </div>

      {/* Hiển thị ảnh preview trước khi gửi */}
      {preview && (
        <div style={{ marginTop: "10px", textAlign: "center" }}>
          <img
            src={preview}
            alt="Preview"
            style={{
              width: "100px",
              height: "100px",
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />
        </div>
      )}
    </div>
  );
}

export default ChatBox;
