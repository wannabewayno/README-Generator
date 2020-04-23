const axios = require('axios');
const questions = require('./questions');
module.exports = methods ={}

// --------------------------------- create a place to store extracted data ----------------------------------------------
methods.readmeData = {
    username:null,
    projectName:null,
    description:null,
    name:null,
    license:null,
    licenseOwner:null,
    deployed:null,
    email:null,
    avatar:null,
    hasREADME:null,
    hasLICENSE:null,
    motivation:null,
    scope:null,
    solving:null,
    installation:null,
    usage:null,
    contributing:null,
    logo:null,
    languages:null
}
// counters for steps
methods.readmeData.counter = 0;
methods.readmeData.looping = false;

// url placeholders for further API calls when the user selects the 'from repository' method.
methods.readmeData.urls = {
    contentURL:null,
    languageURL:null,
    userURL:null,
}

// ----------------------------------------- helper fucntions ---------------------------------------------
function getRequest(path){ //a convenient function that creates an API call using axios to the GitHub API.
    return new Promise((resolve,reject)=>{
        resolve(axios.get(path));
        reject(new Error("Axios Get request error"));
    });
}

function checkForREADME(array){ // checks an array to see if the text README.md is present, returns true or false accordingly.
    if(array.indexOf(`README.md`)!==-1){
        return true;
    } else {
        return false;
    }
} 
function checkForLICENSE(array){ // checks an array to see if the text README.md is present, returns true or false accordingly.
    if(array.indexOf(`LICENSE.md`)!==-1||array.indexOf(`LICENSE.txt`)!==-1){
        return true;
    } else {
        return false;
    }
} 

function followUpQuestion(currentQ,followUpQ){
    const questionOrderIndex = questions.order.indexOf(questions[currentQ]);
    questions.order.splice(questionOrderIndex+1,0,questions[followUpQ]);
    console.log(questions.order);
}
// -------------------------------------- METHOD FUNCTIONS ----------------------------------------------------------

methods.saveData = answer => {
    return new Promise((resolve, reject) => {
        if (answer.name.indexOf('CONFIRM') !==-1){
            resolve(methods.confirm(answer));
            reject(new Error(`an Error occured running the confirm function`))
        }
        if (answer.name.indexOf('SWITCH') !==-1){
            resolve(methods.switch(answer));
            reject(new Error(`an Error occured running the fork function`))
        }
        if (answer.name.indexOf('LOOP') !==-1){
            resolve(methods.loop(answer));
            reject(new Error(`an Error occured running the fork function`))
        }
        if (typeof(methods[answer.name])==="function"){
            resolve(methods[answer.name](answer.answer));
            reject(new Error(`an Error occured running the ${answer.name} function`));
        } else {
            resolve(methods.readmeData[answer.name] = answer.answer);
            reject(new Error("An Error occured saving your response"));
        }
        console.log(methods.readmeData.looping);
    })
    .catch((error)=>{throw error})
}

// --------------------------------- triggers follow up questions if user answers yes to any prompt of type confim ------------------------
methods.confirm = answer => {
    if(answer.answer){
        console.log("----------------------- CONFIRM --------------------------");
        const separator = answer.name.indexOf("|");
        let currentQ = answer.name.slice(0,separator);
        const followUpQ = currentQ + "FollowUp";
        let questionCopy = questions[followUpQ];
        let offset = 1;
        console.log(methods.readmeData.looping);
        if (methods.readmeData.looping){
            offset = methods.readmeData.counter;
            currentQ += "LOOP"
            questionCopy = {};
            for (const key in questions[followUpQ]){
                questionCopy[key] = questions[followUpQ][key]
            }
            console.log(`Question name: ${questionCopy.name}`);
            questionCopy.name += `|${methods.readmeData.counter}`;
            console.log(questionCopy);
        }
        console.log(`currentQ :${currentQ}`);
        console.log(`Apparently it's telling me that it can't find`);
        console.log(questions[currentQ]);
        console.log(`In our question.order array..... GO LOOK`);
        console.log(questions[currentQ] === questions.installationStepLoop );
        console.log(questions[currentQ].type === questions.installationStepLOOP.type);
        console.log(questions[currentQ].name === questions.installationStepLOOP.name);
        console.log(questions[currentQ].message === questions.installationStepLOOP.message);
        const questionOrderIndex = questions.order.indexOf(questions[currentQ]);
        console.log(`question order index: ${questionOrderIndex}`);
        questions.order.splice(questionOrderIndex+((offset*2)-1),0,questionCopy);
        console.log(questions.order);
    } else {
        console.log("THIS MEANS YOU FUCKED UP 1");
        methods.readmeData.looping = false;
        methods.readmeData.counter = 0;
    }
}

