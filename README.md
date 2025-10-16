# Simple REST API with Next.js + MUI

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)
![MUI](https://img.shields.io/badge/MUI-007FFF?style=for-the-badge&logo=mui&logoColor=white)

## 📌 Deskripsi

Project ini bertujuan untuk **melatih pembuatan REST API menggunakan JavaScript dan framework Next.js**.  
Project ini merupakan bagian dari **test teknis peserta Magang Hub Kementerian Ketenagakerjaan (Kemnaker)**.

Aplikasi ini menyediakan **API sederhana untuk manajemen data user** serta **tampilan front-end sederhana** menggunakan Material UI (MUI).  
Semua data disimpan secara **lokal di file `users.json`**, sehingga **tidak tersimpan permanen di server**.

---

## 🧭 Table of Contents

- [Deskripsi](#-deskripsi)
- [✨ Fitur](#-fitur)
- [🖼️ Overview](#-overview)
- [⚠️ Warning](#️-warning)
- [🧰 Prerequisites](#-prerequisites)
- [⚙️ Installation](#️-installation)
- [🚀 Usage](#-usage)
- [📡 API Endpoint](#-api-endpoint)
- [📄 License](#-license)

---

## ✨ Fitur

- ✅ Menampilkan daftar user (GET)
- ➕ Menambahkan user baru (POST)
- ✏️ Mengedit user (PUT)
- 🗑️ Menghapus user (DELETE)
- 👤 Melihat user berdasarkan ID (GET by ID)
- 🖼️ Tampilan tabel dengan **Material UI**
- 🔔 Snackbar notification saat aksi berhasil/gagal

---

## 🖼️ Overview

Tampilan utama berisi tabel daftar user dengan tombol:
- **Tambah** → membuka modal form untuk POST user
- **Edit** → membuka modal untuk PUT user
- **Delete** → konfirmasi penghapusan user

Semua data API tersimpan di `data/users.json` dan diambil oleh komponen menggunakan `fetch()`.

---

## ⚠️ Warning

- Data yang disimpan bersifat **sementara**, karena file `users.json` tidak dapat ditulis permanen di Vercel.  
- Saat server redeploy, semua data akan kembali ke kondisi awal.
- Project ini cocok untuk **demo teknis** atau **latihan CRUD**, bukan untuk produksi.

---

## 🧰 Prerequisites

- [Node.js](https://nodejs.org/) v18 atau lebih baru
- [npm](https://www.npmjs.com/) atau [yarn](https://yarnpkg.com/)

---

## ⚙️ Installation

```bash
# Clone repository
git clone https://github.com/yourksatra/yourksatra-next-api
cd yourksatra-next-api

# Install dependencies
npm install

# Jalankan server development
npm run dev

```
---

## 🚀 Usage
```bash
#Setelah server berjalan, buka browser di:
http://localhost:3000

```
---

## 📡 API Endpoint

| Method | Endpoint          | Deskripsi                    | Status |
|--------|--------------------|-------------------------------|--------|
| GET    | `/api/users`       | Ambil semua user              | ✅     |
| GET    | `/api/users/:id`   | Ambil user berdasarkan ID     | ✅     |
| POST   | `/api/users`       | Tambah user baru              | ✅     |
| PUT    | `/api/users/:id`   | Update user                   | ✅     |
| DELETE | `/api/users/:id`   | Hapus user                    | ✅     |

---

## 📄 License

- MIT License © 2025 — Created for technical test Hub Kemnaker.