import "./App.css";
import NavBar from "./Components/NavBar";
import Home from "./Components/Home";
import Cities from "./Components/Cities";

import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Cities" element={<Cities />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
