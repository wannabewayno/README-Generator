const axios = require('axios');
const questions = require('./questions');
module.exports = methods ={}

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

// --------------------------------- create a place to store extracted data ----------------------------------------------
methods.readmeData = {
    username:null,
    projectName:null,
    description:null,
    license:null,
    licenseOwner:null,
    isDeployed:null,
    email:null,
    avatar:null,
    hasREADME:null,
    motivation:null,
    scope:null,
    solving:null,
    isInstallation:null,
    isUsage:null,
    isContributing:null,
    isLogo:null
}
methods.readmeData.counters={
    installationSteps:0,
    usageSteps:0,
    contributingSteps:0
}

methods.readmeData.urls = {
    contentURL:null,
    languageURL:null,
    userURL:null,
}


// --------------------------------- looks for username in answers ----------------------------------
methods.username = answer => {
    return new Promise((resolve,reject) =>{
        if(answer!==''){
            resolve(methods.readmeData.username = answer);
        } else {
            reject(new Error('no username entered'));
        }
    })
    .catch((error)=> {throw error})
};

// -------------------------------- looks for addlicense in answers -------------------------------
methods.addlicense = answer => {return new Promise((resolve,reject)=>{
        resolve(methods.readmeData.license = answer);
        reject();
    })
    .catch(()=> {throw new Error("error occured adding a license")})
}
// --------------------------------- looks for description in answers -----------------------------
methods.description = answer => {return new Promise((resolve,reject)=>{
        resolve(methods.readmeData.description = answer);
        reject();
    })
    .catch(()=> {throw new Error("error occured adding a description")})
}
// --------------------------------- looks for deployed in answers -----------------------------
methods.deployed = answer => {return new Promise((resolve,reject)=>{
        resolve(methods.readmeData.isDeployed = answer);
        reject();
    })
    .catch(()=> {throw new Error("error occured adding a deployment link")})
}
// --------------------------------- asks user if their application is deployed, and triggers a follow up a secondary deployment question if so.
methods.isDeployed = answer => {
    return new Promise((resolve,reject)=>{
        resolve(answer);
        reject();
    })
    .then(answer => {
    if(answer){
        const questionOrderIndex = questions.order.indexOf(questions.isDeployed);
        questions.order.splice(questionOrderIndex+1,0,questions.deployed);
    }
    })
    .catch(()=> {throw new Error("error occured adding a deployment link")})
}

// --------------------------------- looks for deployed in answers -----------------------------
methods.logo = answer => {return new Promise((resolve,reject)=>{
    resolve(methods.readmeData.isLogo = answer);
    reject();
})
.catch(()=> {throw new Error("error occured adding a logo source")})
}
// --------------------------------- asks user if their application is deployed, and triggers a follow up a secondary deployment question if so.
methods.isLogo = answer => {
return new Promise((resolve,reject)=>{
    resolve(answer);
    reject();
})
.then(answer => {
if(answer){
    const questionOrderIndex = questions.order.indexOf(questions.isLogo);
    questions.order.splice(questionOrderIndex+1,0,questions.logo);
}
})
.catch(()=> {throw new Error("error occured adding a deployment link")})
}
// --------------------------------- asks user if they require an installation section, triggers follow up questions if so ------------------
methods.isInstallation = answer => {
    return new Promise((resolve,reject)=>{
        resolve(answer);
        reject();
    })
    .then(answer => {
        if(answer){
            const questionOrderIndex = questions.order.indexOf(questions.isInstallation);
            questions.order.splice(questionOrderIndex+1,0,questions.typeInstallation);
        }
    })
    .catch(()=> {throw new Error("error occured choosing to add installation instructions")})
}
    // --------------------------------- asks user for the type of follow up questions, input or step by step -----------------------------
    methods.typeInstallation = answer => {
        return new Promise((resolve,reject)=>{
            resolve(answer);
            reject();
        })
        .then(answer=>{
            if (answer === "steps"){
                const questionOrderIndex = questions.order.indexOf(questions.typeInstallation);
                questions.order.splice(questionOrderIndex+1,0,questions.addInstallStep);
            } else {
                const questionOrderIndex = questions.order.indexOf(questions.typeInstallation);
                questions.order.splice(questionOrderIndex+1,0,questions.installSentence);
            }

        })
        .catch(()=> {throw new Error("error occured choosing the type of installation information")})
    }
    // --------------------------------- adds an installation step, triggers further steps --------------------------------------------
        methods.addInstallStep = answer => {
            return new Promise((resolve,reject)=>{
                resolve(answer);
                reject();
            })
            .then(answer => {
                if(methods.readmeData.counters.installationSteps === 0){
                    methods.readmeData.isInstallation = {};
                }
                methods.readmeData.counters.installationSteps++;
                methods.readmeData.isInstallation[`step${methods.readmeData.counters.installationSteps}`] = answer;

                const offset = methods.readmeData.counters.installationSteps;
                const questionOrderIndex = questions.order.indexOf(questions.addInstallStep);
                questions.order.splice(questionOrderIndex+(offset*2)-1,0,questions.confirmInstallStep);
                console.log(methods.readmeData.isInstallation[`step${methods.readmeData.counters.installationSteps}`]);
            })
            .catch(()=> {throw new Error("error occured adding an installation step")})
        }
            // --------------------------------- ask the user if they want to add another step --------------------------------------------
            methods.confirmInstallStep = answer => {
                return new Promise((resolve,reject)=>{
                    resolve(answer);
                    reject();
                })
                .then(answer => {
                    if(answer){
                        const offset = methods.readmeData.counters.installationSteps;
                        const questionOrderIndex = questions.order.indexOf(questions.confirmInstallStep);
                        questions.order.splice(questionOrderIndex+(offset*2)-1,0,questions.addInstallStep);
                    }
                })
                .catch(()=> {throw new Error("error occured confirming a new instalaltion step")})
            }
        // --------------------------------- adds an installation sentence --------------------------------------------
        methods.installSentence = answer => {
        return new Promise((resolve,reject)=>{
            resolve(methods.isInstallation = answer);
            reject();
        })
        .catch(()=> {throw new Error("error occured adding a installation sentence")})
    }
