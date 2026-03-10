import AppErrorBoundary from "./components/ui/AppErrorBoundary";
import { ThemeProvider } from "./context/ThemeProvider";
import HomePage from "./pages/Home/HomePage";

function App() {
  return (
    <AppErrorBoundary>
      <ThemeProvider>
        <HomePage />
      </ThemeProvider>
    </AppErrorBoundary>
  );
}

export default App;
