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

const formBackground = document.querySelector('#formBackground');
const bookForm = document.querySelector('#bookForm');
const btnAddBook = document.querySelector('button#addBtn');
btnAddBook.addEventListener('click', function(){
    formBackground.setAttribute('style', 'visibility : visible');
})

formBackground.addEventListener('click', ()=>{
    formBackground.setAttribute('style', 'visibility : hidden');
})

bookForm.addEventListener('click', (e)=>{
    e.stopPropagation();
})

for(let i = 1; i <= 8; i++){
    const book = document.querySelector(`#book${i}`);
    book.setAttribute('style', `grid-area = book${i}`);
}