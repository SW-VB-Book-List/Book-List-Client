'use strict';

(function(module) {

    // const template = Handlebars.compile($('#book-template').html());


    function errorCallback(err) {
        console.log(err);
        module.errorView.init(err);
    }

    function Books(data) {
        Object.keys(data).forEach(key => this[key] = data[key]);
    }

    // Books.prototype.toHtml = function() {
    //     return template(this);
    // };

    // Books.prototype.insert = function(callback) {
    //     $.post(`${API_URL}/books`, {//eslint-disable-line
    //         title: this.title,
    //         author: this.author,
    //         isbn: this.isbn,
    //         image_url: this.image_url,
    //         description: this.description
    //     })
    //         .then(data => {
    //             Object.keys(data).forEach(key => this[key] = data[key]);
    //             Books.all.push(this);
    //             if(callback) callback();
    //         });
    // };

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