import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Focus from "./Components/Focus";
import reportWebVitals from './reportWebVitals';
import { BrowserRouter,Routes, 
  Route} from "react-router-dom";
  
// eslint-disable-next-line no-lone-blocks
{/* <Routes>
<Route path="/" element={<App />} />
<Route path="./Component/Focus" element={<Focus />} />
</Routes> */} 


// Δουλευουν και τα δυο 

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>

    <Routes> 
    
      <Route exact path="/" element={<App />} />
      <Route exact path="/Focus/:id" element={<Focus />} />

    </Routes>


  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
