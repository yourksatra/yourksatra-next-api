# Simple REST API with Next.js + MUI

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)
![MUI](https://img.shields.io/badge/MUI-007FFF?style=for-the-badge&logo=mui&logoColor=white)

## 📌 Deskripsi

Project ini bertujuan untuk **melatih pembuatan REST API menggunakan JavaScript dan framework Next.js**.  
Project ini merupakan bagian dari **test teknis peserta Magang Hub Kementerian Ketenagakerjaan (Kemnaker)**.

Aplikasi ini menyediakan **API sederhana untuk manajemen data user** serta **tampilan front-end sederhana** menggunakan Material UI (MUI).  
Data API menggunakan:
- 🖥️ **File lokal (`users.json`)** saat development (persisten)
- ☁️ **In-memory storage** saat di-deploy ke Vercel (tidak persisten)

---

## 🧭 Table of Contents

- [Deskripsi](#-deskripsi)
- [✨ Fitur](#-fitur)
- [🖼️ Overview](#-overview)
- [🧪 Test Endpoint API](#-test-endpoint-api)
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
- 🧠 Penyimpanan data otomatis in-memory pada Vercel

---

## 🖼️ Overview

Tampilan utama berisi tabel daftar user dengan tombol:
- **Tambah** → membuka modal form untuk POST user
- **Edit** → membuka modal untuk PUT user
- **Delete** → konfirmasi penghapusan user

📂 Saat development, semua data tersimpan di `src/data/users.json` dan diambil oleh komponen menggunakan `fetch()`.  
☁️ Saat production (Vercel), data hanya tersimpan sementara di memory server.

---

## 🧪 Test Endpoint API

📍 **Halaman utama:**  
👉 [https://yourksatra-next-api.vercel.app](https://yourksatra-next-api.vercel.app)

📍 **Endpoint utama API:**  
👉 [https://yourksatra-next-api.vercel.app/api/users](https://yourksatra-next-api.vercel.app/api/users)

| Method        | Browser Langsung (URL)                           | Postman / Fetch / Curl | Status di Vercel | Deskripsi                                                   |
|---------------|---------------------------------------------------|-------------------------|------------------|--------------------------------------------------------------|
| `GET`         | ✅ Bisa (`/api/users`)                             | ✅ Bisa                 | ✅ Aktif         | Mengambil semua data user                                    |
| `GET (id)`    | ✅ Bisa (`/api/users/1`)                           | ✅ Bisa                 | ✅ Aktif         | Mengambil data user berdasarkan `id`                         |
| `POST`        | ❌ Tidak bisa via browser                          | ✅ Bisa                 | ✅ Aktif         | Menambah user baru                                           |
| `PUT`         | ❌ Tidak bisa via browser                          | ✅ Bisa                 | ✅ Aktif         | Memperbarui data user berdasarkan `id`                       |
| `DELETE`      | ❌ Tidak bisa via browser                          | ✅ Bisa                 | ✅ Aktif         | Menghapus user berdasarkan `id`                              |

---

### 📬 Contoh Request via Postman

#### 1. **Tambah User (POST)**  
- URL: `https://yourksatra-next-api.vercel.app/api/users`  
- Method: `POST`  
- Headers: `Content-Type: application/json`  
- Body:
```json
{
  "name": "Sinta",
  "email": "sinta@example.com"
}
````

---

#### 2. **Update User (PUT)**

* URL: `https://yourksatra-next-api.vercel.app/api/users/1`
* Method: `PUT`
* Headers: `Content-Type: application/json`
* Body:

```json
{
  "name": "Sinta Update",
  "email": "sinta.update@example.com"
}
```

---

#### 3. **Delete User (DELETE)**

* URL: `https://yourksatra-next-api.vercel.app/api/users/1`
* Method: `DELETE`

---

#### ⚠️ Catatan Penting

> 📝 **Data tidak tersimpan permanen saat di Vercel.**
> Vercel menggunakan sistem file **read-only** dan penyimpanan **in-memory**, sehingga:
>
> * Data akan **hilang** saat server di-*restart* atau *re-deploy*.
> * Endpoint POST, PUT, DELETE hanya mengubah data sementara di RAM.
> * Untuk development lokal, perubahan akan tersimpan di `src/data/users.json`.

📂 File lokal:

```
src/data/users.json
```

📡 Untuk penyimpanan data **permanen**, disarankan integrasi database eksternal seperti:

* Supabase
* PlanetScale
* MongoDB Atlas

---

#### 🧭 Tips Tambahan

* Gunakan **Postman**, **cURL**, atau `fetch` untuk menguji semua method API.
* Pastikan `Content-Type` adalah `application/json` saat mengirim body.
* Untuk memverifikasi perubahan, lakukan `GET /api/users` setelah `POST`, `PUT`, atau `DELETE`.

---

## ⚠️ Warning

* Data bersifat **sementara** di Vercel.
* Server Vercel akan mereset data saat redeploy.
* Cocok untuk **demo CRUD**, bukan untuk produksi.

---

## 🧰 Prerequisites

* [Node.js](https://nodejs.org/) v18 atau lebih baru
* [npm](https://www.npmjs.com/) atau [yarn](https://yarnpkg.com/)

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
# Setelah server berjalan, buka browser di:
http://localhost:3000
```

---

## 📡 API Endpoint

| Method | Endpoint         | Deskripsi                 | Status |
| ------ | ---------------- | ------------------------- | ------ |
| GET    | `/api/users`     | Ambil semua user          | ✅      |
| GET    | `/api/users/:id` | Ambil user berdasarkan ID | ✅      |
| POST   | `/api/users`     | Tambah user baru          | ✅      |
| PUT    | `/api/users/:id` | Update user               | ✅      |
| DELETE | `/api/users/:id` | Hapus user                | ✅      |

---

## 📄 License

* MIT License © 2025 — Created for technical test Hub Kemnaker.