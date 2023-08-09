import React from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./features/commons/Topbar";
import Home from "./features/bridge/Home";

const App = () => {
  return (
    <div className="w-full font-mona justify-end min-h-screen">
      <div className="flex-col flex items-center bg-light-gray h-full">
        <Topbar />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
