import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./Home/Home";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import LandPage from "./Lands/LandPage.jsx"
import RoomPage from './Rooms/RoomPage.jsx';
import AboutPage from './AboutUs/AboutUs.jsx';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/lands" element={<LandPage />} />
        <Route path="/rooms" element={<RoomPage />} />
        <Route path="/aboutus" element={<AboutPage />} />
      </Routes>
    </Router>
  );
}

export default App;
