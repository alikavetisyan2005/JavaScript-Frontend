export const AddUser = ({form, handleChange, handleSubmit, error}) => {
    return (
        <form className="container mt-5" style={{ maxWidth: "500px" }} 
        onSubmit={handleSubmit}>
      <div className="card shadow p-4">
        <h3 className="text-center mb-4">Add User</h3>

        {error && <div className="text-danger">{error}</div>}
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            value={form.name}
            type="text"
            name="name"
            className="form-control"
            placeholder="Enter name"
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Age</label>
          <input
            value={form.age}
            type="text"
            name="age"
            className="form-control"
            placeholder="Enter age"
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            value={form.email}
            type="text"
            name="email"
            className="form-control"
            placeholder="Enter email"
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Submit
        </button>
      </div>
    </form>
    )
}