import { navIcons, navLinks } from "@constants";
import useWindowStore from "@store/window";
import dayjs from "dayjs";

const Navbar = () => {
  const { openWindow } = useWindowStore();
  return (
    <nav>
      <div>
        <img src="/images/logo.svg" alt="logo" />
        <p className="font-bold">My Portfolio</p>
        <ul>
          {navLinks.map(({ id, name, type }) => (
            <li key={id} onClick={() => openWindow(type)}>
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
        <time>{dayjs().format("DD MMM YYYY, h:mm A")}</time>
      </div>
    </nav>
  );
};

export default Navbar;