// --------------------------------- asks user if they a usage sections, triggers follow up questions if so ------------------
methods.isUsage = answer => {
    return new Promise((resolve,reject)=>{
        resolve(answer);
        reject();
    })
    .then(answer => {
        if(answer){
            const questionOrderIndex = questions.order.indexOf(questions.isUsage);
            questions.order.splice(questionOrderIndex+1,0,questions.typeUsage);
        }
    })
    .catch(()=> {throw new Error("error occured choosing to add a Usage section")})
}
    // --------------------------------- asks user for the type of follow up questions, input or step by step -----------------------------
    methods.typeUsage = answer => {
        return new Promise((resolve,reject)=>{
            resolve(answer);
            reject();
        })
        .then(answer=>{
            if (answer === "steps"){
                const questionOrderIndex = questions.order.indexOf(questions.typeUsage);
                questions.order.splice(questionOrderIndex+1,0,questions.addUsageStep);
            } else {
                const questionOrderIndex = questions.order.indexOf(questions.typeUsage);
                questions.order.splice(questionOrderIndex+1,0,questions.usageSentence);
            }

        })
        .catch(()=> {throw new Error("error occured choosing the type of usage information")})
    }
    // --------------------------------- adds a Usage step, triggers further steps --------------------------------------------
        methods.addUsageStep = answer => {
            return new Promise((resolve,reject)=>{
                resolve(answer);
                reject();
            })
            .then(answer => {
                if(methods.readmeData.counters.usageSteps === 0){
                    methods.readmeData.isUsage = {};
                }
                methods.readmeData.counters.usageSteps++;
                methods.readmeData.isUsage[`step${methods.readmeData.counters.usageSteps}`] = answer;
                
                const questionOrderIndex = questions.order.indexOf(questions.addUsageStep);
                const offset = methods.readmeData.counters.usageSteps;
                questions.order.splice(questionOrderIndex+(offset*2)-1,0,questions.confirmUsageStep);
            })
            .catch(()=> {throw new Error("error occured adding a Usage step")})
        }
            // --------------------------------- ask the user if they want to add another step --------------------------------------------
            methods.confirmUsageStep = answer => {
                return new Promise((resolve,reject)=>{
                    resolve(answer);
                    reject();
                })
                .then(answer => {
                    if(answer){
                        const offset = methods.readmeData.counters.usageSteps;
                        const questionOrderIndex = questions.order.indexOf(questions.confirmUsageStep);
                        questions.order.splice(questionOrderIndex+(offset*2)-1,0,questions.addUsageStep);
                    }
                })
                .catch(()=> {throw new Error("error occured confirming a new Usage step")})
            }
        // --------------------------------- adds an installation sentence --------------------------------------------
        methods.usageSentence = answer => {
        return new Promise((resolve,reject)=>{
            resolve(methods.readmeData.isUsage = answer);
            reject();
        })
        .catch(()=> {throw new Error("error occured adding a usage sentence")})
    }
