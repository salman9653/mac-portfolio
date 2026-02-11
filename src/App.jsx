import { Navbar, Welcome, Dock, Home } from "@components";
import {
  Contact,
  Finder,
  Image,
  Resume,
  Safari,
  Terminal,
  Text,
} from "@windows";

import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
gsap.registerPlugin(Draggable);

const App = () => {
  return (
    <main>
      <Navbar />
      <Welcome />
      <Dock />
      <Home />

      <Terminal />
      <Safari />
      <Finder />
      <Resume />
      <Text />
      <Image />
      <Contact />
    </main>
  );
};

export default App;
