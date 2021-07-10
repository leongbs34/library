let myLibrary = [];

function book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    function info(){
        return `${title} by ${author}, ${pages} pages, ` + (read ? 'already read' : 'not read yet');
    }
}

function addBookToLibrary(book){
    myLibrary.push(book);
}

function displayBooks(){
    const books = myLibrary.map(book => book);
    console.table(books);
}

const form = document.querySelector('form');
const btnAddBook = document.querySelector('button.addBook');
btnAddBook.addEventListener('click', function(){
    form.setAttribute('style', 'visibility : visible');
})

for(let i = 1; i <= 8; i++){
    const book = document.querySelector(`#book${i}`);
    book.setAttribute('style', `grid-area = book${i}`);
}