const inquirer = require("inquirer");

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
questions.description = {
    type:"input",
    name:"description",
    message:"write a short description about your project (1 - 2 sentances)",
}
questions.deployed = {
    type:'input',
    name:'deployed',
    message:'provide a href for your deployed application'
}
questions.email = {
    type:'input',
    name:'email',
    message:'provide an email for question inquires or hit enter to omit'
}
questions.projectName = {
    type:'input',
    name:'projectName',
    message:'what is title of your project?'
}
questions.languages = {
    type:'input',
    name:'languages',
    message:'provide a comma seperated list of coding languages used in this project'
}
questions.license = {
    type:"list",
    name:"addlicense",
    message:"Pick a license for your project",
    pageSize:24,
    choices:[
        {
        name:"Academic Free License v3.0",
        value:"afl-3.0"
        },
        {
        name:"GNU Affero General Public License v3.0",
        value:"afpl-3.0"
        },
        new inquirer.Separator("----- GNU General Public License Family -----")
        ,
        {
        name:"GNU General Public License v2.0",
        value:"gpl-2.0"
        },
        {
        name:"GNU General Public License v3.0",
        value:"gpl-3.0"
        },
        new inquirer.Separator("----- GNU Lesser General Public License Family -----")
        ,
        {
        name:"GNU Lesser General Public License v2.1",
        value:"lgpl-2.1"
        },
        {
        name:"GNU Lesser General Public License v3.0",
        value:"lgpl-3.0"
        },
        new inquirer.Separator("----- Creative Commons License Family -----")
        ,
        {
        name:"Creative Commons Zero v1.0 Universal",
        value:"cc0-1.0"
        },
        {
        name:"Creative Commons Attribution 4.0",
        value:"cc-by-4.0"
        },
        {
        name:"Creative Commons Attribution Share Alike 4.0",
        value:"cc-by-sa-4.0"
        },
        new inquirer.Separator("-------- BSD Licsenses ----------")
        ,
        {
        name:'BSD 2-clause "Simplified" license',
        value:"bsd-2-clause"
        },
        {
        name:'BSD 2-clause "New" or "Revised" license',
        value:"bsd-3-clause"
        },
        {
        name:'BSD 3-clause Clear license',
        value:"bsd-3-clause-clear"
        },
        new inquirer.Separator()
        ,
        {
        name:'Apache license 2.0',
        value:'apache-2.0'
        },
        {
        name:'Artistic license 2.0',
        value:'artistic-2.0'
        },
        {
        name:'Boost Software License 1.0',
        value:'bsl-1.0'
        },
        {
        name:'Do What The F*ck You Want To Public License',
        value:'wtfpl'
        },
        {
        name:'Educational Community License v2.0',
        value:'ecl-2.0'
        },
        {
        name:'Eclipse Public License 1.0',
        value:'epl-1.0'
        },
        {
        name:'European Union Public License 1.1',
        value:'eupl-1.1'
        },
        {
        name:'ISC',
        value:'isc'
        },
        {
        name:'LaTeX Project Public License v1.3c',
        value:'lppl-1.3c'
        },
        {
        name:'Microsoft Public License',
        value:'ms-pl'
        },
        {
        name:'MIT',
        value:"mit"
        },
        {
        name:'Mozilla Public License 2.0',
        value:'mpl-2.0'
        },
        {
        name:'Open SoftWare License 3.0',
        value:'osl-3.0'
        },
        {
        name:'PostgreSQL License',
        value:'postgresql'
        },
        {
        name:'SIL Open Font License 1.1',
        value:'ofl-1.1'
        },
        {
        name:'University of Illinois/NCSA Open Source License',
        value:'ncsa'
        },
        {
        name:'The Unlicense',
        value:'unlicense'
        },
        {
        name:'zLib License',
        value:'zlib'
        }
    ]
}

questions.order=[
    questions.username,
    questions.startFrom,
    questions.license,
    questions.description
]

