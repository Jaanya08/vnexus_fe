// // '/vite.svg'
// import './App.css'
// // import Hero from './components/hero'
// // import sec from './components/sec2'
// import dashboard from './components/dashboard'

// function App() {

//   return (
//     <>
//    {/* <hero />
//    <sec2 /> */}
//    <dashboard />
//     </>
//   )
// }

// export default App
import React from 'react';
import './App.css';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import Home from './components/Home';

function App() {
  return (
    <div className="App">
      <Home />
    </div>
  );
}

export default App;