// to get user favorute language


const axios = require("axios")

async function getFavouriteLanguage(username) {
    const repos = await axios.get(`https://api.github.com/users/${username}/repos`)

    // use total bit count for each language to find favourite language

}