import { Switch, Route } from "react-router-dom";
import "./App.css";
import Login from "./forms/Login";
import Register from "./forms/Register";
import React, {useState} from "react";
import UserContext from "./contexts/UserContext";
import PrivateRoute from "./components/PrivateRoute";
import Recipes from "./pages/Recipes";
import { NavBar } from "./components/NavBar";
import { PageBody } from "./components/PageBody";
import AddRecipe from "./pages/AddRecipe";

function App() {
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });

  return (
    <div className="App">
      <UserContext.Provider value={{ userData, setUserData }}>
        <nav>
          <div className="pageTitle">Secret Family Recipes</div>
          <NavBar />
        </nav>
        <PageBody />

        <Switch>
          <PrivateRoute exact path="/" component={Recipes} />
          <Route exact path="/" component={Login} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <PrivateRoute path="/recipes" component={Recipes} />
          <PrivateRoute path="/addrecipe" component={AddRecipe} />
        </Switch>
      </UserContext.Provider>
    </div>
  );
}

export default App;
