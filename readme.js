const inquirer = require("inquirer");
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


function createREADME(readmeData){
    

}