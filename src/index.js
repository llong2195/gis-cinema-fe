import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Router, Switch } from "react-router-dom";
import App from "./app";
import SignIn from "./pages/sign-in";
const Index = () => (
  <BrowserRouter>
    <Switch>
        <Route path={"/Map"} component={App} />
        <Route path={"/SignIn"} component={SignIn} />
    </Switch>
  </BrowserRouter>
);
ReactDOM.render(<Index />, document.getElementById("root"));
