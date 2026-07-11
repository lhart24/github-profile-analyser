const axios = require("axios");


// Analyse repositories
exports.analyseRepos = (repos) => {

    let totalStars = 0;
    let languages = {};

    repos.forEach((repo) => {

        totalStars += repo.stargazers_count || 0;

        if (repo.language) {
            languages[repo.language] =
                (languages[repo.language] || 0) + 1;
        }

    });

    return {
        repository_count: repos.length,
        total_stars: totalStars,
        languages
    };
};


// Get favourite language
exports.getFavouriteLanguage = async (
    repos,
    username
) => {

    console.log("getFavouriteLanguage started");

    let totalLanguage = {};

    for (let i = 0; i < repos.length; i++) {

        console.log(
            `Processing repo ${i + 1}/${repos.length}: ${repos[i].name}`
        );

        const response = await axios.get(
            `https://api.github.com/repos/${username}/${repos[i].name}/languages`
        );

        const languageData = response.data;

        for (const language in languageData) {

            totalLanguage[language] =
                (totalLanguage[language] || 0) +
                languageData[language];

        }
    }


    let favouriteLanguage = "None";
    let highestBytes = 0;


    for (const language in totalLanguage) {

        if (totalLanguage[language] > highestBytes) {

            highestBytes = totalLanguage[language];
            favouriteLanguage = language;

        }
    }


    console.log("getFavouriteLanguage finished");


    return {
        favouriteLanguage,
        languages: totalLanguage
    };
};



// Github activity report
exports.GetReportCard = async (
    username
) => {

    const response = await axios.get(
        `https://api.github.com/users/${username}/events/public`
    );

    const activityData = response.data;


    const report = {
        totalEvents: activityData.length,
        eventTypes: {},
        timeline: [],
        insights: {
            pushes: 0
        }
    };


    const sorted = [...activityData].sort(
        (a, b) =>
            new Date(a.created_at).getTime() -
            new Date(b.created_at).getTime()
    );


    sorted.forEach(event => {

        report.eventTypes[event.type] =
            (report.eventTypes[event.type] || 0) + 1;


        report.timeline.push({
            type: event.type,
            time: event.created_at,
            repo: event.repo.name
        });

    });


    if (sorted.length > 1) {

        const start = new Date(sorted[0].created_at);
        const end = new Date(sorted[sorted.length - 1].created_at);


        const diffMins =
            (end.getTime() - start.getTime()) /
            (1000 * 60);


        report.insights.durationMinutes = diffMins;
    }


    report.insights.pushes =
        report.eventTypes["PushEvent"] || 0;


    console.log("GetReportCard finished");


    return report;
};



// Github score
exports.GetScore = async (
    username
) => {

    console.log("GET SCORE RUNNING");


    const response = await axios.get(
        `https://api.github.com/users/${username}/events/public`
    );


    const activityData = response.data;


    let totalScore = 0;


    for (const event of activityData) {

        switch(event.type) {

            case "PushEvent":
            case "PullRequestEvent":
                totalScore += 3;
                break;

            case "CommitCommentEvent":
            case "IssuesEvent":
            case "IssueCommentEvent":
                totalScore += 2;
                break;

            case "WatchEvent":
            case "ForkEvent":
            case "CreateEvent":
            case "DeleteEvent":
                totalScore += 1;
                break;

            default:
                break;
        }
    }


    if (activityData.length === 0 || totalScore === 0) {
        return {
            totalScore: 0,
            Grade: "E"
        };
    }


    const rating = totalScore / activityData.length;


    let Grade = "E";


    if (rating >= 2.5) {
        Grade = "A";
    }
    else if (rating >= 2) {
        Grade = "B";
    }
    else if (rating >= 1.5) {
        Grade = "C";
    }
    else if (rating >= 1) {
        Grade = "D";
    }


    return {
        totalScore,
        Grade
    };
};