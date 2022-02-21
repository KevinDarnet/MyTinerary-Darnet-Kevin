import "./App.css";
import NavBar from "./Components/NavBar";
import Home from "./Components/Home";
import Citties from "./Components/Citties";

import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Citties" element={<Citties />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
