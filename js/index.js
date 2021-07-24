document.addEventListener("DOMContentLoaded", function () {

    const inputBook = document.getElementById("inputBook");

    inputBook.addEventListener("submit", function (event) {
        event.preventDefault();
        add_book_shelf();
    });

    if(isStorageExist()){
        loadDataFromStorage();
    }
});

document.addEventListener("ondatasaved", () => {
    console.log("Data berhasil disimpan.");
});

document.addEventListener("ondataloaded", () => {
    refreshDataFromBookshelf();
});