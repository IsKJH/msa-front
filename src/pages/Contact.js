import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SendIcon from '@mui/icons-material/Send';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-white bg-opacity-20 p-4 rounded-full">
              <SupportAgentIcon className="text-5xl text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            문의하기
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            궁금한 점이 있으시면 언제든지 연락주세요. 빠른 시간 내에 답변 드리겠습니다.
          </p>
        </div>
      </div>

      {/* Contact Info & Form */}
      <div className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-8">연락처 정보</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <EmailIcon className="text-blue-600 text-2xl" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">이메일</h3>
                    <p className="text-gray-600">info@trainingplatform.com</p>
                    <p className="text-sm text-gray-500">24시간 이내 답변</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <PhoneIcon className="text-green-600 text-2xl" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">전화번호</h3>
                    <p className="text-gray-600">02-1234-5678</p>
                    <p className="text-sm text-gray-500">평일 9:00 - 18:00</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <LocationOnIcon className="text-purple-600 text-2xl" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">주소</h3>
                    <p className="text-gray-600">서울특별시 강남구 테헤란로 123</p>
                    <p className="text-sm text-gray-500">직접 방문 가능</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-orange-100 p-3 rounded-lg">
                    <AccessTimeIcon className="text-orange-600 text-2xl" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">운영시간</h3>
                    <p className="text-gray-600">평일: 9:00 - 18:00</p>
                    <p className="text-gray-600">주말: 10:00 - 16:00</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-8">메시지 보내기</h2>
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    이름 *
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="이름을 입력하세요"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    이메일 *
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="이메일을 입력하세요"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    전화번호
                  </label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="전화번호를 입력하세요"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    제목 *
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="제목을 입력하세요"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    메시지 *
                  </label>
                  <textarea
                    rows="5"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="메시지를 입력하세요"
                    required
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 flex items-center justify-center space-x-2 shadow-md transform hover:scale-105"
                >
                  <SendIcon />
                  <span>메시지 보내기</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">자주 묻는 질문</h2>
            <p className="text-lg text-gray-600">많은 분들이 궁금해하는 질문들을 모았습니다</p>
          </div>
          
          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">회원가입은 어떻게 하나요?</h3>
              <p className="text-gray-600">홈페이지 우측 상단의 '로그인' 버튼을 클릭하고 '회원가입' 탭을 선택하여 가입할 수 있습니다.</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">교육 과정은 어떻게 신청하나요?</h3>
              <p className="text-gray-600">원하는 교육 과정을 선택하고 상세 정보를 확인한 후 신청 버튼을 클릭하면 됩니다.</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">취소 및 환불 정책은 어떻게 되나요?</h3>
              <p className="text-gray-600">교육 시작일 3일 전까지 취소 시 전액 환불, 이후에는 정책에 따라 부분 환불이 가능합니다.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;