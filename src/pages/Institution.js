import { useState, useEffect } from 'react';
import api from '../utils/api';
import SchoolIcon from '@mui/icons-material/School';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import WebIcon from '@mui/icons-material/Web';
import BusinessIcon from '@mui/icons-material/Business';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import TrainingModal from '../components/TrainingModal';

function Institution() {
  const [institutions, setInstitutions] = useState([]);
  const [trainings, setTrainings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedInstitutions, setSelectedInstitutions] = useState(new Set());
  const [selectedTraining, setSelectedTraining] = useState(null);
  const [isTrainingModalOpen, setIsTrainingModalOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [institutionData, trainingData] = await Promise.all([
        api.get('information/institutions'),
        api.get('information/training')
      ]);

      setInstitutions(institutionData.data || []);
      setTrainings(trainingData.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredInstitutions = institutions.filter(institution =>
    institution.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    institution.address?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getTrainingsByInstitution = (institutionId) => {
    return trainings.filter(training => training.institutionId === institutionId);
  };

  const toggleInstitution = (institutionId) => {
    setSelectedInstitutions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(institutionId)) {
        newSet.delete(institutionId);
      } else {
        newSet.add(institutionId);
      }
      return newSet;
    });
  };

  const openTrainingModal = (training) => {
    setSelectedTraining(training);
    setIsTrainingModalOpen(true);
  };

  const closeTrainingModal = () => {
    setSelectedTraining(null);
    setIsTrainingModalOpen(false);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
        <p className="mt-4 text-gray-600 text-lg">훈련기관 정보를 불러오는 중...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center max-w-md mx-auto">
        <div className="bg-red-50 p-8 rounded-lg border border-red-200">
          <h2 className="text-xl font-semibold text-red-800 mb-3">오류 발생</h2>
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={fetchData}
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2 mx-auto"
          >
            <RefreshIcon />
            <span>다시 시도</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4 flex items-center justify-center space-x-3">
          <SchoolIcon className="text-5xl text-blue-600" />
          <span>훈련기관 정보</span>
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          다양한 훈련기관의 정보를 확인하고 원하는 기관을 찾아보세요
        </p>
        
        <div className="max-w-md mx-auto relative mb-6">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="기관명 또는 주소로 검색..."
            className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>

        <div className="flex justify-center space-x-8 mb-8">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{institutions.length}</div>
            <div className="text-sm text-gray-600">등록된 기관</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{trainings.length}</div>
            <div className="text-sm text-gray-600">훈련 과정</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{filteredInstitutions.length}</div>
            <div className="text-sm text-gray-600">검색 결과</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 items-start">
        {filteredInstitutions.map((institution) => {
          const institutionTrainings = getTrainingsByInstitution(institution.id);
          
          return (
            <div 
              key={institution.id} 
              className="bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden h-fit"
            >
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4">
                <h3 className="text-xl font-bold flex items-center space-x-2">
                  <BusinessIcon />
                  <span>{institution.name}</span>
                </h3>
                {institution.institutionTypeDescription && (
                  <p className="text-blue-100 text-sm mt-1">
                    {institution.institutionTypeDescription}
                  </p>
                )}
              </div>

              <div className="p-4">
                <div className="space-y-3">
                  {institution.address && (
                    <div className="flex items-start space-x-3">
                      <LocationOnIcon className="text-gray-500 mt-1 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{institution.address}</span>
                    </div>
                  )}
                  
                  {institution.phoneNumber && (
                    <div className="flex items-center space-x-3">
                      <PhoneIcon className="text-gray-500 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{institution.phoneNumber}</span>
                    </div>
                  )}
                  
                  {institution.email && (
                    <div className="flex items-center space-x-3">
                      <EmailIcon className="text-gray-500 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{institution.email}</span>
                    </div>
                  )}
                  
                  {institution.website && (
                    <div className="flex items-center space-x-3">
                      <WebIcon className="text-gray-500 flex-shrink-0" />
                      <a 
                        href={institution.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 text-sm truncate"
                      >
                        {institution.website}
                      </a>
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      훈련 과정: <span className="font-semibold text-blue-600">{institutionTrainings.length}개</span>
                    </span>
                    <button
                      onClick={() => toggleInstitution(institution.id)}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      {selectedInstitutions.has(institution.id) ? '접기' : '자세히 보기'}
                    </button>
                  </div>
                </div>

                {selectedInstitutions.has(institution.id) && institutionTrainings.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-gray-200">
                    <h4 className="font-semibold text-gray-800 mb-2">훈련 과정</h4>
                    <div className="space-y-2">
                      {institutionTrainings.map((training) => (
                        <div key={training.id} className="bg-gray-50 p-3 rounded-md hover:bg-gray-100 transition-colors cursor-pointer" onClick={() => openTrainingModal(training)}>
                          <div className="font-medium text-gray-800">{training.title}</div>
                          {training.ncsTypeDescription && (
                            <div className="text-sm text-gray-600 mt-1">
                              분야: {training.ncsTypeDescription}
                            </div>
                          )}
                          {training.duration && (
                            <div className="text-sm text-gray-600">
                              기간: {training.duration}
                            </div>
                          )}
                          <div className="text-xs text-blue-600 mt-2">
                            클릭하여 상세 정보 보기
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {filteredInstitutions.length === 0 && (
        <div className="text-center py-12">
          <SchoolIcon className="text-6xl text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">
            {searchTerm ? '검색 결과가 없습니다.' : '등록된 훈련기관이 없습니다.'}
          </p>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="mt-4 text-blue-600 hover:text-blue-800"
            >
              검색 초기화
            </button>
          )}
        </div>
      )}

      <TrainingModal
        isOpen={isTrainingModalOpen}
        onClose={closeTrainingModal}
        training={selectedTraining}
      />
    </div>
  );
}

export default Institution;