function book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    function info(){
        return `${title} by ${author}, ${pages} pages, ` + (read ? 'already read' : 'not read yet');
    }
}