export const Form = ({form, onSubmit,onChange}) =>{
    return(
    <div className='d-flex justify-content-center align-items-center vh-100'>

  
      <form className='text-center' onSubmit={onSubmit}>
        <h1>To Do List 2</h1>
        <h3>Add To do</h3>
        
      <div className="d-flex gap-2 mt-3">
        <input type="text" className='form-control' value={form.text} onChange={onChange}/>
        <button className='btn btn-primary'>Add</button>
      </div>
      </form>
    
    </div>
    )
}