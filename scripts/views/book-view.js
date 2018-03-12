'use strict';

(function(module) {
    const Books = module.Books;

    const booksView = {};

    booksView.initIndexPage = () => {
        booksView.loadBooks();
        booksView.handleSubmit();
    };

    booksView.loadBooks = () => {
        Books.all.forEach(book => {
            booksView.loadBook(book);
        });
    };

    booksView.loadBook = () => {
        $('books').on('submit', event => {
            event.preventDefault();

            const book = new Book({
                title: $('title').val();
            })
        })
    }

});