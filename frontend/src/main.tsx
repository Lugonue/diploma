import Footer from "components/template/Footer";
import Header from "components/template/Header";
import React from "react";
import ReactDOM from "react-dom/client";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./index.css";
import HomePage from "./pages/HomePage";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <main className="min-h-screen flex flex-col">
        <Header id="header" />
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* <Route path="/about" element={<AboutPage />} /> */}
          {/* <Route path="/contact" element={<ContactPage />} /> */}
          {/* <Route path="*" element={<NotFoundPage />} /> */}
        </Routes>
        <Footer />
      </main>
    </Router>
  </React.StrictMode>
);
