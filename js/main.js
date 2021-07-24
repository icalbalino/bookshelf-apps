const INCOMPLETE_BOOKSHELF_LIST_ID = "incompleteBookshelfList";
const COMPLETE_BOOKSHELF_LIST_ID = "completeBookshelfList";
const BOOKSHELF_ITEMID = "itemId";


function make_book_shelf(conId, judul, penulis, tahun, isComplete) {

    const textJudul = document.createElement('h3');
    textJudul.setAttribute('id', 'judul');
    textJudul.innerText = judul;

    const textPenulis = document.createElement('p');
    textPenulis.setAttribute('id', 'penulis');
    textPenulis.innerText = penulis;

    const textTahun = document.createElement('p');
    textTahun.setAttribute('id', 'tahun');
    textTahun.innerText = tahun;

    const bookContainer = document.createElement('div');
    bookContainer.classList.add('book-container');
    bookContainer.setAttribute('id', conId);
    bookContainer.append(textJudul, textPenulis, textTahun);

    const container = document.createElement('article');
    container.classList.add('book_item');
    container.append(bookContainer);
    
    if(!isComplete){
        container.append(
            createCompliteButton(),
            createDeleteButton()
        );
    } else {
        container.append(
            createUndoButton(),
            createDeleteButton(),
        );
    }
    
    return container;
}


function createUndoButton(){
    const button = document.createElement('button');
    button.setAttribute('class', 'undo');
    button.innerText = 'Baca Ulang';
    button.addEventListener('click', function(event){
        undo_book_shelf_complete(event.target.parentElement);
    });
    return button;
}

function createDeleteButton(){
    const button = document.createElement('button');
    button.setAttribute('class', 'red');
    button.innerText = 'Hapus Buku';
    button.addEventListener('click', function (event){
        remove_book_shelf(event.target.parentElement);
    });
    return button;
}

function createCompliteButton(){
    const button = document.createElement('button');
    button.setAttribute('class', 'green');
    button.innerText = 'Selesai di Baca';
    button.addEventListener('click', function (event){
        add_book_shelf_complete(event.target.parentElement);
    });
    return button;
}


function add_book_shelf() {
    const incompleteBookshelfList = document.getElementById(INCOMPLETE_BOOKSHELF_LIST_ID);
    const completeBookshelfList = document.getElementById(COMPLETE_BOOKSHELF_LIST_ID);
    
    const conId = + new Date();
    const title = document.getElementById('inputBookTitle').value;
    const author = document.getElementById('inputBookAuthor').value;
    const year = document.getElementById('inputBookYear').value;
    const isChecked = document.getElementById("inputBookIsComplete").checked;

    const makeBookShelf = make_book_shelf(conId, title, author, year, isChecked);
    const bookshelfObject = composeBookshelfObject(conId, title, author, year, isChecked);

    makeBookShelf[BOOKSHELF_ITEMID] = bookshelfObject.id;
    listBooks.push(bookshelfObject);

    if (isChecked) {
        completeBookshelfList.append(makeBookShelf);
        updateDataToStorage();
    } else{
        incompleteBookshelfList.append(makeBookShelf);
        updateDataToStorage();
    }
}

function add_book_shelf_complete(taskElement){
    const completeBookshelfList = document.getElementById(COMPLETE_BOOKSHELF_LIST_ID);
    const textId = taskElement.querySelector('.book_item > .book-container').innerText;
    const textTitle = taskElement.querySelector('.book_item > .book-container > #judul').innerText;
    const textAuthor = taskElement.querySelector('.book_item > .book-container > #penulis').innerText;
    const textYear = taskElement.querySelector('.book_item > .book-container > #tahun').innerText;

    const newMakeBookShelf = make_book_shelf(textId, textTitle, textAuthor, textYear, true);

    const makeBookShelf = findBookshelf(taskElement[BOOKSHELF_ITEMID]);
    makeBookShelf.isComplete = true;
    newMakeBookShelf[BOOKSHELF_ITEMID] = makeBookShelf.id;

    completeBookshelfList.append(newMakeBookShelf);
    taskElement.remove();
    updateDataToStorage();
}

function remove_book_shelf(taskElement) {
    const bookshelfPosition = findBookshelfIndex(taskElement[BOOKSHELF_ITEMID]);
    listBooks.splice(bookshelfPosition, 1);
    taskElement.remove();
    updateDataToStorage();
}

function undo_book_shelf_complete(taskElement){
    const incompleteBookshelfList = document.getElementById(INCOMPLETE_BOOKSHELF_LIST_ID);
    const textId = taskElement.querySelector('.book_item > .book-container').innerText;
    const textTitle = taskElement.querySelector('.book_item > .book-container > #judul').innerText;
    const textAuthor = taskElement.querySelector('.book_item > .book-container > #penulis').innerText;
    const textYear = taskElement.querySelector('.book_item > .book-container > #tahun').innerText;

    const newMakeBookShelf = make_book_shelf(textId, textTitle, textAuthor, textYear, false);

    const makeBookShelf = findBookshelf(taskElement[BOOKSHELF_ITEMID]);
    makeBookShelf.isComplete = false;
    newMakeBookShelf[BOOKSHELF_ITEMID] = makeBookShelf.id;

    incompleteBookshelfList.append(newMakeBookShelf);
    taskElement.remove();
    updateDataToStorage();
}

function refreshDataFromBookshelf() {
    const incompleteBookshelfList = document.getElementById(INCOMPLETE_BOOKSHELF_LIST_ID);
    const completeBookshelfList = document.getElementById(COMPLETE_BOOKSHELF_LIST_ID);

    for(listBook of listBooks){
        const newMakeBookShelf = make_book_shelf(listBook.conId, listBook.judul, listBook.penulis, listBook.tahun, listBook.isComplete);
        newMakeBookShelf[BOOKSHELF_ITEMID] = listBook.id;

        if(listBook.isComplete){
            completeBookshelfList.append(newMakeBookShelf);
        } else {
            incompleteBookshelfList.append(newMakeBookShelf);
        }
    }
}