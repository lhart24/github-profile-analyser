// to get user favorute language


const axios = require("axios")

async function getFavouriteLanguage(username) {
    const repos = await axios.get(`https://api.github.com/users/${username}/repos`)
}