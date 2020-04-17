const inquirer = require("inquirer");
const Rx = require("rxjs");
const modules = require("./modules");

// get's questions from modules.order, an array of questions to be asked, start with first question at index 0.
let questionIndex = 0; 
function nextQuestion(questionIndex){
    if (questionIndex >= modules.order.length){
        prompts.complete();
    } else {    
        return modules.order[questionIndex];
    }
}
// create a new subject observable
const prompts = new Rx.Subject();

// initialse the prompt module
inquirer.prompt(prompts).ui.process.subscribe(data=>{

    promise = new Promise ((resolve,reject) => {
        resolve(modules[data.name].answer(data.answer));
        reject("arrgh");
    });
    promise.then(completed => {
        questionIndex++;
        prompts.next(
            nextQuestion(questionIndex)
        );
    }).catch(error=>console.log("something went wrong!"))
}
,
error => console.warn("hmmmm something went wrong") // for errors
,
complete => console.log("exiting program") // for when we call prompts.complete()
);

// kicks off the prompts
prompts.next(nextQuestion(questionIndex));



// --------------------- loader if have time -------------------------
// var loader = [
//     '/ Installing',
//     '| Installing',
//     '\\ Installing',
//     '\u2014 Installing'
//   ];
// let count = 0;
// const ui = new inquirer.ui.BottomBar(); 