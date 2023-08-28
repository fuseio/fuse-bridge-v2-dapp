import { useState } from "react";
import fuseLogo from "../../assets/fuselogo.svg";
import NavMenu from "./NavMenu";
import NavButton from "./NavButton";

const menuItems = [
  {
    title: "Console",
    link: "#",
    selected: false
  },
  {
    title: "Staking",
    link: "https://staking.fuse.io",
    selected: false
  },
  {
    title: " Bridge",
    link: "#",
    selected: true
  },
]
const Topbar = () => {
  const [isOpen, setOpen] = useState<boolean>(false)

  return (
    <nav className="w-full sticky top-0 bg-light-gray/60 backdrop-blur-xl flex justify-center py-6 z-10 h-[10vh]">
      <div className="flex justify-between h-full items-center w-8/9 md:w-9/10 max-w-7xl" >
        <span>
          <a href="/">
            <img src={fuseLogo} alt="fuse logo" className="h-8 z-50" />
          </a>
        </span>
        <NavMenu menuItems={menuItems} isOpen={isOpen} />
        <NavButton isOpen={isOpen} setOpen={setOpen} />
      </div>
    </nav>
  );
};

export default Topbar;
