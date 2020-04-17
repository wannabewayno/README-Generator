// run with `node infinite.js` in node v4.x+
// must have Inquirer installed (`npm install inquirer`)

const inquirer = require('inquirer');
const Rx = require('rxjs');

const prompts = new Rx.Subject();

function makePrompt(msg) {
  return {
    type: 'input',
    name: `userInput-${i}`,
    message: `${msg ||'Say something to start chatting!'}\n\n`,
  };
}

let i = 0;

inquirer.prompt(prompts).ui.process.subscribe(({ answer }) => {
  if (answer !== '') {
    i += 1;
    prompts.next(makePrompt(`This is prompt #${i}.`));
  } else {
    prompts.complete();
  }
}, (err) => {
  console.warn(err);
},
 complete => console.log('Interactive session is complete. Good bye! 👋\n')
);

prompts.next(makePrompt("hello"));