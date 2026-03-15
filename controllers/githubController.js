const githubService = require("../services/githubService")

exports.analyseUser = async(req, res) => {

    try{
        const username = req.params(username)

        const repo = await githubServices.getRepos(username)

        const result = analyser.analyseRepos(repo)

        res.json(result)
    }   catch (error) {
        res.status(500).json({error: "failed to analyse user"})
    }
}