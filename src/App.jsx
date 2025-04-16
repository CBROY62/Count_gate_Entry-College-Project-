import React from "react";
import FaceDetection from "./FaceDetection";
import { BrowserRouter } from "react-router-dom";


function App() {
  return (
    <BrowserRouter>
      <FaceDetection/>
    </BrowserRouter>
  );
}

export default App;
