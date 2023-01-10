import React, { useEffect, useState } from "react";
import { render } from "react-dom";
import { withRouter, Link, useHistory } from "react-router-dom";
import {
  Row,
  Col,
  CardBody,
  Card,
  Alert,
  Container,
  Form,
  Input,
  FormFeedback,
  Label,
} from "reactstrap";
import { login } from "../helpers/app_backend/auth-backend-helper";
import accessToken from "../helpers/jwt_token_access/accessToken";
export default function SignIn() {
  const history = useHistory();
  const [dataLogin, setDataLogin] = useState({
    email: "",
    password: "",
  });
  useEffect(() => {
    if (localStorage.getItem("GisToken")) {
      history.push("/Map");
    }
  }, []);
  const onSubmitHandler = async () => {
    await login(dataLogin).then((res) => {
      if (res.message == "Thành Công") {
        localStorage.setItem("GisToken", res.body.token);
        history.push("/Map");
      }
    });
  };
  return (
    <React.Fragment>
      <div className="inner-container">
        <div className="header">Login</div>
        <div className="box">
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="Email"
              className="login-input"
              placeholder="Email"
              onChange={(e) => {
                setDataLogin({
                  ...dataLogin,
                  email: e.target.value,
                });
              }}
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              className="login-input"
              placeholder="Password"
              onChange={(e) => {
                setDataLogin({
                  ...dataLogin,
                  password: e.target.value,
                });
              }}
            />
          </div>

          <button
            type="button"
            className="login-btn"
            onClick={() => {
              onSubmitHandler();
            }}
          >
            Login
          </button>
        </div>
      </div>
    </React.Fragment>
  );
}
