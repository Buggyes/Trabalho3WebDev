const url = "https://api.giphy.com/v1/";
const apiKey = "DM74601Ekag430QSLQlRG0DZLu9dPXAj";

document.addEventListener('DOMContentLoaded', function () {
    initFeed();
})

async function initFeed() {
    let trending = await getTrendingGifs()
    for (let i = 0; i < trending.data.length; i++) {
        console.log(trending.data[i]);
    }
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

async function searchGifs(word) {
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