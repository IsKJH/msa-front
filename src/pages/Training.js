import { useState, useEffect } from 'react';
import BookIcon from '@mui/icons-material/Book';
import BusinessIcon from '@mui/icons-material/Business';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CategoryIcon from '@mui/icons-material/Category';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import FilterListIcon from '@mui/icons-material/FilterList';
import ClearIcon from '@mui/icons-material/Clear';

function Training() {
  const [trainings, setTrainings] = useState([]);
  const [institutions, setInstitutions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNcsType, setSelectedNcsType] = useState('');
  const [selectedInstitutionType, setSelectedInstitutionType] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [trainingResponse, institutionResponse] = await Promise.all([
        fetch('http://localhost:8084/training'),
        fetch('http://localhost:8084/institutions')
      ]);

      if (!trainingResponse.ok || !institutionResponse.ok) {
        throw new Error('API 요청 실패');
      }

      const trainingData = await trainingResponse.json();
      const institutionData = await institutionResponse.json();

      setTrainings(trainingData.data || []);
      setInstitutions(institutionData.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getInstitutionById = (institutionId) => {
    return institutions.find(institution => institution.id === institutionId);
  };

  const filteredTrainings = trainings.filter(training => {
    const matchesSearch = training.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         training.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesNcsType = !selectedNcsType || training.ncsTypeDescription === selectedNcsType;
    const matchesInstitutionType = !selectedInstitutionType || 
                                  training.institutionName?.includes(selectedInstitutionType);
    
    return matchesSearch && matchesNcsType && matchesInstitutionType;
  });

  const uniqueNcsTypes = [...new Set(trainings.map(training => training.ncsTypeDescription).filter(Boolean))];
  const uniqueInstitutionTypes = [...new Set(trainings.map(training => training.institutionName).filter(Boolean))];

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedNcsType('');
    setSelectedInstitutionType('');
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
        <p className="mt-4 text-gray-600 text-lg">훈련 과정 정보를 불러오는 중...</p>
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
          <BookIcon className="text-5xl text-green-600" />
          <span>훈련 과정 정보</span>
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          다양한 분야의 훈련 과정을 확인하고 원하는 교육을 선택하세요
        </p>
        
        <div className="max-w-4xl mx-auto mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div className="md:col-span-2 relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="과정명 또는 설명으로 검색..."
                className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>

            <div className="relative">
              <select
                value={selectedNcsType}
                onChange={(e) => setSelectedNcsType(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none"
              >
                <option value="">모든 분야</option>
                {uniqueNcsTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              <CategoryIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>

            <div className="relative">
              <select
                value={selectedInstitutionType}
                onChange={(e) => setSelectedInstitutionType(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none"
              >
                <option value="">모든 기관</option>
                {uniqueInstitutionTypes.map(name => (
                  <option key={name} value={name}>{name}</option>
                ))}
              </select>
              <BusinessIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <div className="flex justify-center space-x-4">
            <button
              onClick={clearFilters}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <ClearIcon />
              <span>필터 초기화</span>
            </button>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <FilterListIcon />
              <span>총 {filteredTrainings.length}개 과정</span>
            </div>
          </div>
        </div>

        <div className="flex justify-center space-x-8 mb-8">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{trainings.length}</div>
            <div className="text-sm text-gray-600">전체 과정</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{uniqueNcsTypes.length}</div>
            <div className="text-sm text-gray-600">교육 분야</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{filteredTrainings.length}</div>
            <div className="text-sm text-gray-600">검색 결과</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 items-start">
        {filteredTrainings.map((training) => {
          const institution = getInstitutionById(training.institutionId);
          
          return (
            <div 
              key={training.id} 
              className="bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden h-fit"
            >
              <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4">
                <h3 className="text-xl font-bold flex items-center space-x-2">
                  <BookIcon />
                  <span>{training.name}</span>
                </h3>
                {training.ncsTypeDescription && (
                  <p className="text-green-100 text-sm mt-1 flex items-center space-x-1">
                    <CategoryIcon className="text-sm" />
                    <span>{training.ncsTypeDescription}</span>
                  </p>
                )}
              </div>

              <div className="p-4">
                <div className="space-y-3">
                  {training.institutionName && (
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <BusinessIcon className="text-blue-600" />
                        <span className="font-semibold text-blue-800">{training.institutionName}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-600 ml-6">
                        <AccessTimeIcon className="text-xs" />
                        <span className="text-xs">
                          {training.startDate} ~ {training.endDate}
                        </span>
                      </div>
                    </div>
                  )}

                  {training.description && (
                    <div className="text-gray-700 text-sm">
                      <p className="line-clamp-3">{training.description}</p>
                    </div>
                  )}

                  {training.period && (
                    <div className="flex items-center space-x-2 text-gray-600">
                      <AccessTimeIcon className="text-sm" />
                      <span className="text-sm">교육 기간: {training.period}개월</span>
                    </div>
                  )}

                  <div className="pt-3 border-t border-gray-200">
                    <div className="flex flex-wrap gap-2">
                      {training.ncsTypeDescription && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                          <CategoryIcon className="text-xs mr-1" />
                          {training.ncsTypeDescription}
                        </span>
                      )}
                      {training.institutionName && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                          <BusinessIcon className="text-xs mr-1" />
                          {training.institutionName}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredTrainings.length === 0 && (
        <div className="text-center py-12">
          <BookIcon className="text-6xl text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">
            {searchTerm || selectedNcsType || selectedInstitutionType 
              ? '검색 조건에 맞는 훈련 과정이 없습니다.' 
              : '등록된 훈련 과정이 없습니다.'
            }
          </p>
          {(searchTerm || selectedNcsType || selectedInstitutionType) && (
            <button
              onClick={clearFilters}
              className="mt-4 text-green-600 hover:text-green-800 flex items-center space-x-1 mx-auto"
            >
              <ClearIcon />
              <span>필터 초기화</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default Training;