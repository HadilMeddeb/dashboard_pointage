import './App.css';
import Sidebar from './Components/Sidebar/Sidebar' 
import Main from './Components/Main/Main';
import {Route,Switch} from 'react-router-dom';
import Pointage from './pointage/pointage'
function App() {
  return (
    <div className="App">

     <Switch>
      
    <Route path="/pointage">
      <Pointage/>
    </Route>
    <Route path="/">
    <Sidebar/>
     <Main/>
    </Route>


     </Switch>


     
    </div>
  );
}

export default App;
