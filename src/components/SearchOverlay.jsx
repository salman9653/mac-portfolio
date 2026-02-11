import { useEffect, useRef } from "react";

const SearchOverlay = ({ onClose }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    // Auto-focus input on mount
    if (inputRef.current) {
      inputRef.current.focus();
    }

    // Close on Escape key
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-transparent z-2001 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="w-[600px] bg-gray-100/90 backdrop-blur-2xl rounded-xl shadow-2xl border border-white/40 overflow-hidden transform transition-all scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center px-4 py-3 border-b border-gray-300/50">
          <img src="/icons/search.svg" alt="search" className="w-6 h-6 opacity-50 mr-3 invert-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Spotlight Search"
            className="w-full bg-transparent text-xl outline-none text-gray-800 placeholder-gray-500"
          />
        </div>
        <div className="p-4 bg-gray-50/50 min-h-[100px] flex items-center justify-center text-gray-400">
          <p>No recent searches</p>
        </div>
      </div>
    </div>
  );
};

export default SearchOverlay;
