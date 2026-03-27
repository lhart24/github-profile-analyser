const githubServices = require("../services/githubServices")
const analyser = require("../utils/analyser")

exports.analyseUser = async(req, res) => {

    try{
        const username = req.params.username

        const repo = await githubServices.getRepos(username)

        const result = analyser.analyseRepos(repo)

        const favouriteLanguage = await analyser.getFavouriteLanguage(repo, username)

        res.json(result, favouriteLanguage) //// add favourite language funtion later
    }   catch (error) {
    console.error(error)
    res.status(500).json({error: "failed to analyse user!"})
    
}
}