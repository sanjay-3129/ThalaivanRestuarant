import React, { useState } from "react";
import { Button, Alert } from "react-bootstrap";
import { auth, db } from "../services/firebase";
import Input from "../ui/Input";
import style from "./Login.module.css";

const Login = (props) => {
  const [error, setError] = useState();
  const [userCred, setUserCred] = useState({
    email: "",
    password: ""
  });

  const changeHandler = (event) => {
    let val = event.target.value;
    setUserCred((prevState) => {
      return {
        ...prevState,
        [event.target.name]: val
      };
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    // firebase signin auth
    auth
      .signInWithEmailAndPassword(userCred.email, userCred.password)
      .then((userCredential) => {
        // setOpen(true);
        // Signed in
        let userId = userCredential.user.uid;
        console.log(userId);

        // localStorage.setItem("userId", userId);
        // localStorage.setItem("userId", userId);
        // props.history.replace(`/home?userId=${userId}`);
        props.history.push("/home");
      })
      .catch((e) => {
        console.log(e.code);
        if (e.code === "auth/wrong-password") {
          setError("Incorrect password. Try again.");
        } else if (e.code === "auth/network-request-failed") {
          setError("Internet connection is down!!!");
        } else {
          setError("User doesn't exist. Please do register.");
        }
      });
  };

  return (
    <>
      <div className={style.Login}>
        {/* <Snackbar open={open} handleClose={handleClose} /> */}
        <h1>Login</h1>
        {error && <Alert variant="danger">{error}</Alert>}
        <form onSubmit={submitHandler}>
          <Input
            type="email"
            name="email"
            label="Email address"
            id="email"
            placeholder="Enter email"
            text="We'll never share your email with anyone else."
            isText="true"
            onChange={changeHandler}
            value={userCred.email}
          />

          <Input
            type="password"
            label="Password"
            id="password"
            name="password"
            placeholder="Password"
            onChange={changeHandler}
            value={userCred.password}
          />

          <Button className={style.Button} variant="primary" type="submit">
            Submit
          </Button>
          <Button className={style.Button} variant="primary">
            Cancel
          </Button>
          <br />
          <br />
          <br />
          {/* <p style={{ display: "inline" }}>Don't have an account? </p>
          <a className={style.Link} href="/signup">
            Register
          </a> */}
        </form>
      </div>
    </>
  );
};

export default Login;
