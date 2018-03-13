'use strict';

(function(module) {
    const Books = module.Books;

    const booksView = {};

    function resetView() { //eslint-disable-line
        $('.views').hide();
        $('.nav-menu').slideUp(350);
    }

    booksView.initIndexPage = () => {
        booksView.resetView();
        booksView.loadBooks();
        $('#all-books').show();
    };

    booksView.loadBooks = () => {
        Books.all.forEach(book => {
            booksView.loadBook(book);
        });
    };

    booksView.loadBook = book => {
        $('.views').append(book.toHtml());
    };

    booksView.initNewBookView = () => {
        booksView.resetView();
        $('#new-book-view').show();
    };

    booksView.initDetailView = (data) => {
        booksView.resetView();
        booksView.loadBook(data);
        $('#book-detail-view').show();
    };

    module.booksView = booksView;
})(window.module);
