import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import reportWebVitals from './reportWebVitals';
import Header from './Components/Header';
import Footer from './Footer';
import Dashboard from './dashboard';
import Report from './report';
import File from './file';
import Login from './login';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path="/report" element={<Report />} />
        <Route path="/file" element={<File/>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
