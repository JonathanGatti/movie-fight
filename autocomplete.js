const createAutocomplete= ({root, column}) =>{
    root.innerHTML =`
    <div class="dropdown">
        <label for="">
            <b>Search for a Movie</b>
            <input type="text" class="input">
        </label>
        <div class="dropdown">
            <div class="dropdown-menu" id="dropdown-menu" role="menu">
                <div class="dropdown-content">
                </div>
            </div>
        </div>
    </div> 
    `;
    const input = root.querySelector("input")
    input.value= "";
    const dropdown = root.querySelector(".dropdown")

const fetchData =  async  searchTerm =>{
    const response = await  axios.get("https://cors-anywhere.herokuapp.com/http://www.omdbapi.com/", {
        params : {
            apikey: 'a60164ca',
            s : searchTerm
        }
    })
    if (response.data.Error) {
        return [];
      }
      return response.data.Search;
    };

const onInput  = async (event) =>{
    const movies =  await fetchData(event.target.value)
    document.querySelector(".tutorial").classList.add("is-hidden")
    for(let movie of movies){
        dropdown.classList.add("is-active")
        const anchor = document.createElement("a")
        const imgSrc = movie.Poster === "N/A" ? "" : movie.Poster
        anchor.classList.add("dropdown-item")
        anchor.innerHTML = `
        <h1>${movie.Title}</h1>
        <img src="${imgSrc}"/>
        <hr>
        `
        anchor.addEventListener("click", ()=>{
            dropdown.classList.remove("is-active")
            input.value = movie.Title;
            if(column === leftColumn){
                onMovieSelect(movie, leftColumn);
            }else {
                onMovieSelect(movie, rightColumn);
            }
        })
        root.querySelector(".dropdown-content").appendChild(anchor)
    }
    
}
input.addEventListener("input", debounce(onInput, 500));
root.addEventListener("click", (event)=>{
    if(!dropdown.contains(event.target)){
        root.classList.remove("is-active")
    }
})
}
