const githubServices = require("../services/githubServices")
const analyser = require("../utils/analyser")

exports.analyseUser = async(req, res) => {
    try {
        const username = req.params.username
        console.log("Username:", username)

        const repo = await githubServices.getRepos(username)
        console.log("✓ Repos loaded")

        const result = analyser.analyseRepos(repo)
        console.log("✓ Repo analysis complete")

        const favouriteLanguage = await analyser.getFavouriteLanguage(repo, username)
        console.log("✓ Favourite language complete")

        const report = await analyser.GetReportCard(username)
        console.log("✓ Report card complete")

        const score = await analyser.GetScore(username)
        console.log("✓ Score complete")

        console.log("✓ Sending response")

        res.json({
            result,
            favouriteLanguage,
            report,
            score,
        })

        console.log("✓ Response sent")
    } catch (error) {
        console.error("ERROR OCCURRED:")
        console.error(error)

        res.status(500).json({
            error: error.message
        })
    }
}