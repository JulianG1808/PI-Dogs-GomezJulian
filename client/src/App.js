import './App.css';
import { Route, Switch} from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home';
import CreateDog from './components/CreateDog/CreateDog';
import CardDetail from './components/CardDetail/CardDetail';


function App() {
  return (
      <div className="App">
        <Switch>
          <Route exact path='/' component={LandingPage}/>
          <Route exact path='/home' component={Home}/>
          <Route path='/dog' component={CreateDog}/>
          <Route path='/home/:id' component={CardDetail}/> 
        </Switch>
      </div>
  );
}

export default App;
