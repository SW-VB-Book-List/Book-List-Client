'use strict';

(function(module) {

    const newBookView = {};

    newBookView.init = () => {

        $('.views').hide();
        $('#new-book-view').show();

    };

    module.newBookView = newBookView;

})(window.module);