import { Link } from 'react-router-dom';
import SchoolIcon from '@mui/icons-material/School';
import GroupIcon from '@mui/icons-material/Group';
import EditIcon from '@mui/icons-material/Edit';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
            <span className="text-blue-600">훈련기관</span> 정보 플랫폼
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            다양한 훈련기관과 교육 과정을 한 곳에서 확인하고<br/>
            당신에게 맞는 최적의 교육 기회를 찾아보세요
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/about"
              className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
            >
              <SchoolIcon />
              <span>훈련기관 둘러보기</span>
              <ArrowForwardIcon />
            </Link>
            <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold border-2 border-blue-600 hover:bg-blue-50 transition-colors flex items-center justify-center space-x-2">
              <EditIcon />
              <span>교육 과정 등록</span>
            </button>
          </div>
        </div>
      </div>

      <div className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            플랫폼 특징
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
              <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <SchoolIcon className="text-white text-3xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                다양한 훈련기관
              </h3>
              <p className="text-gray-600">
                전국의 다양한 훈련기관 정보를 한 눈에 확인할 수 있습니다.
              </p>
            </div>
            
            <div className="text-center p-8 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
              <div className="bg-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUpIcon className="text-white text-3xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                체계적인 교육 과정
              </h3>
              <p className="text-gray-600">
                각 기관별 교육 과정과 커리큘럼을 상세히 제공합니다.
              </p>
            </div>
            
            <div className="text-center p-8 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
              <div className="bg-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <GroupIcon className="text-white text-3xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                팀 매칭 서비스
              </h3>
              <p className="text-gray-600">
                같은 관심사를 가진 사람들과 함께 학습할 수 있습니다.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-12">
            플랫폼 현황
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-gray-600">등록된 훈련기관</div>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="text-4xl font-bold text-green-600 mb-2">1,200+</div>
              <div className="text-gray-600">교육 과정</div>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="text-4xl font-bold text-purple-600 mb-2">10,000+</div>
              <div className="text-gray-600">수강생</div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-20 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            지금 바로 시작해보세요
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            다양한 훈련기관과 교육 과정을 탐색하고 당신의 성장을 시작하세요
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/about"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2"
            >
              <SchoolIcon />
              <span>훈련기관 보기</span>
            </Link>
            <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors flex items-center justify-center space-x-2">
              <GroupIcon />
              <span>팀 모집하기</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;