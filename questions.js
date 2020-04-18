module.exports = questions = {};


questions.username ={ 
    type:"input",
    name:"username",
    message:"Welcome to readme.js, let's get started by typing in your github username"
}
questions.startFrom = {
    type:"list",
    name:"startFrom",
    message:"pick a starting method",
    choices:[
        {
        name:"Pick a repository (recommended)",
        value:"repository"
        },
        {
        name:"Let's start from scratch",
        value:"scratch"
        }
    ]
}

questions.order=[
    questions.username,
    questions.startFrom,
    questions.username
]

