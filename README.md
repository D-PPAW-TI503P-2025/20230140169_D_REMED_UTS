- Mata Kuliah : Pengembangan Aplikasi Web  
- Praktikum   : Remedial UCP 1  

## Deskripsi Aplikasi
Aplikasi ini merupakan sistem backend manajemen perpustakaan sederhana berbasis REST API yang dibuat untuk memenuhi tugas **Remedial UCP 1** sesuai modul praktikum. Aplikasi memiliki fitur peminjaman buku dengan pencatatan lokasi (geolocation) berupa latitude dan longitude. Frontend React dibuat sebagai **tampilan demo sederhana**, sedangkan seluruh proses bisnis dan validasi dilakukan sepenuhnya pada backend.

## Fitur Aplikasi
🔹 Public
- Melihat semua buku
- Melihat detail buku

🔹 Admin Mode  
(Header: `x-user-role: admin`)
- Menambah buku
- Mengubah buku
- Menghapus buku

🔹 User Mode  
(Header: `x-user-role: user`, `x-user-id`)
- Meminjam buku
- Sistem mengurangi stok buku secara otomatis
- Sistem mencatat lokasi peminjaman ke database

## Teknologi yang Digunakan
- Node.js
- Express.js
- Sequelize ORM
- MySQL (MySQL Workbench)
- React (Frontend Demo)
- Postman

## Cara Menjalankan Aplikasi
1. Backend
Masuk ke folder backend:
- cd server
- npm install

🔹Buat database menggunakan MySQL Workbench:
- CREATE DATABASE library_db;

🔹Jalankan server:
- node server.js
Jika berhasil:
Server running on port 3000
Database ready

2. Frontend (Demo)
🔹Masuk ke folder frontend:
- cd react
- npm install
- npm run dev

🔹Akses melalui browser:
http://localhost:5173

### Endpoint API 
🔹Public
GET /api/books
GET /api/books/:id

🔹Admin
Header:
x-user-role: admin
POST /api/books
PUT /api/books/:id
DELETE /api/books/:id

🔹User
Header:
x-user-role: user
x-user-id: 1
POST /api/borrow
Body:
{
  "bookId": 1,
  "latitude": -6.2088,
  "longitude": 106.8456
}

### Geolocation
Latitude dan longitude dikirim dari sisi client (frontend atau Postman) melalui request body, kemudian disimpan oleh backend ke dalam database sebagai catatan lokasi peminjaman buku.

## Admin
Tambah buku baru
![alt text](<ss/Tambah buku.png>)
Update buku
![alt text](<ss/Update buku.png>)
Delete buku
![alt text](<ss/Delete buku.png>)
Jika title dan author kosong
![alt text](<ss/Jika title dan author kosong.png>)

## User
Pinjam buku
![alt text](<ss/Pinjam buku.png>)

## Public
Melihat semua buku
![alt text](<ss/Lihat semua buku.png>)
Detail buku
![alt text](<ss/Lihat detail buku.png>)
Data buku setelah delete
![alt text](<ss/Data setelah delete.png>)

## Database
table books
![alt text](<ss/Database sebelum ada data yang dihapus.png>)
![alt text](<ss/Database akhir.png>)
table borrowlogs
![alt text](<ss/Database borrowLogs.png>)

## Tampilan
![alt text](<ss/Tampilan semua buku.png>)
![alt text](<ss/Tampilan detail.png>)
![alt text](<ss/Tampilan admin.png>)
