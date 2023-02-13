import "./App.css";
import Disclosures from "./Component/Disclosures/Disclosures";
import DisclosureComp from "./Component/OverviewPage/DisclosuresComp/Disclosure";
import OverviewPage from "../src/Component/OverviewPage/Overview";
import Navbar from "../src/Layout/Navbar/Navbar";

// Import Routes
import { BrowserRouter, Route, Routes, NavLink } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<OverviewPage />} />
          <Route path="/DisclosuresPage" exact element={<Disclosures />} />

          <Route
            path="/DisclosuresPage/:individualID"
            exact
            element={<Disclosures />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
