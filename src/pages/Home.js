import { Link } from 'react-router-dom';
import SchoolIcon from '@mui/icons-material/School';
import GroupIcon from '@mui/icons-material/Group';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import StarIcon from '@mui/icons-material/Star';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SpeedIcon from '@mui/icons-material/Speed';
import SupportIcon from '@mui/icons-material/Support';

function Home() {
  return (
    <div className="min-h-screen">
      {/* Features Section */}
      <div className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              플랫폼 특징
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              최고의 교육 환경을 제공하는 우리만의 특별한 서비스
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <SchoolIcon className="text-white text-4xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                다양한 훈련기관
              </h3>
              <p className="text-gray-600">
                전국의 다양한 훈련기관 정보를 한 눈에 확인할 수 있습니다.
              </p>
            </div>
            
            <div className="text-center p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="bg-gradient-to-r from-green-500 to-green-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <TrendingUpIcon className="text-white text-4xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                체계적인 교육 과정
              </h3>
              <p className="text-gray-600">
                각 기관별 교육 과정과 커리큘럼을 상세히 제공합니다.
              </p>
            </div>
            
            <div className="text-center p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <GroupIcon className="text-white text-4xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                팀 매칭 서비스
              </h3>
              <p className="text-gray-600">
                같은 관심사를 가진 사람들과 함께 학습할 수 있습니다.
              </p>
            </div>

            <div className="text-center p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <SupportIcon className="text-white text-4xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                24/7 지원 서비스
              </h3>
              <p className="text-gray-600">
                언제든지 도움이 필요할 때 전문가의 지원을 받을 수 있습니다.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              플랫폼 현황
            </h2>
            <p className="text-xl text-gray-600">
              지금까지 많은 분들이 함께하고 있습니다
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center p-8 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
              <div className="text-5xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-gray-700 font-medium">등록된 훈련기관</div>
            </div>
            <div className="text-center p-8 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200">
              <div className="text-5xl font-bold text-green-600 mb-2">1,200+</div>
              <div className="text-gray-700 font-medium">교육 과정</div>
            </div>
            <div className="text-center p-8 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200">
              <div className="text-5xl font-bold text-purple-600 mb-2">10,000+</div>
              <div className="text-gray-700 font-medium">수강생</div>
            </div>
            <div className="text-center p-8 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl border border-orange-200">
              <div className="text-5xl font-bold text-orange-600 mb-2">98%</div>
              <div className="text-gray-700 font-medium">만족도</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 px-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative max-w-5xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            지금 바로 시작해보세요
          </h2>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
            다양한 훈련기관과 교육 과정을 탐색하고 당신의 성장을 시작하세요
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              to="/institutions"
              className="bg-white text-blue-600 px-10 py-4 rounded-xl font-bold hover:bg-gray-100 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg transform hover:scale-105"
            >
              <SchoolIcon />
              <span>훈련기관 보기</span>
            </Link>
            <Link
              to="/training"
              className="bg-transparent border-2 border-white text-white px-10 py-4 rounded-xl font-bold hover:bg-white hover:text-blue-600 transition-all duration-300 flex items-center justify-center space-x-2 transform hover:scale-105"
            >
              <GroupIcon />
              <span>교육과정 보기</span>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Why Choose Us Section */}
      <div className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              왜 우리를 선택해야 할까요?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              다른 플랫폼과 차별화된 우리만의 장점
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <CheckCircleIcon className="text-green-500 text-3xl mr-3" />
                <h3 className="text-xl font-bold text-gray-800">검증된 교육 품질</h3>
              </div>
              <p className="text-gray-600">
                모든 교육 과정은 엄격한 품질 검증을 거쳐 제공됩니다.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <SpeedIcon className="text-blue-500 text-3xl mr-3" />
                <h3 className="text-xl font-bold text-gray-800">빠른 매칭 시스템</h3>
              </div>
              <p className="text-gray-600">
                AI 기반의 매칭 시스템으로 최적의 교육 과정을 추천합니다.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <StarIcon className="text-yellow-500 text-3xl mr-3" />
                <h3 className="text-xl font-bold text-gray-800">높은 만족도</h3>
              </div>
              <p className="text-gray-600">
                98%의 사용자가 우리 플랫폼에 만족하고 있습니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;