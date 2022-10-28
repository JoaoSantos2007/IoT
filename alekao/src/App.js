import React from "react"
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import { NotFound } from "./pages/NotFound/NotFound";
import { Home } from "./pages/Home/Home";
import { NavBar } from "./components/NavBar/NavBar";
import CreateRoom from "./pages/CreateRoom";
import Room from "./pages/Room";
import UpdateRoom from "./pages/UpdateRoom";
import { Device } from "./pages/Device/Device";
import { Devices } from "./pages/Devices/Devices";
import CreateDevice from "./pages/CreateDevice";
import { UpdateDevice } from "./pages/UpdateDevice/UpdateDevice";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<NavBar />} />
        <Route path="/home" element={<Home />} />
        <Route path="/room/add" element={<CreateRoom />} />
        <Route path="/room/update/:id" element={<UpdateRoom />} />
        <Route path="/room/:id" element={<Room />} />
        <Route path="/device/:id" element={<Device />} />
        <Route path="/devices" element={<Devices />} />
        <Route path="/device/add" element={<CreateDevice />} />
        <Route path="/device/update/:id" element={<UpdateDevice />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
