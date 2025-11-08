import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Star, Camera, X, Play } from 'lucide-react';
import 'aframe'; // Import A-Frame cho VR

// Component thẻ địa điểm
const DestinationCard = ({ destination, setCurrentPage, setSelectedPlaceId }) => {
  const [showVR, setShowVR] = useState(false);
  const [aiDescription, setAiDescription] = useState('');
  const [loadingDesc, setLoadingDesc] = useState(false);

  // *** THÊM MỚI: Hàm xử lý khi click vào thẻ để xem chi tiết ***
  const handleViewDetails = () => {
    setSelectedPlaceId(destination.id); // Set ID của địa điểm
    setCurrentPage('details');          // Chuyển sang trang 'details'
  };

  const loadAIDescription = async () => {
    setLoadingDesc(true);
    try {
      const response = await axios.post('http://127.0.0.1:5000/api/chat',
        new URLSearchParams({
          message: `Viết thuyết minh chi tiết về ${destination.name} bằng tiếng Việt (3-4 câu). Chỉ trả về nội dung thuyết minh.`
        })
      );
      setAiDescription(response.data.reply);
    } catch (error) {
      setAiDescription('Không thể tải thuyết minh.');
    } finally {
      setLoadingDesc(false);
    }
  };

  const speakDescription = (text, lang) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition">
      {/* *** CẬP NHẬT: Thêm onClick và cursor-pointer *** */}
      <img 
        src={destination.image} 
        alt={destination.name} 
        className="w-full h-48 object-cover cursor-pointer"
        onClick={handleViewDetails} 
      />
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          {/* *** CẬP NHẬT: Thêm onClick và cursor-pointer *** */}
          <h3 
            className="text-xl font-bold cursor-pointer"
            onClick={handleViewDetails}
          >
            {destination.name}
          </h3>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <span className="text-sm font-semibold">{destination.rating}</span>
          </div>
        </div>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{destination.description}</p>
        <span className="inline-block bg-cyan-100 text-cyan-700 px-3 py-1 rounded-full text-xs mb-4">
          {destination.category}
        </span>

        <div className="space-y-2">
          <button
            onClick={() => setShowVR(!showVR)}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-2 rounded-lg hover:shadow-lg transition flex items-center justify-center gap-2"
          >
            <Camera className="w-4 h-4" />
            {showVR ? 'Đóng VR360' : 'Xem VR360'}
          </button>

          <button
            onClick={loadAIDescription}
            disabled={loadingDesc}
            className="w-full bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600 transition text-sm disabled:opacity-50"
          >
            {loadingDesc ? '🤖 Đang tải...' : '🎙️ Thuyết minh AI'}
          </button>
        </div>

        {/* VR360 Modal */}
        {showVR && (
          <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl max-w-4xl w-full overflow-hidden">
              <div className="p-4 border-b flex justify-between items-center">
                <h3 className="font-bold text-lg">{destination.name} - VR360</h3>
                <button onClick={() => setShowVR(false)} className="text-gray-500 hover:text-gray-700">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="aspect-video bg-black">
                <a-scene embedded>
                  <a-sky src={destination.vr360} crossOrigin="anonymous"></a-sky>
                  <a-camera position="0 0 0.1"></a-camera>
                </a-scene>
              </div>
            </div>
          </div>
        )}

        {/* AI Description */}
        {aiDescription && (
          <div className="mt-4 p-4 bg-purple-50 rounded-lg">
            <div className="flex justify-between items-start mb-2">
              <p className="text-sm font-semibold text-purple-700">Thuyết minh AI</p>
              <div className="flex gap-2">
                <button
                  onClick={() => speakDescription(aiDescription, 'vi-VN')}
                  className="text-purple-600 hover:text-purple-700"
                  title="Nghe tiếng Việt"
                >
                  🇻🇳 <Play className="w-4 h-4 inline" />
                </button>
                <button
                  onClick={async () => {
                    const res = await axios.post('http://127.0.0.1:5000/api/chat',
                      new URLSearchParams({
                        message: `Translate to English: "${aiDescription}". Only return translation.`
                      })
                    );
                    speakDescription(res.data.reply, 'en-US');
                  }}
                  className="text-blue-600 hover:text-blue-700"
                  title="Nghe tiếng Anh"
                >
                  🇬🇧 <Play className="w-4 h-4 inline" />
                </button>
              </div>
            </div>
            <p className="text-sm text-gray-700">{aiDescription}</p>
          </div>
        )}
      </div>
    </div>
  );
};


// Trang Khám phá
// *** CẬP NHẬT: Nhận props 'setCurrentPage' và 'setSelectedPlaceId' ***
const ExplorePage = ({ setCurrentPage, setSelectedPlaceId }) => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadDestinations();
  }, []);

  const loadDestinations = async () => {
    setLoading(true);
    try {
      // *** Gọi API top-rated-places từ Database ***
      const response = await axios.get('http://127.0.0.1:5000/api/top-rated-places');
      setDestinations(response.data || []);
    } catch (error)
    {
      console.error('Lỗi load điểm đến từ DB:', error);
      // Fallback data
      setDestinations([
        {
          id: 0, // Thêm id cho key
          name: 'Lỗi Kết Nối DB',
          description: 'Không thể tải dữ liệu. Vui lòng kiểm tra Flask Server và kết nối DB.',
          image: 'https://via.placeholder.com/800x400?text=Database+Error',
          rating: 0.0,
          category: 'lỗi',
          vr360: 'https://upload.wikimedia.org/wikipedia/commons/f/f0/Halong_Bay_Vietnam_360_main_cav.jpg'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const filteredDests = destinations.filter(d => 
    d.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="pt-24 pb-12 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">🗺️ Khám phá điểm đến (Top Rate)</h1>
        <p className="text-gray-600 mb-8">Danh sách các điểm đến được đánh giá cao nhất từ cơ sở dữ liệu</p>

        {/* Search */}
        <div className="bg-white rounded-xl shadow-lg p-4 mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm trong các điểm đến top..."
              className="w-full pl-10 pr-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-cyan-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mx-auto"></div>
            <p className="text-gray-600 mt-4">💾 Đang tải dữ liệu từ Database...</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDests.map((dest) => (
              // *** CẬP NHẬT: Truyền props 'setCurrentPage' và 'setSelectedPlaceId' xuống Card ***
              <DestinationCard 
                key={dest.id} 
                destination={dest} 
                setCurrentPage={setCurrentPage}
                setSelectedPlaceId={setSelectedPlaceId}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExplorePage;