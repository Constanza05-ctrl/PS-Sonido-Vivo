import React from "react";
import Navbar from "../organisms/Navbar";
import Footer from "../organisms/Footer";

function PublicTemplate({ children }) {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <main className="flex-grow-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default PublicTemplate;