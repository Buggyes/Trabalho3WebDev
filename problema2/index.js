const url = "https://api.giphy.com/v1/";
const apiKey = "DM74601Ekag430QSLQlRG0DZLu9dPXAj";

function showError(container) {
    let warning = document.createElement('h1');
    let warnText = document.createTextNode("Nenhum gif encontrado");
    warning.appendChild(warnText);
    container.appendChild(warning);
}

async function loadFeed() {
    let feed = document.getElementById('feed');
    let request = await getTrendingGifs()
    let trending = request.data;
    while (feed.firstChild) {
        feed.removeChild(feed.lastChild);
    }
    if (trending.length > 0) {
        for (let i = 0; i < trending.length; i++) {
            console.log(trending[i]);
            let gif = document.createElement('img');
            gif.setAttribute('src', trending[i].images.downsized.url);
            gif.setAttribute('id', trending[i].title);
            gif.setAttribute('alt', "gif" + i);
            feed.appendChild(gif);
        }
    }
    else{
        showError(feed);
    }
}

async function searchGifs() {
    let feed = document.getElementById('feed');
    let keywords = document.getElementById("searchBar");
    let request = await getGifsByKeyword(keywords);
    let found = request.data;
    while (feed.firstChild) {
        feed.removeChild(feed.lastChild);
    }
    if (found.length > 0) {
        for (let i = 0; i < found.length; i++) {
            console.log(found[i]);
            let gif = document.createElement('img');
            gif.setAttribute('src', found[i].images.downsized.url);
            gif.setAttribute('id', found[i].title);
            gif.setAttribute('alt', "gif" + i);
            feed.appendChild(gif);
        }
    }
    else {
        showError(feed);
    }
}

async function randomGif() {
    let feed = document.getElementById('feed');
    let request = await getRandomGif();
    let found = request.data;
    while (feed.firstChild) {
        feed.removeChild(feed.lastChild);
    }
    console.log(found);
    let gif = document.createElement('img');
    gif.setAttribute('src', found.images.downsized.url);
    gif.setAttribute('id', found.title);
    gif.setAttribute('alt', "gif" + 0);
    feed.appendChild(gif);
}

async function getTrendingGifs() {
    try {
        const response = await fetch(url + "gifs/trending?" + new URLSearchParams({
            api_key: apiKey,
            limit: 20,
        }).toString(),
            {
                method: "GET",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json"
                },
            })
        return response.json();
    } catch (error) {
        console.log(error);
    }
}

async function getGifsByKeyword(word) {
    try {
        const response = await fetch(url + "gifs/search?" + new URLSearchParams({
            api_key: apiKey,
            q: word,
            limit: 20,
        }).toString(),
            {
                method: "GET",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json"
                },
            });
        return response.json();
    } catch (error) {
        console.log(error);
    }
}

async function getRandomGif() {
    try {
        const response = await fetch(url + "gifs/random?" + new URLSearchParams({
            api_key: apiKey,
        }).toString(),
            {
                method: "GET",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json"
                },
            });
        return response.json();
    } catch (error) {
        console.log(error);
    }
}