import { WindowControls } from "@components";
import { locations } from "@constants";
import WindowWrapper from "@hoc/WindowWrapper";
import useFinderLocationStore from "@store/finderLocation";
import useWindowStore from "@store/window";
import clsx from "clsx";
import { Search } from "lucide-react";
import React from "react";

const findPath = (nodes, target, currentPath = []) => {
  for (const node of nodes) {
    if (node.id === target.id && node.name === target.name) {
      return [...currentPath, node];
    }
    if (node.children) {
      const path = findPath(node.children, target, [...currentPath, node]);
      if (path) return path;
    }
  }
  return null;
};

const Finder = () => {
  const { openWindow } = useWindowStore();
  const { activeLocation, setActiveLocation } = useFinderLocationStore();

  const breadcrumbs = React.useMemo(() => {
    const rootNodes = Object.values(locations);
    const path = findPath(rootNodes, activeLocation);
    return path || [activeLocation];
  }, [activeLocation]);

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
    <div className="flex flex-col h-full w-full">
      <div id="window-header">
        <WindowControls target="finder" />
        <p className="font-bold ml-14 flex-1 text-center">
          {activeLocation.name}
        </p>
        <Search className="icon" />
      </div>
      <div className="flex flex-1 overflow-hidden">
        <div className="sidebar shrink-0">
          {renderList("Favorites", Object.values(locations))}
          {renderList("My Projects", locations.work.children)}
        </div>
        <div className="flex flex-col flex-1 min-h-[360px] bg-white relative">
          <ul className="content flex-1 overflow-auto">
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
          {/* Path Bar */}
          <div className="h-6 bg-gray-100 border-t border-gray-200 flex items-center px-2 py-0.5 mt-auto z-10 w-full overflow-hidden">
            <div className="flex items-center gap-1.5 text-[11px] text-gray-500 font-medium whitespace-nowrap">
              <span className="opacity-70">slmn-portfolio</span>
              <span className="text-gray-400 text-[10px]">{">"}</span>
              {breadcrumbs.map((item, index) => (
                <div key={item.id} className="flex items-center gap-1.5">
                  <span
                    className={clsx(
                      "hover:text-black cursor-pointer transition-colors",
                      index === breadcrumbs.length - 1 &&
                        "text-black font-semibold",
                    )}
                    onClick={() => setActiveLocation(item)}
                  >
                    {item.name}
                  </span>
                  {index < breadcrumbs.length - 1 && (
                    <span className="text-gray-400 text-[10px]">{">"}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const FinderWindow = WindowWrapper(Finder, "finder");

export default FinderWindow;
