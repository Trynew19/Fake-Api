// src/main.jsx
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // Ensure Tailwind CSS is imported
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
    
   <BrowserRouter>
    <App />
    </BrowserRouter>
  
);
