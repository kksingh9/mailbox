//import logo from './logo.svg';
import { useSelector } from 'react-redux';
import './App.css';
import AuthForm from './components/Login/AuthForm';
//import Mailbox from './pages/Mailbox';
import { Route, Switch , Redirect} from 'react-router-dom';
import Routerer from './components/Router/Routerer';

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);
  return (
    <div >
      <Switch>
      {isLoggedIn && <Routerer />}
      {!isLoggedIn && (
            <Route path="/" exact>
              <Redirect to="/login" />
            </Route>
          )} 
     {!isLoggedIn && <Route path="/login" >
      <AuthForm />
      </Route>}
      
      {!isLoggedIn && <Route path="*" >
        <Redirect to="/login" />
  </Route>}
     
      </Switch>
    </div>
  );
}

export default App;
