import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeProvider";

const HomePage = lazy(() => import("./pages/Home/HomePage"));

const PageLoader = () => (
  <div className="flex min-h-screen items-center justify-center bg-[var(--color-bg)] text-[var(--color-text-soft)]">
    Loading portfolio...
  </div>
);

function App() {
  return (
    <ThemeProvider>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
