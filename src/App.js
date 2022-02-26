import "./Components/Styles/App.css";
import NavBar from "./Components/NavBar/NavBar";
import Home from "./Components/Home/Home";
import Cities from "./Components/Cities/Cities";
import ScrollToTop from "./Components/Scrolltotop/Scrolltotop";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [input, setInput] = useState();
  const [apidata, setApiData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/allcities")
      .then((respuesta) => console.log(respuesta));
  });

  return (
    <BrowserRouter>
      <ScrollToTop />
      <NavBar />
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="/Cities" element={<Cities />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
