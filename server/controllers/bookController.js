const { Book } = require("../models");

exports.getAllBooks = async (req, res) => {
  const books = await Book.findAll();
  res.json(books);
};

exports.getBookById = async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  res.json(book);
};

exports.createBook = async (req, res) => {
  const { title, author, stock } = req.body;

  if (!title || !author) {
    return res.status(400).json({
      message: "Title dan author wajib diisi"
    });
  }

  const book = await Book.create({ title, author, stock });
  res.json(book);
};

exports.updateBook = async (req, res) => {
  await Book.update(req.body, {
    where: { id: req.params.id }
  });

  res.json({ message: "Buku berhasil diupdate" });
};

exports.deleteBook = async (req, res) => {
  await Book.destroy({
    where: { id: req.params.id }
  });

  res.json({ message: "Buku berhasil dihapus" });
};
