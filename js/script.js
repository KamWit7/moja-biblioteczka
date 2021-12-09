const qs = (query) => document.querySelector(query)
const create = (elem) => document.createElement(elem)

const booksList = qs(".books")
const form = qs(".form")

const displayBooks = (books) => {
  booksList.firstElementChild ? (booksList.innerHTML = "") : ""

  books.forEach(({ title, author, genre, rating }) => {
    let bookItem = create("li")
    let p = create("p")

    p.classList.add("book")
    p.innerHTML = `Title: ${title}, </br> Author: ${author}, </br> Genre: ${genre}, Rating: ${rating}`
   
    bookItem.append(p)
    booksList.append(bookItem)
  })
}

const addCurentBooks = (e) => {
  e.preventDefault()

  const {
    elements: { title, author, genre, rating },
  } = e.currentTarget

  let book = {
    title: title.value,
    author: author.value,
    genre: genre.value,
    rating: rating.value,
  }

  let books = getBooks() ? [...getBooks(), book] : [book]
  localStorage.setItem("books", JSON.stringify(books))

  displayBooks(books)
  form.reset()
}

const getBooks = () => JSON.parse(localStorage.getItem("books"))

getBooks()
  ? displayBooks(getBooks())
  : alert("You don't have eny saved books 😥")

form.addEventListener("submit", addCurentBooks)
