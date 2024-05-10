const url = "https://api.giphy.com/v1/";

document.addEventListener('DOMContentLoaded', function(){
    getTrendingGifs();
})

async function getTrendingGifs(){
    try {
        const response = await fetch(url+"gifs/trending?" + new URLSearchParams({
            api_key: "DM74601Ekag430QSLQlRG0DZLu9dPXAj",
            limit: 4,
        }).toString(),
        {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            },
        });
        console.log(response.json());
    } catch (error) {
        console.log(error);
    }
}
