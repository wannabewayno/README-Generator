const inquirer = require("inquirer");
const axios = require("axios");
const Rx = require("rxjs");
const questions = require("./questions.js");
const methods = require("./methods.js");
const readmeData = {};

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
complete => console.log("complete")
);

let questionIndex = 0;
function nextQuestion(questionIndex){
    if (questionIndex >= questions.order.length){
        prompts.complete();
        createREADME();
    } else {    
        return questions.order[questionIndex];
    }
}


//kick it all off by sending in our first question
prompts.next(nextQuestion(questionIndex));


function createREADME(){
    console.log("testing to see if this is working");
    console.log(readmeData.isInstallation);
    console.log(readmeData.isInstallation.step1);

}