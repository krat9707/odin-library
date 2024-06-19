const newBtn = document.querySelector('#open-dialog');
const newBook = document.querySelector('#new-book-dialog');
const newBookCancelBtn = document.querySelector('#dialog-cancel-btn');
const formSubmit = document.querySelector('#form-submit');
const library = [];

function book(name, author, readOrNot) {
    this.name = name;
    this.author = author;
    this.readBool = readOrNot;
}

newBtn.addEventListener('click', (e) => {    
    e.preventDefault();
    newBook.showModal();
})

newBookCancelBtn.addEventListener('click', () => {
    newBook.close();
})

formSubmit.addEventListener('click', (e) => {
    e.preventDefault(); 

    const bookName = document.querySelector('#book-name').value;
    const authorName = document.querySelector('#author-name').value;
    const readBool = document.querySelector('#bool-read-book').checked;

    const bookObj = new book(bookName, authorName, readBool);

    library.push(bookObj);
    newBook.close();

    displayCards();    
})

function displayCards() 
{
    document.querySelector('#book-card-layout').innerText = '';
 
    library.forEach((book, index) => {

        let card = document.createElement('div');
        card.classList.add('book-card');
    
        let cardTitle = document.createElement('div');
        cardTitle.classList.add('book-card-title');
        cardTitle.innerText = book.name;
        card.appendChild(cardTitle);
    
        let cardAuthor = document.createElement('div');
        cardAuthor.classList.add('book-card-author');
        cardAuthor.innerHTML = '<b>Author: </b>' + book.author;
        card.appendChild(cardAuthor);

        let bookCardButtonsLayer = document.createElement('div');
        bookCardButtonsLayer.classList.add('book-card-buttons-layer');

        bookCardButtonsLayer.innerHTML = `    
            <div class="bool-read-book ${book.readBool ? 'haveRead' : 'haveNotRead'}" data-index="${index}">${book.readBool ? 'Read' : 'Not Read'}</div>
            
            <div class="book-card-action-buttons">
                <button class="button delete" data-index="${index}">Delete</button>
                <button class="button readMore">Read More</button>
            </div>                
        `;
        card.appendChild(bookCardButtonsLayer);

        document.querySelector('#book-card-layout').appendChild(card);  
    })

    const deleteBook = document.querySelectorAll('.delete');
    deleteBook.forEach(button => {
        
        button.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');

            library.splice(index, 1);
            displayCards();
        })

    })

    const boolReadBook = document.querySelectorAll('.bool-read-book');
    boolReadBook.forEach(button => {
        
        button.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');

            library[index].readBool = !library[index].readBool; 
            displayCards();
        });
        
    }); 
}
