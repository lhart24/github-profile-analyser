const axios = require("axios")

// link to get data from github api
exports.getRepos = async (username) => {
    const response = await axios.get(
        `https://api.github.com/users/${username}/repos`
    )
    return response.data
}
