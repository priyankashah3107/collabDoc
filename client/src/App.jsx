
import TextEditor from './components/TextEditor'
import { v4 as uuidv4 } from 'uuid';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";


function App() {
  

  return (
    <> 

<BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to={`/documents/${uuidv4()}`} replace />} />
        <Route path="/documents/:id" element={<TextEditor />} />
      </Routes>
    </BrowserRouter>
  
    </>
  )
}

export default App
