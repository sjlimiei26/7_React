import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// react-grid-layout과 react-resizable의 기본 스타일을 전역으로 불러와야 리사이즈 핸들이 정상 표시됩니다.
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import './styles/tokens.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
