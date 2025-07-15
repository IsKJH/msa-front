import {Link} from 'react-router-dom';
import {useState} from 'react';
import {useAuth} from '../contexts/AuthContext';
import HomeIcon from '@mui/icons-material/Home';
import BookIcon from '@mui/icons-material/Book';
import SupportIcon from '@mui/icons-material/Support';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import SchoolIcon from '@mui/icons-material/School';
import LoginModal from './LoginModal';

function Header() {
    const {isAuthenticated, user, logout} = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        console.log('검색어:', searchTerm);
    };

    const openLoginModal = () => {
        setIsLoginModalOpen(true);
    };

    const closeLoginModal = () => {
        setIsLoginModalOpen(false);
    };

    const handleLogout = () => {
        logout();
        setIsMenuOpen(false);
        setIsUserDropdownOpen(false);
    };

    const toggleUserDropdown = () => {
        setIsUserDropdownOpen(!isUserDropdownOpen);
    };

    return (
        <header className="bg-white text-gray-800 shadow-lg border-b-2 border-blue-100">
            <div className="container mx-auto px-4 py-4">
                <div className="flex justify-between items-center">
                    <Link to="/" className="text-2xl font-bold text-blue-600 flex items-center space-x-2">
                        <HomeIcon className="text-3xl"/>
                        <span>MSA Front</span>
                    </Link>

                    <div className="hidden md:flex flex-1 max-w-md mx-8">
                        <form onSubmit={handleSearch} className="w-full relative">
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="검색하기..."
                                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"/>
                        </form>
                    </div>

                    <nav className="hidden md:flex">
                        <ul className="flex space-x-8 items-center">

                            <li>
                                <Link to="/institutions">
                                    <button
                                        className="flex items-center space-x-2 hover:text-blue-600 transition-colors font-medium">
                                        <SchoolIcon/>
                                        <span>훈련기관</span>
                                    </button>
                                </Link>
                            </li>
                            <li>
                                <Link to="/training">
                                    <button
                                        className="flex items-center space-x-2 hover:text-blue-600 transition-colors font-medium">
                                        <BookIcon/>
                                        <span>교육과정</span>
                                    </button>
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact">
                                    <button
                                        className="flex items-center space-x-2 hover:text-blue-600 transition-colors font-medium">
                                        <SupportIcon/>
                                        <span>문의하기</span>
                                    </button>
                                </Link>
                            </li>
                            {isAuthenticated ? (
                                <li className="relative">
                                    <button
                                        onClick={toggleUserDropdown}
                                        className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg"
                                    >
                                        <div
                                            className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                                            <AccountCircleIcon className="text-white"/>
                                        </div>
                                        <div className="text-sm">
                                            <div className="font-medium">{user?.nickname}</div>
                                        </div>
                                        <ExpandMoreIcon
                                            className={`transition-transform duration-200 ${isUserDropdownOpen ? 'rotate-180' : ''}`}/>
                                    </button>

                                    {isUserDropdownOpen && (
                                        <div
                                            className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                                            <div className="px-4 py-3 border-b border-gray-100">
                                                <div className="flex items-center space-x-3">
                                                    <div
                                                        className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                                                        <AccountCircleIcon className="text-white text-2xl"/>
                                                    </div>
                                                    <div>
                                                        <div
                                                            className="font-semibold text-gray-800">{user?.nickname}</div>
                                                        <div className="text-sm text-gray-500">{user?.company}</div>
                                                        <div
                                                            className="text-xs text-blue-600 font-medium">{user?.point}P
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="py-1">
                                                <button
                                                    className="w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors flex items-center space-x-3">
                                                    <PersonIcon className="text-gray-400"/>
                                                    <span className="text-gray-700">내 정보</span>
                                                </button>
                                                <button
                                                    className="w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors flex items-center space-x-3">
                                                    <SettingsIcon className="text-gray-400"/>
                                                    <span className="text-gray-700">설정</span>
                                                </button>
                                                <hr className="my-1 border-gray-100"/>
                                                <button
                                                    onClick={handleLogout}
                                                    className="w-full px-4 py-2 text-left hover:bg-red-50 transition-colors flex items-center space-x-3 text-red-600"
                                                >
                                                    <LogoutIcon className="text-red-500"/>
                                                    <span>로그아웃</span>
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </li>
                            ) : (
                                <li>
                                    <button
                                        onClick={openLoginModal}
                                        className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg">
                                        <LoginIcon/>
                                        <span>로그인</span>
                                    </button>
                                </li>
                            )}
                        </ul>
                    </nav>
                    <button
                        className="md:hidden p-2 hover:text-blue-600 transition-colors"
                        onClick={toggleMenu}
                    >
                        {isMenuOpen ? <CloseIcon className="text-3xl"/> : <MenuIcon className="text-3xl"/>}
                    </button>
                </div>

                {isMenuOpen && (
                    <div className="md:hidden mt-4 pb-4 border-t border-gray-200">
                        <nav className="pt-4 border-t border-gray-200">
                            <ul className="space-y-3">
                                {isAuthenticated ? (
                                    <>
                                        {/* 사용자 정보 카드 */}
                                        <li className="mb-4">
                                            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200 shadow-sm">
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-md">
                                                        <AccountCircleIcon className="text-white text-3xl"/>
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="font-bold text-gray-800 text-lg">{user?.nickname}</div>
                                                        <div className="text-sm text-gray-600 flex items-center space-x-2">
                                                            <span>{user?.company}</span>
                                                            <span>•</span>
                                                            <span className="text-blue-600 font-semibold">{user?.point}P</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        
                                        {/* 사용자 메뉴 */}
                                        <li>
                                            <button className="w-full flex items-center space-x-3 hover:bg-blue-50 transition-colors font-medium py-3 px-4 rounded-lg text-left">
                                                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                                    <PersonIcon className="text-blue-600 text-sm"/>
                                                </div>
                                                <span className="text-gray-700">내 정보</span>
                                            </button>
                                        </li>
                                        <li>
                                            <button className="w-full flex items-center space-x-3 hover:bg-blue-50 transition-colors font-medium py-3 px-4 rounded-lg text-left">
                                                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                                    <SettingsIcon className="text-blue-600 text-sm"/>
                                                </div>
                                                <span className="text-gray-700">설정</span>
                                            </button>
                                        </li>
                                        
                                        {/* 구분선 */}
                                        <li>
                                            <hr className="my-3 border-gray-200"/>
                                        </li>
                                        
                                        {/* 로그아웃 */}
                                        <li>
                                            <button
                                                onClick={handleLogout}
                                                className="w-full flex items-center space-x-3 hover:bg-red-50 transition-colors font-medium py-3 px-4 text-red-600 rounded-lg text-left">
                                                <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                                                    <LogoutIcon className="text-red-500 text-sm"/>
                                                </div>
                                                <span>로그아웃</span>
                                            </button>
                                        </li>
                                    </>
                                ) : (
                                    <>
                                        {/* 로그인 버튼 */}
                                        <li className="mb-4">
                                            <button
                                                onClick={openLoginModal}
                                                className="w-full flex items-center justify-center space-x-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-4 rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg font-semibold">
                                                <LoginIcon className="text-xl"/>
                                                <span>로그인</span>
                                            </button>
                                        </li>
                                    </>
                                )}
                                
                                {/* 구분선 */}
                                <li>
                                    <hr className="my-3 border-gray-200"/>
                                </li>
                                
                                {/* 일반 메뉴 */}
                                <li>
                                    <Link to="/institutions" onClick={toggleMenu}>
                                        <button className="w-full flex items-center space-x-3 hover:bg-gray-50 transition-colors font-medium py-3 px-4 rounded-lg text-left">
                                            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                                <SchoolIcon className="text-blue-600 text-sm"/>
                                            </div>
                                            <span className="text-gray-700">훈련기관</span>
                                        </button>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/training" onClick={toggleMenu}>
                                        <button className="w-full flex items-center space-x-3 hover:bg-gray-50 transition-colors font-medium py-3 px-4 rounded-lg text-left">
                                            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                                                <BookIcon className="text-green-600 text-sm"/>
                                            </div>
                                            <span className="text-gray-700">교육과정</span>
                                        </button>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/contact" onClick={toggleMenu}>
                                        <button className="w-full flex items-center space-x-3 hover:bg-gray-50 transition-colors font-medium py-3 px-4 rounded-lg text-left">
                                            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                                                <SupportIcon className="text-purple-600 text-sm"/>
                                            </div>
                                            <span className="text-gray-700">문의하기</span>
                                        </button>
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                )}
            </div>

            <LoginModal
                isOpen={isLoginModalOpen}
                onClose={closeLoginModal}
            />
        </header>
    );
}

export default Header;