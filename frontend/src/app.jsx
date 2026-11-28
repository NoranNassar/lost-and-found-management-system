
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/navbar";
import Footer from "./components/footer";

import Home from "./pages/home";
import Dashboard from "./pages/dashboard";
import Matches from "./pages/matches";

import Browse from "./pages/browse";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/matches" element={<Matches />} />
          <Route path="/browse" element={<Browse />} />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
