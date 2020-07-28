import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import NewPlaces from './places/containers/NewPlaces';
import UserPlaces from './places/containers/UserPlaces';
import NavBar from './shared/NavBar';
import Users from './users/containers/Users';

const App = () => {
  return (
    <React.Fragment>
      <NavBar />
      <main>
        <Switch>
          <Route path="/" exact>
            <Users />
          </Route>
          <Route path="/:userId/places" exact>
            <UserPlaces />
          </Route>
          <Route path="/places/new" exact>
            <NewPlaces />
          </Route>
          <Redirect to="/" />
        </Switch>
      </main>
    </React.Fragment>
  );
}

export default App;
