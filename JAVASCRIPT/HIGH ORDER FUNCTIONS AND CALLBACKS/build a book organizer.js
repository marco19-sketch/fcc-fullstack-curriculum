const library = [
  {
    title: "Catching the Sun",
    authorName: "Tony Parsons",
    releaseYear: 2013,
  },
  {
    title: "La Très Catastrophique Visite du Zoo",
    authorName: "Joël Dicker",
    releaseYear: 2025,
  },
  {
    title: "Language and reading disabilities",
    authorName: "Alan G. Kamhi, Hugh W. Catts",
    releaseYear: 2012,
  },
  {
    title: "Global university rankings and the politics of knowledge",
    authorName: "Michelle Stack",
    releaseYear: 2021,
  },
  {
    title: "Simon's Cat vs. the World",
    authorName: "Simon Tofield",
    releaseYear: 2024,
  },
  {
    title: "A Girl Within a Girl Within a Girl",
    authorName: "Nanda Reddy",
    releaseYear: 2015,
  },
];

/*function sortByYear(catalog) {
    const sorted = catalog.sort((bookA, bookB) => bookA.releaseYear - bookB.releaseYear);
    return sorted;
}*/

/*function sortByYear(book1, book2) {
  return library.sort((book1, book2) => book1.releaseYear - book2.releaseYear);
}*/

function sortByYear(book1, book2) {
  if (book1.releaseYear < book2.releaseYear) {
    return -1;
  }
  if (book1.releaseYear > book2.releaseYear) {
    return 1;
  } else {
    return 0;
  }
}

const filteredBooks = library.filter(book => book.releaseYear > 2015);
filteredBooks.sort(sortByYear);

console.log(filteredBooks);
console.log(filteredBooks.length);
console.log(sortByYear(library[0], library[3]));
console.log(library.map((book) => typeof book.releaseYear));


