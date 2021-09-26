import { Switch, Route } from "react-router-dom";
import "./App.css";
import Login from "./forms/Login";
import Register from "./forms/Register";
import { useState } from "react/cjs/react.development";
import UserContext from "./contexts/UserContext";
import PrivateRoute from "./components/PrivateRoute";
import Recipes from "./pages/Recipes";
import { NavBar } from "./components/NavBar";
import { PageBody } from "./components/PageBody";

function App() {
  const [userData, setUserData] = useState({
    username: "",
    password: "",
    email: "",
  });

  return (
    <div className="App">
      <UserContext.Provider value={{ userData, setUserData }}>
          <NavBar />
        <PageBody />

        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <PrivateRoute path="/recipes" component={Recipes} />
        </Switch>
      </UserContext.Provider>
    </div>
  );
}

export default App;
