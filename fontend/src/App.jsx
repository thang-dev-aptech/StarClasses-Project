import "bootstrap/dist/css/bootstrap.min.css";
import Teacher from "./components/Teacher";
import { Contact } from "./pages/Contact";
import Course from "./components/Course";
import Introduction from "./components/Introduction";
import MenuBar from "./components/MenuBar";
import Achievements from "./components/Achievements";
import Footer from "./components/Footer";
import React from "react";

function App() {

  return (
    <>
      <MenuBar />
      <Introduction />
      <Course />
      <Teacher />
      <Achievements />
      <Contact />
      <Footer />
    </>
  );
}

export default App;
