import { BrowserRouter } from "react-router-dom";
import ContextProvider from "../context/ContextProvider";
import AppRoutes from "./AppRoutes"; 
import {store} from "../store/Store"
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
      <ContextProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ContextProvider>
    </Provider>
  );
}

export default App;
