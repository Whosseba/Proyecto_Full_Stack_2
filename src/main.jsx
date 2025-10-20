import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";                 
import 'bootstrap/dist/css/bootstrap.min.css'; 
import './index.css';  
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter basename="/Proyecto_Full_Stack_2/">
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
