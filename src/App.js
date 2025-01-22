
import './App.css';

import Employform from './components/Empolyform';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Header from './components/Header';

import EmpolyEdit from './components/EmpolyEdit';

import Getd from './components/Getd'
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet"></link>

function App() {
  
  return (
    <div className="App">
  
       <Header></Header>
            
<BrowserRouter>
<Routes>

  <Route path='/' element={<Getd></Getd>}> </Route>
  <Route path='/add' element={<Employform></Employform>}> </Route>
  <Route path='/update/:id' element={<EmpolyEdit></EmpolyEdit>}> </Route>
  <Route path='/empolydetails/:id' element={<Employform></Employform>}> </Route>


</Routes>
</BrowserRouter>
    </div>
  );
}

export default App;


