import Login from './screens/Login'
import Home from './screens/Home'
import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Route path='/' component={Home} exact />
        <Route path='/login' component={Login} />
      </Router>
    </div>
  );
}

export default App;
