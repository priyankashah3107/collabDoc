import { useEffect, useRef, useState } from "react"
import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css'
import {io} from "socket.io-client"

function TextEditor() {
  const [value, setValue] = useState('')
  const [socket, setSocket] = useState()
   const quillRef = useRef(null)

   useEffect(() => {
    const s =  io("http://localhost:3003")
    setSocket(s)

    return () => {
      if(socket){
        socket.disconnect()
      }
      
    }

   }, [])
  
// update the doc value 

useEffect(() => {
  if (socket && quillRef.current) {
    const quill = quillRef.current.getEditor(); // Get Quill instance

    const handler = delta => {
      quill.updateContents(delta);
    };

    socket.on('recive-changes', handler); // Use quill instance to add event handler

    return () => {
      socket.off('recive-changes', handler); // Remove handler on cleanup
    };
  }
}, [socket, quillRef]); // Include quillRef in dependency array

  
   // delta
useEffect(() => {
  if (quillRef.current) {
    const quill = quillRef.current.getEditor(); // Get Quill instance

    const handler = (delta, oldDelta, source) => {
      if (source !== 'user') return;
      socket.emit("send-changes", delta);
    };

    quill.on('text-change', handler); // Use quill instance to add event handler

    return () => {
      quill.off('text-change', handler); // Remove handler on cleanup
    };
  }
}, [socket, quillRef]); // Include quillRef in dependency array


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
    <ReactQuill ref={quillRef} className="container" theme="snow" value={value} onChange={setValue} modules={module} />
  )
}

export default TextEditor