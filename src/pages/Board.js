import {useState, useEffect, useRef} from 'react';
import api from '../utils/api';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CloseIcon from '@mui/icons-material/Close';

function Board() {
    const [boards, setBoards] = useState([]);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [showWriteForm, setShowWriteForm] = useState(false);
    const [newPost, setNewPost] = useState({
        title: '', content: '', category: '', boardId: ''
    });
    const [submitting, setSubmitting] = useState(false);
    const [editingPost, setEditingPost] = useState(null);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [submittingComment, setSubmittingComment] = useState(false);
    const scrollRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [activeIndex, setActiveIndex] = useState(0);

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.pageX - scrollRef.current.offsetLeft);
        setScrollLeft(scrollRef.current.scrollLeft);
    };

    const handleMouseLeave = () => {
        setIsDragging(false);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - scrollRef.current.offsetLeft;
        const walk = (x - startX) * 2; // 스크롤 속도 조절
        scrollRef.current.scrollLeft = scrollLeft - walk;
    };

    const categories = [
        {value: 'FREE', label: '자유게시판'},
        {value: 'COURSE', label: '훈련과정'},
        {value: 'LIFE', label: '일상공유'},
        {value: 'MIND', label: '정신치료·심리상담'},
        {value: 'EMPLOYMENT', label: '채용해요'},
        {value: 'COMPANYLIFE', label: '회사생활'},
        {value: 'TRAVEL', label: '여행'},
        {value: 'SPORT', label: '스포츠'},
        {value: 'WEB', label: '웹개발'},
        {value: 'CLOUD', label: '클라우드'},
        {value: 'DATAAI', label: '데이터,AI'},
        {value: 'GAME', label: '게임,블록체인'}
    ];

    useEffect(() => {
        fetchBoards();
    }, []);

    useEffect(() => {
        if (boards.length > 0 && activeIndex < boards.length) {
            fetchPosts(boards[activeIndex].id);
        }
    }, [boards, activeIndex]);


    const fetchBoards = async () => {
        setLoading(true);
        try {
            const response = await api.get('board');
            setBoards(response);
        } finally {
            setLoading(false);
        }
    };

    const fetchPosts = async (boardId) => {
        try {
            const response = await api.get(`board/posts/board/${boardId}`);
            setPosts(response);
        } catch (error) {
            console.error('Failed to fetch posts:', error);
        }
    };

    const filteredPosts = posts.filter(post =>
        post.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSubmitPost = async () => {
        if (!newPost.title.trim() || !newPost.content.trim() || !newPost.category) {
            alert('모든 필드를 입력해주세요.');
            return;
        }

        setSubmitting(true);
        try {
            await api.post('board/posts/create', {
                title: newPost.title,
                content: newPost.content,
                category: newPost.category,
                boardId: boards[activeIndex]?.id
            });

            setNewPost({title: '', content: '', category: '', boardId: ''});
            setShowWriteForm(false);
            setEditingPost(null);
            if (boards.length > 0) {
                await fetchPosts(boards[activeIndex].id);
            }
        } catch (error) {
            console.error('Failed to submit post:', error);
            alert('게시글 작성에 실패했습니다.');
        } finally {
            setSubmitting(false);
        }
    };

    const handleViewDetail = async (postId) => {
        try {
            const response = await api.get(`board/posts/${postId}`);
            setSelectedPost(response);
            await fetchComments(postId);
            setShowDetailModal(true);
        } catch (error) {
            console.error('Failed to fetch post detail:', error);
            alert('게시글 상세 정보를 불러오는데 실패했습니다.');
        }
    };

    const fetchComments = async (postId) => {
        try {
            const response = await api.get(`board/comments/post/${postId}`);
            setComments(response || []);
        } catch (error) {
            console.error('Failed to fetch comments:', error);
        }
    };

    const handleSubmitComment = async () => {
        if (!newComment.trim()) {
            alert('댓글 내용을 입력해주세요.');
            return;
        }

        setSubmittingComment(true);
        try {
            await api.post('board/comments/create', {
                content: newComment,
                postId: selectedPost.id
            });

            setNewComment('');
            await fetchComments(selectedPost.id);
        } catch (error) {
            console.error('Failed to submit comment:', error);
            alert('댓글 등록에 실패했습니다.');
        } finally {
            setSubmittingComment(false);
        }
    };

    const handleCancelEdit = () => {
        setEditingPost(null);
        setNewPost({title: '', content: '', category: '', boardId: ''});
        setShowWriteForm(false);
    };

    if (loading) {
        return (<div className="flex flex-col items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600 text-lg">질문 목록을 불러오는 중...</p>
        </div>);
    }


    return (<div className="min-h-screen bg-gray-50">
        <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between px-4 py-3">
                    <div className="flex items-center space-x-4">
                        <h1 className="text-xl font-bold text-gray-900">{boards[activeIndex].title}</h1>
                        <div className="hidden md:flex items-center space-x-2">
                            <span className="text-sm text-gray-500">전체 {posts.length}개</span>
                        </div>
                    </div>
                    <button
                        onClick={() => setShowWriteForm(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                        글쓰기
                    </button>
                </div>

                {/* 카테고리 탭 */}
                <div
                    ref={scrollRef}
                    className="overflow-x-auto whitespace-nowrap px-4 py-2 cursor-grab active:cursor-grabbing select-none"
                    style={{
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                    }}
                    onMouseDown={handleMouseDown}
                    onMouseLeave={handleMouseLeave}
                    onMouseUp={handleMouseUp}
                    onMouseMove={handleMouseMove}
                >
                    {boards.map((board, idx) => {
                        const isActive = idx === activeIndex;
                        return (<button
                            key={idx}
                            onClick={(e) => {
                                setActiveIndex(idx);
                                if (boards[idx]?.id) {
                                    fetchPosts(boards[idx].id);
                                }
                            }}
                            className={`inline-block px-4 py-2 mx-1 text-sm font-medium rounded-full transition-colors
                              ${isActive ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
                            `}>{board.title}
                        </button>);
                    })}
                </div>
            </div>
        </div>
        {/* 검색 영역 */}
        <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="relative">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="검색어를 입력하세요"
                    className="w-full px-4 py-3 pl-12 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"/>
            </div>
        </div>

        {/* 게시글 목록 */}
        <div className="max-w-7xl mx-auto px-4">

            {showWriteForm && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                        <div
                            className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-xl">
                            <h3 className="text-xl font-bold text-gray-900">
                                {editingPost ? '게시글 수정' : '글쓰기'}
                            </h3>
                            <button
                                onClick={handleCancelEdit}
                                className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100 transition-colors"
                            >
                                <CloseIcon/>
                            </button>
                        </div>

                        <div className="p-6">
                            <div className="space-y-5">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">카테고리</label>
                                    <select
                                        value={newPost.category}
                                        onChange={(e) => setNewPost({...newPost, category: e.target.value})}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                                    >
                                        <option value="">카테고리를 선택해주세요</option>
                                        {categories.map(category => (
                                            <option key={category.value}
                                                    value={category.value}>{category.label}</option>))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">제목</label>
                                    <input
                                        type="text"
                                        value={newPost.title}
                                        onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                                        placeholder="제목을 입력해주세요"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">내용</label>
                                    <textarea
                                        value={newPost.content}
                                        onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                                        placeholder="내용을 입력해주세요"
                                        rows="8"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white resize-none"
                                    />
                                </div>

                                <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                                    <button
                                        onClick={handleCancelEdit}
                                        className="px-6 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
                                    >
                                        취소
                                    </button>
                                    <button
                                        onClick={handleSubmitPost}
                                        disabled={submitting}
                                        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
                                    >
                                        {submitting ? (editingPost ? '수정 중...' : '등록 중...') : (editingPost ? '수정하기' : '등록하기')}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>)}

            <div className="space-y-0">
                {filteredPosts.map((post, index) => (<div
                    key={post.id}
                    className={`bg-white border-b border-gray-200 hover:bg-gray-50 transition-colors duration-150 cursor-pointer ${index === 0 ? 'border-t' : ''}`}
                    onClick={() => handleViewDetail(post.id)}
                >
                    <div className="px-6 py-4">
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-2">
                                    {post.category && (
                                        <span
                                            className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded">
                                            {categories.find(cat => cat.value === post.category)?.label || post.category}
                                        </span>
                                    )}
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 leading-tight">
                                    {post.title}
                                </h3>
                                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                                    {post.content}
                                </p>
                                <div className="flex items-center space-x-4 text-xs text-gray-500">
                                    <div className="flex items-center space-x-1">
                                        <PersonIcon className="w-3 h-3"/>
                                        <span>익명</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <VisibilityIcon className="w-3 h-3"/>
                                        <span>{post.viewCount || 0}</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <ChatBubbleOutlineIcon className="w-3 h-3"/>
                                        <span>{post.recommendCount || 0}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>))}
            </div>

            {filteredPosts.length === 0 && (
                <div className="bg-white border-t border-gray-200 text-center py-16">
                    <QuestionAnswerIcon className="text-6xl text-gray-300 mx-auto mb-4"/>
                    <p className="text-gray-500 text-lg mb-4">
                        {searchTerm ? '검색 조건에 맞는 게시글이 없습니다.' : '아직 등록된 게시글이 없습니다.'}
                    </p>
                    {!searchTerm && (
                        <button
                            onClick={() => setShowWriteForm(true)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                        >
                            첫 게시글 작성하기
                        </button>
                    )}
                </div>
            )}
        </div>

        {showDetailModal && selectedPost && (
            <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                    <div
                        className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-xl">
                        <div className="flex items-center space-x-3">
                            <button
                                onClick={() => {
                                    setShowDetailModal(false);
                                    setComments([]);
                                    setNewComment('');
                                    if (boards.length > 0) {
                                        fetchPosts(boards[activeIndex].id);
                                    }
                                }}
                                className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100 transition-colors"
                            >
                                <CloseIcon/>
                            </button>
                            <h2 className="text-xl font-bold text-gray-900">게시글</h2>
                        </div>
                    </div>

                    <div className="p-6">
                        {/* 게시글 헤더 */}
                        <div className="mb-6">
                            <div className="flex items-center space-x-2 mb-3">
                                {selectedPost.category && (
                                    <span
                                        className="inline-block px-3 py-1 text-sm font-medium bg-gray-100 text-gray-700 rounded-full">
                                        {categories.find(cat => cat.value === selectedPost.category)?.label || selectedPost.category}
                                    </span>
                                )}
                            </div>
                            <h1 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">{selectedPost.title}</h1>

                            <div
                                className="flex items-center space-x-4 text-sm text-gray-500 pb-4 border-b border-gray-200">
                                <div className="flex items-center space-x-1">
                                    <PersonIcon className="w-4 h-4"/>
                                    <span className="font-medium">익명</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <VisibilityIcon className="w-4 h-4"/>
                                    <span>조회 {selectedPost.viewCount || 0}</span>
                                </div>
                            </div>
                        </div>

                        {/* 게시글 내용 */}
                        <div className="mb-8">
                            <div className="text-gray-800 whitespace-pre-wrap leading-relaxed text-base">
                                {selectedPost.content}
                            </div>
                        </div>

                        {/* 댓글 영역 */}
                        <div className="border-t border-gray-200 pt-6">
                            <div className="mb-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">댓글 {comments.length}개</h3>

                                {/* 댓글 작성 폼 */}
                                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                                    <textarea
                                        value={newComment}
                                        onChange={(e) => setNewComment(e.target.value)}
                                        placeholder="댓글을 입력해주세요"
                                        rows="3"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none bg-white"
                                    />
                                    <div className="flex justify-end mt-3">
                                        <button
                                            onClick={handleSubmitComment}
                                            disabled={submittingComment || !newComment.trim()}
                                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                                        >
                                            {submittingComment ? '등록 중...' : '댓글 등록'}
                                        </button>
                                    </div>
                                </div>

                                {/* 댓글 목록 */}
                                <div className="space-y-3">
                                    {comments.map((comment, index) => (
                                        <div key={comment.id}
                                             className={`bg-white border border-gray-200 rounded-lg p-4 ${index === 0 ? '' : ''}`}>
                                            <div className="flex items-start justify-between mb-2">
                                                <div className="flex items-center space-x-2 text-sm text-gray-600">
                                                    <PersonIcon className="w-4 h-4"/>
                                                    <span
                                                        className="font-medium text-gray-900">{comment.user?.nickname || '익명'}</span>
                                                    <span className="text-gray-400">•</span>
                                                </div>
                                            </div>
                                            <div className="text-gray-800 whitespace-pre-wrap leading-relaxed">
                                                {comment.content}
                                            </div>

                                        </div>
                                    ))}

                                    {comments.length === 0 && (
                                        <div
                                            className="text-center py-8 text-gray-500 bg-white border border-gray-200 rounded-lg">
                                            아직 댓글이 없습니다. 첫 번째 댓글을 작성해보세요!
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="flex justify-end">
                                <button
                                    onClick={() => {
                                        setShowDetailModal(false);
                                        setComments([]);
                                        setNewComment('');
                                        if (boards.length > 0) {
                                            fetchPosts(boards[activeIndex].id);
                                        }
                                    }}
                                    className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                                >
                                    닫기
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>)}
    </div>);
}

export default Board;