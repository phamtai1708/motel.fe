import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./Home/Home";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import LandPage from "./Lands/LandPage.jsx"
import RoomPage from './Rooms/RoomPage.jsx';
import AboutPage from './AboutUs/AboutUs.jsx';
import LandInfo from "./Lands/LandInfo.jsx"
import RoomInfo from "./Rooms/RoomInfo.jsx"
import FavoriteList from './Components/User/FavoriteList';
import Chudautu from './Chudautu/Chudautu.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/lands" element={<LandPage />} />
        <Route path="/lands/:landId" element={<LandInfo />} />
        <Route path="/rooms" element={<RoomPage />} />
        <Route path="/rooms/:roomId" element={<RoomInfo />} />
        <Route path="/aboutus" element={<AboutPage />} />
        <Route path="/favorites" element={<FavoriteList />} />
        <Route path="/chu-dau-tu" element={<Chudautu/>} />
      </Routes>
    </Router>
  );
}

export default App;
