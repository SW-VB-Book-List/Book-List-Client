'use strict';

(function (module) {

    const Gbook = {};

    Gbook.found = null;
    Gbook.total = 0;
    Gbook.search = '';
    
    Gbook.find = search => {
        Gbook.search = search;
        return $.getJSON(`${API_URL}/gbooks?q=${encodeURIComponent(search)}`)
            .then(result => {
                Gbook.found = result.gbooks;
                Gbook.total = result.total;
            });
    };

    module.Gbook = Gbook;

})(window.module);