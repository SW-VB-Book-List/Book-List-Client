'use strict';

(function(module) {

    $('.icon-menu').on('click', () => {
        $('.nav-menu').slideToggle(350);
    });

    const resetView = () => {
        $('.views').hide();
        $('.nav-menu').slideUp(0);
    };

    const Books = module.Books;
    const booksView = module.booksView;
    const loginView = module.loginView;

    page('*', (ctx, next) => {
        resetView();
        next();
    });

    page('/home', () => Books.fetchAll().then(booksView.initIndexPage));

    page('/admin', loginView.init);

    page('/books/new', booksView.initNewBookView);

    page('/books/:id/update', ctx => Books.fetchOne(ctx.params.id).then( booksView.initUpdate));

    page('/books/:id', ctx => Books.fetchOne(ctx.params.id).then( booksView.initDetailView));

    page('*', () => page.redirect('/home'));

    page({ hashbang: true });


})(window.module);