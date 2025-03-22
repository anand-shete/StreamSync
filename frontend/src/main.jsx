import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom"; // ✅ Fixed Import
import "./index.css";
import { Home } from "./pages";
import { Navbar, Footer } from "./components/common"; // ✅ Ensure these exist

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div className="flex flex-col min-h-screen">
        
        <main className="flex-grow">
          <Home />
        </main>
        <Footer /> {/* ✅ Footer at the bottom */}
      </div>
    ),
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
