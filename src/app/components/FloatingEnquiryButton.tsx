import { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

interface FloatingEnquiryButtonProps {
  onEnquiryClick: () => void;
  isChatOpen?: boolean;
}

export function FloatingEnquiryButton({ onEnquiryClick, isChatOpen = false }: FloatingEnquiryButtonProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
      {/* Expanded Message */}
      {isExpanded && !isChatOpen && (
        <div className="bg-white rounded-lg shadow-lg p-3 mr-2 mb-2 animate-fade-in">
          <p className="text-sm font-medium text-gray-800 whitespace-nowrap">
            Need help? Chat with our assistant!
          </p>
        </div>
      )}
      
      {/* Floating Button */}
      <button
        onClick={() => {
          onEnquiryClick();
          setIsExpanded(false);
        }}
        onMouseEnter={() => !isChatOpen && setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
        className={`bg-primary hover:bg-primary/90 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center group ${
          isChatOpen ? 'bg-red-500 hover:bg-red-600' : ''
        }`}
        aria-label={isChatOpen ? 'Close Chat' : 'Enquiry'}
      >
        {isChatOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
        <span className="absolute bottom-full right-0 mb-2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          {isChatOpen ? 'Close Chat' : 'Chat with Assistant'}
        </span>
      </button>
    </div>
  );
}
