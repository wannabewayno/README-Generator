const inquirer = require("inquirer");
const axios = require("axios");
const Rx = require("rxjs");

//set up a subject obersable
const prompts = Rx.Subject();

//initialise the prompt module by subscribing to it
inquirer.prompt(prompts).ui.process.subscribe(
    data=>console.log(data)
    ,
    error=>console.log("error")
    ,
    complete => console.log("complete")
);

//kick it all off by sending in our first question
prompts.next();