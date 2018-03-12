'use strict';

const API_URL = 'http://localhost:3000';
// const API_URL = 'http://sw-vb-book-list.herokuapp.com/api'

(function(module) {
    const template = Books.compile($('#book-template').html());

    function Books(data) {
        Object.keys(data).forEach(key => this[key] = data[key]);
    }

    Books.prototype.toHtml = function() {
        return template(this);
    };

    Books.prototype.insert = function(callback) {
        $.post(`${API_URL}/books`, {
            task: this.task
        })
            .then(data => {
                Object.keys(data).forEach(key => this[key] = data[key]);
                if(callback) callback();
            });
    };

    Books.all = [];

    Books.fetchAll = function(callback) {
        $.getJSON(`${API_URL}/books`)
            .then(data => {
                Books.all = data.map(each => new Books(each));
                if(callback) callback();
            });
    };

    module.Books = Books;
})(window.app || (window.app = {}));