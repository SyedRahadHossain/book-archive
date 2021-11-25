const searchResult = document.getElementById('search-result');

// number of books found process
const numberFound = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => showNumberFound(data.numFound));
}

// showing number of books
const showNumberFound = data => {
    const numberOfBooks = document.getElementById("numberOf-books");
    numberOfBooks.innerText = `Number of books found ${data}`;
}

// searching book process
const searchBooks = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    const errorDiv = document.getElementById("error");

   

    const search = searchField.value;
    // handling empty search field
    if (search === "") {
        errorDiv.innerText = "Empty search field.";
        searchResult.textContent = '';
        return;
    }
    // clearing error text
    else {
        errorDiv.innerText = "";
    }
     // display spinner
    //  toggleSpinner('block');
    // clearing search field
    searchField.value = '';
    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displaySearchResult(data.docs));
}

// displaying searched books info
const displaySearchResult = books => {
    //clearing search result
    searchResult.textContent = '';
    const errorDiv = document.getElementById("error");
    // handling invalid book name
    if (books.length === 0) {
        errorDiv.innerText = "No result found, please search with a valid book name.";
    }
    books.forEach(book => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100 bg-secondary text-white">
            <img style="height: 400px" class="card-img-top rounded img-fluid img-thumbnail" 
            src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg"  alt="">
            <div class="card-body">
                <h5 class="card-title fw-bold text-info">${book.title}</h5>
                <p><span class="fw-bold ">Author name: </span>${book?.author_name?.[0]}</p>
                <p><span class="fw-bold">Publisher: </span> ${book?.publisher?.[0]}</p>
                <p><span class="fw-bold">First published: </span> ${book.first_publish_year}</p>
            </div>
        </div>
        `;
        searchResult.appendChild(div);
    });
    // display spinner
    // toggleSpinner('block');

}

// const toggleSpinner = displayStyle => {
//     document.getElementById('spinner').style.display = displayStyle;
// }