import {Dialog, DialogContent, DialogTitle} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import BookIcon from '@mui/icons-material/Book';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import InfoIcon from '@mui/icons-material/Info';

function TrainingModal({isOpen, onClose, training}) {
    const handleClose = () => {
        onClose();
    };

    if (!training) return null;

    return (
        <Dialog
            open={isOpen}
            onClose={handleClose}
            fullWidth
        >
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                <div className="flex items-center justify-between">
                    <DialogTitle className="text-xl font-bold flex items-center space-x-2 m-0">
                        <BookIcon className="text-2xl"/>
                        <span>{training.name}</span>
                    </DialogTitle>
                    <button
                        onClick={handleClose}
                        className="text-white hover:text-gray-200 transition-colors p-5"
                    >
                        <CloseIcon/>
                    </button>
                </div>
            </div>

            <DialogContent className="p-6">
                <div className="space-y-6">
                    {/* 기본 정보 */}
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <h3 className="text-lg font-semibold text-blue-800 mb-3">기본 정보</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {training.name && (
                                <div className="flex items-center space-x-2">
                                    <BookIcon className="text-blue-600"/>
                                    <div>
                                        <div className="text-sm text-gray-600">교육과정명</div>
                                        <div className="font-medium">{training.name}</div>
                                    </div>
                                </div>
                            )}

                            {training.ncsTypeDescription && (
                                <div className="flex items-center space-x-2">
                                    <BookIcon className="text-blue-600"/>
                                    <div>
                                        <div className="text-sm text-gray-600">NCS 분야</div>
                                        <div className="font-medium">{training.ncsTypeDescription}</div>
                                    </div>
                                </div>
                            )}

                            {training.period && (
                                <div className="flex items-center space-x-2">
                                    <AccessTimeIcon className="text-green-600"/>
                                    <div>
                                        <div className="text-sm text-gray-600">교육 기간</div>
                                        <div className="font-medium">{training.period}일</div>
                                    </div>
                                </div>
                            )}

                            {training.institutionName && (
                                <div className="flex items-center space-x-2">
                                    <LocationOnIcon className="text-red-600"/>
                                    <div>
                                        <div className="text-sm text-gray-600">훈련기관</div>
                                        <div className="font-medium">{training.institutionName}</div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* 일정 정보 */}
                    {(training.startDate || training.endDate || training.createdAt) && (
                        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                            <h3 className="text-lg font-semibold text-green-800 mb-3">일정 정보</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {training.startDate && (
                                    <div className="flex items-center space-x-2">
                                        <CalendarTodayIcon className="text-green-600"/>
                                        <div>
                                            <div className="text-sm text-gray-600">시작일</div>
                                            <div
                                                className="font-medium">{new Date(training.startDate).toLocaleDateString('ko-KR')}</div>
                                        </div>
                                    </div>
                                )}

                                {training.endDate && (
                                    <div className="flex items-center space-x-2">
                                        <CalendarTodayIcon className="text-green-600"/>
                                        <div>
                                            <div className="text-sm text-gray-600">종료일</div>
                                            <div
                                                className="font-medium">{new Date(training.endDate).toLocaleDateString('ko-KR')}</div>
                                        </div>
                                    </div>
                                )}

                                {training.period && training.startDate && training.endDate && (
                                    <div className="flex items-center space-x-2">
                                        <AccessTimeIcon className="text-green-600"/>
                                        <div>
                                            <div className="text-sm text-gray-600">총 교육 기간</div>
                                            <div className="font-medium">{training.period}일간</div>
                                        </div>
                                    </div>
                                )}

                                {training.createdAt && (
                                    <div className="flex items-center space-x-2">
                                        <InfoIcon className="text-green-600"/>
                                        <div>
                                            <div className="text-sm text-gray-600">등록일</div>
                                            <div
                                                className="font-medium">{new Date(training.createdAt).toLocaleDateString('ko-KR')}</div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* 추가 정보 */}
                    <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                        <h3 className="text-lg font-semibold text-purple-800 mb-3">추가 정보</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {training.id && (
                                <div className="flex items-center space-x-2">
                                    <InfoIcon className="text-purple-600"/>
                                    <div>
                                        <div className="text-sm text-gray-600">교육과정 ID</div>
                                        <div className="font-medium">{training.id}</div>
                                    </div>
                                </div>
                            )}

                            {training.institutionId && (
                                <div className="flex items-center space-x-2">
                                    <InfoIcon className="text-purple-600"/>
                                    <div>
                                        <div className="text-sm text-gray-600">훈련기관 ID</div>
                                        <div className="font-medium">{training.institutionId}</div>
                                    </div>
                                </div>
                            )}

                            {training.ncsType && (
                                <div className="flex items-center space-x-2">
                                    <BookIcon className="text-purple-600"/>
                                    <div>
                                        <div className="text-sm text-gray-600">NCS 유형</div>
                                        <div className="font-medium">{training.ncsType}</div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default TrainingModal;