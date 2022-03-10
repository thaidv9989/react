import React, { useState } from "react";
import "./LoginPage.css";
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const validateEmail = (email) => {
    if (!email) return "* Requierd: xyz@gmail.com !!!";
    const isValidEmail = String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
    if (!isValidEmail) return "Invalid email address";
    return "";
  };
  const validatePass = (password) => {
    if (!password) return "* Required";
    if (password.length < 8) return "A least 8 characters";
    return "";
  };

  const [value, setValue] = useState({
    email: "",
    password: "",
  });

  const errors = {
    email: validateEmail(value.email),
    password: validatePass(value.password),
  };

  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });

  const handleInputChange = (evt) => {
    setValue({
      ...value,
      [evt.target.name]: evt.target.value,
    });
  };
  const handleInputBlur = (evt) => {
    setTouched({
      ...value,
      [evt.target.name]: true,
    });
  };
  const history = useNavigate();
  function handleSubmit() {
    if (validateEmail(email) && validatePass(password)) {
      fetch('https://60dff0ba6b689e001788c858.mockapi.io/token', {
        method: 'GET',
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (json) {
          const { token, userId } = json;
          localStorage.setItem('token', token);
          localStorage.setItem('userId', userId);
          history('/profile');
          window.location.reload();
        });
    }
    history('/profile');
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-5 mx-auto">
          <div id="first">
            <div className="myform form">
              <div className="logo mb-3">
                <div className="col-md-12 text-center">
                  <h1>LOGIN</h1>
                </div>
              </div>
              <form>
                <div className="form-group">
                  
                  <input
                    name="email"
                    type="email"
                    className="form-control"
                    value={value.email}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    placeholder="Email..."
                  />
                  {touched.email && (
                    <p className="text-danger">{errors.email}</p>
                  )}
                </div>
                <br />
                <div className="form-group">
                  
                  <input
                    name="password"
                    type="password"
                    className="form-control"
                    value={value.password}
                    onChange={handleInputChange}
                    placeholder="Password...."
                  />
                  {touched.email && (
                    <p className="text-danger">{errors.password}</p>
                  )}
                </div>
                <br />
                <div className="col-md-12 text-center">
                  <button
                    className="btn btn-log btn-primary"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
