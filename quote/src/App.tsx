import React from 'react';
import './App.scss';
import Home from './pages/home/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import  { useVisitor } from './contexts/visitorContext';
import LoadingCircle from './components/LoadingCircle/LoadingCircle';

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
