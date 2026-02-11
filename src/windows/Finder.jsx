import { WindowControls } from "@components";
import { locations } from "@constants";
import WindowWrapper from "@hoc/WindowWrapper";
import useFinderLocationStore from "@store/finderLocation";
import useWindowStore from "@store/window";
import clsx from "clsx";
import { Search } from "lucide-react";

const Finder = () => {
  const { openWindow } = useWindowStore();
  const { activeLocation, setActiveLocation } = useFinderLocationStore();

  const openItem = (item) => {
    //for folders (only work folder for now), set the active location to the folder's location to display its children
    if (item.kind === "folder") return setActiveLocation(item);

    // for pdfs (only resume), open the resume window
    if (item.fileType === "pdf") return openWindow("resume");

    // for fig and url types, open the link in a new tab
    if (["fig", "url"].includes(item.fileType) && item.href)
      return window.open(item.href, "_blank");

    // for images or text files, open the the image or text viewer window
    openWindow(`${item.fileType}${item.kind}`, item);
  };

  const renderList = (listName, listItems) => (
    <div>
      <h3>{listName}</h3>
      <ul>
        {listItems.map((item) => (
          <li
            key={item.id}
            onClick={() => setActiveLocation(item)}
            className={clsx(
              item.id === activeLocation.id ? "active" : "not-active",
            )}
          >
            <img src={item.icon} className="w-4" alt={item.name} />
            <p className="text-sm font-medium truncate">{item.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <>
      <div id="window-header">
        <WindowControls target="finder" />
        <Search className="icon" />
      </div>
      <div className="flex h-full bg-white">
        <div className="sidebar">
          {renderList("Favorites", Object.values(locations))}
          {renderList("My Projects", locations.work.children)}
        </div>
        <ul className="content">
          {activeLocation.children?.map((item) => (
            <li
              key={item.id}
              className={item.position}
              onClick={() => openItem(item)}
            >
              <img src={item.icon} alt={item.name} />
              <p className="text-xs">{item.name}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

const FinderWindow = WindowWrapper(Finder, "finder");

export default FinderWindow;
