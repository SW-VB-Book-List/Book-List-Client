'use strict';

(function(module) {

    $('.icon-menu').on('click', () => {
        $('.nav-menu').slideToggle(350);
    });

    const Books = module.Books;
    const booksView = module.booksView;

    page('/home', () => Books.fetchAll(booksView.initIndexPage));
    page('/books/new', () => booksView.initNewBookView());
    page('/books/:id', ctx => Books.fetchOne(ctx.params.id, booksView.initDetailView));
    page('/admin', () => booksView.initAdminView());
    page('*', () => page.redirect('/home'));

    page({ hashbang: true });


})(window.module);