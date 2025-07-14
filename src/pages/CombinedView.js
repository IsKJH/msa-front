import { useState } from 'react';
import Institution from './Institution';
import Training from './Training';
import SchoolIcon from '@mui/icons-material/School';
import BookIcon from '@mui/icons-material/Book';

function CombinedView() {
  const [activeTab, setActiveTab] = useState('institution');

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-center mb-8">
        <div className="flex bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setActiveTab('institution')}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'institution'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-gray-600 hover:text-blue-600'
            }`}
          >
            <SchoolIcon />
            <span>훈련기관</span>
          </button>
          <button
            onClick={() => setActiveTab('training')}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'training'
                ? 'bg-green-600 text-white shadow-md'
                : 'text-gray-600 hover:text-green-600'
            }`}
          >
            <BookIcon />
            <span>훈련 과정</span>
          </button>
        </div>
      </div>

      <div className="transition-all duration-300">
        {activeTab === 'institution' ? <Institution /> : <Training />}
      </div>
    </div>
  );
}

export default CombinedView;