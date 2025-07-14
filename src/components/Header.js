import {Link} from 'react-router-dom';
import {useState} from 'react';
import HomeIcon from '@mui/icons-material/Home';
import EditIcon from '@mui/icons-material/Edit';
import GroupIcon from '@mui/icons-material/Group';
import LoginIcon from '@mui/icons-material/Login';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import ArticleIcon from '@mui/icons-material/Article';
import LoginModal from './LoginModal';

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

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
                                <button
                                    className="flex items-center space-x-2 hover:text-blue-600 transition-colors font-medium">
                                    <EditIcon/>
                                    <span>글쓰기</span>
                                </button>
                            </li>
                            <li>
                                <button
                                    className="flex items-center space-x-2 hover:text-blue-600 transition-colors font-medium">
                                    <GroupIcon/>
                                    <span>팀모집</span>
                                </button>
                            </li>
                            <li>
                                <Link to="/about">
                                    <button
                                        className="flex items-center space-x-2 hover:text-blue-600 transition-colors font-medium">
                                        <ArticleIcon/>
                                        <span>소개</span>
                                    </button>
                                </Link>

                            </li>
                            <li>
                                <button
                                    onClick={openLoginModal}
                                    className="flex items-center space-x-2 text-black py-2 rounded-lg hover:bg-gray-200 transition-colors">
                                    <LoginIcon/>
                                    <span>로그인</span>
                                </button>
                            </li>
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
                        <div className="pt-4 pb-4">
                            <form onSubmit={handleSearch} className="relative">
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="검색하기..."
                                    className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                <SearchIcon
                                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"/>
                            </form>
                        </div>
                        <nav className="pt-4 border-t border-gray-200">
                            <ul className="space-y-4">
                                <li>
                                    <Link
                                        to="/about"
                                        className="flex items-center space-x-3 hover:text-blue-600 transition-colors font-medium py-2"
                                        onClick={toggleMenu}
                                    >
                                        <EditIcon/>
                                        <span>글쓰기</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/contact"
                                        className="flex items-center space-x-3 hover:text-blue-600 transition-colors font-medium py-2"
                                        onClick={toggleMenu}
                                    >
                                        <GroupIcon/>
                                        <span>팀모집</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/about">
                                        <button
                                            className="flex items-center space-x-3 hover:text-blue-600 transition-colors font-medium py-2">
                                            <ArticleIcon/>
                                            <span>소개</span>
                                        </button>
                                    </Link>
                                </li>
                                <li>
                                    <button
                                        onClick={openLoginModal}
                                        className="flex items-center space-x-3 hover:text-blue-600 transition-colors font-medium py-2">
                                        <LoginIcon/>
                                        <span>로그인</span>
                                    </button>
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