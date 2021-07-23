import './App.css';
import Navbar from './components/Navbar';
import Question from './components/Question';
import Footer from './components/Footer';
import Leaderboard from './components/Leaderboard';
import Signup from './components/Signup';
import Login from './components/Login';
import {useState,useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
function App() {
  let [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(()=>{
    if(localStorage.getItem("Authorization")!==null){
      setIsLoggedIn(true);
    }
  },[])
  return (
    <Router>
    <div className="App">
        <Navbar isLoggedIn={isLoggedIn}/>
      <Switch>
        <Route path="/signup" exact>
          <Signup />
        </Route>
        <Route path="/login" exact>
          <Login />
        </Route>
        <Route path="/" exact>  
          <Question />
        </Route>
        <Route path="/leaderboard"  exact>
          <Leaderboard />
        </Route>
        <Footer />
      </Switch>
    </div>
    </Router>
  );
}

export default App;
