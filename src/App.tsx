import * as React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom"

import Transactions from "./components/component/dashboard";
import Login from "./components/component/login";
import Register from "./components/component/register";

export function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/transaction' element={ <Transactions /> }/>
        <Route path='/login' element={ <Login /> }/>
        <Route path='/register' element={ <Register /> }/> 
      </Routes>
    </BrowserRouter>
  );
}
