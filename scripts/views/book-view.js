'use strict';

(function(module) {
    const Books = module.Books;
    const User = module.User;

    const errorView = module.errorView;
    const handleError = err => errorView.init(err);

    const bookTemplate = Handlebars.compile($('#book-template').html());
    const bookDetailTemplate = Handlebars.compile($('#book-detail-template').html());

    const booksView = {};

    function resetView() { //eslint-disable-line
        $('.views').hide();
        $('.nav-menu').slideUp(0);
    }

    booksView.initIndexPage = () => {
        
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
                    title: $('input[name=title]').val(),
                    author: $('input[name=author]').val(),
                    isbn: $('input[name=isbn]').val(),
                    image_url: $('input[name=image_url]').val(),
                    description: $('input[name=description]').val()
                };

                Books.create(data)
                    .then(book => {
                        $('#add-book')[0].reset();
                        page(`/books/${book.id}`);
                    })
                    .catch(handleError);
            });
    };

    booksView.initUpdate = () => {
        $('#new-book-view').show();

        const book = Books.detail;

        $('#form-button').val('Update');
        $('h2.view-title').text('Update Book');

        $('input[name=id]').val(book.id);
        $('input[name=title]').val(book.title);
        $('input[name=author]').val(book.author);
        $('input[name=isbn]').val(book.isbn);
        $('input[name=image_url]').val(book.image_url);
        $('input[name=description]').val(book.description);
        
        $('#add-book')
            .off('submit')
            .on('submit', event => {
                event.preventDefault();

                const data = {
                    id: book.id,
                    title: $('input[name=title]').val(),
                    author: $('input[name=author]').val(),
                    isbn: $('input[name=isbn]').val(),
                    image_url: $('input[name=image_url]').val(),
                    description: $('input[name=description]').val()
                };

                Books.update(data)
                    .then( () => {
                        $('#add-book')[0].reset();
                        page(`/books/${book.id}`);
                    })
                    .catch(handleError);
            });
    };

    booksView.initDetailView = () => {

        const html = bookDetailTemplate(Books.detail); //eslint-disable-line

        $('#book-detail-view')
            .empty()
            .append(html)
            .show();

        if(User.current && User.current.isAdmin) {
            $('#book-delete').on('click', () => {
                Books.delete(Books.detail.id)
                    .then(() => {
                        page('/home');
                    })
                    .catch(handleError);
            });
            $('#book-update').on('click', () => {
                page(`/books/${Books.detail.id}/update`);
            });
        }
        else {
            $('#book-actions').hide();
        }
    };

    booksView.initSearch = () => {
        resetView();
        $('#search-view').show();

        $('#search-form')
            .off('submit')
            .on('submit', event => {
                event.preventDefault();

                const book = {
                    title: $('input[name=search-title]').val(),
                    author: $('input[name=search-author]').val(),
                    isbn: $('input[name=search-isbn]').val(),
                };
                
                Books.find(book)
                    .then( () => {
                        $('#search-form')[0].reset();
                        page('/books/search');
                    })
                    .catch(handleError);
            });

        $('#import-book')
            .off('submit')
            .on('submit', event => {

                event.preventDefault();

                const data = {
                    title: $('input[name=search-title]').val(),
                    author: $('input[name=search-author]').val(),
                    isbn: $('input[name=search-isbn]').val(),
                };

                Books.create(data)
                    .then(book => {
                        $('#add-book')[0].reset();
                        page(`/books/${book.id}`);
                    })
                    .catch(handleError);
            });
    };

    module.booksView = booksView;

})(window.module);
