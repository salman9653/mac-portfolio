import { Navbar, Welcome, Dock } from "@components";
import { Finder, Resume, Safari, Terminal } from "@windows";

import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
gsap.registerPlugin(Draggable);

const App = () => {
  return (
    <main>
      <Navbar />
      <Welcome />
      <Dock />

      <Terminal />
      <Safari />
      <Finder />
      <Resume />
    </main>
  );
};

export default App;
