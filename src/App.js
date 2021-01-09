import logo from './logo.svg';
import './App.css';
import './component/login/login.jsx'
import PrivateRoute from './component/auth/authGuard.jsx';
import Login from './component/login/login.jsx';
import Register from './component/register/register.jsx';
import Forget from './component/forget/forget.jsx';
import Reset from './component/reset/reset.jsx';
import Dashboard from './component/dashboard/dashboard.jsx';
import SimpleAccordion from './component/card-new/card.jsx';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <div className="App">

      <Router>
        <Switch>
          <Route path="/register" component={Register} >
            <Register />
          </Route>
          <Route path="/login" component={Login} >
            <Login />
          </Route>
          <Route path="/forget" component={Forget} >
            <Forget />
          </Route>
          <Route path="/resetpassword/:token" component={Reset} >
            <Reset />
          </Route>
          {/* <Route path="/dashboard" component={Dashboard} >
            <Dashboard />
          </Route> */}
          <PrivateRoute path="/dashboard" component={Dashboard} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
