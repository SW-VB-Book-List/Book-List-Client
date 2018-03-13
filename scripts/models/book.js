'use strict';

// const API_URL = 'http://localhost:3000';
// const API_URL = 'https://sw-vb-book-list.herokuapp.com';

(function(module) {
    const API_URL = window.API_URL;
    const template = Handlebars.compile($('#book-template').html());

    function Books(data) {
        Object.keys(data).forEach(key => this[key] = data[key]);
    }

    Books.prototype.toHtml = function() {
        return template(this);
    };

    Books.prototype.insert = function(callback) {
        $.post(`${API_URL}/api/books`, {
            title: this.title,
            author: this.author,
            isbn: this.isbn,
            image_url: this.image_url,
            description: this.description
        })
            .then(data => {
                Object.keys(data).forEach(key => this[key] = data[key]);
                Books.all.push(this);
                if(callback) callback();
            });
    };

    Books.all = [];

    Books.fetchAll = function(callback) {
        $.getJSON(`${API_URL}/api/books`)
            .then(data => {
                Books.all = data.map(each => new Books(each));
                if(callback) callback();
            })
            .catch(console.error);
    };

    module.Books = Books;
})(window.app || (window.app = {}));