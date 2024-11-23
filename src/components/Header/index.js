import React from "react";
import "./index.css";

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark shadow-sm mb-4">
      <div className="con-edit">
        <a className="navbar-brand" href="/">
          <img
            src="https://res.cloudinary.com/surya192/image/upload/v1732370444/filoffee_ai_logo_npqwyr.jpg"
            alt="Company Logo"
            className="me-2"
          />
        </a>
        <h1 className="text-edit">Task Tracker</h1>
      </div>
    </nav>
  );
};

export default Header;
