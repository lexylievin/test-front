/*
  @author Alexia LEGUEDOIS
 */
  //React
  import React from "react";
  import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
  import "./App.css";
  // pages
  import Availabilities from "./pages/Availabilities";
  import Bookings from "./pages/Bookings";
  import Home from "./pages/Home";
  import NotFound from "./pages/NotFound";
  
  const App = () => {
    return (
      <Router basename={process.env.PUBLIC_URL}>
          <Switch>
          <Route exact path={'/'} component = {Home}/>
          <Route exact path={'/availabilities'} component = {Availabilities}/>
          <Route exact path={'/availabilities/:searchString'} component = {Availabilities}/>
          <Route exact path={'/:idDoc/:avl/bookings'} component = {Bookings}/>
          <Route path={'/*'} component={NotFound} />
        </Switch>
      </Router>
    );
  };
  
  export default App;
