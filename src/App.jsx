import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./layouts/Layout";

import Home from "./pages/Home";
import About from "./pages/About";
import Destinations from "./pages/Destinations";
import DestinationDetails from "./pages/DestinationDetails";
import Trails from "./pages/Trails";
import TrailDetails from "./pages/TrailDetails";
import Stories from "./pages/stories";
import StoryDetails from "./pages/StoryDetails";
import PlanYourTrail from "./pages/PlanYourTrail";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route element={<Layout />}>

          {/* HOME */}
          <Route
            path="/"
            element={<Home />}
          />

          {/* ABOUT */}
          <Route
            path="/about"
            element={<About />}
          />

          {/* DESTINATIONS */}
          <Route
            path="/destinations"
            element={<Destinations />}
          />

          {/* STATE DESTINATION PAGE */}
          <Route
            path="/destinations/:stateSlug"
            element={<DestinationDetails />}
          />

          {/* INDIVIDUAL PLACE PAGE */}
          <Route
            path="/destinations/:stateSlug/:placeSlug"
            element={<DestinationDetails />}
          />

          {/* TRAILS */}
          <Route
            path="/trails"
            element={<Trails />}
          />

          <Route
            path="/trails/custom"
            element={<Trails />}
          />

          <Route
            path="/trails/:slug"
            element={<TrailDetails />}
          />

          {/* STORIES */}
          <Route
            path="/stories"
            element={<Stories />}
          />

          <Route
            path="/stories/:slug"
            element={<StoryDetails />}
          />

          {/* PLAN YOUR TRAIL */}
          <Route
            path="/plan-your-trail"
            element={<PlanYourTrail />}
          />

          {/* 404 */}
          <Route
            path="*"
            element={<NotFound />}
          />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;