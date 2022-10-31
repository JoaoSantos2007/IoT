import React from "react"
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
//Import Pages
import NavBar from "./components/navbar/NavBar";
import NotFound from "./pages/NotFound";
//Room pages
import Home from "./pages/Home";
import Room from "./pages/room/Room";
import CreateRoom from "./pages/room/CreateRoom";
import UpdateRoom from "./pages/room/UpdateRoom";
//Device pages
import Devices from "./pages/device/Devices";
import Device from "./pages/device/Device";
import CreateDevice from "./pages/device/CreateDevice";
import UpdateDevice from "./pages/device/UpdateDevice";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<NavBar />} />
        <Route path="/home" element={<Home />} />
        <Route path="/room/create" element={<CreateRoom />} />
        <Route path="/room/update/:id" element={<UpdateRoom />} />
        <Route path="/room/:id" element={<Room />} />
        <Route path="/devices" element={<Devices />} />
        <Route path="/device/create" element={<CreateDevice />} />
        <Route path="/device/update/:id" element={<UpdateDevice />} />
        <Route path="/device/:id" element={<Device />} />   
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
