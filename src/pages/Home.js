import React, { useState } from "react";
import { auth } from "../services/firebase";
import IdleTimeoutModal from "../ui/IdleTimeoutModal";
import IdleTimerContainer from "../helpers/IdleTimerContainer";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function Home(props) {
  const [showTimeoutModal, setShowTimeoutModal] = useState(false);
  const [isTimedout, setIsTimedout] = useState(false);

  const handleClose = () => {
    setShowTimeoutModal(false);
    setIsTimedout(false);
  };
  const logoutHandler = () => {
    setShowTimeoutModal(false);
    auth
      .signOut()
      .then(() => {
        // Sign-out successful.
        console.log("signed out successfully...");
        // alert("signed out");
        props.history.replace("/");
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  };

  const timeoutModalHandler = () => {
    setShowTimeoutModal(true);
  };
  return (
    <div className="App">
      <IdleTimeoutModal
        showModal={showTimeoutModal}
        handleClose={handleClose}
        handleLogout={logoutHandler}
      />
      <IdleTimerContainer
        handleLogout={logoutHandler}
        timeout={isTimedout}
        timeoutModal={timeoutModalHandler}
        timedoutHandler={(bool) => {
          setIsTimedout(bool);
        }}
      />
      <Navbar logoutHandler={logoutHandler} />
      <Sidebar />
    </div>
  );
}
export default Home;
