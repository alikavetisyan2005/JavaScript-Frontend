import { use, useState } from "react"

export const Table = ({task, onRemove}) =>{
    
    return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-6">

          <div className="card shadow-sm">
            <div className="card-body">

              <h4 className="text-center mb-3">Your Tasks</h4>
        
        {task.length === 0 ? (
            <p>No tasks yet</p>
        ): (<ul className="list-group">
         {task.map((t, index) => (
                    <li
                      key={index}
                      className="list-group-item d-flex justify-content-between align-items-center"
                    >
                      <span>{t}</span>

                      <button className="btn btn-sm btn-outline-danger" onClick={() => onRemove(t)}>
                        ✕
                      </button>
                      <button className="btn btn-sm btn-outline-success" onClick={() => onRemove(t)}>
                        ✓
                      </button>
                    </li>
                  ))}
       
        </ul>
        )
}
        </div>      
        </div>
        </div>
        </div>
        </div>
);
}