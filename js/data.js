const STORAGE_KEY = "BOOKSHELF_APPS";
let listBooks = [];

function isStorageExist(){
    if(typeof(Storage) === undefined){
        alert("Browser kamu tidak mendukung local storage");
        return false
    }
    return true;
}
 
function saveData() {
    const parsed = JSON.stringify(listBooks);
    localStorage.setItem(STORAGE_KEY, parsed);
    document.dispatchEvent(new Event("ondatasaved"));
}
 
function loadDataFromStorage() {
    const serializedData = localStorage.getItem(STORAGE_KEY);
    let data = JSON.parse(serializedData);
   
    if(data !== null) 
        listBooks = data;
 
    document.dispatchEvent(new Event("ondataloaded"));
}
 
function updateDataToStorage() {
    if(isStorageExist())
        saveData();
}
 
function composeBookshelfObject(conId, judul, penulis, tahun, isComplete) {
    return {
        id: +new Date(),
        conId,
        judul,
        penulis,
        tahun,
        isComplete
    };
}
 
function findBookshelf(bookId) {
    for(listBook of listBooks){
        if(listBook.id === bookId)
            return listBook;
    }
    return null;
}
 
function findBookshelfIndex(bookId) {
    let index = 0;
    for (listBook of listBooks) {
        if(listBook.id === bookId)
            return index;
    
        index++;
    }
    return -1;
}