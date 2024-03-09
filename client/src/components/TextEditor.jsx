import { useEffect, useState } from "react"
import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css'
import {io} from "socket.io-client"

function TextEditor() {
  const [value, setValue] = useState('')
  const [socket, setSocket] = useState()
  const [quill, setQuill] = useState()

   useEffect(() => {
    const s =  io("http://localhost:3003")
    setSocket(s)

    return () => {
      socket.disconnect()
    }

   }, [])

    // delta
   useEffect(() => {
      const handler = (delta, oldDelta, source) => {
        if(source !== 'user') return;
        socket.emit("send-changes", delta)
       }
      quill.on('text-change', handler);

      return () => {
        quill.off('text-change', handler)
      }

   }, [socket, quill])

  const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],
    ['link', 'image', 'video', 'formula'],
  
    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
    [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction
  
    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  
    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],
  
    ['clean']                                         // remove formatting button
  ];
  
  const module = {
    toolbar: toolbarOptions
  }

  return (
    <ReactQuill  className="container" theme="snow" value={value} onChange={setValue} modules={module} />
  )
}

export default TextEditor