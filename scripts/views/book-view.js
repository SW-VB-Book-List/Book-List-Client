'use strict';

(function(module) {
    const Books = module.Book;

    const booksView = {};

    booksView.initIndexPage = () => {
        booksView.loadBooks();
    };

    booksView.loadBooks = () => {
        Books.all.forEach(book => {
            booksView.loadBook(book);
        });
    };

    module.booksView = booksView;
})(window.app || (window.app = {}));