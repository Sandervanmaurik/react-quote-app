import React, { useEffect, useState, createContext } from 'react';
import './App.scss';
import Home from './pages/home/home';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorHandler from './utils/errorHandler';
import VisitorContextProvider, { useVisitor } from './contexts/visitorContext';
import LoadingCircle from './components/loadingCircle/loadingCircle';

function App() {

  const { isLoading } = useVisitor();

  function AppContent({ isLoading }: any) {
    if (isLoading) {
      return <div className='loader-wrapper'>
        <LoadingCircle color='primary' height='100px' width='100px' ></LoadingCircle>
      </div>
    }
    else {
      return (
        <ErrorBoundary FallbackComponent={ErrorHandler}>
          <BrowserRouter>
            < Routes >
              <Route path="/" element={<Home />}></Route>
            </Routes >
          </BrowserRouter>
        </ErrorBoundary>
      );
    }
  }

  return (
    <AppContent isLoading={isLoading}></AppContent>
  )
}
export default App;
