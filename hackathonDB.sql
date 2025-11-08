create database hackathon

CREATE TABLE Users (
    id INT IDENTITY PRIMARY KEY,
    name NVARCHAR(100),
    email NVARCHAR(100) UNIQUE,
    password NVARCHAR(200),
    created_at DATETIME DEFAULT GETDATE()
);

CREATE TABLE Places (
    id INT IDENTITY PRIMARY KEY,
    name NVARCHAR(100) NOT NULL,
    address NVARCHAR(255),
    lat FLOAT,
    lng FLOAT,
    description NVARCHAR(MAX),
    created_at DATETIME DEFAULT GETDATE()
);

CREATE TABLE Images (
    id INT IDENTITY PRIMARY KEY,
    place_id INT NOT NULL FOREIGN KEY REFERENCES Places(id),
    image_url NVARCHAR(255),        -- URL nếu lưu ảnh ngoài server
    image_data VARBINARY(MAX),      -- Hoặc lưu trực tiếp ảnh
    description NVARCHAR(255),
    created_at DATETIME DEFAULT GETDATE()
);

CREATE TABLE Reviews (
    id INT IDENTITY PRIMARY KEY,
    user_id INT NOT NULL FOREIGN KEY REFERENCES Users(id),
    place_id INT NOT NULL FOREIGN KEY REFERENCES Places(id),
    rating INT CHECK (rating >= 1 AND rating <= 5),
    comment NVARCHAR(MAX),
    created_at DATETIME DEFAULT GETDATE()
);
