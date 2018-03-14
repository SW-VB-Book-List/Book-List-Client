'use strict';

(function(module) {

    function errorCallback(err) {
        console.log(err);
        module.errorView.init(err);
    }

    function Books(data) {
        Object.keys(data).forEach(key => this[key] = data[key]);
    }

    Books.all = [];

    Books.fetchAll = callback => {
        $.getJSON(`${API_URL}/books`)//eslint-disable-line
            .then(data => {
                Books.all = data.map(each => new Books(each));
                if(callback) callback();
            })
            .catch(errorCallback);
    };

    Books.detail = null;

    Books.fetchOne = (id, callback) => {
        $.getJSON(`${API_URL}/books/${id}`)//eslint-disable-line
            .then(data => {
                Books.detail = new Books(data);
                if(callback) callback();
            })
            .catch(errorCallback);
    };

    Books.create = function(data, callback) {

        $.post(`${API_URL}/books/new`, data)//eslint-disable-line
            .then((data) => {
                if(callback) callback(data);
            })
            .catch(errorCallback);

    };

    module.Books = Books;

})(window.module);