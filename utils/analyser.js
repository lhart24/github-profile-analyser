exports.analyseRepos = (repos) => {
    let totalStars = 0
    let languages = {}

    repos.forEach(repo => {

        totalStars += repo.stargazers_count

        if (repo.language){
            languages[repo.language] = (languages[repo.language] || 0) + 1
        }
        
    })

    return {
        repository_count: repos.length,
        total_stars: totalStars,
        languages: languages
    }
}

// to get user favorute language
// fix logic and make the funtion whole 
exports.getFavouriteLanguage = async (repos, username) => {
    const axios = require("axios")
        const totalLanguage = {}
        
        // use total bit count for each language to find favourite language
        for (let i = 0; i < repos.length; i++){
            const repoId = repos[i]
            const response = await axios.get(`https://api.github.com/repos/${username}/${repoId}`)

            
            const languageData = response.data
            for (const languages in languageData){
                totalLanguages += languageData[languages]
            }
        }
        

        const maxBytes = 0
        const favouriteLanguage = null

        






        return {
            favouriteLanguage: favouriteLanguage
        }
} 