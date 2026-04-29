import { useState } from 'react'

import { Form } from './Form';

import { Table } from './Table';

function App(){
  
  const [form,setForm] = useState({
    text: ""
  });

  const [task,setTask] = useState([])
  
  const handleChange = (e) =>{
  
    setForm({...form, text: e.target.value})
  }

  const handleSubmit = (e) =>{
    e.preventDefault();

    if(!e){
      console.log("err")
      return;
    } ///chmoranas

    setTask([...task, form.text])

    setForm({
      text: "",
    });
  }

  const handleRemove = (t) =>{
    setTask(prevTask => prevTask.filter((task) => task !== t))
  } 

  return (

    <>
    <Form form={form} onSubmit={handleSubmit} onChange={handleChange}/>
    <Table task={task} onRemove={handleRemove}/>
    </>
  )
}

export default App
