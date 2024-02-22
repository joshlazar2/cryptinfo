import './App.css';
import {Routes, Route, Link} from 'react-router-dom';
import Nav from './components/Nav'
import Main from './components/Main'
import OneCrypto from './components/OneCrypto';

function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/oneCrypto/:name' element={<OneCrypto />} />
      </Routes>
    </div>
  );
}

export default App;