// -------------------------------- switching function, for prompts of type list if they're used to select between things further prompts ----------
methods.switch = answer => {
    const separator = answer.answer.indexOf('|');
    const currentQ = answer.answer.substring(0,separator)+"FollowUp";
    const followUpQ = answer.answer.slice(0,separator) + answer.answer.slice(separator+1);
    followUpQuestion(currentQ,followUpQ);
}

// -------------------------------- looping function for prompts to enter a series of input -> confirm -> input, for looping questions ---------------------
methods.loop = answer => {
    methods.readmeData.looping = true;
    console.log("------------------- methods.loop IS FIRING ---------------------------");
    if(methods.readmeData.counter === 0){
        methods.readmeData.installation = {};
    }
    methods.readmeData.counter++;

    const separator = answer.name.indexOf('|');
    const currentQ = answer.name.substring(0,separator)
    const followUpQ = currentQ+"LOOP"
    console.log(followUpQ);

    // save the step as a new step
    methods.readmeData.installation[`step${methods.readmeData.counter}`] = answer.answer;
    //copies question to create numbered copies of itself so promised don't fail due to the same object name (really stupid, why does it do this)
    const questionCopy = {};
    for (const key in questions[followUpQ]){
        questionCopy[key] = questions[followUpQ][key]
    }
    console.log(`Question name: ${questionCopy.name}`);
    if (methods.readmeData.counter > 1){
        questionCopy.name += `|${methods.readmeData.counter}`;
    }
    console.log(questionCopy);
    //
    const offset = methods.readmeData.counter;
    const questionOrderIndex = questions.order.indexOf(questions[currentQ]);
    questions.order.splice(questionOrderIndex+((offset*2)-1),0,questionCopy);
    console.log(questions.order);
}
    // --------------------------------- adds an installation step, triggers further steps --------------------------------------------
        
            // if(methods.readmeData.counters.installationSteps === 0){
            //     methods.readmeData.isInstallation = {};
            // }
            // if (methods.)
            // methods.readmeData.counters.installationSteps++;
            // methods.readmeData.isInstallation[`step${methods.readmeData.counters.installationSteps}`] = answer;
            
            // const offset = methods.readmeData.counters.installationSteps;
            // const questionOrderIndex = questions.order.indexOf(questions.installationStep);
            // questions.installationStep.name += `|${methods.readmeData.counters.installationSteps}`
            // questions.order.splice(questionOrderIndex+(offset*2)-1,0,questions.confirmInstallationStep);
        
            // // --------------------------------- ask the user if they want to add another step --------------------------------------------
            // methods.confirmInstallationStep = answer => {
            //     if(answer){
            //         const offset = methods.readmeData.counters.installationSteps;
            //         const questionOrderIndex = questions.order.indexOf(questions.confirmInstallationStep);
            //         questions.confirmInstallationStep.name += `|${methods.readmeData.counters.installationSteps}`
            //         questions.order.splice(questionOrderIndex+(offset*2)-1,0,questions.installationStep);
            //     }
            // }
    // --------------------------------- adds a Usage step, triggers further steps --------------------------------------------
        methods.usageStep = answer => {
            if(methods.readmeData.counters.usageSteps === 0){
                methods.readmeData.isUsage = {};
            }
            methods.readmeData.counters.usageSteps++;
            methods.readmeData.isUsage[`step${methods.readmeData.counters.usageSteps}`] = answer;
            
            const questionOrderIndex = questions.order.indexOf(questions.addUsageStep);
            const offset = methods.readmeData.counters.usageSteps;
            questions.order.splice(questionOrderIndex+(offset*2)-1,0,questions.confirmUsageStep);
        }
            // --------------------------------- ask the user if they want to add another step --------------------------------------------
            methods.confirmUsageStep = answer => {
                if(answer){
                    const offset = methods.readmeData.counters.usageSteps;
                    const questionOrderIndex = questions.order.indexOf(questions.confirmUsageStep);
                    questions.order.splice(questionOrderIndex+(offset*2)-1,0,questions.usageStep);
                }
            }
    // --------------------------------- adds an installation step, triggers further steps --------------------------------------------
        methods.contributingStep = answer => {
            if(methods.readmeData.counters.contributingSteps === 0){
                methods.readmeData.isContributing = {};
            }
            methods.readmeData.counters.contributingSteps++;
            methods.readmeData.isContributing[`step${methods.readmeData.counters.contributingSteps}`] = answer;
            
            const questionOrderIndex = questions.order.indexOf(questions.contributingStep);
            const offset = methods.readmeData.counters.contributingSteps;
            questions.order.splice(questionOrderIndex+(offset*2)-1,0,questions.confirmContributingStep);
        }
            // --------------------------------- ask the user if they want to add another step --------------------------------------------
            methods.confirmContributingStep = answer => {
                return new Promise((resolve,reject)=>{
                    resolve(answer);
                    reject();
                })
                .then(answer => {
                    if(answer){
                        const offset = methods.readmeData.counters.contributingSteps;
                        const questionOrderIndex = questions.order.indexOf(questions.confirmContributingStep);
                        questions.order.splice(questionOrderIndex+(offset*2)-1,0,questions.contributingStep);
                    }
                })
                .catch(()=> {throw new Error("error occured confirming a new contributing step")})
            }
