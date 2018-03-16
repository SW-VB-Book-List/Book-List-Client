'use strict';

(function(module) {

    function Books(data) {
        Object.keys(data).forEach(key => this[key] = data[key]);
    }

    Books.all = [];

    Books.fetchAll = () => {
        return $.getJSON(`${API_URL}/books`)//eslint-disable-line
            .then(data => {
                Books.all = data.map(each => new Books(each)); 
            });
    };

    Books.detail = null;

    Books.fetchOne = (id) => {
        return $.getJSON(`${API_URL}/books/${id}`)//eslint-disable-line
            .then(data => {
                Books.detail = new Books(data);
            });
    };

    Books.create = data => {
        return $.post(`${API_URL}/books/new`, data)//eslint-disable-line
    };

    Books.update = data => {
        return $.ajax({
            url: `${API_URL}/books/${data.id}`,//eslint-disable-line
            method: 'PUT',
            data: data
        });
    };

    Books.delete = id => {
        return $.ajax({
            url: `${API_URL}/books/${id}`,//eslint-disable-line
            method: 'DELETE'
        });
    };

    Books.addGbook = id => {
        return $.ajax({
            url: `${API_URL}/books/gbooks/${id}`,
            method: 'PUT'
        });
    };

    module.Books = Books;

})(window.module);