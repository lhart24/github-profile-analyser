exports.analyseRepos = (repos) => {
    let totalStars = 0
    let languages = {}

    repos.forEach(repo => {

        totalStars += repo.stargazers_count

        if (repo.language){
            languages[repo.language] = (languages[repo.languages] || 0) + 1
        }
        
    })

    return {
        repository_count: repos.length,
        total_stars: totalStars,
        languages: languages
    }
}

// to get user favorute language

exports.getFavouriteLanguage = (repos, username) => {
    const axios = require("axios")

    async function getFavouriteLanguage(username) {
        
        const languageData = await axios.get(`https://api.github.com/repo/${username}/${repos}`)
        // use total bit count for each language to find favourite language
        console.log(languageData)
    }
}