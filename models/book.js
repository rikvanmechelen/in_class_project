const books = [
  {title: "Leviathan Wakes", publishingYear: 2011, authorId:"1"},
  {title: "Caliban’s War", publishingYear: 2012}
];

exports.add = (book) => {
  books.push(book);
}

exports.all = books

exports.get = (idx) => {
  return books[idx];
}

exports.update = (book) => {
  books[book.id] = book;
}

exports.upsert = (book) => {
  if (book.id) {
    exports.update(book);
  } else {
    exports.add(book);
  }
}