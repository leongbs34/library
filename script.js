let myLibrary = [];
const formBackground = document.querySelector('#formBackground');
const bookForm = document.querySelector('#bookForm');
const btnAddBook = document.querySelector('button#addBtn');
const inputs = document.querySelectorAll('input');
const bookshelf = document.querySelector('.bookshelf');
const labelID = document.querySelector('label[for="bID"]');

function book(title, author, pages, read, bookID){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.bookID = bookID;

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
    labelID.textContent = '';
    document.querySelector('.headerText').textContent = 'New Book';
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

function checkBookExists(bID){
    let result = myLibrary.filter(obj => {
        return obj.bookID == bID;
    })
    result = result.pop()
    return result;
}

btnAddBook.addEventListener('click', function(){
    formBackground.setAttribute('style', 'visibility : visible');
})

formBackground.addEventListener('click', ()=>{
    formBackground.setAttribute('style', 'visibility : hidden');
    clearForm();
})

bookForm.addEventListener('click', (e)=>{
    e.stopPropagation();
})

for(let i = 1; i <= 8; i++){
    createBookGrid(i);
}

const submitBtn = document.querySelector('.submitBtn');
submitBtn.addEventListener('click', ()=>{
    let bID;
    formBackground.setAttribute('style', 'visibility : hidden');
    inputs[3].value = document.querySelector('input[name="read"]').checked ? 'Completed' : 'Not completed';
    if(typeof checkBookExists(parseInt(labelID.textContent)) === 'undefined'){
        bID = myLibrary.length + 1;
        let tempbook = new book(inputs[0].value, inputs[1].value, inputs[2].value, inputs[3].value, bID);
        addBookToLibrary(tempbook);
    }
    else{
        bID = parseInt(labelID.textContent);
        let editedBook = checkBookExists(bID);
        editedBook.title = inputs[0].value;
        editedBook.author = inputs[1].value
        editedBook.pages = inputs[2].value
        editedBook.read = inputs[3].value
    }
    clearForm();
    if(bID > 8){ createBookGrid(bID); }
    const bookInputs = document.querySelectorAll(`#book${bID} .bookInfo .bookInput`);
    bookInputs[0].textContent = `Title: ${myLibrary[bID - 1].title}`;
    bookInputs[1].textContent = `Author: ${myLibrary[bID - 1].author}`;
    bookInputs[2].textContent = `Pages: ${myLibrary[bID - 1].pages}`;
    bookInputs[3].textContent = `Read: ${myLibrary[bID - 1].read}`;
    document.querySelector(`#book${bID}`).classList.remove('invi');
    document.querySelector(`#book${bID}`).classList.add('bookBackground');
})

function editBook(e){
    let bID = new String(this.id);
    bID = bID.slice(4);
    formBackground.setAttribute('style', 'visibility : visible');
    result = checkBookExists(bID)
    document.querySelector('.headerText').textContent = `Edit Book`;
    inputs[0].value = result.title;
    inputs[1].value = result.author;
    inputs[2].value = result.pages;
    labelID.textContent = result.bookID;
    if(result.read === 'Completed'){
        document.querySelector('input[name="read"]').checked = true;
    }
}

const editInfo = document.querySelectorAll('.bookshelf button');
editInfo.forEach(info => {
    info.addEventListener('click', editBook)
})