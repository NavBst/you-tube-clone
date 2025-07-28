import { Outlet } from "react-router-dom";
import Logo from "./components/header/Logo";
import Header from "./components/header/Header";

const App = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default App;
