import { useParams,
  Link, 
  Switch, 
  Route } 
  from 'react-router-dom'
import './App.css';
import styled from 'styled-components'
import Login from './forms/Login'
import Register from './forms/Register';


function App() {
  return (
    <div className="App">
      <nav>
        <Link to='/'>Home</Link>
        <Link to='/recipes'>All Recipes</Link>
        <Link to='/profile'>Your Recipes</Link>
        <Link to='/login'>Log In/Sign Up</Link>
      </nav>
      <div className='main-content'>
          <h1>Secret Recipes</h1>
          <div className='card'>
            <h2>Easily store all of your favorite recipes!</h2>
            <p>Upload images, ingredients, and much more to your account and create your own personal cookbook!</p>
            <p>Get inspirations from other user's recipes!</p>
            <p>Share your own recipes!</p>
          </div>
      </div>

      <Switch>
        <Route exact path='/login'>
          <Login />
        </Route>
        <Route exact path='/register'>
          <Register />
        </Route>
      </Switch>

    </div>
  );
}

export default App;
