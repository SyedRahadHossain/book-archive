const searchResult = document.getElementById('search-result');


const numberFound = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;

    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => showNumberFound(data.numFound));
}


// numberFound();

const showNumberFound = data => {
    // for (const object in data) {
    //     console.log(data);
    // }
    // console.log(data)
    const numberOfBooks = document.getElementById("numberOf-books");
    numberOfBooks.innerText = `Number of books found ${data}`;

}

const searchBooks = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    const errorDiv = document.getElementById("error");

    const search = searchField.value;
    // handling empty search field
    if (search === "") {
        errorDiv.innerText = "Search field cannot be empty.";
        searchResult.textContent = '';

        return;
    }
    else {
        errorDiv.innerText = "";
    }

    // clearing search field
    searchField.value = '';

    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
        .then(res => res.json())
        // .then(data => displaySearchResult(data))
        .then(data => displaySearchResult(data.docs));
}

// searchBooks();




const displaySearchResult = books => {
    // const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';

    // error handling
    // for (const numberFound in books) {
    //     console.log(numberFound);
    // }

    // if (data.numFound === 0) {
    //     errorDiv.innerText = "NO Result Found";
    // } else {
    //     errorDiv.innerText = "";
    // }




    books.forEach(book => {
        // console.log(book);

        // if (Object.keys(books).length === 0 ) {
        //     errorDiv.innerText = "NO Result Found";;
        // }


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


    /*     for(const book in books){
            console.log(book);
        } */



    /*   for(let i = 0; i<10; i++){
          console.log(books.docs[i].author_name[0]);
      } */
}
