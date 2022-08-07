import React, { useEffect, useState } from 'react';
import './App.scss';
import Home from './pages/home/home';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import NavigationBar from './components/navigationBar/navigationBar';
import { Quote } from './models/quote';
import { doRequest } from './utils/utils';

function App() {

  return (
    <BrowserRouter>
      < Routes >
        <Route path="/" element={<Home />}></Route>
      </Routes >
    </BrowserRouter>
  );

}

export default App;
