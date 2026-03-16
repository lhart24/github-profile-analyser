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