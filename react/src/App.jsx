import { useEffect, useState } from "react";
import "./App.css";

const API = "http://localhost:3000/api";

export default function App() {
  const [books, setBooks] = useState([]);
  const [bookId, setBookId] = useState("");
  const [role, setRole] = useState("user");
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");

  const [detail, setDetail] = useState(null);

  const [form, setForm] = useState({
    title: "",
    author: "",
    stock: ""
  });

  // ========================
  const getBooks = async () => {
    const res = await fetch(`${API}/books`);
    const data = await res.json();
    setBooks(data);
  };

  // ========================
  const getDetail = async (id) => {
    const res = await fetch(`${API}/books/${id}`);
    const data = await res.json();
    setDetail(data);
  };

  // ========================
  const borrowBook = async () => {
    try {
      const res = await fetch(`${API}/borrow`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-user-role": "user",
          "x-user-id": 1
        },
        body: JSON.stringify({
          bookId: Number(bookId),
          latitude: -6.2088,
          longitude: 106.8456
        })
      });

      const data = await res.json();

      setMessage(data.message);
      setType(res.ok ? "success" : "error");
      getBooks();

    } catch {
      setMessage("Server tidak merespon");
      setType("error");
    }
  };

  // ========================
  const addBook = async () => {
    const res = await fetch(`${API}/books`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-user-role": "admin"
      },
      body: JSON.stringify(form)
    });

    const data = await res.json();
    setMessage(data.message || "Buku ditambahkan");
    setType("success");
    setForm({ title: "", author: "", stock: "" });
    getBooks();
  };

  // ========================
  const deleteBook = async (id) => {
    await fetch(`${API}/books/${id}`, {
      method: "DELETE",
      headers: { "x-user-role": "admin" }
    });
    getBooks();
  };

  useEffect(() => {
    getBooks();
  }, []);

  return (
    <div className="container">
      <h1>📚 Library System</h1>

      <div className="role">
        Mode:
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      {/* ================= USER ================= */}
      {role === "user" && (
        <>
          <h2>Daftar Buku</h2>

          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Judul</th>
                <th>Penulis</th>
                <th>Stok</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {books.map((b) => (
                <tr key={b.id}>
                  <td>{b.id}</td>
                  <td>{b.title}</td>
                  <td>{b.author}</td>
                  <td>{b.stock}</td>
                  <td className="actions">
                    <button onClick={() => getDetail(b.id)}>
                      Detail
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <h2>Pinjam Buku</h2>

          <input
            type="number"
            placeholder="Book ID"
            value={bookId}
            onChange={(e) => setBookId(e.target.value)}
          />

          <button onClick={borrowBook}>Pinjam</button>
        </>
      )}

      {/* ================= ADMIN ================= */}
      {role === "admin" && (
        <>
          <h2>Admin Panel</h2>

          <input
            placeholder="Judul"
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
          />

          <input
            placeholder="Penulis"
            value={form.author}
            onChange={(e) =>
              setForm({ ...form, author: e.target.value })
            }
          />

          <input
            type="number"
            placeholder="Stok"
            value={form.stock}
            onChange={(e) =>
              setForm({ ...form, stock: e.target.value })
            }
          />

          <button onClick={addBook}>Tambah Buku</button>

          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Judul</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {books.map((b) => (
                <tr key={b.id}>
                  <td>{b.id}</td>
                  <td>{b.title}</td>
                  <td>
                    <button onClick={() => deleteBook(b.id)}>
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {/* ================= MODAL DETAIL ================= */}
      {detail && (
        <div className="modal" onClick={() => setDetail(null)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <h3>Detail Buku</h3>
            <p><b>ID:</b> {detail.id}</p>
            <p><b>Judul:</b> {detail.title}</p>
            <p><b>Penulis:</b> {detail.author}</p>
            <p><b>Stok:</b> {detail.stock}</p>

            <button onClick={() => setDetail(null)}>Tutup</button>
          </div>
        </div>
      )}

      {message && (
        <div className={`alert ${type}`}>{message}</div>
      )}
    </div>
  );
}
