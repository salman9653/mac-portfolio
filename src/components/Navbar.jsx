import { useEffect, useState } from "react";
import { locations, navIcons, navLinks } from "@constants";
import useWindowStore from "@store/window";
import dayjs from "dayjs";
import useFinderLocationStore from "@store/finderLocation";

const Navbar = () => {
  const { openWindow } = useWindowStore();
  const { setActiveLocation } = useFinderLocationStore();
  const [currentDate, setCurrentDate] = useState(dayjs().format("DD MMM YYYY"));
  const [currentTime, setCurrentTime] = useState(dayjs().format("HH:mm"));

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(dayjs().format("DD MMM YYYY"));
      setCurrentTime(dayjs().format("HH:mm"));
    }, 20000);

    return () => clearInterval(timer);
  }, []);

  return (
    <nav>
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

      <div>
        <ul>
          {navIcons.map(({ id, img: icon }) => (
            <li key={id}>
              <img src={icon} className="icon-hover" alt={`${name} icon`} />
            </li>
          ))}
        </ul>
        <div>
          <time className="hover:bg-gray-200/50 p-1 px-2 rounded-md cursor-pointer">
            {currentDate}, <span className="font-bold">{currentTime}</span>
          </time>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
