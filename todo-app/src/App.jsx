import { Routes, Route } from 'react-router-dom'

import './App.css'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<p>대시보드</p>} />
        <Route path="/todos" element={<p>todo 목록</p>} />
        <Route path="/todos/:id" element={<p>todo 상세</p>} />
        <Route path="/category/:category" element={<p>카테고리별 todo</p>} />
        <Route path="*" element={<p>Not Found</p>} />
      </Routes>
    </>
  )
}

export default App
