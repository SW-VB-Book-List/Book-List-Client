'use strict';

(function(module) {

    const bookDetailView = {};

    bookDetailView.init = id => {

        $('.views').hide();
        $('#book-detail-view').show();
        $('#detail-id').text(id);

    };

    module.bookDetailView = bookDetailView;

})(window.module);