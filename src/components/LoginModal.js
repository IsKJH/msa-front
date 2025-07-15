import {useState, useEffect} from 'react';
import api from '../utils/api';
import {useAuth} from '../contexts/AuthContext';
import LoginIcon from '@mui/icons-material/Login';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import CloseIcon from '@mui/icons-material/Close';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import SearchIcon from '@mui/icons-material/Search';
import SchoolIcon from '@mui/icons-material/School';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function LoginModal({isOpen, onClose}) {
    const {login} = useAuth();
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const [nickName, setNickName] = useState('');
    const [trainingId, setTrainingId] = useState();
    const [loading, setLoading] = useState(false);
    const [trainings, setTrainings] = useState([]);
    const [trainingSearch, setTrainingSearch] = useState('');
    const [isTrainingDropdownOpen, setIsTrainingDropdownOpen] = useState(false);
    const [selectedTraining, setSelectedTraining] = useState(null);

    useEffect(() => {
        if (isSignUp) {
            fetchTrainings();
        }
    }, [isSignUp]);

    useEffect(() => {
        if (isOpen) {
            resetModal();
        }
    }, [isOpen]);

    const fetchTrainings = async () => {
        try {
            const response = await api.get('information/training');
            setTrainings(response.data || []);
        } catch (error) {
            console.error('교육 과정 데이터 가져오기 실패:', error);
        }
    };

    const filteredTrainings = trainings.filter(training =>
        training.name?.toLowerCase().includes(trainingSearch.toLowerCase()) ||
        training.institutionName?.toLowerCase().includes(trainingSearch.toLowerCase()) ||
        training.ncsTypeDescription?.toLowerCase().includes(trainingSearch.toLowerCase())
    );

    const selectTraining = (training) => {
        setSelectedTraining(training);
        setTrainingId(training.id);
        setIsTrainingDropdownOpen(false);
        setTrainingSearch('');
    };

    const resetModal = () => {
        setId('');
        setPassword('');
        setShowPassword(false);
        setRememberMe(false);
        setIsSignUp(false);
        setNickName('');
        setTrainingId(null);
        setSelectedTraining(null);
        setTrainingSearch('');
        setIsTrainingDropdownOpen(false);
        setLoading(false);
        setTrainings([]);
    };

    const fetchLogin = async () => {
        setLoading(true);
        try {
            const getToken = await api.post('account/login', {
                userId: id,
                password: password
            });

            console.log('로그인 성공:', getToken.userToken);

            // 토큰을 임시 저장 (rememberMe에 따라)
            if (rememberMe) {
                localStorage.setItem('authToken', getToken.userToken);
                localStorage.setItem('rememberMe', 'true');
            } else {
                sessionStorage.setItem('authToken', getToken.userToken);
                localStorage.setItem('rememberMe', 'false');
            }

            // 토큰으로 사용자 정보 가져오기
            try {
                const userData = await api.get('account/me');
                console.log('사용자 정보:', userData);

                // AuthContext에 토큰과 사용자 정보 저장
                login(getToken.userToken, userData, rememberMe);
                resetModal();
                onClose();
            } catch (userInfoError) {
                console.error('사용자 정보 가져오기 실패:', userInfoError);
                // 토큰은 받았지만 사용자 정보 요청 실패 시 저장소에서 토큰 제거
                localStorage.removeItem('authToken');
                sessionStorage.removeItem('authToken');
                localStorage.removeItem('rememberMe');
                throw new Error('사용자 정보를 가져올 수 없습니다. 다시 시도해주세요.');
            }
        } catch (err) {
            console.error('로그인 오류:', err.message);
            alert(err.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchRegister = async () => {
        setLoading(true);
        try {
            if (!trainingId) {
                alert('교육 과정을 선택해주세요.');
                return;
            }
            
            const response = await api.post('account/register', {
                userId: id,
                password: password,
                nickname: nickName,
                trainingId: trainingId
            });
            
            console.log('회원가입 성공:', response);
            alert('회원가입이 완료되었습니다!');
            
            // 회원가입 완료 후 초기화 및 로그인 모드로 전환
            resetModal();
        } catch (err) {
            console.error('회원가입 오류:', err.message);
            alert(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('로그인 시도:', {id, password, nickName, isSignUp});
        if (isSignUp) {
            fetchRegister();
        } else {
            fetchLogin();
        }
    };

    if (!isOpen) return null;

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
                <p className="mt-4 text-gray-600 text-lg">로그인 중....</p>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
                className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
                onClick={onClose}
            />

            <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-t-lg">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                            <LoginIcon className="text-2xl"/>
                            <h2 className="text-2xl font-bold">
                                {isSignUp ? '회원가입' : '로그인'}
                            </h2>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-white hover:text-gray-200 transition-colors"
                        >
                            <CloseIcon/>
                        </button>
                    </div>
                    <p className="text-blue-100 mt-2">
                        {isSignUp
                            ? '훈련기관 플랫폼에 가입하여 다양한 교육 과정을 탐색하세요'
                            : '훈련기관 플랫폼에 로그인하여 더 많은 정보를 확인하세요'
                        }
                    </p>
                </div>

                <div className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {isSignUp && (
                            <>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        닉네임
                                    </label>
                                    <div className="relative">
                                        <PersonIcon
                                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"/>
                                        <input
                                            type="text"
                                            value={nickName}
                                            onChange={(e) => setNickName(e.target.value)}
                                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="닉네임을 입력하세요"
                                            required={isSignUp}
                                        />
                                    </div>
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        교육 과정 선택 <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <button
                                            type="button"
                                            onClick={() => setIsTrainingDropdownOpen(!isTrainingDropdownOpen)}
                                            className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-left bg-white"
                                        >
                                            <SchoolIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"/>
                                            <span className={selectedTraining ? 'text-gray-900' : 'text-gray-500'}>
                                                {selectedTraining ? selectedTraining.name : '교육 과정을 선택하세요'}
                                            </span>
                                            <ExpandMoreIcon className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 transition-transform ${isTrainingDropdownOpen ? 'rotate-180' : ''}`} />
                                        </button>
                                        
                                        {isTrainingDropdownOpen && (
                                            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-hidden">
                                                <div className="p-3 border-b border-gray-200">
                                                    <div className="relative">
                                                        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                                        <input
                                                            type="text"
                                                            value={trainingSearch}
                                                            onChange={(e) => setTrainingSearch(e.target.value)}
                                                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                            placeholder="교육 과정 검색..."
                                                        />
                                                    </div>
                                                </div>
                                                
                                                <div className="max-h-40 overflow-y-auto">
                                                    {filteredTrainings.length > 0 ? (
                                                        filteredTrainings.map((training) => (
                                                            <button
                                                                key={training.id}
                                                                type="button"
                                                                onClick={() => selectTraining(training)}
                                                                className="w-full px-4 py-3 text-left hover:bg-blue-50 transition-colors border-b border-gray-100 last:border-b-0"
                                                            >
                                                                <div className="font-medium text-gray-800">{training.name}</div>
                                                                <div className="text-sm text-gray-500 flex items-center space-x-2">
                                                                    <span>{training.institutionName}</span>
                                                                    {training.ncsTypeDescription && (
                                                                        <>
                                                                            <span>•</span>
                                                                            <span>{training.ncsTypeDescription}</span>
                                                                        </>
                                                                    )}
                                                                </div>
                                                            </button>
                                                        ))
                                                    ) : (
                                                        <div className="px-4 py-3 text-gray-500 text-center">
                                                            {trainings.length === 0 ? '교육 과정을 불러오는 중...' : '검색 결과가 없습니다'}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                아이디
                            </label>
                            <div className="relative">
                                <PersonIcon
                                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"/>
                                <input
                                    type="text"
                                    value={id}
                                    onChange={(e) => setId(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="아이디를 입력하세요"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                비밀번호
                            </label>
                            <div className="relative">
                                <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"/>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="비밀번호를 입력하세요"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? <VisibilityOffIcon/> : <VisibilityIcon/>}
                                </button>
                            </div>
                        </div>

                        {!isSignUp && (
                            <div className="flex items-center">
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                    />
                                    <span className="text-sm text-gray-700">로그인 상태 유지</span>
                                </label>
                            </div>
                        )}

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                        >
                            <LoginIcon/>
                            <span>{isSignUp ? '회원가입' : '로그인'}</span>
                        </button>
                    </form>

                    <div className="mt-6 text-center">
            <span className="text-sm text-gray-600">
              {isSignUp ? '이미 계정이 있으신가요?' : '아직 계정이 없으신가요?'}
            </span>
                        <button
                            type="button"
                            onClick={() => setIsSignUp(!isSignUp)}
                            className="ml-2 text-sm text-blue-600 hover:text-blue-800 font-medium"
                        >
                            {isSignUp ? '로그인' : '회원가입'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginModal;