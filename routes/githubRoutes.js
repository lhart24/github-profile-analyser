const express = require("express")
const router = express.Router()

const githubController = require("../controllerts/girhubController")

router.get("/analyser/:username", githubController.analyseUser)

module.exports = router