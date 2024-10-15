import React from 'react';
import { createRoot } from 'react-dom/client'
import './index.css';
import App from './App';

const dom = document.getElementById("root") as HTMLElement
const root = createRoot(dom)
root.render(<App />)
