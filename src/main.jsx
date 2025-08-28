import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Booth from "./Booth";
import Editor from "./Editor";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/booth" element={<Booth />} />
        <Route path="/editor" element={<Editor />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
