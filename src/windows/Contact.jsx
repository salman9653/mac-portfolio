import { WindowControls } from "@components";
import { socials } from "@constants";
import WindowWrapper from "@hoc/WindowWrapper";

const Contact = () => {
  return (
    <>
      <div id="window-header">
        <WindowControls target="contact" />
        <h2>Contact Me</h2>
      </div>

      <div className="p-5 space-y-5">
        <img
          src="/images/my-pic-3.jpg"
          alt="Salman"
          className="h-40 rounded-full mx-auto"
        />
        <h3 className="text-2xl font-bold text-center">Let's Connect!</h3>
        <p className="text-gray-500 text-center">
          Got an idea? A bug to squash? or just wanna talk about tech? I'm in.
        </p>
        <div>
          <div className="flex gap-2">
            <p className="font-semibold">Email : </p>
            <a className="text-gray-600" href="mailto:slmn.k634@gmail.com">
              slmn.k634@gmail.com
            </a>
          </div>
          <div className="flex gap-2">
            <p className="font-semibold">Phone : </p>
            <a className="text-gray-600" href="tel:8708860428">
              +91 8708860428
            </a>
          </div>
        </div>
        <ul>
          {socials.map(({ id, text, link, icon, bg }) => (
            <li key={id} style={{ backgroundColor: bg }}>
              <a href={link} target="_blank" rel="noopener noreferrer">
                <img src={icon} alt={text} className="size-5" />
                <p>{text}</p>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

const ContactWindow = WindowWrapper(Contact, "contact");

export default ContactWindow;
