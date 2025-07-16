import {useState, useEffect} from 'react';
import api from '../utils/api';
import { useAuth } from '../contexts/AuthContext';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import PersonIcon from '@mui/icons-material/Person';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CloseIcon from '@mui/icons-material/Close';

function QNA() {
    const { isAuthenticated, user } = useAuth();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [showWriteForm, setShowWriteForm] = useState(false);
    const [newPost, setNewPost] = useState({
        title: '',
        content: '',
        ncsType: '',
        questionType: ''
    });
    const [submitting, setSubmitting] = useState(false);
    const [editingPost, setEditingPost] = useState(null);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);
    const [answers, setAnswers] = useState([]);
    const [newAnswer, setNewAnswer] = useState('');
    const [submittingAnswer, setSubmittingAnswer] = useState(false);
    const [editingAnswer, setEditingAnswer] = useState(null);
    const [editAnswerContent, setEditAnswerContent] = useState('');

    const ncsTypes = [
        {value: 'CLOUD', label: '클라우드'},
        {value: 'AI', label: '인공지능'},
        {value: 'BIG_DATA', label: '빅데이터'},
        {value: 'SECURITY', label: '정보보안'},
        {value: 'AR_VR', label: 'AR/VR'},
        {value: 'FIVE_G', label: '5G'}
    ];

    const questionTypes = [
        {value: 'CAREER', label: '취업/진로'},
        {value: 'COURSE_CONTENT', label: '과정내용'},
        {value: 'PROJECT', label: '프로젝트'},
        {value: 'STUDY', label: '스터디'},
        {value: 'NETWORK', label: '네트워킹'},
        {value: 'GENERAL', label: '일반질문'}
    ];

    useEffect(() => {
        fetchQuestions();
    }, [isAuthenticated]);


    const fetchQuestions = async () => {
        setLoading(true);
        try {
            const response = await api.get('qna/questions');
            if (response.success === true) {
                setPosts(response.data);
            } else {
                alert('질문 목록을 불러오는데 실패했습니다.')
            }
        } finally {
            setLoading(false);
        }
    };

    const filteredPosts = posts.filter(post =>
        post.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.authorNickname?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSubmitPost = async () => {
        if (!newPost.title.trim() || !newPost.content.trim() || !newPost.ncsType || !newPost.questionType) {
            alert('모든 필드를 입력해주세요.');
            return;
        }

        setSubmitting(true);
        try {
            let response;
            if (editingPost) {
                response = await api.put(`qna/questions/${editingPost.id}`, {
                    title: newPost.title,
                    content: newPost.content,
                    ncsType: newPost.ncsType,
                    questionType: newPost.questionType
                });
            } else {
                response = await api.post('qna/questions', {
                    title: newPost.title,
                    content: newPost.content,
                    ncsType: newPost.ncsType,
                    questionType: newPost.questionType
                });
            }

            if (response.success === false) {
                alert(response.message);
                return;
            }

            setNewPost({title: '', content: '', ncsType: '', questionType: ''});
            setShowWriteForm(false);
            setEditingPost(null);
            await fetchQuestions();
        } finally {
            setSubmitting(false);
        }
    };

    const handleEditPost = (post) => {
        setEditingPost(post);
        setNewPost({
            title: post.title,
            content: post.content,
            ncsType: post.ncsType,
            questionType: post.questionType
        });
        setShowWriteForm(true);
    };

    const handleDeletePost = async (postId) => {
        if (!window.confirm('정말로 이 질문을 삭제하시겠습니까?')) {
            return;
        }

        try {
            const response = await api.delete(`qna/questions/${postId}`);

            if (response.success === false) {
                alert(response.message);
                return;
            }

            await fetchQuestions();
        } catch (err) {
        }
    };

    const handleViewDetail = async (postId) => {
        try {
            const response = await api.get(`qna/questions/${postId}`);

            if (response.success === false) {
                alert('질문 상세 정보를 불러오는데 실패했습니다.');
                return;
            }

            setSelectedPost(response.data);
            await fetchAnswers(postId);
            setShowDetailModal(true);
        } catch (err) {
        }
    };

    const fetchAnswers = async (questionId) => {
        try {
            const response = await api.get(`qna/answers/question/${questionId}`);
            if (response.success === true) {
                setAnswers(response.data || []);
            }
        } catch (err) {
            console.error('Failed to fetch answers:', err);
        }
    };

    const handleSubmitAnswer = async () => {
        if (!newAnswer.trim()) {
            alert('답변 내용을 입력해주세요.');
            return;
        }

        setSubmittingAnswer(true);
        try {
            const response = await api.post(`qna/answers/question/${selectedPost.id}`, {
                content: newAnswer
            });

            if (response.success === false) {
                alert(response.message);
                return;
            }

            setNewAnswer('');
            await fetchAnswers(selectedPost.id);
        } catch (err) {
            if (err.response?.data?.message) {
                alert(err.response.data.message);
            } else {
                alert('답변 등록에 실패했습니다.');
            }
        } finally {
            setSubmittingAnswer(false);
        }
    };

    const handleEditAnswer = (answer) => {
        setEditingAnswer(answer.id);
        setEditAnswerContent(answer.content);
    };

    const handleUpdateAnswer = async (answerId) => {
        if (!editAnswerContent.trim()) {
            alert('답변 내용을 입력해주세요.');
            return;
        }

        try {
            const response = await api.put(`qna/answers/${answerId}`, {
                content: editAnswerContent
            });

            if (response.success === false) {
                alert(response.message);
                return;
            }

            setEditingAnswer(null);
            setEditAnswerContent('');
            await fetchAnswers(selectedPost.id);
        } catch (err) {
            if (err.response?.data?.message) {
                alert(err.response.data.message);
            } else {
                alert('답변 수정에 실패했습니다.');
            }
        }
    };

    const handleDeleteAnswer = async (answerId) => {
        if (!window.confirm('정말로 이 답변을 삭제하시겠습니까?')) {
            return;
        }

        try {
            const response = await api.delete(`qna/answers/${answerId}`);

            if (response.success === false) {
                alert(response.message);
                return;
            }

            await fetchAnswers(selectedPost.id);
        } catch (err) {
            if (err.response?.data?.message) {
                alert(err.response.data.message);
            } else {
                alert('답변 삭제에 실패했습니다.');
            }
        }
    };

    const handleCancelEditAnswer = () => {
        setEditingAnswer(null);
        setEditAnswerContent('');
    };

    const handleCancelEdit = () => {
        setEditingPost(null);
        setNewPost({title: '', content: '', ncsType: '', questionType: ''});
        setShowWriteForm(false);
    };

    const isMyPost = (post) => {
        return user && post.authorId === user.accountId;
    };

    const isMyAnswer = (answer) => {
        return user && answer.authorId === user.accountId;
    };


    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
                <p className="mt-4 text-gray-600 text-lg">질문 목록을 불러오는 중...</p>
            </div>
        );
    }


    return (
        <div className="max-w-6xl mx-auto p-6">
            <div className="text-black rounded-xl p-8 mb-8 shadow-lg">
                <div className="flex items-center justify-center space-x-3 mb-4">
                    <h1 className="text-4xl font-bold">Q&A 게시판</h1>
                </div>
                <p className="text-center text-xl">
                    궁금한 점이 있으시면 자유롭게 질문하세요!
                </p>
                <div className="flex justify-center space-x-8 mt-6">
                    <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">{posts.length}</div>
                        <div className="text-sm text-gray-600">전체 게시글</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">{filteredPosts.length}</div>
                        <div className="text-sm text-gray-600">검색 결과</div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="flex-1 relative">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="제목, 내용, 작성자 검색..."
                        className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"/>
                </div>
                <button
                    onClick={() => setShowWriteForm(!showWriteForm)}
                    className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-md hover:shadow-lg"
                >
                    <AddIcon/>
                    <span>글쓰기</span>
                </button>
            </div>

            {showWriteForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div
                            className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
                            <h3 className="text-2xl font-bold text-gray-800">
                                {editingPost ? '질문 수정' : '새 질문 작성'}
                            </h3>
                            <button
                                onClick={handleCancelEdit}
                                className="text-gray-500 hover:text-gray-700 p-1"
                            >
                                <CloseIcon/>
                            </button>
                        </div>

                        <div className="p-6">
                            <div className="space-y-4">
                                <input
                                    type="text"
                                    value={newPost.title}
                                    onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                                    placeholder="제목을 입력하세요"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">NCS 분야</label>
                                        <select
                                            value={newPost.ncsType}
                                            onChange={(e) => setNewPost({...newPost, ncsType: e.target.value})}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            <option value="">분야를 선택하세요</option>
                                            {ncsTypes.map(type => (
                                                <option key={type.value} value={type.value}>{type.label}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">질문 유형</label>
                                        <select
                                            value={newPost.questionType}
                                            onChange={(e) => setNewPost({...newPost, questionType: e.target.value})}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            <option value="">유형을 선택하세요</option>
                                            {questionTypes.map(type => (
                                                <option key={type.value} value={type.value}>{type.label}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <textarea
                                    value={newPost.content}
                                    onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                                    placeholder="질문 내용을 입력하세요"
                                    rows="6"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />

                                <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                                    <button
                                        onClick={handleCancelEdit}
                                        className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                                    >
                                        취소
                                    </button>
                                    <button
                                        onClick={handleSubmitPost}
                                        disabled={submitting}
                                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
                                    >
                                        {submitting ? (editingPost ? '수정 중...' : '등록 중...') : (editingPost ? '수정' : '등록')}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="space-y-4">
                {filteredPosts.map((post) => (
                    <div
                        key={post.id}
                        className="bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden"
                    >
                        <div className="p-6">
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center space-x-2">
                                    <h3 className="text-xl font-bold text-gray-800 hover:text-blue-600 cursor-pointer">
                                        {post.title}
                                    </h3>
                                </div>
                                <div className="flex items-center space-x-4 text-sm text-gray-500">
                                    <div className="flex items-center space-x-1">
                                        <PersonIcon className="text-sm"/>
                                        <span>{post.authorNickname || '익명'}</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <AccessTimeIcon className="text-sm"/>
                                        <span>{post.createdAt ? new Date(post.createdAt).toLocaleDateString() : new Date().toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2 mb-3">
                                {post.ncsType && (
                                    <span
                                        className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                                        {ncsTypes.find(type => type.value === post.ncsType)?.label || post.ncsType}
                                    </span>
                                )}
                                {post.questionType && (
                                    <span
                                        className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                                        {questionTypes.find(type => type.value === post.questionType)?.label || post.questionType}
                                    </span>
                                )}
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <div className="flex items-center space-x-1 text-purple-600">
                                        <VisibilityIcon className="text-sm"/>
                                        <span className="text-sm">{post.viewCount || 0}</span>
                                    </div>
                                    <div className="flex items-center space-x-1 text-green-600">
                                        <ChatBubbleOutlineIcon className="text-sm"/>
                                        <span className="text-sm">{post.answerCount || 0}</span>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={() => handleViewDetail(post.id)}
                                        className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center space-x-1"
                                    >
                                        <VisibilityIcon className="text-sm"/>
                                        <span>자세히 보기</span>
                                    </button>
                                    {isMyPost(post) && (
                                        <>
                                            <button
                                                onClick={() => handleEditPost(post)}
                                                className="text-green-600 hover:text-green-800 p-1 rounded"
                                                title="수정"
                                            >
                                                <EditIcon className="text-sm"/>
                                            </button>
                                            <button
                                                onClick={() => handleDeletePost(post.id)}
                                                className="text-red-600 hover:text-red-800 p-1 rounded"
                                                title="삭제"
                                            >
                                                <DeleteIcon className="text-sm"/>
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredPosts.length === 0 && (
                <div className="text-center py-12">
                    <QuestionAnswerIcon className="text-6xl text-gray-300 mx-auto mb-4"/>
                    <p className="text-gray-500 text-lg">
                        {searchTerm ? '검색 조건에 맞는 게시글이 없습니다.' : '아직 등록된 질문이 없습니다.'}
                    </p>
                    {!searchTerm && (
                        <button
                            onClick={() => setShowWriteForm(true)}
                            className="mt-4 text-blue-600 hover:text-blue-800 flex items-center space-x-1 mx-auto"
                        >
                            <AddIcon/>
                            <span>첫 질문을 작성해보세요!</span>
                        </button>
                    )}
                </div>
            )}

            {showDetailModal && selectedPost && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                        <div
                            className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-gray-800">질문 상세보기</h2>
                            <button
                                onClick={() => {
                                    setShowDetailModal(false)
                                    fetchQuestions()
                                }}
                                className="text-gray-500 hover:text-gray-700 p-1"
                            >
                                <CloseIcon/>
                            </button>
                        </div>

                        <div className="p-6">
                            <div className="mb-6">
                                <h1 className="text-3xl font-bold text-gray-800 mb-4">{selectedPost.title}</h1>

                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                                        <div className="flex items-center space-x-1">
                                            <PersonIcon className="text-sm"/>
                                            <span>{selectedPost.authorNickname}</span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <AccessTimeIcon className="text-sm"/>
                                            <span>{new Date(selectedPost.createdAt).toLocaleString()}</span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <VisibilityIcon className="text-sm"/>
                                            <span>조회 {selectedPost.viewCount}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-2 mb-6">
                                    {selectedPost.ncsType && (
                                        <span
                                            className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                                            {ncsTypes.find(type => type.value === selectedPost.ncsType)?.label || selectedPost.ncsType}
                                        </span>
                                    )}
                                    {selectedPost.questionType && (
                                        <span
                                            className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
                                            {questionTypes.find(type => type.value === selectedPost.questionType)?.label || selectedPost.questionType}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="prose max-w-none">
                                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                                    <h3 className="text-lg font-semibold mb-3">질문 내용</h3>
                                    <div className="text-gray-800 whitespace-pre-wrap leading-relaxed">
                                        {selectedPost.content}
                                    </div>
                                </div>
                            </div>

                            <div className="border-t border-gray-200 pt-6">
                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold mb-4">답변 {answers.length}개</h3>

                                    {/* 답변 목록 */}
                                    <div className="space-y-4 mb-6">
                                        {answers.map((answer) => (
                                            <div key={answer.id} className="bg-gray-50 rounded-lg p-4">
                                                <div className="flex items-center justify-between mb-3">
                                                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                                                        <PersonIcon className="text-sm"/>
                                                        <span className="font-medium">{answer.authorNickname}</span>
                                                        <span>•</span>
                                                        <span>{new Date(answer.createdAt).toLocaleString()}</span>
                                                    </div>
                                                    {isMyAnswer(answer) && (
                                                        <div className="flex space-x-2">
                                                            <button
                                                                onClick={() => handleEditAnswer(answer)}
                                                                className="text-green-600 hover:text-green-800 p-1 rounded"
                                                                title="수정"
                                                            >
                                                                <EditIcon className="text-sm"/>
                                                            </button>
                                                            <button
                                                                onClick={() => handleDeleteAnswer(answer.id)}
                                                                className="text-red-600 hover:text-red-800 p-1 rounded"
                                                                title="삭제"
                                                            >
                                                                <DeleteIcon className="text-sm"/>
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                                
                                                {editingAnswer === answer.id ? (
                                                    <div className="space-y-3">
                                                        <textarea
                                                            value={editAnswerContent}
                                                            onChange={(e) => setEditAnswerContent(e.target.value)}
                                                            rows="4"
                                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                                        />
                                                        <div className="flex justify-end space-x-2">
                                                            <button
                                                                onClick={handleCancelEditAnswer}
                                                                className="bg-gray-500 text-white px-3 py-1 rounded text-sm hover:bg-gray-600 transition-colors"
                                                            >
                                                                취소
                                                            </button>
                                                            <button
                                                                onClick={() => handleUpdateAnswer(answer.id)}
                                                                className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
                                                            >
                                                                수정
                                                            </button>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="text-gray-800 whitespace-pre-wrap">
                                                        {answer.content}
                                                    </div>
                                                )}
                                            </div>
                                        ))}

                                        {answers.length === 0 && (
                                            <div className="text-center py-8 text-gray-500">
                                                아직 답변이 없습니다. 첫 번째 답변을 작성해보세요!
                                            </div>
                                        )}
                                    </div>

                                    {/* 답변 작성 폼 */}
                                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                                        <h4 className="text-md font-semibold mb-3">답변 작성</h4>
                                        <textarea
                                            value={newAnswer}
                                            onChange={(e) => setNewAnswer(e.target.value)}
                                            placeholder="답변을 입력하세요..."
                                            rows="4"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                        />
                                        <div className="flex justify-end mt-3">
                                            <button
                                                onClick={handleSubmitAnswer}
                                                disabled={submittingAnswer}
                                                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
                                            >
                                                {submittingAnswer ? '등록 중...' : '답변 등록'}
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-end">
                                    <button
                                        onClick={() => {
                                            setShowDetailModal(false);
                                            setAnswers([]);
                                            setNewAnswer('');
                                            setEditingAnswer(null);
                                            setEditAnswerContent('');
                                            fetchQuestions();
                                        }}
                                        className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                                    >
                                        닫기
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default QNA;