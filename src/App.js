import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar';
import Banner from './Components/Banner';
import Movies from './Components/Movies';
import Favourites from './Components/Favourites';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';

function App() {
  return (
    <Router>
      <Navbar />
     
      <Route path='/' exact render={(props)=>(
        <>
        <Banner {...props}/>
        <Movies {...props}/>
        </>
      )}/>  
      <Route path='/favourites' component={Favourites}/>
    
      {/*
      <Favourites />*/}
    </Router>
      
    
  );
}

export default App;
