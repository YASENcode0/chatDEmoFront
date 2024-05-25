import logo from './logo.svg';
import './App.css';
import Note from './components/Note';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {

  const [Notes,setNotes] = useState([{}])
  const [value,setValue] = useState('')


useEffect(()=>{
  getAll()
  console.log(Notes)
},[])

 async function addNote(txt){
    console.log(txt)
    setNotes([...Notes,{content:txt}])
    await axios.post('https://chat-demo-flame.vercel.app/addone',{content:txt,__id:Date.now()})
  }

async function getAll(){

  await axios.get('https://chat-demo-flame.vercel.app/getall').then(res => {
    console.log(res)
    setNotes(res.data.response)
    console.log(res.data.response," :  data ")
  })

}

  return (
    <div className="App">
      <div>
        <label>Note</label>
        <input value={value} onChange={(e)=>{setValue(e.target.value)}}/>
        <button onClick={()=>{
          addNote(value)
        }}>add</button>
      </div>
      <h3>all notes</h3>
      <div className='all-notes'>
        {Notes ? Notes.map(i => <Note txt={i.content}/>) : ''}
      </div>
    </div>
  );
}

export default App;
