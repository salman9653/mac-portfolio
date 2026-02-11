import { Navbar, Welcome, Dock } from "@components";
import { Finder, Image, Resume, Safari, Terminal, Text } from "@windows";

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
      <Text />
      <Image />
    </main>
  );
};

export default App;
