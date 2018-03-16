'use strict';

(function (module) {
    const Gbook = module.Gbook;
    const Books = module.Books;
    const gbookView = {};

    const template = Handlebars.compile($('#gbook-template').text());

    gbookView.init = function() {
        $('#gbook-view').show();

        $('#gbooks')
            .empty()
            .off('click')
            .append(Gbook.found.map(template))
            .on('click', 'button', handleAdd);

        $('#gbook-search input[name=search]').val(Gbook.search);

        $('#gbook-search')
            .off('submit')
            .on('submit', handleSubmit);

    };

    const handleAdd = function() {
        const id = $(this).data('id');
        Books.addGbook(id)
            .then(book => page(`/books/${book.id}`));
    };

    const handleSubmit = event => {
        event.preventDefault();
        const form = event.target;
        const search = form.elements.search.value;
        page(`/gbooks?q=${encodeURIComponent(search)}`);
    };

    module.gbookView = gbookView;

})(window.module);