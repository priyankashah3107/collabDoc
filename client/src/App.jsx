import { useState } from 'react'
import TextEditor from './components/TextEditor'


function App() {
  const [count, setCount] = useState(0)

  return (
    <> 
   <TextEditor />
    </>
  )
}

export default App
