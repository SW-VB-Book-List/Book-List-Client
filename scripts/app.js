'use strict';

(function(module) {

    const booksView = module.booksView;
    const bookDetailView = module.bookDetailView;
    const newBookView = module.newBookView;

    page('/', () => booksView.initIndexPage());
    page('/book-detail-view', () => bookDetailView.init());
    page('/new-book-view/:id', (ctx) => newBookView.init(ctx.params.id));

    page({ hashbang: true });


})(window.module);