// --------------------------------- asks user if they require a Contributing Section, triggers follow up questions if so ------------------
methods.isContributing = answer => {
    return new Promise((resolve,reject)=>{
        resolve(answer);
        reject();
    })
    .then(answer => {
        if(answer){
            const questionOrderIndex = questions.order.indexOf(questions.isContributing);
            questions.order.splice(questionOrderIndex+1,0,questions.typeContributing);
        }
    })
    .catch(()=> {throw new Error("error occured choosing to a contributing section")})
}
    // --------------------------------- asks user for the type of follow up questions, input or step by step -----------------------------
    methods.typeContributing = answer => {
        return new Promise((resolve,reject)=>{
            resolve(answer);
            reject();
        })
        .then(answer=>{
            if (answer === "steps"){
                const questionOrderIndex = questions.order.indexOf(questions.typeContributing);
                questions.order.splice(questionOrderIndex+1,0,questions.addContributingStep);
            } else {
                const questionOrderIndex = questions.order.indexOf(questions.typeContributing);
                questions.order.splice(questionOrderIndex+1,0,questions.contributingSentence);
            }

        })
        .catch(()=> {throw new Error("error occured choosing the type of contribution information")})
    }
    // --------------------------------- adds an installation step, triggers further steps --------------------------------------------
        methods.addContributingStep = answer => {
            return new Promise((resolve,reject)=>{
                resolve(answer);
                reject();
            })
            .then(answer => {
                if(methods.readmeData.counters.contributingSteps === 0){
                    methods.readmeData.isContributing = {};
                }
                methods.readmeData.counters.contributingSteps++;
                methods.readmeData.isContributing[`step${methods.readmeData.counters.contributingSteps}`] = answer;
                
                const questionOrderIndex = questions.order.indexOf(questions.addContributingStep);
                const offset = methods.readmeData.counters.contributingSteps;
                questions.order.splice(questionOrderIndex+(offset*2)-1,0,questions.confirmContributingStep);
            })
            .catch(()=> {throw new Error("error occured adding a contributing step")})
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
                        questions.order.splice(questionOrderIndex+(offset*2)-1,0,questions.addContributingStep);
                    }
                })
                .catch(()=> {throw new Error("error occured confirming a new contributing step")})
            }
        // --------------------------------- adds an installation sentence --------------------------------------------
        methods.contributingSentence = answer => {
        return new Promise((resolve,reject)=>{
            resolve(methods.readmeData.isContributing = answer);
            reject();
        })
        .catch(()=> {throw new Error("error occured adding a contributing sentence")})
    }
// --------------------------------- looks for email in answers -----------------------------
methods.email = answer => {return new Promise((resolve,reject)=>{
        resolve(methods.readmeData.email = answer);
        reject();
    })
    .catch(()=> {throw new Error("error occured adding an email")})
}
// --------------------------------- looks for projectName in answers -----------------------------
methods.projectName = answer => {
    return new Promise((resolve,reject)=>{
        resolve(methods.readmeData.projectName = answer);
        reject();
    })
    .catch(()=> {throw new Error("error occured adding a project name")})
}
// --------------------------------- looks for motivation in answers -----------------------------
methods.motivation = answer => {
    return new Promise((resolve,reject)=>{
        resolve(methods.readmeData.motivation = answer);
        reject();
    })
    .catch(()=> {throw new Error("error occured adding a project motivation")})
}
// --------------------------------- looks for scope in answers -----------------------------
methods.scope = answer => {
    return new Promise((resolve,reject)=>{
        resolve(methods.readmeData.scope = answer);
        reject();
    })
    .catch(()=> {throw new Error("error occured adding a project scope")})
}
// --------------------------------- looks for solving in answers -----------------------------
methods.solving = answer => {
    return new Promise((resolve,reject)=>{
        resolve(methods.readmeData.solving = answer);
        reject();
    })
    .catch(()=> {throw new Error("error occured adding information on how this project solves a problem")})
}
// --------------------------------- looks for languages in answers -----------------------------
methods.languages = answer => {
    return new Promise((resolve,reject)=>{
        resolve(answer);
        reject();
    })
    .then(answer=>{
        methods.readmeData.languages = answer.split(',');
    })
    .catch(()=> {throw new Error("error occured adding languages")})
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

            methods.readmeData.hasREADME = false //assuming if we're going down this route, you don't have or will overide your README
            methods.readmeData.email = userInfo.email;  // finds public user email if listed
            methods.readmeData.avatar = userInfo.avatar_url; //gets users avatar
            
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
        // Overides all repository information with the selected repository information.
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
        methods.readmeData.licenseOwner = resolvedPromises[0].name;
        methods.readmeData.email = resolvedPromises[0].data.email;  // finds public user email if listed
        methods.readmeData.avatar = resolvedPromises[0].data.avatar_url; //gets users avatar
        methods.readmeData.languages = resolvedPromises[1].data;   // coding languages in this project
        methods.readmeData.content = resolvedPromises[2].data.map(object=>object.name) // top level contents, used to check if a README already exists
        methods.readmeData.hasREADME = checkForREADME(methods.readmeData.content); // checks for a previously exisiting README and saves the outcome to the readmeData object

        // finds all information in readmeData that is null, and asks the user to fill in this information.
        for (const key in methods.readmeData) {
            if (methods.readmeData[key] === null){
                questions.order.push(questions[key]);
            }
        }
    })     
    .catch(()=> {throw new Error("error occured extracting information from your repository")})
}
