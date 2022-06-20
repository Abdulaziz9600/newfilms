// Element Form
let elFormFilms = $(".js-form");
let elSearchInput = $(".js-search-input");
let elCatiegrySelect = $(".js-search-catiegory");


// Out Elements
let elFilmList = $(".film-list");
let elBookmarkList = $(".bookmark-list");
let elMovieTemplate = $("#movies-template").content;
let elBookMarkTemplate = $("#bookmark-template").content;

let bookmarkArry =  [];

// ///////BOOK MARK LOCALSTORAGE

let localBookmark = JSON.parse(window.localStorage.getItem("bookmarkArry"));


////////////// NormalizedMovies

let normalizedMovies = films.map((movie) => {
  return {
    id: movie.id,
    title: movie.title,
    categories: movie.genres,
    overview: movie.overview,
    poster: movie.poster,
  }
})


let createMovieElement = (movie) => {
  
  elFilmList.innerHTML = "";
  
  let movieElement = elMovieTemplate.cloneNode(true);
  
  
  $(".card-title", movieElement).textContent = movie.title;
  $(".card-img-top", movieElement).alt = movie.title;
  $(".card-img-top", movieElement).src = movie.poster;
  $(".card-genres", movieElement).textContent = movie.categories;
  $(".card-cast", movieElement).textContent = movie.overview;
  $(".btn-bookmark", movieElement).dataset.bookmarkbtnid = movie.id;
  
  return movieElement;
}



let createBookMarkElement = function(movie){
  
  let bookmarkElement = elBookMarkTemplate.cloneNode(true);
  
  $(".bookmark-text",bookmarkElement).textContent = movie.title;
  $(".btn-delete",bookmarkElement).dataset.bookmarkdeletbtn = movie.id;
  
  return bookmarkElement;
  
}


//////////////SEARCH SECTION

elSearchInput.addEventListener("change", (e) => {
  e.preventDefault();

  elFilmList.innerHTML = "";
  
  let searchMovie = new RegExp(elSearchInput.value.trim(), "gi");
  
  let searchResult = normalizedMovies.filter((movie) => {
    if (movie.title.match(searchMovie)) {
      return movie.title.match(searchMovie);
    }
  })
  renderMovies(searchResult);
  
  console.log(searchMovie);
})



//////////////// CatiegrySECTION

let numberCategories = [];

normalizedMovies.forEach((film) => {
  film.categories.forEach((categori) => {
    if(!numberCategories.includes(categori)){
      numberCategories.push(categori);
    }
  })
})

numberCategories.forEach((movi)=>{
  
  let newOption = createElement("option","","");
  newOption.textContent = movi;
  newOption.option = movi;
  elCatiegrySelect.append(newOption);
  
})

elCatiegrySelect.addEventListener("change", (evt)=>{
  evt.preventDefault();
  elFilmList.innerHTML = "";
  
  let categoryMovies = normalizedMovies.filter(function(movie) {
    if (movie.categories.includes(elCatiegrySelect.value)){
      return movie.categories.includes(elCatiegrySelect.value)
    }
  })
  
  renderMovies(categoryMovies)
})

/////////////////// BOOK MARK DELETE BUTTON

elBookmarkList.addEventListener("click",function (e){
  if(e.target.matches(".btn-delete")){
    let bookmarkBtnDeletId = e.target.dataset.bookmarkdeletbtn
    let foundBookMarkDeletId = bookmarkArry.findIndex(bookmark => bookmark.id === bookmarkBtnDeletId);
    
    console.log(foundBookMarkDeletId);
    
    bookmarkArry.splice(foundBookMarkDeletId,1)
    
    
    elBookmarkList.innerHTML = "";
    
    if(bookmarkArry.length === 0){
      window.localStorage.removeItem("bookmarkArry");
    }
    renderMoviesBookmark(bookmarkArry,elBookmarkList)
  }
})

/////////////////// BOOK MARK BUTTON

elFilmList.addEventListener("click",function (e){
  if(e.target.matches(".btn-bookmark")){
    let bookmarkBtnId = e.target.dataset.bookmarkbtnid
    let foundBookMark = films.find(film => film.id === bookmarkBtnId);
    
    if(!bookmarkArry.includes(foundBookMark)){
      bookmarkArry.push(foundBookMark)
      
      elBookmarkList.innerHTML = "";
      
      renderMoviesBookmark(bookmarkArry,localBookmark)
    }
    
    window.localStorage.setItem("bookmarkArry",JSON.stringify(bookmarkArry))
    
  }
})


/////////////////////// Movise Render

let renderMovies = (movies) => { 
  
  // elFilmList.innerHTML = "";
  
  let elResultFragment = document.createDocumentFragment();
  
  
  movies.forEach((movie) => {
    elResultFragment.appendChild(createMovieElement(movie));
  })
  
  
  elFilmList.appendChild(elResultFragment);
}

renderMovies(normalizedMovies)

// ////////// RENDER BOOKMARK

let renderMoviesBookmark = (movies) =>{
  let elResultBookmarkList = document.createDocumentFragment();
  
  movies.forEach((movie) => {
    elResultBookmarkList.appendChild(createBookMarkElement(movie));
  })
  
  elBookmarkList.append(elResultBookmarkList);
  
}


renderMoviesBookmark(localBookmark,elBookmarkList)





