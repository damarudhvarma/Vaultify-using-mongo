import React, { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-slate-800 p-4 flex justify-between items-center relative text-white">
      <div className="logo text-xl font-bold mx-4 sm:mx-10">
        <span className="text-green-800 text-2xl">&lt;</span>
        <span className="text-2xl">Vaulti</span>
        <span className="text-green-800 text-2xl">Fy/&gt;</span>
      </div>
      <div className="sm:hidden mx-4">
        <button onClick={toggleMenu}>
          <img src={isOpen ? "icons/close.png" : "icons/menu.png"} alt="menu" className="w-6 h-6" />
        </button>
      </div>
      <ul
        className={`sm:flex sm:gap-6 mx-4 sm:mx-10 absolute sm:static top-16 sm:top-auto left-0 sm:left-auto w-full sm:w-auto bg-slate-800 sm:bg-transparent transition-all duration-300 ease-in ${
          isOpen ? "flex flex-col gap-3 items-center" : "hidden"
        }`}
      >
        <li className="py-2 sm:py-0">home</li>
        <li className="py-2 sm:py-0">contact</li>
        <li className="py-2 sm:py-0">login</li>
      </ul>
    </nav>
  );
};

export default Navbar;
