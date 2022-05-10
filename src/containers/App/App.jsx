import PeoplePage from "@containers/PeoplePage";
import HomePage from "@containers/HomePage";
import Header from '@components/Header'

import {BrowserRouter, Route, Routes } from "react-router-dom";
import routesConfig from "@routes/routesConfig";

import styles from "./App.module.css";

const App = () => {
  return (
    <>

    <BrowserRouter>
      
      <div className={styles.wrapper}>
<Header/>
<Routes>

{routesConfig.map((route, index) => (
  <Route 
  key={index}
  path={route.path} 
  element={route.element} />
))}

</Routes>
</div>
</BrowserRouter>
      
    </>
  );
};
export default App;
