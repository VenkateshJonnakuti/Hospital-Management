import { useEffect, useState } from "react";
import logo from "./assets/logo.jpg";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";

function LoginDataTable() {
  const [LoginData, setLoginData] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const [openView, setOpenView] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [editedUser, setEditedUser] = useState({
    name: "",
    phone: "",
    gender: "",
    role: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    fetch("http://localhost:3001/logins")
      .then((res) => res.json())
      .then((data) => {
        setLoginData(data);
      })
      .catch((err) => {
        console.error("Error fetching data", err);
      });
  }, []);

  const handleDelete = (user) => {
    setSelectedUser(user);
    setOpenDelete(true);
  };

  const confirmDelete = () => {
    fetch(`http://localhost:3001/logins/${selectedUser.id}`, {
      method: "DELETE",
    }).then(() => {
      setLoginData(LoginData.filter((user) => user.id !== selectedUser.id));
      setOpenDelete(false);
    });
  };

  const handleView = (user) => {
    setSelectedUser(user);
    setOpenView(true);
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setEditedUser(user);
    setOpenEdit(true);
  };

  const saveEdit = () => {
    fetch(`http://localhost:3001/logins/${editedUser.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editedUser),
    })
      .then((res) => res.json())
      .then((updatedUser) => {
        setLoginData(
          LoginData.map((user) =>
            user.id === updatedUser.id ? updatedUser : user
          )
        );
        setOpenEdit(false);
      });
  };

  return (
    <div className="container mt-5">
      <div className="card p-5 shadow">
        <div className="text-center mb-4">
          <img
            src={logo}
            alt="logo"
            className="img-fluid"
            style={{ maxWidth: "180px" }}
          />
        </div>

        <h3 className="text-center mb-3">All Registered Users</h3>

        <div className="d-flex justify-content-end mb-3">
          <button
            className="btn btn-success"
            onClick={() => window.location.href = "/"}
          >
            ⬅️ Back to Login
          </button>
        </div>

        <div className="table-responsive">
          <table className="table table-striped table-info table-hover table-bordered border-dark text-center">
            <thead className="table-dark">
              <tr>
                <th>SNO</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Gender</th>
                <th>Role</th>
                <th>Email</th>
                <th>Password</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {LoginData.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.phone}</td>
                  <td>{item.gender}</td>
                  <td>{item.role}</td>
                  <td>{item.email}</td>
                  <td>{item.password}</td>
                  <td>
                    <div className="d-flex flex-wrap gap-2 justify-content-center">
                      <button
                        className="btn btn-info btn-sm"
                        onClick={() => handleView(item)}
                      >
                        View
                      </button>
                      <button
                        className="btn btn-warning btn-sm"
                        onClick={() => handleEdit(item)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(item)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Dialog */}
      <Dialog open={openView} onClose={() => setOpenView(false)} fullWidth maxWidth="sm">
        <DialogTitle>User Details</DialogTitle>
        <DialogContent>
          <p><strong>Name:</strong> {selectedUser?.name}</p>
          <p><strong>Phone:</strong> {selectedUser?.phone}</p>
          <p><strong>Gender:</strong> {selectedUser?.gender}</p>
          <p><strong>Role:</strong> {selectedUser?.role}</p>
          <p><strong>Email:</strong> {selectedUser?.email}</p>
          <p><strong>Password:</strong> {selectedUser?.password}</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenView(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={openEdit} onClose={() => setOpenEdit(false)} fullWidth maxWidth="sm">
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            value={editedUser.name}
            onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
            fullWidth margin="normal"
          />
          <TextField
            label="Phone"
            value={editedUser.phone}
            onChange={(e) => setEditedUser({ ...editedUser, phone: e.target.value })}
            fullWidth margin="normal"
          />
          <TextField
            label="Gender"
            value={editedUser.gender}
            onChange={(e) => setEditedUser({ ...editedUser, gender: e.target.value })}
            fullWidth margin="normal"
          />
          <TextField
            label="Role"
            value={editedUser.role}
            onChange={(e) => setEditedUser({ ...editedUser, role: e.target.value })}
            fullWidth margin="normal"
          />
          <TextField
            label="Email"
            value={editedUser.email}
            onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
            fullWidth margin="normal"
          />
          <TextField
            label="Password"
            value={editedUser.password}
            onChange={(e) => setEditedUser({ ...editedUser, password: e.target.value })}
            fullWidth margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEdit(false)}>Cancel</Button>
          <Button onClick={saveEdit} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDelete} onClose={() => setOpenDelete(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete <strong>{selectedUser?.name}</strong>?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDelete(false)}>Cancel</Button>
          <Button onClick={confirmDelete} variant="contained" color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default LoginDataTable;
