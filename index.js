const inquirer = require("inquirer");
const fs = require("fs");
const axios = require("axios");

const questions = [
    'What is your GitHub username?', "What's your favorite color?"
];

inquirer
    .prompt([{
            type: 'input',
            message: questions[0],
            name: 'username'
        },
        {
            type: 'input',
            message: questions[1],
            name: 'color'
        }
    ])
    .then(function(res) {
        const queryUrl = `https://api.github.com/users/` + res.username;
        console.log(`you chose the color ${res.color}`);

        // call to get object data of response
        axios.get(queryUrl).then(function(res) {

            const { login, followers, following, bio, location, blog } = res.data;
            console.log(`USERNAME: ${login} \nFOLLOWERS: ${followers} \n FOLLOWING: ${following} \nBIO: ${bio} \nLOCATION: ${location}`);

            // Axios call to get repo names
            const repoURL = `https://api.github.com/users/${login}/repos`;
            axios.get(repoURL).then(function(response) {
                const repoNames = response.data.map(function(repo) {
                    return repo.name;
                });
                const repoNamesStr = repoNames.join("\n");
                console.log("REPOS: \n" + repoNamesStr);
            });


            // fs.writeFile("repos.txt", repoNamesStr, function(err) {
            //     if (err) {
            //         throw err;
            //     }

            //     console.log(`Saved ${repoNames.length} repos `);
            // });
        });
    });

function writeToFile(fileName, data) {

}

function init() {

    init();
}