import * as React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom"

import Transactions from "./components/component/dashboard";
import Login from "./components/component/login";
import Register from "./components/component/register";
import { Toaster } from "react-hot-toast";

export function App() {

  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route path='/' element={ <Transactions /> }/>
        <Route path='/login' element={ <Login /> }/>
        <Route path='/register' element={ <Register /> }/> 
      </Routes>
    </BrowserRouter>
  );
}
