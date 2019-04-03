import React from "react";
import { Route, Switch } from "react-router-dom";
import Main from "./Main";

const App = () => {
  return (
    <Switch>
      <Route path="/" render={props => <Main {...props} />} />
    </Switch>
  );
};

export default App;
