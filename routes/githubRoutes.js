const express = require("express")
const router = express.Router()

const githubController = require("../controllers/githubController")

router.get("/analyser/:username", githubController.analyseUser)

module.exports = router