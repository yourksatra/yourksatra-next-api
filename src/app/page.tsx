"use client";

import { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Snackbar,
  Alert,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function UserPage() {
  // Types
  type User = { id: number; name: string; email: string };
  type SnackbarState = { open: boolean; message: string; severity: 'success' | 'error' | 'info' | 'warning' };

  // 📌 State
  const [users, setUsers] = useState<User[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  // 📢 Snackbar
  const [snackbar, setSnackbar] = useState<SnackbarState>({ open: false, message: '', severity: 'success' });

  const showSnackbar = (message: string, severity: SnackbarState['severity']) => {
    setSnackbar({ open: true, message, severity });
  };

  // 📬 Validasi Email
  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // 🧭 Fetch Data (GET)
  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/users');
      if (!res.ok) throw new Error('Gagal mengambil data user');
      const data = await res.json();
      setUsers(data as User[]);
    } catch (err) {
      showSnackbar('Gagal mengambil data user', 'error');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ➕ Tambah User (POST)
  const handleAddUser = async () => {
    if (!name.trim() || !email.trim()) {
      showSnackbar('Nama dan email wajib diisi', 'error');
      return;
    }
    if (!isValidEmail(email)) {
      showSnackbar('Format email tidak valid', 'error');
      return;
    }

    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email }),
      });

      if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));
          throw new Error((errorData as any).error || 'Gagal menambah user');
      }

      await fetchUsers();
      setOpenModal(false);
      setName('');
      setEmail('');
      showSnackbar('User berhasil ditambahkan', 'success');
    } catch (err) {
      showSnackbar((err as any)?.message || 'Gagal menambah user', 'error');
    }
  };

  // ✏️ Edit User (PUT)
  const handleEditUser = async () => {
    if (!selectedUser) return;

    if (!name.trim() || !email.trim()) {
      showSnackbar('Nama dan email wajib diisi', 'error');
      return;
    }
    if (!isValidEmail(email)) {
      showSnackbar('Format email tidak valid', 'error');
      return;
    }

    try {
      const res = await fetch(`/api/users/${selectedUser.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error((errorData as any).error || 'Gagal memperbarui user');
      }

      await fetchUsers();
      setOpenEditModal(false);
      setSelectedUser(null);
      showSnackbar('User berhasil diperbarui', 'success');
    } catch (err: any) {
      showSnackbar(err?.message || 'Gagal memperbarui user', 'error');
    }
  };

  // 🗑️ Hapus User (DELETE)
  const handleDeleteUser = async () => {
    if (!selectedUser) return;
    try {
      const res = await fetch(`/api/users/${selectedUser.id}`, { method: 'DELETE' });

      if (!res.ok) throw new Error('Gagal menghapus user');
      await fetchUsers();
      setOpenDeleteDialog(false);
      setSelectedUser(null);
      showSnackbar('User berhasil dihapus', 'success');
    } catch (err) {
      showSnackbar((err as any)?.message || 'Gagal menghapus user', 'error');
    }
  };

  return (
    <Container sx={{ mt: 5 }}>
      {/* Heading */}
      <Typography variant="h4" align="center" gutterBottom>
        👤 Tabel Sederhana Daftar User (REST API)
      </Typography>

      {/* Tombol Tambah */}
      <Button variant="contained" color="primary" sx={{ mb: 3 }} onClick={() => setOpenModal(true)}>
        Tambah User
      </Button>

      {/* Tabel User */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nama</TableCell>
              <TableCell>Email</TableCell>
              <TableCell align="center">Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell align="center">
                  <IconButton
                    color="primary"
                    onClick={() => {
                      setSelectedUser(user);
                      setName(user.name);
                      setEmail(user.email);
                      setOpenEditModal(true);
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => {
                      setSelectedUser(user);
                      setOpenDeleteDialog(true);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal Tambah */}
      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <DialogTitle>Tambah User</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <TextField label="Nama" fullWidth value={name} onChange={(e) => setName(e.target.value)} />
          <TextField label="Email" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModal(false)}>Batal</Button>
          <Button variant="contained" color="primary" onClick={handleAddUser}>
            Simpan
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modal Edit */}
      <Dialog open={openEditModal} onClose={() => setOpenEditModal(false)}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <TextField label="Nama" fullWidth value={name} onChange={(e) => setName(e.target.value)} />
          <TextField label="Email" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditModal(false)}>Batal</Button>
          <Button variant="contained" color="primary" onClick={handleEditUser}>
            Update
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog Delete */}
      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>Hapus User</DialogTitle>
        <DialogContent>
          <Typography>
            Apakah Anda yakin ingin menghapus user <strong>{selectedUser?.name}</strong>?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>Batal</Button>
          <Button variant="contained" color="error" onClick={handleDeleteUser}>
            Hapus
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          severity={snackbar.severity}
          variant="filled"
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}
