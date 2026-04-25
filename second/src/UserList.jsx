function UserList({users, onDelete}){
    return(
        <>
        <div className="col-md-4"></div>
        <table className="table table-bordered table-striped">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Actions</th>
                </tr>
            
            </thead>

            <tbody>
                {users.map((u) => (
                    <tr key = {u.id}>
                        <td>{u.name}</td>
                        <td>{u.email}</td>
                        <td>
                            <button onClick={() => onDelete(u.id)}>Delete
                            </button>
                        </td>
                    </tr>   
                ))}
            </tbody>
        </table>
    </>
    )
}

export default UserList