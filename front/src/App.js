import React, { useState, useEffect, useRef } from 'react';
// Thêm axios và MessageSquare, Paperclip vào import
import axios from 'axios';
import { MapPin, Search, Globe, Camera, Star, Filter, Phone, Mail, Menu, X, Play, Navigation, MessageSquare, Paperclip } from 'lucide-react';
import 'aframe';

// Dữ liệu mẫu (Giữ nguyên)
const destinations = [
    {
      id: 1,
      name: 'Vịnh Hạ Long',
      category: 'thiên nhiên',
      description: 'Di sản thiên nhiên thế giới với hàng nghìn đảo đá vôi kỳ vĩ',
      image: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=800',
      location: { lat: 20.9101, lng: 107.1839 },
      rating: 4.9,
      asset360: 'https://upload.wikimedia.org/wikipedia/commons/f/f0/Halong_Bay_Vietnam_360_main_cav.jpg',
      assetType: 'image',
      highlights: ['Du thuyền qua đêm', 'Hang Sửng Sốt', 'Đảo Titop'],
      audio: 'Vịnh Hạ Long là di sản thiên nhiên thế giới được UNESCO công nhận'
    },
    {
      id: 2,
      name: 'Phố Cổ Hội An',
      category: 'văn hóa',
      description: 'Phố cổ với kiến trúc độc đáo, lồng đèn lung linh',
      image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800',
      location: { lat: 15.8801, lng: 108.3380 },
      rating: 4.8,
      asset360: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/Hoian_360_pano_e.jpg',
      assetType: 'image',
      highlights: ['Chùa Cầu', 'Phố đèn lồng', 'Ẩm thực đường phố'],
      audio: 'Hội An là đô thị cổ với kiến trúc pha trộn nhiều nền văn hóa'
    },
    {
      id: 3,
      name: 'Phố Bia Tạ Hiện',
      category: 'ẩm thực',
      description: 'Trung tâm ẩm thực và văn hóa đường phố sôi động Hà Nội',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800',
      location: { lat: 21.0285, lng: 105.8542 },
      rating: 4.6,
      asset360: 'https://bitmovin-a.akamaihd.net/content/playhouse-vr/sintel-vr.mp4',
      assetType: 'video',
      highlights: ['Bia hơi', 'Món ăn vặt', 'Không khí sôi động'],
      audio: 'Phố Tạ Hiện là biểu tượng của ẩm thực đường phố Hà Nội'
    },
    {
      id: 4,
      name: 'Vườn Quốc Gia Phong Nha',
      category: 'thiên nhiên',
      description: 'Hệ thống hang động lớn nhất thế giới với Sơn Đoòng',
      image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800',
      location: { lat: 17.5829, lng: 106.2845 },
      rating: 4.9,
      asset360: 'https://upload.wikimedia.org/wikipedia/commons/f/f0/Halong_Bay_Vietnam_360_main_cav.jpg',
      assetType: 'image',
      highlights: ['Hang Sơn Đoòng', 'Hang Phong Nha', 'Suối Moọc'],
      audio: 'Phong Nha Kẻ Bàng nổi tiếng với hệ thống hang động kỳ vĩ'
    },
    {
      id: 5,
      name: 'Đà Lạt',
      category: 'nghỉ dưỡng',
      description: 'Thành phố ngàn hoa với khí hậu mát mẻ quanh năm',
      image: 'https://images.unsplash.com/photo-1571771019784-3ff35f4f4277?w=800',
      location: { lat: 11.9404, lng: 108.4583 },
      rating: 4.7,
      asset360: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/Hoian_360_pano_e.jpg',
      assetType: 'image',
      highlights: ['Hồ Xuân Hương', 'Vườn hoa', 'Cafe view đẹp'],
      audio: 'Đà Lạt là thành phố nghỉ dưỡng lý tưởng với khí hậu mát mẻ'
    },
    {
      id: 6,
      name: 'Chợ Bến Thành',
      category: 'văn hóa',
      description: 'Biểu tượng văn hóa Sài Gòn với ẩm thực và mua sắm',
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800',
      location: { lat: 10.7720, lng: 106.6981 },
      rating: 4.5,
      asset360: 'https://upload.wikimedia.org/wikipedia/commons/f/f0/Halong_Bay_Vietnam_360_main_cav.jpg',
      assetType: 'image',
      highlights: ['Mua sắm đặc sản', 'Ẩm thực', 'Kiến trúc cổ'],
      audio: 'Chợ Bến Thành là một trong những biểu tượng của Sài Gòn'
    }
];

