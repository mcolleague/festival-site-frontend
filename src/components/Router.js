import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Masthead from './Masthead';
import Home from '../pages/Home';
import Info from '../pages/Info';
import Register from '../pages/Register';
import Programme from '../pages/Programme';
import Gallery from '../pages/Gallery';
import MyAccount from '../pages/MyAccount';
import ForgottenPassword from '../pages/ForgottenPassword';
import PasswordReset from '../pages/PasswordReset';

function Router(props){
  return (
    <BrowserRouter>
      <div className="Page--masthead"><Masthead {...props} /></div>
      <div className="Page--body">
        <Switch>
          <Route path="/info"><Info {...props}/></Route>
          <Route path="/register"><Register {...props}/></Route>
          <Route path="/programme"><Programme {...props}/></Route>
          <Route path="/gallery"><Gallery {...props}/></Route>
          <Route path="/myaccount"><MyAccount {...props}/></Route>
          <Route path="/forgottenpassword"><ForgottenPassword {...props}/></Route>
          <Route path="/passwordreset"><PasswordReset {...props}/></Route>
          <Route path="/"><Home {...props}/></Route>
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default Router;
