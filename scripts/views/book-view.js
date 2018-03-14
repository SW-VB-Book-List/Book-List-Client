'use strict';

(function(module) {
    const Books = module.Books;

    const bookTemplate = Handlebars.compile($('#book-template').html());
    const bookDetailTemplate = Handlebars.compile($('#book-detail-template').html());

    const booksView = {};

    function resetView() { //eslint-disable-line
        $('.views').hide();
        $('.nav-menu').slideUp(0);
    }

    booksView.initIndexPage = () => {
        resetView();
        $('#all-books').show();

        $('#all-books').empty();

        Books.all.forEach(book => {
            const html = bookTemplate(book);
            $('#all-books').append(html);
        });
    };
    
    booksView.initNewBookView = () => {
        resetView();
        $('#new-book-view').show();

        $('#add-book')
            .off('submit')
            .on('submit', event => {
                event.preventDefault();

                const data = {
                    title: $('input[name=title').val(),
                    author: $('input[name=author').val(),
                    isbn: $('input[name=isbn').val(),
                    image_url: $('input[name=image_url').val(),
                    description: $('input[name=description').val(),
                };

                Books.create(data, (book) => {
                    $('#add-book')[0].reset();
                    page(`/books/${book.id}`);
                });
            });
    };

    booksView.initDetailView = () => {
        resetView();

        const html = bookDetailTemplate(Books.detail); //eslint-disable-line

        $('#book-detail-view')
            .empty()
            .append(html)
            .show();
    };

    module.booksView = booksView;

})(window.module);
