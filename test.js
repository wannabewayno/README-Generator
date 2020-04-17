const inquirer = require("inquirer");
var { Observable } = require("rxjs");

let emitter;

var prompts = Observable.create(function(e) {
  emitter = e;
  // need to start with at least one question here
  emitter.next({
    type: "list",
    name: "fruits",
    message: "What is your favorite fruit?",
    choices: [
      {
        name: "Banana"
      },
      {
        name: "Apple"
      },
      {
        name: "Pear"
      }
    ]
  });
});

let times = 0;

inquirer.prompt(prompts).ui.process.subscribe(
  q => {
    let dots = new Array(times).fill(".").join("");

    if (q.answer.toLowerCase() === "pear") {
      console.log("That's Great. I would never forget a Pear-eater.");
      emitter.complete();
    }

    emitter.next({
      type: "list",
      name: "fruits",
      message:
        "Sorry, what is your favorite fruit? I forgot, was it " +
        q.answer +
        ", or something else?",
      choices: [
        {
          name: "Uh, Banana.." + dots,
          value: "banana"
        },
        {
          name: "Uh, Apple.." + dots,
          value: "apple"
        },
        {
          name: "Pear!",
          value: "pear"
        }
      ]
    });

    times++;
  },
  error => {
    console.log("Hm, an error happened. Why?");
  },
  complete => {
    console.log("I think we are done now.");
  }
);