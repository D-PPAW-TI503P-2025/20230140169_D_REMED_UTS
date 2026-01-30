const { Book, BorrowLog } = require("../models");

exports.borrowBook = async (req, res) => {
  const { bookId, latitude, longitude } = req.body;

  const book = await Book.findByPk(bookId);

  if (!book || book.stock <= 0) {
    return res.status(400).json({
      message: "Stok buku habis"
    });
  }

  book.stock -= 1;
  await book.save();

  const borrow = await BorrowLog.create({
    userId: req.userId,
    bookId,
    latitude,
    longitude
  });

  res.json({
    message: "Berhasil meminjam buku",
    data: borrow
  });
};
