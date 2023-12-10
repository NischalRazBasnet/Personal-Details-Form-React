import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header";
import Home from "./Components/Home";
import { Table } from "./Components/Table";
import { Tab } from "bootstrap";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <Home />
                <Table />
              </div>
            }
          />

          <Route path="/table" element={<Table />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
