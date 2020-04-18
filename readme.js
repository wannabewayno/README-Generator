const inquirer = require("inquirer");
const fs = require('fs');
const axios = require("axios");
const Rx = require("rxjs");
const questions = require("./questions.js");
const methods = require("./methods.js");

//set up a subject obersable
const prompts = new Rx.Subject();

//initialise the prompt module by subscribing to it
inquirer.prompt(prompts).ui.process.subscribe(async function(answer){

    const result = await methods[answer.name](answer.answer).catch((error)=>{throw error})
    questionIndex++;
    prompts.next(nextQuestion(questionIndex));
}
,
error=>{throw new Error("Whoa! something went terribly wrong")}
,
complete => {
    return new Promise((resolve,reject)=>{
        resolve(createREADME(methods.readmeData))
        reject(new Error("error returning the completed promise"))
    })
    .then(completed => console.log("You have answered all the questions \n Generating your README"))
    .catch(error=>console.log(error))
}
);

let questionIndex = 0;
function nextQuestion(questionIndex){
    if (questionIndex >= questions.order.length){
        prompts.complete()
    } else {    
        return questions.order[questionIndex];
    }
}


//kick it all off by sending in our first question
prompts.next(nextQuestion(questionIndex));


function createLICENSE(license,stamps){
    const Chosenlicense = require(`./license-boilerplate/${license}`);
    methods.readmeData.licenseName = Chosenlicense.name;
    function stamp(license,stamps){
        let stampStart = 0;  
        while (stampStart !== -1){
            //Guard Clause
            stampStart = license.indexOf("{{");
            if (stampStart === -1){
                return license;
            }
            stampEnd = license.indexOf("}}",stampStart);
            stampName = license.substring(stampStart+2,stampEnd);
            license = license.replace(`{{${stampName}}}`,stamps[stampName]);
        }
        return license;
    }
    
    if (Chosenlicense.requireStamping){
        Chosenlicense.license = stamp(Chosenlicense.license,stamps);
    }
    fs.writeFile('LICENSE.md',Chosenlicense.license,(err)=>{
        if (err) throw err;
        console.log("Success! this license has been added to your repo");
    })
}


function createREADME(readmeData){
    stamps = {
        year: new Date().getFullYear(),
        owner: readmeData.licenseOwner,
        projectName: readmeData.projectName,
        email: readmeData.email,
    }

    if (!readmeData.hasLICENSE){
        createLICENSE(readmeData.license,stamps)
    }

    readmeFile = ``;
    readmeFile += NAVBAR(readmeData);
    readmeFile += badges(readmeData.languages,readmeData.licenseName)
    readmeFile += `# ${readmeData.projectName}\n`;
    readmeFile += ` > ${readmeData.description} \n`
    readmeFile += motivation(readmeData.motivation);
    readmeFile += scope(readmeData.scope);
    readmeFile += solve(readmeData.solving);
    readmeFile += deployed(readmeData.isDeployed,readmeData.projectName);
    readmeFile += Installation(readmeData.isInstallation);
    readmeFile += Usage(readmeData.isUsage);
    readmeFile += Contributing(readmeData.isContributing);
    readmeFile += License(stamps,readmeData.licenseName);
    readmeFile += Questions(readmeData.email,readmeData.username,readmeData.name,readmeData.avatar);

    fs.writeFile('README.md',readmeFile,(err)=>{
    if (err) throw err;
    console.log("Success! this README has been added to your repo");
    });

}

function NAVBAR(readmeData){
    let navbar ='<p align="center">\n';
    navComponents = {
        Installation:readmeData.isInstallation,
        Usage:readmeData.isUsage,
        Contributing:readmeData.isContributing,
        License:readmeData.license,
        Questions:true,
        Logo:readmeData.isLogo
    }

    if(navComponents.Logo!==null){
        navbar+= `<img src=${navComponents.Logo} width="300"/>
        <br>`
    }

    for (const components in navComponents){
        if(navComponents[components]!==null && components !== "Logo"){
            navbar+= `<a href="#${components}">${components}</a> |\n`
        }
    }
    navbar += `</p>\n`
    return navbar;
}

function badges(languages,license){
   let badges = `<p align="center">\n`;
    badges += `<img src="https://img.shields.io/badge/License-${license}-blue"/> `
    Total = 0;
    if (typeof(languages)==="string"){
        badges += `<img src="https://img.shields.io/badge/${key}-flex-yellow"/> `
    } else {
        if (typeof(languages)==="object"){
            for (let key in languages){
            Total += languages[key];
            }
        }
        if (typeof(languages)==="object"){
            for (let key in languages){
                badges += `<img src="https://img.shields.io/badge/${key}-${Math.round(languages[key]/Total)*100}%-yellow"/> `
            }
        }
    }
    badges += `\n</p>\n\n`
    return badges;
}


function motivation(motivation){
    if(motivation!==null||motivation!==''){
        return `### Motivation \n ${motivation}\n`
    }
    return '';
}
function scope(scope){
    if(scope!==null && scope!==''){
        return `### Scope \n ${scope}\n`
    }
    return '';
}
function solve(solving){
    if(solving!==null && solving!==''){
        return `### Aims to solve? \n ${solving}\n`
    }
    return '';
}
function deployed(deployed,projectName){
    if(deployed!==null && deployed!==''){
        return `## Deployed Application \n > Click the link to see visit the application <a href="${deployed}">${projectName}</a>\n`
    } else {
        return '';
    }
    
}
function Installation(installation){
    if(installation===null||installation===''){
        return '\n';
    }
    if (typeof(installation)==="string"){
        return `## Installation \n ${installation}\n`
    } else {
        let steps = `## Installation \n`;
        for (let key in installation){
            steps += `   * ${installation[key]}\n`
        }
        return steps;
    }
}
function Usage(usage){
    if(usage===null || usage===''){
        return '\n';
    }
    if (typeof(usage)==="string"){
        return `## Usage \n ${usage}\n`
    } else {
        let steps = `## Usage\n`
        for(let key in usage){
            steps += `   * ${usage[key]}\n`
        }
    }
}
function Contributing(contributing){
    if(contributing===null||contributing===''){
        return '\n';
    }
    if (typeof(contributing)==="string"){
        return `## Contributing \n ${contributing}\n`
    } else {
        let steps = `## Contributing \n`;
        for(let key in contributing){
            steps += `   * ${contributing[key]}\n`
        }
    }
}
function License(stamps,licenseName){
    if(licenseName===null||licenseName===''){
        return '';
    }
        return `## License\n Copyright \u00A9 ${stamps.year} ${stamps.owner} under the ${licenseName}\n`
}
function Questions(email,username,name,avatar){
    return `## Questions \n If you any questions about this project you can open an issue\n Contact ${username} \n or feel free to get in touch with \n ${name} at ${email} <img src="${avatar}" alt="avatar" style="border-radius:15px;" width="50px"/>`
}