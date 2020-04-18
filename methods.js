const axios = require('axios');


function getRequest(path){ //a convenient function that creates an API call using axios to the GitHub API.
    return new Promise((resolve,reject)=>{
        resolve(axios.get(path));
        reject(error);
    });
}

module.exports = methods ={}
// create a place store extracted data.
methods.readmeData = {

};

methods.readmeComponents = {};
methods.readmeComponents.contentTables = {
    logo:null, // specify a path
    installation:"Installation",
    usage:"Usage",
    contributing:"Contributing",
    licencse:"License",
    questions:"Questions",
}
methods.readmeComponents.header = {
    title:null,
    description:null,
    deployed:null,
}
methods.readmeComponents.description = {
    motivation:null,
    scope:null,
    solving:null,
    deployed:null
}
methods.readmeComponents.installation = {
 
};

methods.readmeComponents.usage = null;
methods.readmeComponents.contributing = null;
methods.readmeComponents.license = null;
methods.readmeComponents.questions = null;

methods.readmeData = {
    username:null,
    projectName:null,
    description:null,
    license:null,
    deployed:null,
    contentURL:null,
    languageURL:null,
    userURL:null,
    email:null,
    avatar:null,
    hasREADME:null
}





// --------------------------------- looks for username in answers ----------------------------------
methods.username = answer => {return new Promise((resolve,reject) =>{
        resolve(methods.readmeData.username = answer);
        reject(error);
    })
};
//---------------------------------- looks for startFrom in answers ------------------------------
methods.startFrom = answer => {
    console.log("hello");
    // check that user entered a username
    console.log(methods.readmeData.username);
    if (methods.readmeData.username === ''){
        throw new Error("no username entered");
    }
    if(answer === "repository"){
        return new Promise ((resolve,reject)=>{
            resolve(getRequest(`https://api.github.com/users/${methods.readmeData.username}/repos`));
            reject(new Error());
        })
        .then(response => methods.readmeData.repositories = response.data)
        .catch(error=>console.warn(`Error:${error.response.headers.status}, an error occured retrieving your github username`))
        .then(next=>console.log(`a new thing`))
    } else {
        return new Promise ((resolve,reject)=>{
            resolve(getRequest(`https://api.github.com/users/${methods.readmeData.username}/repos`));
            reject(new Error());
        })
        .then(complete=>console.log("complete"))
        .catch(error=>console.warn(`Error:${error.response.headers.status}, an error occured retrieving your github username`));
    }
}

//TODO: write a system that then prioritises questions and pushes these questions to questions.order object
//TODO: this has to loop through our object and look for 'null' fields after we have filled out everything.