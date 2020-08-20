import React, { useCallback, useState } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import NewPlaces from './places/containers/NewPlaces';
import UserPlaces from './places/containers/UserPlaces';
import UpdatePlace from './places/containers/UpdatePlace';
import NavBar from './shared/NavBar';
import Users from './users/containers/Users';
import Auth from './users/containers/Auth';
import { AuthContext } from './shared/context/auth-context';

const App = () => {

  const [isLoggedIn, setisLoggedIn] = useState(false);

  const login = useCallback(() => {
    setisLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setisLoggedIn(false);
  }, []);

  let routes;

  if (isLoggedIn) {
    routes = (
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
        <Route path="/places/:placeId">
          <UpdatePlace />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/:userId/places" exact>
          <UserPlaces />
        </Route>
        <Route path="/auth">
          <Auth />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    );
  }

  return (
    <React.Fragment>
      <AuthContext.Provider value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}>
        <BrowserRouter>
          <NavBar />
          <main>            
              {routes}
          </main>
        </BrowserRouter>
      </AuthContext.Provider>
    </React.Fragment>
  );
}

export default App;
