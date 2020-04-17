module.exports = questions = {};

class Question {
    constructor(type,name,message,choices) {
        this.type = type;
        this.name = name;
        this.message = message;
        this.choices = choices;
    }
} 

questions.username = new Question("input","username","Welcome to readme.js, let's get started by typing in your github username");
questions.startfrom = new Question("list","startfrom","pick a starting method",["Pick a repoisotry (recommended)","I want to start from scratch"]);
