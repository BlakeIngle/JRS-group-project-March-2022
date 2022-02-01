import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<p>Home page goes here</p>}></Route>
            {/* <Route path="/login" element={<LoginPage />}></Route> */}
            {/* <Route path="/signup" element={<SignUpPage />}></Route> */}
            {/* <Route path="/user/:userId" element={<UserPage />}></Route> */}
            <Route path="*" element={<div>404 - page does not exist</div>}></Route>
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;