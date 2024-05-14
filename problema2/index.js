const url = "https://api.giphy.com/v1/";

document.addEventListener('DOMContentLoaded', function () {
    initFeed();
})

async function initFeed() {
    trending = getTrendingGifs()
    for (let i = 0; i < trending.length; i++) {
        console.log(trending[i]);
    }
}

async function getTrendingGifs() {
    try {
        const response = await fetch(url + "gifs/trending?" + new URLSearchParams({
            api_key: "DM74601Ekag430QSLQlRG0DZLu9dPXAj",
            limit: 100,
        }).toString(),
            {
                method: "GET",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json"
                },
            })
        .then((response) => response.json())
        .then((data) => {return data})
    } catch (error) {
        console.log(error);
    }
}

async function searchGifs(word) {
    try {
        const response = await fetch(url + "gifs/search?" + new URLSearchParams({
            api_key: "DM74601Ekag430QSLQlRG0DZLu9dPXAj",
            q: word,
            limit: 50,
        }).toString(),
            {
                method: "GET",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json"
                },
            });
        return response.json().data;
    } catch (error) {
        console.log(error);
    }
}