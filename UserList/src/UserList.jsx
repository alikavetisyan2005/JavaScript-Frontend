export const UserList = ({ users = [], handleRemove }) =>{
    
    return (
        <table className="table solid table-bordered table-striped">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Email</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                
                {users.map((user,index) => (
                    <tr key = {index}>
                        <td>{user.name}</td>
                        <td>{user.age}</td>
                        <td>{user.email}</td>
                        <td>
                            <button className="btn btn-danger" onClick={() => handleRemove(user)}>
                                Delete
                            </button>
                        </td>
                    </tr> 
                ))}
            </tbody>
        </table>
    )
}