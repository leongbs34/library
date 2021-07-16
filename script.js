let myLibrary = [];
const formBackground = document.querySelector('#formBackground');
const bookForm = document.querySelector('#bookForm');
const btnAddBook = document.querySelector('button#addBtn');
const inputs = document.querySelectorAll('input');
const bookshelf = document.querySelector('.bookshelf');

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

function clearForm(){
    inputs.forEach(input => input.value = '');
}

function createBookGrid(bID){
    bookshelf.append(document.createElement('button'));
    bookshelf.lastChild.id = `book${bID}`;
    const book = document.querySelector(`#book${bID}`);
    book.classList.add('invi');
    book.setAttribute('style', `grid-area: book${bID}`);
    const div = document.createElement('div');
    book.append(div);
    const bookChild = book.lastChild;
    bookChild.classList.add('bookInfo');
    for(let j = 1; j <= 4; j++){
        const div = document.createElement('div');
        bookChild.append(div);
        bookChild.lastChild.classList.add('bookInput');
    }
}

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
    createBookGrid(i);
}

const submitBtn = document.querySelector('.submitBtn');
submitBtn.addEventListener('click', ()=>{
    formBackground.setAttribute('style', 'visibility : hidden');
    inputs[3].value = document.querySelector('input[name="read"]').checked ? 'Completed' : 'Not completed';
    let tempbook = new book(inputs[0].value, inputs[1].value, inputs[2].value, inputs[3].value);
    clearForm();
    addBookToLibrary(tempbook);
    let bookID = myLibrary.length;
    if(bookID > 8){ createBookGrid(bookID); }
    const bookInputs = document.querySelectorAll(`#book${bookID} .bookInfo .bookInput`);
    bookInputs[0].textContent = `Title: ${myLibrary[bookID - 1].title}`;
    bookInputs[1].textContent = `Author: ${myLibrary[bookID - 1].author}`;
    bookInputs[2].textContent = `Pages: ${myLibrary[bookID - 1].pages}`;
    bookInputs[3].textContent = `Read: ${myLibrary[bookID - 1].read}`;
    document.querySelector(`#book${bookID}`).classList.remove('invi');
    document.querySelector(`#book${bookID}`).classList.add('bookBackground');
})
