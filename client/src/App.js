import './App.css';
import { Route, Switch} from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home';
import CreateDog from './components/CreateDog/CreateDog';
import CardDetail from './components/CardDetail/CardDetail';
import EditDog from './components/EditDog/EditDog'
import NavBar from './components/NavBar/NavBar'


function App() {
  return (
      <div className="App">
        <NavBar />
        <Switch>
          <Route exact path='/' component={LandingPage}/>
          <Route exact path='/home' component={Home}/>
          <Route path='/dog' component={CreateDog}/>
          <Route path='/home/:id' component={CardDetail}/>
          <Route path='/edit/:id' component={EditDog}/>
        </Switch>
      </div>
  );
}

export default App;
