const booksContainer = document.querySelector("#cardContainer");
const newBookButton = document.querySelector("#newBookButton"); //New book button
const formContainer = document.querySelector("#formContainer");
const bookForm = document.querySelector("#newBookForm");
const cancelButton = document.querySelector("#cancelForm"); //Cancel button
const submitButton = document.querySelector("#submitForm"); //Submit button
const titleInput = document.querySelector("#title");
const titleError = document.querySelector('#titleError')
const authorInput = document.querySelector("#author");
const authorError = document.querySelector('#authorError')
const pagesInput = document.querySelector("#pages");
const pagesError = document.querySelector('#pagesError')
const readInput = document.querySelector("input[name='read']");
//const readInput = document.querySelector("input[name='read']:checked");//
const readError = document.querySelector('#readError')


let myLibrary = [];

bookForm.addEventListener('submit', (event) =>{
    event.preventDefault()

    if (checkFormValidity()){
        addBookToArray()
    }
    
})


class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
    toggleRead() {
        if (this.read == "yes") {
            this.read = "no";
        } else {
            this.read = "yes";
        }
    }
}


newBookButton.addEventListener('click', toggleForm);
cancelButton.addEventListener('click', cancelForm);
//submitButton.addEventListener('click', addBookToArray);

function toggleForm(){
    if (formContainer.style.visibility == 'visible'){
        formContainer.style.visibility = 'hidden';
    }else{
        formContainer.style.visibility = 'visible';
    }
  };

function cancelForm(){
    toggleForm();
    document.getElementById("newBookForm").reset();
}

function addBookToArray(){
    let title = titleInput.value;
    let author = authorInput.value;
    let pages = pagesInput.value;
    const readInput = document.querySelector("input[name='read']:checked");
    let read = readInput.value;

    let book = new Book(title, author, pages, read);
    myLibrary.push(book);
    displayBooks();
    toggleForm();
    document.getElementById("newBookForm").reset()
} 

function displayBooks(){
    clearBookContainer();
    myLibrary.forEach(createBookCard);
    createDeleteButtons();
    createReadStatusButtons();
}

function clearBookContainer(){
    let bookCards = document.querySelectorAll(".bookCard");
    bookCards.forEach(function remove(item){
        item.parentNode.removeChild(item);
    })

}

function createBookCard(book){
    let bookCard = document.createElement("div");
    let titleSpan = document.createElement("div");
    let authorSpan = document.createElement("div");
    let pagesSpan = document.createElement("div");
    let readSpan = document.createElement("div");
    let deleteButton = document.createElement("button");
    let readStatusBtn = document.createElement("button");
    
    bookCard.setAttribute("class", "bookCard"); 
    bookCard.setAttribute("data-index", myLibrary.indexOf(book));
    titleSpan.setAttribute("class", "titleSpan");
    authorSpan.setAttribute("class", "authorSpan");
    pagesSpan.setAttribute("class", "pagesSpan");
    readSpan.setAttribute("class", "readSpan");
    deleteButton.setAttribute("class", "deleteButton");
    deleteButton.textContent = "Delete";
    deleteButton.setAttribute("data-index", myLibrary.indexOf(book));
    readStatusBtn.textContent = "Change read status";
    readStatusBtn.setAttribute("class", "readStatusButton");
    
    titleSpan.textContent = book.title;
    authorSpan.textContent = `by ${book.author}`;
    pagesSpan.textContent = `${book.pages} pages` ;
    readSpan.textContent = `Read? ${book.read}`;

    bookCard.appendChild(titleSpan);
    bookCard.appendChild(authorSpan);
    bookCard.appendChild(pagesSpan);
    bookCard.appendChild(readSpan);
    bookCard.appendChild(deleteButton);
    bookCard.appendChild(readStatusBtn);
    booksContainer.appendChild(bookCard);

}

function createDeleteButtons(){
    let deleteCardButtons = document.querySelectorAll(".deleteButton");
    deleteCardButtons.forEach( item => {
        item.addEventListener("click", event => {
            let index = event.target.getAttribute('data-index');
            myLibrary.splice(index, 1);
            displayBooks();
        })
    })
}

function createReadStatusButtons(){
    let readStatusButtons = document.querySelectorAll(".readStatusButton");
    readStatusButtons.forEach(item => {
        item.addEventListener("click", () => {
            //let readSpan = item.parentNode.querySelector(".readSpan");
            let index = item.parentNode.getAttribute("data-index");
            myLibrary[index].toggleRead();
            displayBooks();
            /* if (readSpan.textContent == "Read? yes"){
                readSpan.textContent = "Read? no"
            }else{
                readSpan.textContent = "Read? yes";
            } */
        })
    })
}

const checkFormValidity = function() {
    let formValid = true;

    if(titleInput.validity.valid){
        titleError.textContent = "";
    }else{
        if (titleInput.validity.valueMissing) {
            titleError.textContent = "You need to enter the title of the book";
        }
        formValid = false;
    }
    if(authorInput.validity.valid){
        authorError.textContent = "";
    }else{
        if (authorInput.validity.valueMissing) {
            authorError.textContent = "You need to enter the author of the book";
        }
        formValid = false;
    }
    if(pagesInput.validity.valid){
        pagesError.textContent = "";
    }else{
        if (pagesInput.validity.valueMissing) {
            pagesError.textContent = "You need to enter the number of pages of the book";
        }
        if (pagesInput.validity.rangeUnderflow) {
            pagesError.textContent = "The number of pages can't be a negative number";
        }
        formValid = false;
    }
    if(readInput.validity.valid){
        readError.textContent = "";
    }else{
        if (readInput.validity.valueMissing) {
            readError.textContent = "Please enter if you have read the book or not";
        }
        formValid = false;
    }  
    
    return formValid
    
}





//just some books to fill the library since no database exists
const book1 = new Book("The Hobbit","J.J.R. Tolkien", 295, "no");
const book2 = new Book("The snakes","Jadie Smith", 295, "yes");
const book3 = new Book("The alchemist","Paulo Coelho", 295, "no");
const book4 = new Book("Book4","Author4", 295, "yes");
const book5 = new Book("Book5","Author5", 295, "no");
const book6 = new Book("Book6","Author6", 295, "yes");
myLibrary.push(book1);
myLibrary.push(book2);
myLibrary.push(book3);
myLibrary.push(book4);
myLibrary.push(book5);
myLibrary.push(book6);

displayBooks();







