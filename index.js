// require all modules
const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");

// ------------------------------------- define global objects ---------------------------------------
const readmeData ={};

//------------------------------------  define global functions -------------------------------------------
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

//Start of script, Three Stages... stage 1 collecting information from a chosen repo, stage 2, collecting information from the user, stage 3, writing all information to a readme.
/*inquirer.prompt(
    {
    type:"confirm",
    name:"startProgram",
    message:"Welcome to README Generator, would you like to create a README for your project?"
    }
)
.then(answer=>{
    if (answer.startProgram){
        return inquirer.prompt(
            {
            when:answer=>answer.startProgram,
            message: "To get started, please enter your GitHub username",
            name: "username"
            }
        )
    } else {
        throw 'Exiting program'
        
    }
})
.catch(error=>console.error(error))
.then(answer =>{readmeData.username = answer.username; return`https://api.github.com/users/${answer.username}/repos`})
.then(queryUrl => getRequest(queryUrl))
.then(data => {
    readmeData.raw = data.data; // saves all repo data for later use.
    console.log("firing");

    return inquirer.prompt({
        type:"list",
        name:"repoKey",
        message:"Choose a project to create a README for",
        choices:Object.keys(data.data).map(function(key){//creates an array of choices, displays the repo name, but saves the array index.
            choiceObject = {
                name:data.data[key].name,
                value:key
            }
            return choiceObject;
        })
    })
})
// retrieves all direct information from the Repository API call
.then(answers=>{
    readmeData.raw = [answers.repoKey]; // overides all data with system information. 
    const repoInfo = readmeData.raw[answers.repoKey];

    // extracts useful information to build the README file and add it to the global 'readmeData' object
    readmeData.projectName = repoInfo.name;
    readmeData.description = repoInfo.description;
    readmeData.license = repoInfo.license;
    readmeData.deployed = repoInfo.homepage;
    // extracts urls to for secondardy API calls.
    readmeData.contentURL = repoInfo.contents_url.slice(0,-8); //removes '/{+path} from the URL
    readmeData.languageURL = repoInfo.languages_url;
    readmeData.userURL = repoInfo.owner.url;

    //creates new promises to resolve via calling the API for secondary information with urls found from the primary repo response
    const userData = getRequest(readmeData.userURL); //call github API for user info to find a public email if listed
    const languageData = getRequest(readmeData.languageURL); // call github API to find coding languages used in this project
    const contentData = getRequest(readmeData.contentURL) // call github API to list the files at the top level of the repo
    return [userData,languageData,contentData];
})
.then(promises=>Promise.all(promises))   // waits for all promises to be resolved and then continues
.then(resolvedPromises=>{
    // extracts useful information from second round of API calls.
    readmeData.email = resolvedPromises[0].data.email;  // public user email if listed
    readmeData.languages = resolvedPromises[1].data;   // coding languages in this project
    readmeData.content = resolvedPromises[2].data.map(object=>object.name) // top level contents, used to check if a README already exists
    readmeData.hasREADME = checkForREADME(readmeData.content); // checks for a previously exisiting README and saves the outcome to the readmeData object
    for (const key in readmeData) {
        if (key!=="raw"){
            console.log(`${key}: ${readmeData[key]}`);
        }
    }
});
*/

const userConfirmation = inquirer.prompt(
    {
    type:"confirm",
    name:"startProgram",
    message:"Welcome to README Generator, would you like to create a README for your project?"
    }
)


async function startProgram(){
    const userResponse = await userConfirmation;
    const startProgram = userResponse => 
    userResponse.startProgram ? Promise.resolve('continuing function'):Promise.reject('Exiting Function')
    await startProgram.catch(err=>{throw "exiting function"})
}

startProgram()
.catch(error=>console.error(error))
.then(value=>console.log(value))
.then(value=>console.log(value))