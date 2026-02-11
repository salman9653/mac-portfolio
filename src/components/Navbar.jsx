import { useEffect, useState } from "react";
import { locations, navIcons, navLinks } from "@constants";
import useWindowStore from "@store/window";
import dayjs from "dayjs";
import useFinderLocationStore from "@store/finderLocation";
import SearchOverlay from "./SearchOverlay";
import UserProfileCard from "./UserProfileCard";
import ControlCenterCard from "./ControlCenterCard";
import CalendarCard from "./CalendarCard";

const Navbar = () => {
  const { openWindow } = useWindowStore();
  const { setActiveLocation } = useFinderLocationStore();
  const [currentDate, setCurrentDate] = useState(dayjs().format("DD MMM YYYY"));
  const [currentTime, setCurrentTime] = useState(dayjs().format("HH:mm"));
  const [activePopup, setActivePopup] = useState(null); // 'search', 'user', 'mode', 'date', or null

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(dayjs().format("DD MMM YYYY"));
      setCurrentTime(dayjs().format("HH:mm"));
    }, 20000);

    return () => clearInterval(timer);
  }, []);

  // Close popups on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
        if (activePopup && activePopup !== "search" && !event.target.closest('nav')) {
            setActivePopup(null);
        }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside); 
  }, [activePopup]);


  const handleIconClick = (iconId) => {
      // 1: Wifi (no action for now)
      // 2: Search
      // 3: User
      // 4: Mode

      if (iconId === 2) setActivePopup("search");
      else if (iconId === 3) setActivePopup(activePopup === "user" ? null : "user");
      else if (iconId === 4) setActivePopup(activePopup === "mode" ? null : "mode");
  };

  return (
    <>
      <nav className="relative z-2000">
        <div>
          <img src="/images/logo.svg" alt="logo" />
          <p className="font-bold">My Portfolio</p>
          <ul>
            {navLinks.map(({ id, name, type }) => (
              <li
                key={id}
                onClick={() => {
                  if (type === "finder") {
                    setActiveLocation(locations.work);
                  }
                  openWindow(type);
                }}
              >
                <p className="font-semibold">{name}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-4 relative">
          <ul className="flex items-center gap-3">
            {navIcons.map(({ id, img: icon }) => (
              <li 
                key={id} 
                className="relative"
                onClick={() => handleIconClick(id)}
              >
                <img src={icon} className="icon-hover cursor-pointer" alt="icon" />
                 {/* Render User Profile or Control Center relative to the icon */}
                 {activePopup === 'user' && id === 3 && (
                    <div className="absolute top-9 -right-16" onClick={(e) => e.stopPropagation()}>
                         <UserProfileCard />
                    </div>
                )}
                 {activePopup === 'mode' && id === 4 && (
                    <div className="absolute top-9 -right-20" onClick={(e) => e.stopPropagation()}>
                         <ControlCenterCard />
                    </div>
                )}
              </li>
            ))}
          </ul>
          <div className="relative">
            <time 
                className="hover:bg-gray-200/50 p-1 px-2 rounded-md cursor-pointer block"
                onClick={() => setActivePopup(activePopup === 'date' ? null : 'date')}
            >
              {currentDate}, <span className="font-bold">{currentTime}</span>
            </time>
             {activePopup === 'date' && (
                <div className="absolute top-11 right-0" onClick={(e) => e.stopPropagation()}>
                    <CalendarCard />
                </div>
            )}
          </div>
        </div>
      </nav>
      
      {/* Search Overlay is fixed, so it can be outside the nav structure but we render it here for access to state */}
      {activePopup === "search" && (
        <SearchOverlay onClose={() => setActivePopup(null)} />
      )}
    </>
  );
};

export default Navbar;
