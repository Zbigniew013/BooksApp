
/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars

{
  'use strict';

  const select = {
    templateOf: {
      book: '#template-book',
    },
    containerOf: {
      books: '.books-list',
      filters: '.filters',
    },
    all: {
      books: '.book__image',
    },
  };

  const templates = {
    book: Handlebars.compile(
      document.querySelector(select.templateOf.book).innerHTML
    ),
  };

  function render(){
   
    for (let book of dataSource.books) {

      const ratingBgc = determineRatingBgc(book.rating);
      const ratingWidth = book.rating * 10;
      // console.log('ratingBgc', ratingBgc);
      // console.log('ratingWidth', ratingWidth);

      /* generate html based on template - single product */
      const generatedHTML = templates.book({
        name: book.name,
        price: book.price,
        id: book.id,
        image: book.image,
        rating: book.rating,
        ratingWidth: ratingWidth,
        ratingBgc: ratingBgc,
      });
      // const generatedHTML = templates.book(book);
      // console.log(generatedHTML);

      /* create element using utils.createElementFromHTML - element DOM */
      const element = utils.createDOMFromHTML(generatedHTML);
      // console.log(element);

      /* find menu container */
      const booksContainer = document.querySelector(select.containerOf.books);

      /* add element to menu - DOM to menu container */
      booksContainer.appendChild(element);
    }
  }
  render();


  function initActions(){

    const favoriteBooks = [];

    const booksList = document.querySelector(select.containerOf.books);

    booksList.addEventListener('dblclick', function (event) {
      if (event.target.offsetParent.classList.contains('book__image')) {
        event.preventDefault();

        event.target.offsetParent.classList.add('favorite');
        const bookId = event.target.offsetParent.getAttribute('data-id');

        if (!favoriteBooks.includes(bookId)) {
          favoriteBooks.push(bookId);
        } else {
          const index = favoriteBooks.indexOf(bookId);
          favoriteBooks.splice(index, 1);
          event.target.offsetParent.classList.remove('favorite');
        }
      }
    });
  }
  initActions();

  const filters = [];

  const filtersForm = document.querySelector(select.containerOf.filters);

  filtersForm.addEventListener('click', function (event) {
    if (
      event.target.tagName === 'INPUT' &&
      event.target.type === 'checkbox' &&
      event.target.name === 'filter'
    ) {
      console.log(event.target.value);
      if (event.target.checked) {
        console.log('filter checked');
        filters.push(event.target.value);
      } else {
        console.log('filter unchecked');
        const indexOfUnchecked = filters.indexOf(event.target.value);
        filters.splice(indexOfUnchecked, 1);
      }
    }

    filterBooks();
  });

  
  function filterBooks(){

    for (let book of dataSource.books) {
      console.log(book);

      const hiddenBook = document.querySelector(`.book__image[data-id="${book.id}"]`);
      
      if (
        (filters.includes('adults') && book.details.adults === false) ||
        (filters.includes('nonFiction') && book.details.nonFiction === false)
      ) {
        hiddenBook.classList.add('hidden');
      } else {
        hiddenBook.classList.remove('hidden');
      }
    }
  }

  function determineRatingBgc(rating) {

    let ratingBgc = '';

    if (rating <= 6) {
      ratingBgc = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
    } else if (rating > 6 && rating <= 8) {
      ratingBgc = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
    } else if (rating > 8 && rating <= 9){
      ratingBgc = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
    } else if (rating > 9){
      ratingBgc = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
    } else {
      ratingBgc = 'linear-gradient(to bottom,  #f8f9f9 0%, #626567 100%)';
    }
    return ratingBgc;
  }

 
}
  
