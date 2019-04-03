import React from 'react';
import { Route, Switch } from "react-router-dom";
import Main from './Main';

const App = () => {
  return (
    <Switch>
      <Route exact path="/" component={Main} />
      {/* <Route
        path="/about"
        render={props => <About {...props} extra={someVariable} />}
      /> */}
    </Switch>
  );
}

export default App;