const categories = [
  { id: 'all', name: 'Tất cả', icon: Globe },
  { id: 'thiên nhiên', name: 'Thiên nhiên', icon: MapPin },
  { id: 'văn hóa', name: 'Văn hóa', icon: Camera },
  { id: 'ẩm thực', name: 'Ẩm thực', icon: Star },
  { id: 'nghỉ dưỡng', name: 'Nghỉ dưỡng', icon: Navigation }
];

// === COMPONENT CON (Giữ nguyên) ===

// Navigation
const NavBar = ({ setCurrentPage, setMobileMenuOpen, mobileMenuOpen }) => (
  <nav className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg fixed w-full top-0 z-50">
    <div className="container mx-auto px-4 py-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentPage('home')}>
          <Globe className="w-8 h-8" />
          <span className="text-xl font-bold hidden sm:inline">Virtual Travel VN</span>
        </div>
        
        <div className="hidden md:flex gap-6">
          <button onClick={() => setCurrentPage('home')} className="hover:text-yellow-200 transition">Trang chủ</button>
          <button onClick={() => setCurrentPage('explore')} className="hover:text-yellow-200 transition">Khám phá</button>
          <button onClick={() => setCurrentPage('map')} className="hover:text-yellow-200 transition">Bản đồ</button>
          <button onClick={() => setCurrentPage('contact')} className="hover:text-yellow-200 transition">Liên hệ</button>
        </div>

        // ĐOẠN CODE ĐÃ SỬA
        <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden mt-4 space-y-2 pb-4">
          <button onClick={() => { setCurrentPage('home'); setMobileMenuOpen(false); }} className="block w-full text-left py-2 hover:bg-cyan-600 px-2 rounded">Trang chủ</button>
          <button onClick={() => { setCurrentPage('explore'); setMobileMenuOpen(false); }} className="block w-full text-left py-2 hover:bg-cyan-600 px-2 rounded">Khám phá</button>
          <button onClick={() => { setCurrentPage('map'); setMobileMenuOpen(false); }} className="block w-full text-left py-2 hover:bg-cyan-600 px-2 rounded">Bản đồ</button>
          <button onClick={() => { setCurrentPage('contact'); setMobileMenuOpen(false); }} className="block w-full text-left py-2 hover:bg-cyan-600 px-2 rounded">Liên hệ</button>
        </div>
      )}
    </div>
  </nav>
);

