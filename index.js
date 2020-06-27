let leftColumn = document.querySelector("#left-column");
let rightColumn = document.querySelector("#right-column")
const showMovie = (movieDetail) =>{
    const dollars = parseInt(movieDetail.BoxOffice.replace(/\$/g, "").replace(/,/g, ""));
    const imdbRating = parseFloat(movieDetail.imdbRating);
    const awards = movieDetail.Awards.split(" ").reduce((prev,  word) => {
      const value = parseInt(word);
      if(isNaN(value)){
        return prev;
      } else {
        return prev + value
      }
    }, 0);

     return `
        <div class="media">
            <figure class="media-left">
                <p class="image">
                    <img src="${movieDetail.Poster}"/>
                </p>
            </figure>
        </div>
        <div class="card-content">
            <div class="media">
                
                <div class="media-content">
                    <h1>${movieDetail.Title} (${movieDetail.Year})</h1>
                </div>
            </div>
            <hr>
            <div class="content">
                ${movieDetail.Plot}
                ${movieDetail.Genre}
            </div>
            <article data-value="${awards}" class="notification is-dark">
                <p class="title">${movieDetail.Awards}</p>
                <p class="subtitle">Awards</p>
            </article>
            <article data-value="${dollars}" class="notification is-dark">
                <p class="title">${movieDetail.BoxOffice}</p>
                <p class="subtitle">BoxOffice</p>
            </article>
            <article data-value="${imdbRating}" class="notification is-dark">
                <p class="title">${movieDetail.imdbRating}</p>
                <p class="subtitle">IMDB Rating</p>
            </article>
        </div>
    `   
}

const onMovieSelect = async (movie, column) =>{
    const div = document.createElement("div");
    const response = await axios.get("http://www.omdbapi.com/", {
        params: {
            apikey: "a60164ca",
            i: movie.imdbID
        }
    });
    div.innerHTML = showMovie(response.data);
    column.appendChild(div)
    if(leftColumn && rightColumn){
        runComparison();
        createButton();
    }
}

const runComparison = () =>{
        const leftSideStats = document.querySelectorAll("#left-column .notification")
        const rightSideStats = document.querySelectorAll("#right-column .notification")
      
        leftSideStats.forEach((leftStat, index) =>{
          const rightStat = rightSideStats[index];
          const leftSideValue = parseInt(leftStat.dataset.value);
          const rightSideValue = parseInt(rightStat.dataset.value);
      
          if(rightSideValue > leftSideValue){
            leftStat.classList.remove("is-dark");
            leftStat.classList.add("is-warning");
          } else {
            rightStat.classList.remove("is-dark");
            rightStat.classList.add("is-warning");
          }
        })
}

const createButton= () =>{
    const footer = document.querySelector("#refresh");
    const button = document.createElement("p")
    button.innerHTML = `
        <a id="button" onclick="window.location.href=this">New Fight!</a>
    `
    footer.appendChild(button);
}

createAutocomplete({
    column : leftColumn,
    root: document.querySelector("#left-column")
})
createAutocomplete({
    column: rightColumn,
    root: document.querySelector("#right-column")
})
