const axios = require("axios")

exports.getRepos = async(username) => {

    console.log("Fetching repos for:", username)

    try {
        const response = await axios.get(
            `https://api.github.com/users/${username}/repos`
        )

        console.log("GitHub status:", response.status)

        return response.data

    } catch(error) {

        console.log("GitHub error status:", error.response?.status)
        console.log("GitHub error data:", error.response?.data)

        throw error
    }
}