// Home Page
const HomePage = ({ setCurrentPage, setSearchTerm, searchTerm, destinations, setSelectedDestination }) => (
  <div className="pt-16">
    {/* Hero Section */}
    <div className="relative h-screen">
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/90 to-blue-600/90 z-10"></div>
      <img 
        src="https://images.unsplash.com/photo-1528127269322-539801943592?w=1600" 
        alt="Vietnam" 
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center animate-fade-in">
          Trải Nghiệm Du Lịch Việt Nam
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-center max-w-2xl">
          Khám phá Việt Nam qua công nghệ thực tế ảo và mô phỏng 360°
        </p>
        
        {/* Search Bar */}
        <div className="w-full max-w-2xl bg-white rounded-full shadow-2xl p-2 flex items-center">
          <Search className="w-6 h-6 text-gray-400 ml-4" />
          <input
            type="text"
            placeholder="Tìm kiếm điểm đến..."
            className="flex-1 px-4 py-3 text-gray-800 outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button 
            onClick={() => setCurrentPage('explore')}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-3 rounded-full hover:shadow-lg transition"
          >
            Tìm kiếm
          </button>
        </div>

        <button 
          onClick={() => setCurrentPage('explore')}
          className="mt-8 bg-yellow-400 text-gray-800 px-8 py-4 rounded-full text-lg font-semibold hover:bg-yellow-300 transition shadow-lg"
        >
          Bắt đầu khám phá
        </button>
      </div>
    </div>

    {/* Features Section */}
    <div className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
          Tính năng nổi bật
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition text-center">
            <Camera className="w-16 h-16 mx-auto mb-4 text-cyan-500" />
            <h3 className="text-xl font-bold mb-2">Video 360°</h3>
            <p className="text-gray-600">Trải nghiệm thực tế ảo với video 360 độ chất lượng cao</p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition text-center">
            <MapPin className="w-16 h-16 mx-auto mb-4 text-blue-600" />
            <h3 className="text-xl font-bold mb-2">Bản đồ tương tác</h3>
            <p className="text-gray-600">Khám phá vị trí các điểm du lịch trên bản đồ số</p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition text-center">
            <Star className="w-16 h-16 mx-auto mb-4 text-yellow-500" />
            <h3 className="text-xl font-bold mb-2">Thuyết minh tự động</h3>
            <p className="text-gray-600">Nghe thuyết minh chi tiết về từng điểm đến</p>
          </div>
        </div>
      </div>
    </div>

    {/* Popular Destinations */}
    <div className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
          Điểm đến phổ biến
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {destinations.slice(0, 3).map(dest => (
            <div key={dest.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-2">
              <img src={dest.image} alt={dest.name} className="w-full h-48 object-cover" />
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold">{dest.name}</h3>
                  <div className="flex items-center gap-1 text-yellow-500">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm font-semibold">{dest.rating}</span>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{dest.description}</p>
                <button 
                  onClick={() => {
                    setSelectedDestination(dest);
                    setCurrentPage('detail');
                  }}
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-2 rounded-lg hover:shadow-lg transition"
                >
                  Trải nghiệm ngay
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// Explore Page
const ExplorePage = ({ 
  setCurrentPage, 
  setSearchTerm, 
  searchTerm, 
  categories, 
  selectedCategory, 
  setSelectedCategory, 
  filteredDestinations, 
  setSelectedDestination 
}) => (
  <div className="pt-24 pb-12 min-h-screen bg-gray-50">
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Khám phá điểm đến</h1>
      
      {/* Search and Filter */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm điểm đến..."
              className="w-full pl-10 pr-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-cyan-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition ${
                  selectedCategory === cat.id
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                {cat.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Destinations Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredDestinations.map(dest => (
          <div key={dest.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-2">
            <div className="relative">
              <img src={dest.image} alt={dest.name} className="w-full h-56 object-cover" />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="font-semibold">{dest.rating}</span>
              </div>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold">{dest.name}</h3>
                <span className="text-xs bg-cyan-100 text-cyan-700 px-2 py-1 rounded-full">
                  {dest.category}
                </span>
              </div>
              <p className="text-gray-600 mb-4">{dest.description}</p>
              <div className="flex gap-2">
                <button 
                  onClick={() => {
                    setSelectedDestination(dest);
                    setCurrentPage('detail');
                  }}
                  className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-2 rounded-lg hover:shadow-lg transition flex items-center justify-center gap-2"
                >
                  <Play className="w-4 h-4" />
                  Trải nghiệm
                </button>
                <button 
                  onClick={() => {
                    setSelectedDestination(dest);
                    setCurrentPage('map');
                  }}
                  className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition"
                >
                  <MapPin className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredDestinations.length === 0 && (
        <div className="text-center py-12">
          <p className="text-xl text-gray-500">Không tìm thấy điểm đến phù hợp</p>
        </div>
      )}
    </div>
  </div>
);

// Detail Page
const DetailPage = ({ selectedDestination, setCurrentPage, setSelectedDestination, destinations }) => {
  const [showVROverlay, setShowVROverlay] = useState(true);

  if (!selectedDestination) return null;

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      {/* Hero Image */}
      <div className="relative h-96">
        <img 
          src={selectedDestination.image} 
          alt={selectedDestination.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
              {selectedDestination.name}
            </h1>
            <div className="flex items-center gap-4 text-white">
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 fill-current text-yellow-400" />
                <span className="font-semibold">{selectedDestination.rating}</span>
              </div>
              <span className="bg-white/20 backdrop-blur px-3 py-1 rounded-full text-sm">
                {selectedDestination.category}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* A-FRAME */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-6 border-b">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <Camera className="w-6 h-6 text-cyan-500" />
                  Trải nghiệm 360°
                </h2>
              </div>

              <div className="aspect-video relative bg-black">
                
                {/* Lớp phủ tương tác (Overlay) */}
                {showVROverlay && (
                  <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/70">
                    <button 
                      onClick={() => setShowVROverlay(false)}
                      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:shadow-lg transition"
                    >
                      <Play className="w-5 h-5" />
                      Bắt đầu trải nghiệm 360°
                    </button>
                    <p className="text-gray-300 mt-2 text-sm">Nhấp để tương tác (Kéo chuột để xoay)</p>
                  </div>
                )}

                {/* A-Frame Scene */}
                <a-scene 
                  embedded 
                  className="w-full h-full"
                  style={{ visibility: showVROverlay ? 'hidden' : 'visible' }}
                >
                  {selectedDestination.assetType === 'image' ? (
                    <a-sky src={selectedDestination.asset360} crossOrigin="anonymous"></a-sky>
                  ) : (
                    <>
                      <a-assets>
                        <video 
                          id="vid360" 
                          src={selectedDestination.asset360} 
                          autoPlay 
                          loop={true} 
                          playsInline
                          crossOrigin="anonymous"
                        ></video>
                      </a-assets>
                      <a-videosphere src="#vid360"></a-videosphere>
                    </>
                  )}
                  
                  <a-camera position="0 0 0.1"></a-camera>
                </a-scene>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4">Giới thiệu</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                {selectedDestination.description}
              </p>
              <button 
                onClick={() => {
                  const speech = new SpeechSynthesisUtterance(selectedDestination.audio);
                  speech.lang = 'vi-VN';
                  window.speechSynthesis.speak(speech);
                }}
                className="flex items-center gap-2 bg-cyan-100 text-cyan-700 px-4 py-2 rounded-lg hover:bg-cyan-200 transition"
              >
                <Play className="w-4 h-4" />
                Nghe thuyết minh
              </button>
            </div>

            {/* Highlights */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4">Điểm nổi bật</h2>
              <div className="space-y-3">
                {selectedDestination.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Star className="w-5 h-5 text-yellow-500 fill-current flex-shrink-0" />
                    <span className="text-gray-700">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Map Preview */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-4 border-b">
                <h3 className="font-bold flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-cyan-500" />
                  Vị trí
                </h3>
              </div>
              <div className="h-48 bg-gray-200 relative">
                <img 
                  src={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/${selectedDestination.location.lng},${selectedDestination.location.lat},12,0/400x200@2x?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw`}
                  alt="Map"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <button 
                  onClick={() => setCurrentPage('map')}
                  className="w-full bg-cyan-500 text-white py-2 rounded-lg hover:bg-cyan-600 transition"
                >
                  Xem bản đồ đầy đủ
                </button>
              </div>
            </div>

            {/* QR Code */}
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <h3 className="font-bold mb-4">Quét QR để lưu</h3>
              <div className="bg-gray-100 p-4 rounded-lg inline-block">
                <div className="w-32 h-32 bg-white flex items-center justify-center">
                  <div className="text-xs text-gray-400">QR Code</div>
                </div>
              </div>
            </div>

            {/* Related */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="font-bold mb-4">Điểm đến liên quan</h3>
              <div className="space-y-3">
                {destinations
                  .filter(d => d.id !== selectedDestination.id && d.category === selectedDestination.category)
                  .slice(0, 3)
                  .map(dest => (
                    <div 
                      key={dest.id}
                      onClick={() => setSelectedDestination(dest)}
                      className="flex gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition"
                    >
                      <img 
                        src={dest.image} 
                        alt={dest.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm">{dest.name}</h4>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Star className="w-3 h-3 fill-current text-yellow-500" />
                          {dest.rating}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Map Page
const MapPage = ({ setCurrentPage, setSelectedDestination, destinations, categories }) => {
  const [hoveredDest, setHoveredDest] = useState(null);

  return (
    <div className="pt-16 h-screen flex flex-col">
      <div className="container mx-auto px-4 py-4">
        <h1 className="text-3xl font-bold text-gray-800">Bản đồ du lịch</h1>
      </div>
      
      <div className="flex-1 relative bg-gray-100">
        {/* Simplified Map View */}
        <div className="absolute inset-0 overflow-auto p-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {destinations.map(dest => (
              <div 
                key={dest.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-2xl transition transform hover:-translate-y-1"
                onClick={() => {
                  setSelectedDestination(dest);
                  setCurrentPage('detail');
                }}
                onMouseEnter={() => setHoveredDest(dest.id)}
                onMouseLeave={() => setHoveredDest(null)}
              >
                <img src={dest.image} alt={dest.name} className="w-full h-32 object-cover" />
                <div className="p-3">
                  <h3 className="font-bold text-sm mb-1">{dest.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{dest.category}</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-current text-yellow-500" />
                      <span className="text-xs font-semibold">{dest.rating}</span>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center gap-1 text-xs text-cyan-600">
                    <MapPin className="w-3 h-3" />
                    <span>Lat: {dest.location.lat.toFixed(2)}, Lng: {dest.location.lng.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Map Legend */}
        <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-4 max-w-xs">
          <h3 className="font-bold mb-2">Chú thích</h3>
          <div className="space-y-2 text-sm">
            {categories.filter(c => c.id !== 'all').map(cat => {
              const Icon = cat.icon;
              return (
                <div key={cat.id} className="flex items-center gap-2">
                  <Icon className="w-4 h-4 text-cyan-500" />
                  <span>{cat.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

// Contact Page
const ContactPage = ({ formSubmitted, setFormSubmitted, formData, setFormData }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
  };

  return (
    <div className="pt-24 pb-12 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-gray-800 text-center">Liên hệ với chúng tôi</h1>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Contact Form */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Gửi tin nhắn</h2>
            
            {formSubmitted ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-green-800 mb-2">Cảm ơn bạn!</h3>
                <p className="text-green-600">Tin nhắn của bạn đã được gửi thành công.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Họ và tên</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-cyan-500"
                    placeholder="Nguyễn Văn A"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold mb-2">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-cyan-500"
                    placeholder="email@example.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold mb-2">Tin nhắn</label>
                  <textarea
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    rows={5}
                    className="w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-cyan-500"
                    placeholder="Nội dung tin nhắn của bạn..."
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition"
                >
                  Gửi tin nhắn
                </button>
              </form>
            )}
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6">Thông tin liên hệ</h2>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-cyan-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <p className="text-gray-600">contact@virtualtravel.vn</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Điện thoại</h3>
                    <p className="text-gray-600">+84 123 456 789</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Địa chỉ</h3>
                    <p className="text-gray-600">Hồ Chí Minh, Việt Nam</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl shadow-lg p-8 text-white">
              <h2 className="text-2xl font-bold mb-4">Về dự án</h2>
              <p className="mb-4 leading-relaxed">
                Virtual Travel Experience là nền tảng du lịch mô phỏng và trải nghiệm ảo, 
                giúp du khách khám phá Việt Nam thông qua công nghệ thực tế ảo và video 360°.
              </p>
              <p className="text-sm text-cyan-100">
                Dự án phát triển nhằm góp phần chuyển đổi số ngành du lịch Việt Nam, 
                quảng bá văn hóa và hỗ trợ du khách lựa chọn điểm đến phù hợp.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Footer
const Footer = ({ setCurrentPage }) => (
  <footer className="bg-gray-800 text-white py-12">
    <div className="container mx-auto px-4">
      <div className="grid md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Globe className="w-8 h-8" />
            <span className="text-xl font-bold">Virtual Travel VN</span>
          </div>
          <p className="text-gray-400 text-sm">
            Trải nghiệm du lịch Việt Nam qua công nghệ thực tế ảo
          </p>
        </div>
        
        <div>
          <h3 className="font-bold mb-4">Khám phá</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><button onClick={() => setCurrentPage('explore')} className="hover:text-white">Điểm đến</button></li>
            <li><button onClick={() => setCurrentPage('map')} className="hover:text-white">Bản đồ</button></li>
            <li><button onClick={() => setCurrentPage('contact')} className="hover:text-white">Liên hệ</button></li>
          </ul>
        </div>
        
        <div>
          <h3 className="font-bold mb-4">Danh mục</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>Thiên nhiên</li>
            <li>Văn hóa</li>
            <li>Ẩm thực</li>
            <li>Nghỉ dưỡng</li>
          </ul>
        </div>
        
        <div>
          <h3 className="font-bold mb-4">Liên hệ</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>Email: contact@virtualtravel.vn</li>
            <li>Phone: +84 123 456 789</li>
            <li>Hồ Chí Minh, Việt Nam</li>
          </ul>
        </div>
      </div>
      
      <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
        <p>&copy; 2025 Virtual Travel VN. Dự án chuyển đổi số ngành du lịch Việt Nam.</p>
      </div>
    </div>
  </footer>
);

// === COMPONENT CHATBOX ĐƯỢC CẬP NHẬT ===

function ChatBox() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  // Ref cho input file ẩn
  const fileInputRef = useRef(null); 
  // Scroll xuống cuối khi có tin nhắn mới
  const chatEndRef = useRef(null); 

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chat]);

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
    if (!message.trim() && !image) return; // Thêm .trim() để loại bỏ khoảng trắng

    const formData = new FormData();
    if (message.trim()) formData.append("message", message.trim());
    if (image) formData.append("image", image);

    // Thêm tin nhắn/ảnh của người dùng vào chat ngay lập tức
    setChat((prev) => [...prev, { user: "me", text: message.trim(), img: preview }]);
    
    // Reset input và preview
    setMessage("");
    setImage(null);
    setPreview(null);
    if (fileInputRef.current) { // Reset input file để có thể chọn lại cùng một file
      fileInputRef.current.value = "";
    }
    setLoading(true);

    try {
      const res = await axios.post("http://127.0.0.1:5000/api/chat", formData);
      setChat((prev) => [...prev, { user: "ai", text: res.data.reply }]);
    } catch (error) {
      console.error("Lỗi gửi tin nhắn:", error);
      setChat((prev) => [
        ...prev,
        { user: "ai", text: "❌ Lỗi kết nối server hoặc API. Vui lòng thử lại." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Hàm xử lý khi nhấn Enter trong ô input
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { // Gửi tin nhắn khi nhấn Enter, không gửi khi nhấn Shift + Enter
      e.preventDefault(); // Ngăn xuống dòng mặc định của textarea (nếu có)
      handleSend();
    }
  };

  return (
    <div
      className="bg-gray-800 rounded-xl shadow-2xl flex flex-col"
      style={{
        width: "400px", 
        maxWidth: "90vw",
        height: "550px", // Chiều cao cố định cho chatbox
      }}
    >
      <div className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white p-4 rounded-t-xl text-center font-bold text-lg">
        AI Trợ lý Du lịch
      </div>

      <div
        className="flex-1 overflow-y-auto p-4 space-y-4"
        style={{ scrollbarWidth: 'thin', scrollbarColor: '#4f46e5 #2d3748' }} // Tailwind colors
      >
        {chat.length === 0 ? (
          <p className="text-gray-400 text-center mt-4">💬 Hãy nhập tin nhắn hoặc gửi ảnh để bắt đầu</p>
        ) : (
          chat.map((msg, i) => (
            <div key={i} className={`flex ${msg.user === 'me' ? 'justify-end' : 'justify-start'}`}>
              <div 
                className={`max-w-[75%] p-3 rounded-lg shadow-md ${
                  msg.user === 'me' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-700 text-gray-100'
                }`}
              >
                {msg.text && <p className="text-sm">{msg.text}</p>}
                {msg.img && (
                  <img
                    src={msg.img}
                    alt="preview"
                    className="mt-2 rounded-lg object-cover max-w-[150px] max-h-[150px]"
                  />
                )}
              </div>
            </div>
          ))
        )}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-700 text-gray-100 p-3 rounded-lg shadow-md max-w-[75%]">
              <p className="text-sm animate-pulse">⏳ AI đang xử lý...</p>
            </div>
          </div>
        )}
        <div ref={chatEndRef} /> {/* Dùng để cuộn xuống cuối */}
      </div>

      {/* Input và nút gửi */}
      <div className="p-4 border-t border-gray-700 bg-gray-800 rounded-b-xl">
        {preview && (
          <div className="mb-2 relative w-24 h-24 rounded-lg overflow-hidden border-2 border-cyan-500">
            <img src={preview} alt="Image preview" className="w-full h-full object-cover" />
            <button 
              onClick={() => {setImage(null); setPreview(null); if(fileInputRef.current) fileInputRef.current.value = '';}}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
              aria-label="Xóa ảnh"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
        <div className="flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Nhập tin nhắn..."
            className="flex-1 p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
          
          {/* Nút đính kèm file */}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            className="hidden" // Ẩn input mặc định
          />
          <button
            onClick={() => fileInputRef.current.click()} // Kích hoạt input file khi click nút
            className="p-3 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition flex items-center justify-center"
            aria-label="Đính kèm ảnh"
          >
            <Paperclip className="w-5 h-5" />
          </button>

          {/* Nút gửi */}
          <button
            onClick={handleSend}
            disabled={loading || (!message.trim() && !image)}
            className={`p-3 rounded-lg transition flex items-center justify-center ${
              loading || (!message.trim() && !image)
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:opacity-90'
            }`}
            aria-label="Gửi tin nhắn"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}


// === COMPONENT APP CHÍNH ===
// (Giữ nguyên phần này)
const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const [isChatOpen, setIsChatOpen] = useState(false);

  const filteredDestinations = destinations.filter(dest => {
    const matchesSearch = dest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dest.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || dest.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-white">
      <NavBar 
        setCurrentPage={setCurrentPage} 
        setMobileMenuOpen={setMobileMenuOpen} 
        mobileMenuOpen={mobileMenuOpen} 
      />
      
      {currentPage === 'home' && (
        <HomePage 
          setCurrentPage={setCurrentPage} 
          setSearchTerm={setSearchTerm} 
          searchTerm={searchTerm} 
          destinations={destinations} 
          setSelectedDestination={setSelectedDestination} 
        />
      )}
      
      {currentPage === 'explore' && (
        <ExplorePage 
          setCurrentPage={setCurrentPage} 
          setSearchTerm={setSearchTerm} 
          searchTerm={searchTerm} 
          categories={categories} 
          selectedCategory={selectedCategory} 
          setSelectedCategory={setSelectedCategory} 
          filteredDestinations={filteredDestinations} 
          setSelectedDestination={setSelectedDestination} 
        />
      )}
      
      {currentPage === 'detail' && (
        <DetailPage 
          selectedDestination={selectedDestination} 
          setCurrentPage={setCurrentPage} 
          setSelectedDestination={setSelectedDestination} 
          destinations={destinations} 
        />
      )}
      
      {currentPage === 'map' && (
        <MapPage 
          setCurrentPage={setCurrentPage} 
          setSelectedDestination={setSelectedDestination} 
          destinations={destinations} 
          categories={categories} 
        />
      )}
      
      {currentPage === 'contact' && (
        <ContactPage 
          formSubmitted={formSubmitted} 
          setFormSubmitted={setFormSubmitted} 
          formData={formData} 
          setFormData={setFormData} 
        />
      )}
      
      <Footer setCurrentPage={setCurrentPage} />

      <button
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-cyan-500 to-blue-600 text-white w-16 h-16 rounded-full shadow-lg flex items-center justify-center z-50 hover:scale-110 transition-transform"
        aria-label="Mở/Đóng Chat"
      >
        {isChatOpen ? <X className="w-8 h-8" /> : <MessageSquare className="w-8 h-8" />}
      </button>

      {isChatOpen && (
        <div className="fixed bottom-24 right-6 z-40 shadow-2xl rounded-lg overflow-hidden">
          <ChatBox />
        </div>
      )}

    </div>
  );
};

export default App;