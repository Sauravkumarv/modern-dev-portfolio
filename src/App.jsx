import { ThemeProvider } from "./context/ThemeProvider";
import HomePage from "./pages/Home/HomePage";

function App() {
  return (
    <ThemeProvider>
      <HomePage />
    </ThemeProvider>
  );
}

export default App;
