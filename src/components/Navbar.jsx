import { navIcons, navLinks } from "@constants";
import dayjs from "dayjs";

const Navbar = () => {
  return (
    <nav>
      <div>
        <img src="/images/logo.svg" alt="logo" />
        <p className="font-bold">My Portfolio</p>
        <ul>
          {navLinks.map(({ id, name }) => (
            <li key={id}>
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
