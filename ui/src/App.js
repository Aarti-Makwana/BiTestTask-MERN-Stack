import { Route, Routes } from 'react-router-dom';
import Registration from './component/Registration.js';
import Login from './component/Login.js';
import Home from './component/Home.js';
import Chat from './component/Chat.js';

function App() {
  return (
    <>
      <Routes>
      <Route path='/' element={<><Registration/></>}></Route>
      <Route path='/userLogin' element={<><Login/></>}></Route>
      <Route path='/home' element={<><Home/></>}></Route>
      <Route path='/chatWithUser' element={<><Chat/></>}></Route>
      </Routes >
    </>
  );
}

export default App;
