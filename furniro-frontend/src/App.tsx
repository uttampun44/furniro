import { BrowserRouter } from "react-router-dom";
import ContextProvider from "../context/ContextProvider";
import AppRoutes from "./AppRoutes"; 

function App() {
  return (
    <ContextProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ContextProvider>
  );
}

export default App;
