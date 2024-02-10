import axios from "axios";
import React, { useState } from "react";
import "./login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    let data = {
      email,
      password,
    };
    axios
      .post(process.env.REACT_APP_SERVER + "/api/admin/adminlogin", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.data.message === "Email doesn't exist.") {
          setMessage(response.data.message);
        } else if (response.data.message === "Password doesn't match.") {
          setMessage(response.data.message);
        } else {
          setMessage(response.data.message);
          // Set LocalStorage
          localStorage.setItem("aToken", response.data.token);
          localStorage.setItem("aID", response.data.id);
          window.location.href = "/dashboard";
        }
      })
      .catch((error) => {
        setMessage("Something wrong.");
      });
  };

  return (
    <>
      <section className="login">
        <div class="login-form text-center">
          {localStorage.getItem("aID") ? (
            (window.location.href = "/")(<h3>Already Logged In</h3>)
          ) : (
            <form onSubmit={submitHandler}>
              <p style={{ color: "red" }}>{message && message}</p>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email..."
                required
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password..."
                required
              />
              <input
                type="submit"
                name="submit"
                value="Login"
                class="btn-primary"
              />
            </form>
          )}
        </div>
      </section>
    </>
  );
};

export default Login;
