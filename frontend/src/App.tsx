import 'antd/dist/reset.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HomePage from './Home';
import LoginPage from './Login';
import RegisterPage from './Register';

function App() {
  const [token, setToken] = useState();

  if(!token) {
    return <LoginPage  />
  }
  
  return (
    <div className="wrapper">
      <h1>Application</h1>
      <BrowserRouter>
        <Switch>
          <Route path="/home">
            <HomePage />
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/register">
            <RegisterPage />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
function useState(): [any, any] {
  throw new Error('Function not implemented.');
}

