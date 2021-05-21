const {nanoid} = require('nanoid');
const books = require('./books');

const addBookHandler = (request, h) => {
    const {
        name, year, author, summary, publisher, pageCount, readPage, reading,
    } = request.payload;

    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updateAt = createdAt;
    const finished = false;
    const insertdAt = new Date().toISOString();

    if (name === undefined){
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. Mohon isi nama buku',
        });
        response.code(400);
        return response;
    } if (readPage > pageCount){
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
        });
        response.code(400);
        return response;
    }
    const newBook = {
        id,
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        finished,
        reading,
        insertedAt,
        updateAt,
    };
    books.push(newBook);

    const isSuccess = books.filter((book) => book.id === id).length > 0;
    if(isSuccess){
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil ditambahkan',
            data: {
                bookId: id,
            },
        });
        response.code(201);
        return response;
    }
    const response = h.response({
        status: 'error',
        message: 'Buku gagal ditambahkan',
    });
    response.code(500);
    return response;
};

const getAllBooksHandler = (request) => {
    const { name, reading, finished } = request.query;

    function checkReading(itemtemp){
        let flag = false;
        if(reading !== undefined){
            if(reading === 0){
                if(itemtemp.reading === false){
                    flag = true;
                }
            } else if(reading === 1){
                if(itemtemp.reading === true){
                    flag = true;
                }
            }
        }else{
            flag = true;
        }
        return flag;
    }
    function checkFinished(itemtemp){
        let flag = false;
        if(finished !== undefined){
            if(finished === 0){
                if(itemtemp.finished === false){
                    flag = true;
                }
                else if(finished === 1){
                    if(itemtemp.finished === true){
                        flag = true;
                    }
                }
            }else{
                flag = true;
            }
            return flag;
        }
    }

    const dataresult = [];
    if(name !== undefined){
        for(let i = 0; i < books.length; i += 1){
            const strname = books[i].name;
            const flagcontain = strname.search(name);
            if(flagcontain !== -1){
                if(checkReading(books[i])){
                    if(checkFinished(books[i])){
                        dataresult.push({
                            id: books[i].id,
                            name: books[i].name,
                            publisher: books[i].publisher,
                        });
                    }
                }
            }
        }
    }else{
        for(let i = 0; i < books.length; i += 1){
            if(checkReading(books[i])){
                if(checkFinished(books[i])){
                    dataresult.push({
                        id: books[i].id,
                        name: books[i].name,
                        publisher: books[i].publisher,
                    });
                }
            }
        }
    }

    return ({
        status: 'success',
        data: { books: dataresult },
    });
};

const getBookIdHandler = (request, h) => {
    const { id } = request.params;

    const book = books.filter((n) => n.id === id)[0];

    if(book !== undefined){
        return{
            status: 'success',
            data: {
                book,
            },
        };
    }

    const response = h.response({
        status: 'fail',
        message: 'Buku tidak ditemukan',
    });

    response.code(404);
    return response;
};

const editBookIdHandler = (request, h) => {
    const { id } = request.params;
    const {
        name, year, author, summary, publisher, pageCount, readPage, reading,
    } = request.payload;
    const updatedAt = new Date().toISOString();

    const index = books.findIndex((book) => book.id === id);

    if(index !== -1){
        if(name === undefined){
            const response = h.response({
                status: 'fail',
                message: 'Gagal memperbarui buku. Mohon isi nama buku',
            });
            response.code(400);
            return response;
        }if(readPage > pageCount){
            const response = h.response({
                status: 'fail',
                message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
            });
            response.code(400);
            return response;
        }
        books[index] = {
            ...books[index],
            name,
            year,
            author,
            summary,
            publisher,
            pageCount,
            readPage,
            reading,
            updatedAt,
        };

        const response = h.response({
            status: 'success',
            message: 'Buku berhasil diperbarui',
        });
        response.code(200);
        return response;
    }
    const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Id tidak ditemukan',
    });
    response.code(404);
    return response;
};

const deleteBookByIdHandler = (request, h) => {
    const { id } = request.params;

    const index = books.findIndex((book) => book.id === id);

    if(index !== -1){
        books.splice(index, 1);
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil dihapus',
        });
        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Buku gagal dihapus. Id tidak ditemukan',
    });
    response.code(404);
    return response;
};

module.exports = {
    addBookHandler,
    getAllBooksHandler,
    getBookIdHandler,
    editBookIdHandler,
    deleteBookByIdHandler
};