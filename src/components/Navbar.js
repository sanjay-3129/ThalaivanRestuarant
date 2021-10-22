import React, { useState } from "react";
import { Link } from "react-router-dom";

const Overlay = (props) => {
  return (
    <div className="content">
      <ul>
        <li className="inner-list">
          <p>Welcome !</p>
        </li>
        <li className="inner-list">
          <a href="#l" className="list-link">
            <i className="far fa-user"></i>My Account
          </a>
        </li>
        {/* <li className="inner-list">
                  <a href="#" className="list-link">
                    <i className="fas fa-cog"></i>Settings
                  </a>
                </li> */}
        <li className="inner-list">
          <Link to="/" className="list-link" onClick={props.logoutHandler}>
            <i className="fas fa-sign-out-alt"></i>Logout
          </Link>
        </li>
      </ul>
    </div>
  );
};

const Navbar = (props) => {
  const [isOverlay, setIsOverlay] = useState(false);

  const overlayHandler = () => {
    setIsOverlay((prevState) => {
      // console.log(userDetail, "overlay");
      return !prevState;
    });
  };

  return (
    <section className="nav-bar">
      {/* <!-- Header Navbar --> */}
      <div className="navbar">
        <div className="logo">
          <img className="img-fluid" src="/images/logo.jpg" alt="Logo" />
        </div>
        <ul className="nav-item">
          <li className="list-item">
            <a className="list-link" href="#l">
              <i className="far fa-bell"></i>
            </a>
          </li>
          <li className="list-item">
            <button
              type="button"
              onClick={overlayHandler}
              className="btn collapsible"
            >
              <div className="flex">
                <img
                  className="img-fluid"
                  src="/images/15.jpg"
                  alt="profilepic"
                />
                <p className="aname">
                  Eren Jeager<i className="fas fa-angle-down"></i>
                </p>
              </div>
            </button>
            {isOverlay && <Overlay logoutHandler={props.logoutHandler} />}
          </li>
          <li className="list-item">
            <a className="list-link" href="#l">
              <i className="fas fa-cog"></i>
            </a>
          </li>
        </ul>
      </div>
      {/* <!-- Header Ends --> */}
    </section>
  );
};

export default Navbar;
