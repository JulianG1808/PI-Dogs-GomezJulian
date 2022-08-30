import './App.css';
import { Route, Routes} from 'react-router-dom';
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
        <Routes>
          <Route exact path='/' element={<LandingPage />}/>
          <Route exact path='/home' element={<Home />}/>
          <Route path='/dog' element={<CreateDog />}/>
          <Route path='/home/:id' element={<CardDetail />}/>
          <Route path='/edit/:id' element={<EditDog />}/>
        </Routes>
      </div>
  );
}

export default App;
