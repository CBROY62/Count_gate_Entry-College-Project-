import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nabvar from "./components/Nabvar";
import Home from "./page/Home";
import History from "./page/History";
import AutofaceAuthentygation from "./page/AutofaceAuthentygation";
import FaceDetection from "./FaceDetection";

function App() {
  return (
    <Router>  
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/History" element={<History />} />
        <Route path="/AutofaceAuthentygation" element={<AutofaceAuthentygation />} />
      </Routes>
    </Router>
  );
}

export default App;
