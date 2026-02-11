import { useState } from "react";

const ControlCenterCard = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <div className="w-72 bg-gray-100/90 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/50 p-4 text-gray-800 z-50">
      <div className="grid grid-cols-1 gap-4">
        {/* Toggle Theme Row */}
        <div className="flex items-center justify-between bg-white/50 p-3 rounded-xl border border-white/40 shadow-sm">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-full ${isDarkMode ? "bg-gray-800" : "bg-blue-500"} transition-colors`}>
              <img src="/icons/mode.svg" alt="mode" className="w-5 h-5 invert" />
            </div>
            <div>
                 <span className="font-semibold block text-sm">Dark Mode</span>
                 <span className="text-xs text-gray-500">{isDarkMode ? "On" : "Off"}</span>
            </div>
          </div>
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`cursor-pointer w-12 h-7 rounded-full relative transition-colors duration-300 ${
              isDarkMode ? "bg-blue-500" : "bg-gray-300"
            }`}
          >
            <div
              className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform duration-300 shadow-sm ${
                isDarkMode ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ControlCenterCard;
