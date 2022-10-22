import React from 'react';
import { Toaster } from 'react-hot-toast';
import './App.css';
import Router from "./Router";

function App() {
  return (
    <div>
      <Router/>
      <Toaster
        position="bottom-center"
        reverseOrder={false}
        toastOptions={{ duration: 5000 }}
      />
    </div>
    
  );
}

export default App;
