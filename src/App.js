import HomePage from "./pages/home";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "antd/dist/antd.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
