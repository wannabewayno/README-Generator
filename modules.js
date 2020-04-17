const axios = require("axios");
const inquirer = require("inquirer");


module.exports = modules ={}; //exports all the module object to readme.js, define all modules here

// ------------------------- helper functions for this file ----------------------
const question = question => modules[question].question; // allows defining question order in modules.order, more readable

function getRequest(path){ //a convenient function that creates an API call using axios to the GitHub API.
    return new Promise((resolve,reject)=>{
        resolve(axios.get(path));
        reject(error);
    });
}

function checkForREADME(array){ // checks an array to see if the text README.md is present, returns true or false accordingly.
    if(array.indexOf(`README.md`)!==-1){
        return true;
    } else {
        return false;
    }
} 

// --------------------------- creates a section to store user answers ------------------
    modules.readmeData ={};

// -------------------- welcome message and exit option ------------------------
    modules.exit = {};
    modules.exit.question =
        {
        type:"confirm",
        name:"exit",
        message:"Welcome to readme.js, would you like to create a new README for your project?"
        };
    modules.exit.answer = answer => {
        if (answer === false){
            return eval("prompts.complete()");
        }
    }

// ----------------------- API call to github via username -----------------------
    modules.username = {};
    modules.username.question = 
        {
        type:"input",
        name:"username",
        message:"what is your github username?"
        };

    modules.username.answer = answer => {
        return new Promise((resolve,reject)=>{
            resolve(getRequest(`https://api.github.com/users/${answer}/repos`));
            reject();
        })
        .then(response => {
            modules.readmeData.username = answer;
            modules.readmeData.repository = response.data;
            modules.readmeData.repositoryChoices = Object.keys(response.data).map(function(key){//creates an array of choices, displays the repo name, but saves the array index.
                choiceObject = {
                    name:response.data[key].name,
                    value:key
                }
                return choiceObject;
            })
        })
        .catch(error=>console.warn("an error occured retrieving your github username, please try again"));
    }

// ------------------- Choose from an Array of repository choices then extract information from the repository --------------------------
    modules.repoChoice ={};
    // ask user to choose from a list of retrieved repositories
    modules.repoChoice.question = {
        type:'list',
        name:'repoChoice',
        message:'Either Choose a repository to get started, or pick "start from scratch"',
        choices: async function (){
            const choices = await modules.readmeData.repositoryChoices;
            choices.push(new inquirer.Separator(),"No repository, I want to start from scratch",new inquirer.Separator())
            return choices;
        }
    }
    // processes users response and extracts required information from selected repo.
    modules.repoChoice.answer = answer => {
        return new Promise((resolve,reject) => {
            resolve(answer);
            reject("we couldn't load your repository choices");
        }).then(answer=>{
            // Overides all repository information with the selected repository information.
            modules.readmeData.repository = modules.readmeData.repository[answer];

            const repoInfo = modules.readmeData.repository;
            // extracts useful information to build the README file and add it to the global 'readmeData' object
            modules.readmeData.projectName = repoInfo.name;
            modules.readmeData.description = repoInfo.description;
            modules.readmeData.license = repoInfo.license;
            modules.readmeData.deployed = repoInfo.homepage;
            // extracts urls for secondardy API calls.
            modules.readmeData.contentURL = repoInfo.contents_url.slice(0,-8); //removes '/{+path} from the URL
            modules.readmeData.languageURL = repoInfo.languages_url;
            modules.readmeData.userURL = repoInfo.owner.url;

            //creates new promises to resolve via calling the API for secondary information with urls found from the primary repo response
            const userData = getRequest(modules.readmeData.userURL); //call github API for user info to find a public email if listed
            const languageData = getRequest(modules.readmeData.languageURL); // call github API to find coding languages used in this project
            const contentData = getRequest(modules.readmeData.contentURL) // call github API to list the files at the top level of the repo
            return [userData,languageData,contentData];
        })
        .then(promises=>Promise.all(promises))   // waits for all promises to be resolved and then continues
        .then(resolvedPromises=>{
            // extracts useful information from second round of API calls.
            modules.readmeData.email = resolvedPromises[0].data.email;  // finds public user email if listed
            modules.readmeData.avatar = resolvedPromises[0].data.avatar; //gets users avatar
            modules.readmeData.languages = resolvedPromises[1].data;   // coding languages in this project
            modules.readmeData.content = resolvedPromises[2].data.map(object=>object.name) // top level contents, used to check if a README already exists
            modules.readmeData.hasREADME = checkForREADME(modules.readmeData.content); // checks for a previously exisiting README and saves the outcome to the readmeData object
            // for (const key in modules.readmeData) {
            //     if (key!=="raw"){
            //         console.log(`${key}: ${modules.readmeData[key]}`);
            //     }
            // }
        });        
    };

//---------------- an array that Defines the order of questions to be asked --------------
    modules.order = [
        question("exit"),
        question("username"),
        question("repoChoice"),
        question("exit")
    ];