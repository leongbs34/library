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

function createBookButton(bID){
    bookshelf.append(document.createElement('button'));
    bookshelf.lastChild.id = `book${bID}`;
    const book = document.querySelector(`#book${bID}`);
    book.classList.add('invi');
    const div = document.createElement('div');
    const span = document.createElement('span');
    span.classList.add("material-icons");
    span.classList.add("btnDelete");
    span.textContent = 'delete';
    book.append(span);
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

function sliceID(bookid){
    let bID = new String(bookid);
    return parseInt(bID.slice(4));
}

function openEditForm(e){
    bID = sliceID(this.id);
    formBackground.classList.remove('invi');
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

function editBook(bID){
    let editedBook = checkBookExists(bID);
    editedBook.title = inputs[0].value;
    editedBook.author = inputs[1].value
    editedBook.pages = inputs[2].value
    editedBook.read = inputs[3].value
}

function deleteBook(e){
    e.stopPropagation();
    let bID = sliceID(this.parentNode.id);
    const deletedBook = checkBookExists(bID)
    deletedBook.bookID = '';
    for(let i = bID + 1; i <= myLibrary.length; i++){
        const editedBook = checkBookExists(i);
        const newID = i - 1;
        editedBook.bookID = newID;
        const bookInputs = document.querySelectorAll(`#book${newID} .bookInfo .bookInput`);
        bookInputs[0].textContent = `Title: ${myLibrary[newID].title}`;
        bookInputs[1].textContent = `Author: ${myLibrary[newID].author}`;
        bookInputs[2].textContent = `Pages: ${myLibrary[newID].pages}`;
        bookInputs[3].textContent = `Read: ${myLibrary[newID].read}`;
    }
    const deletedBookElement = document.querySelector(`#book${myLibrary.length}`);
    deletedBookElement.remove();
    myLibrary.splice(bID - 1, 1);
}

btnAddBook.addEventListener('click', function(){
    formBackground.classList.remove('invi');
})

formBackground.addEventListener('click', ()=>{
    formBackground.classList.add('invi');
    clearForm();
})

bookForm.addEventListener('click', (e)=>{
    e.stopPropagation();
})

const submitBtn = document.querySelector('.submitBtn');
submitBtn.addEventListener('click', ()=>{
    let bID;
    formBackground.classList.add('invi');
    inputs[3].value = document.querySelector('input[name="read"]').checked ? 'Completed' : 'Not completed';
    if(typeof checkBookExists(parseInt(labelID.textContent)) === 'undefined'){
        bID = myLibrary.length + 1;
        let tempbook = new book(inputs[0].value, inputs[1].value, inputs[2].value, inputs[3].value, bID);
        addBookToLibrary(tempbook);
    }
    else{
        bID = parseInt(labelID.textContent);
        editBook(bID);
    }
    clearForm();
    createBookButton(bID);
    const bookInputs = document.querySelectorAll(`#book${bID} .bookInfo .bookInput`);
    bookInputs[0].textContent = `Title: ${myLibrary[bID - 1].title}`;
    bookInputs[1].textContent = `Author: ${myLibrary[bID - 1].author}`;
    bookInputs[2].textContent = `Pages: ${myLibrary[bID - 1].pages}`;
    bookInputs[3].textContent = `Read: ${myLibrary[bID - 1].read}`;
    document.querySelector(`#book${bID}`).classList.remove('invi');
    document.querySelector(`#book${bID}`).classList.add('bookBackground');

    const editInfo = document.querySelectorAll('.bookshelf button');
    editInfo.forEach(info => {
        info.addEventListener('click', openEditForm);
    })

    const btnDelete = document.querySelectorAll('.btnDelete');
    btnDelete.forEach(button => button.addEventListener('click', deleteBook));
})
