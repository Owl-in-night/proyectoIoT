import React from "react";
import Footer from "./components/_partials/Footer";
import Sidebar from "./components/_partials/Sidebar";
import Navegation from "./components/routes/Navegation";
import NavbarWrapper1 from "./components/_partials/Navbar";

function App() {
  return (
    <div className="flex dark:bg-slate-800 border-gray-200">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <NavbarWrapper1 />
        <div className="flex-1 h-screen overflow-auto transition-all duration-500 ease-in-out p-7">
          <Navegation />
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;