//---------------------------------- looks for startFrom in answers ------------------------------
methods.startFrom = answer => {
    //if user wants to choose from repository, extract repository information using their username
    if(answer === "repository"){
        return new Promise ((resolve,reject)=>{
            resolve(getRequest(`https://api.github.com/users/${methods.readmeData.username}/repos`));
            reject( new Error());
        })
        .then(response => {
            methods.readmeData.repositories = response.data;
            methods.readmeData.repositoryChoices = Object.keys(response.data).map(function(key){//creates an array of choices, displays the repo name, but saves the array index.
                choiceObject = {
                    name:response.data[key].name,
                    value:key
                }
                return choiceObject;
            })
            // Add chooseRepo question into question queue, so user answers this next.
            questions.order.push(questions.chooseRepo);
        })
        .catch(error=>console.warn(`Error:${error.response.headers.status}, an error occured retrieving your github username`))

    // if they want to start from scratch, extract user based information using their username
    } else {
        return new Promise ((resolve,reject)=>{
            resolve(getRequest(`https://api.github.com/users/${methods.readmeData.username}`));
            reject(new Error());
        })
        .then(response =>{
            const userInfo = response.data;
            methods.readmeData.hasLICENSE = false;
            methods.readmeData.hasREADME = false; //assuming if we're going down this route, you don't have or will overide your README
            methods.readmeData.email = userInfo.email;  // finds public user email if listed
            methods.readmeData.avatar = userInfo.avatar_url; //gets users avatar
            methods.readmeData.name = userInfo.name; // get's user's name
            
            // finds all information in readmeData that is null, and asks the user to fill in this information.
            for (const key in methods.readmeData) {
                if (methods.readmeData[key] === null){
                    questions.order.push(questions[key]);
                }
            }
        })
        .catch(error=>console.warn(`Error:${error.response.headers.status}, an error occured retrieving your github username`));
    }
}
// --------------------------------- looks for chooseRepo in answers -----------------------------
methods.chooseRepo = answer => {
        return new Promise((resolve,reject)=>{
        resolve(answer);
        reject();
    })
    .then(answer=>{
        // Overides all repositories with the user selected repository
        methods.readmeData.repositories = methods.readmeData.repositories[answer];
        const repoInfo = methods.readmeData.repositories;
        // extracts useful information to build the README file and add it to the global 'readmeData' object
        methods.readmeData.projectName = repoInfo.name;
        methods.readmeData.description = repoInfo.description;
        methods.readmeData.license = repoInfo.license;
        methods.readmeData.isDeployed = repoInfo.homepage;
        // extracts urls for secondardy API calls.
        methods.readmeData.urls.contentURL = repoInfo.contents_url.slice(0,-8); //removes '/{+path} from the URL
        methods.readmeData.urls.languageURL = repoInfo.languages_url;
        methods.readmeData.urls.userURL = repoInfo.owner.url;
        //creates new promises to resolve via calling the API for secondary information with urls found from the primary repo response
        const userData = getRequest(methods.readmeData.urls.userURL); //call github API for user info to find a public email if listed
        const languageData = getRequest(methods.readmeData.urls.languageURL); // call github API to find coding languages used in this project
        const contentData = getRequest(methods.readmeData.urls.contentURL) // call github API to list the files at the top level of the repo
        return [userData,languageData,contentData];
    })
    .then(promises=>Promise.all(promises))   // waits for all promises to be resolved and then continues
    .then(resolvedPromises=>{
        // extracts useful information from second round of API calls.
        methods.readmeData.name = resolvedPromises[0].name;
        methods.readmeData.licenseOwner = resolvedPromises[0].name;
        methods.readmeData.email = resolvedPromises[0].data.email;  // finds public user email if listed
        methods.readmeData.avatar = resolvedPromises[0].data.avatar_url; //gets users avatar
        methods.readmeData.languages = resolvedPromises[1].data;   // coding languages in this project
        methods.readmeData.content = resolvedPromises[2].data.map(object=>object.name) // top level contents, used to check if a README already exists
        methods.readmeData.hasREADME = checkForREADME(methods.readmeData.content); // checks for a previously exisiting README and saves the outcome to the readmeData object
        methods.readmeData.hasLICENSE = checkForLICENSE(methods.readmeData.content);

        // finds all information in readmeData that is null, and asks the user to fill in this information.
        for (const key in methods.readmeData) {
            if (methods.readmeData[key] === null){
                questions.order.push(questions[key]);
            }
        }
    })     
    .catch(()=> {throw new Error("error occured extracting information from your repository")})
}
