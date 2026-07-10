import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import LogInteraction from "../pages/LogInteraction";
import NotFound from "../pages/NotFound";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout/>}>
          <Route path="/" element={<LogInteraction />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;