import MainMenu from "../Components/MainMenu";
import Footer from "../Components/Footer";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import Card from "../Components/Card.jsx";
import banner from "../Data/banner.PNG"; // Assuming this is the vertical banner

// Functional Filter Dropdown Component


function RoomInfo() {
  

  return (
    <>
      <MainMenu />
      
      <Footer />
    </>
  );
}

export default RoomInfo;
