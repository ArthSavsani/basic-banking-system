import React, { useState } from "react";
import { useRef } from "react";
import { MdFormatAlignLeft, MdClose } from "react-icons/md";
import { Link } from "react-router-dom";
import "../Styles/header.css";
const Header = () => {
  const inputRef = useRef(0);
  const [expanded, setExpanded] = useState("false");

  const expandSidebar = () => {
    if (expanded === "false") {
      setExpanded("true");
      inputRef.current.style.width = "170px";
    } else {
      setExpanded("false");
      inputRef.current.style.width = "0px";
    }
  };
  const renderIcon = () => {
    if (expanded === "false") {
      return <MdFormatAlignLeft />;
    } else {
      return <MdClose />;
    }
  };
  return (
    <>
      <div className="header">
        <div className="app_header">
          <div className="app_header_content">
            <div className="app_nav_toggler">
              <button className="toggler" onClick={expandSidebar}>
                {renderIcon()}
              </button>
            </div>
            <div className="app_logo">Sparks Bank</div>
          </div>
        </div>
        <div id="mySidenav" className="sidenav" ref={inputRef}>
          <Link to="#" className="nav_links">
            Home
          </Link>
          <Link to="/Customers" className="nav_links">
            Customers
          </Link>
        </div>
      </div>
    </>
  );
};

export default Header;
