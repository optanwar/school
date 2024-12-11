import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { route } from "./routes";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Router basename="/school">
        <Navbar />
        <Routes>
          {route.map((route) => {
            return (
              <Route
                path={route.path}
                key={route.id}
                element={route.component}
              />
            );
          })}
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
