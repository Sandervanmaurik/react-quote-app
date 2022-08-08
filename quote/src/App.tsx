import React, { useEffect, useState, createContext } from 'react';
import './App.scss';
import Home from './pages/home/home';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import VisitorContextProvider, { useVisitor } from './contexts/visitorContext';
import LoadingCircle from './components/loadingCircle/loadingCircle';

function App() {

  const { visitorLoading } = useVisitor();

  function AppContent({ isLoading }: any) {
    if (isLoading) {
      return <div className='loader-wrapper'>
        <LoadingCircle color='primary' height='100px' width='100px' loadingText=''></LoadingCircle>
      </div>
    }
    else {
      return (
        <BrowserRouter>
          < Routes >
            <Route path="/" element={<Home />}></Route>
          </Routes >
        </BrowserRouter>
      );
    }
  }

  return (
    <AppContent isLoading={visitorLoading}></AppContent>
  )
}
export default App;
