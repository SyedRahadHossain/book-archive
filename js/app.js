const searchResult = document.getElementById('search-result');
const errorDiv = document.getElementById("error");


const numberFound = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => showNumberFound(data.numFound));
}

const showNumberFound = data => {
    const numberOfBooks = document.getElementById("numberOf-books");
    numberOfBooks.innerText = `Number of books found ${data}`;
}

const searchBooks = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // const errorDiv = document.getElementById("error");

    const search = searchField.value;
    // handling empty search field
    if (search === "") {
        errorDiv.innerText = "Search field cannot be empty.";
        searchResult.textContent = '';
        return;
    }
    // clearing error text
    else {
        errorDiv.innerText = "";
    }
    // clearing search field
    searchField.value = '';

    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displaySearchResult(data.docs));
}

const displaySearchResult = books => {
    // const searchResult = document.getElementById('search-result');

    //clearing search result
    searchResult.textContent = '';

    if (books.length == 0) {
        errorDiv.innerText = "No book found, please search a valid book name.";
    }

    books.forEach(book => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100">
            <img style="height: 400px" class="card-img-top rounded img-fluid img-thumbnail" 
            src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg"  alt="">
            <div class="card-body">
                <h4 class="card-title fw-bold text-center">${book.title}</h4>
                <p><span class="fw-bold">Author name: </span>${book.author_name}</p>
                <p><span class="fw-bold">Publisher: </span> ${book.publisher}</p>
                <p><span class="fw-bold">First published: </span> ${book.first_publish_year}</p>
            </div>
        </div>
        `;
        searchResult.appendChild(div);
    })
}
