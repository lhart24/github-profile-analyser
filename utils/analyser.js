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
        let totalLanguage = {}
        
        // use total bit count for each language to find favourite language
        for (let i = 0; i < repos.length; i++){
            const repoId = repos[i].name
            const response = await axios.get(`https://api.github.com/repos/${username}/${repoId}/languages`)


            
            const languageData = response.data
            for (const languages in languageData){
                totalLanguage[languages] =  (totalLanguage[languages] || 0) + languageData[languages]
            }
        }
        

        let maxBytes = 0
        let favouriteLanguage = null

        for(const [lang, byte] of Object.entries(totalLanguage)) {

            if (byte > maxBytes){
                favouriteLanguage = lang
                maxBytes = byte
            }
        }
        

        return {
            favouriteLanguage: favouriteLanguage
        }
}

// add profile report card next with activity, popularity, diversity, and commuinity that sums up total scores of user and gives a grade

exports.GetReportCard = async(username) => {
    const axios = require ("axios")
    const activity = await axios.get(`https://api.github.com/users/${username}/events/public`)
    const activity_data = activity.data

    const report = {
        totalEvents: activity_data.length,
        eventTypes: {}, // fix later, returns null for counter
        timeline: [],
        insights: {}
    }

    const sorted = activity_data.sort((a, b) => new Date(a.created_at) - new Date(b.created_at))

    sorted.forEach(event => {
        
        report.eventTypes[event.type] = (report.eventTypes[event.type || 0]) + 1

        report.timeline.push({
            type: event.type,
            time: event.created_at,
            repo: event.repo.name
        })
    })

    if (sorted.length > 1){
        const start = new Date(sorted[0].created_at)
        const end = new Date(sorted[sorted.length -  1].created_at)
        const diffMins = (end - start) / (1000 * 60)

        report.insights.durationMinutes = diffMins
    }

    report.insights.pushes = report.eventTypes["PushEvent"] || 0

    return report
}


exports.GetScore = async(username) => {
    console.log("GET SCORE RUNNING")
    console.log("USERNAME:", username)
    const axios = require ("axios")
    const activity = await axios.get(`https://api.github.com/users/${username}/events/public`)
    const activity_data = activity.data

    let totalScore = 0
    for (let i = 0; i < activity_data.length; i++){
        switch (activity_data[i].type){
            // weights for different events
            case "PushEvent":
                totalScore += 3
                break;
            case "PullRequestEvent":
                totalScore += 3
                break;
            case "CommitCommentEvent":
                totalScore += 2
                break;
            case "IssueEvent":
                totalScore += 2
                break;
            case "IssueCommentEvent":
                totalScore += 2
                break;
            case "WatchEvent":
                totalScore += 1
                break;
            case "ForkEvent":
                totalScore += 1
                break;
            case "CreateEvent":
                totalScore += 1;
                break;
            case "DeleteEvent":
                totalScore += 1
                break;
            default:
                break;
        }
    }
    
    // get length of activity data from activity data.type, maybe append them all into a list, find average by length / points e.g. 0.2 = good activty 0.8 = bad activity 
    let rating = activity_data.length / totalScore
    let Grade = ""
    if (rating >= 0.8 && rating <= 1){
        Grade = "E"
    }
    else if (rating >= 0.6 && rating <= 0.8){
        Grade = "D"
    }
    else if (rating >= 0.4 && rating <= 0.6){
        Grade = "C"
    }
    else if (rating >= 0.2 && rating <= 0.4){
        Grade = "B"
    }
    else if (rating >= 0 && rating <= 0.2){
        Grade = "A"
    }
    // fix later to return both score and grade in the controller
    return totalScore, Grade;
}