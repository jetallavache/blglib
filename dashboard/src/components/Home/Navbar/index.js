import React, { useState } from "react";
import { Link } from "react-scroll";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import "./index.css";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div className="navbar-container">
      <div className="navbar-left">
        <Link to="home" spy={true} smooth={true} duration={500}>
          blg❤︎lib
        </Link>
      </div>
      <div className="navbar-right-menubar">
        {isMenuOpen ? (
          <div className="navbar-menu-options">
            <CloseIcon onClick={() => setIsMenuOpen(!isMenuOpen)} />
            <Link
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              to="home"
              spy={true}
              smooth={true}
              duration={500}
            >
              Главная
            </Link>
            <Link
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              to="currMeeting"
              spy={true}
              smooth={true}
              duration={500}
            >
              Встреча
            </Link>
            <Link
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              to="takePart"
              spy={true}
              smooth={true}
              duration={500}
            >
              Принять участие
            </Link>
            <Link
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              to="archive"
              spy={true}
              smooth={true}
              duration={500}
            >
              Архив
            </Link>
            <Link
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              to="about"
              spy={true}
              smooth={true}
              duration={500}
            >
              О нас
            </Link>
          </div>
        ) : (
          <MenuIcon onClick={() => setIsMenuOpen(!isMenuOpen)} />
        )}
      </div>
      <div className="navbar-right-options">
        <Link to="home" spy={true} smooth={true} duration={500}>
          Главная
        </Link>
        <Link to="currMeeting" spy={true} smooth={true} duration={500}>
          Встреча
        </Link>
        <Link to="takePart" spy={true} smooth={true} duration={500}>
          Принять участие
        </Link>
        <Link to="archive" spy={true} smooth={true} duration={500}>
          Архив
        </Link>
        <Link to="about" spy={true} smooth={true} duration={500}>
          О нас
        </Link>
      </div>
    </div>
  );
};
