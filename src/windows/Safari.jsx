import { WindowControls } from "@components";
import { socials } from "@constants";
import WindowWrapper from "@hoc/WindowWrapper";
import {
  ChevronLeft,
  ChevronRight,
  Copy,
  PanelLeft,
  Plus,
  RotateCw,
  Search,
  Share,
  ShieldHalf,
} from "lucide-react";
import React from "react";

const Safari = () => {
  return (
    <>
      <div id="window-header" className="bg-[#fbfbfb]! border-b-[#e5e5e5]!">
        <WindowControls target="safari" />
        <div className="flex items-center gap-4 ml-8 text-gray-500">
           <PanelLeft className="w-4 h-4 cursor-pointer hover:text-black transition-colors" />
           <div className="flex gap-2">
             <ChevronLeft className="w-4 h-4 cursor-not-allowed opacity-50" />
             <ChevronRight className="w-4 h-4 cursor-not-allowed opacity-50" />
           </div>
        </div>

        <div className="flex-1 flex justify-center px-4">
           <div className="bg-[#eaeAEA] flex items-center gap-2 px-3 py-1.5 rounded-lg w-full max-w-[400px] text-xs text-gray-500 justify-center group hover:bg-[#dedede] transition-colors cursor-text">
             <ShieldHalf className="w-3 h-3" />
             <span className="group-hover:hidden">Search or enter website name</span>
             <span className="hidden group-hover:inline text-black">Start Page</span>
             <RotateCw className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100" />
           </div>
        </div>

        <div className="flex items-center gap-4 mr-4 text-gray-500">
           <Share className="w-4 h-4 cursor-pointer hover:text-black" />
           <Plus className="w-4 h-4 cursor-pointer hover:text-black" />
           <Copy className="w-4 h-4 cursor-pointer hover:text-black" />
        </div>
      </div>
      <div className="absolute inset-x-0 top-32 px-4 flex flex-col items-center">
        <h1 className="text-4xl font-semibold text-gray-800 mb-8 tracking-wide drop-shadow-sm select-none">
          Safari
        </h1>

        <div className="relative w-full max-w-[600px] mb-12">
          <input
            type="text"
            placeholder="Search or enter website name"
            className="w-full h-12 rounded-lg pl-11 pr-4 bg-gray-100/80 border border-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-[15px] shadow-sm"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                window.open(
                  `https://www.google.com/search?q=${e.target.value}`,
                  "_blank",
                );
              }
            }}
          />
          <Search
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-[18px] h-[18px]"
          />
        </div>

        <div className="grid grid-cols-4 gap-x-8 gap-y-6 max-w-[500px]">
          {socials.map((item) => (
            <div
              key={item.id}
              className="flex flex-col items-center gap-2 group cursor-pointer"
              onClick={() => window.open(item.link, "_blank")}
            >
              <div
                className="w-16 h-16 rounded-xl flex items-center justify-center shadow-md transition-transform group-hover:scale-105 group-active:scale-95"
                style={{ backgroundColor: item.bg || "#f3f4f6" }}
              >
                <img src={item.icon} alt={item.text} className="w-8 h-8 invert brightness-0" />
              </div>
              <span className="text-[13px] text-gray-600 font-medium group-hover:text-black transition-colors">
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

const SafariWindow = WindowWrapper(Safari, "safari");

export default SafariWindow;
