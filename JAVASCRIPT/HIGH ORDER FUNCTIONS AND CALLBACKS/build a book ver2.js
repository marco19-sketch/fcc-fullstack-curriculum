const books = [
  {
    title: "The Silent Sea",
    authorName: "Clive Cussler",
    releaseYear: 2010,
  },
  {
    title: "Atomic Habits",
    authorName: "James Clear",
    releaseYear: 2018,
  },
  {
    title: "The Hobbit",
    authorName: "J.R.R. Tolkien",
    releaseYear: 1937,
  },
  {
    title: "1984",
    authorName: "George Orwell",
    releaseYear: 1949,
  },
  {
    title: "The Pragmatic Programmer",
    authorName: "Andrew Hunt",
    releaseYear: 1999,
  },
];

const sortByYear = (book1, book2) => {
  if (book1.releaseYear < book2.releaseYear) {
    return -1;
  } else if (book1.releaseYear > book2.releaseYear) {
    return 1;
  } else {
    return 0;
  }
};

const filteredBooks = books.filter(book => book.releaseYear > 1950);

const sorted = filteredBooks.sort(sortByYear);

console.log(sorted);
