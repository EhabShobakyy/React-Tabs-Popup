import "./App.css";
import Disclosures from "./Component/Disclosures/Disclosures";
import DisclosureComp from "../src/Component/OverviewPage/Disclosures/Disclosure";
import Navbar from "../src/Layout/Navbar/Navbar";

// Import Routes
import { BrowserRouter, Route, Routes, NavLink } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<DisclosureComp />} />
          <Route path="/Disclosures" exact element={<Disclosures />} />

          <Route
            path="/Disclosures/:individualID"
            exact
            element={<Disclosures />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
