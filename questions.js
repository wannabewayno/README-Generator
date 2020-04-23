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
questions.languages = {
    type:"input",
    name:"languages",
    message:"What was the main coding language used in this project?",
}
questions.deployed = {
    type:'confirm',
    name:'deployed|CONFIRM',
    message:'is your application deployed on the web?'
}
    questions.deployedFollowUp = {
        type:'input',
        name:'deployed',
        message:'Great, provide a href to link your deployed application'
    }

questions.email = {
    type:'input',
    name:'email',
    message:'provide an email for inquires about your project'
}
questions.projectName = {
    type:'input',
    name:'projectName',
    message:'what is title of your project?'
}
// questions.languages = {
//     type:'input',
//     name:'languages',
//     message:'provide a comma seperated list of coding languages used in this project'
// }
questions.chooseRepo = {
    type:'list',
    name:'chooseRepo',
    message:'Choose a repository to create a README for',
    choices:async function (){
        const choices = await methods.readmeData.repositoryChoices;
        return choices;
    }
}
questions.motivation = {
    type:'input',
    name:'motivation',
    message:'what was the motivation behind the project? (1 - 2 sentences)'
}
questions.scope = {
    type:'input',
    name:'scope',
    message:'What was the scope of the project (1 - 2 sentences)'
};
questions.solving = {
    type:'input',
    name:'solving',
    message:'what did this project attempted to solve? (1 - 2 sentences)'
};
questions.installation = {
    type:'confirm',
    name:'installation|CONFIRM',
    message:'Does your project require an Installation?'
};
    questions.installationFollowUp = {
        type:'list',
        name:'installation|SWITCH',
        message:'choose a way to describe your installation',
        choices:[
            {
                name:"It's a brief sentence",
                value:'installation|Sentence'
            },
            {
                name:"I'd prefer to write step by step instructions",
                value:'installation|Step'
            }
        ]
    }   
        questions.installationSentence = {
        type:'input',
        name:'installation',
        message:"Describe how to install your project (1 - 2 sentences)"
        }   

        questions.installationStep = {
            type:'input',
            name:'installationStep|LOOP',
            message:"add the first step (no need to label the steps, we got you)"
        } 
            questions.installationStepLOOP = {
                type:'confirm',
                name:'installationStep|CONFIRM',
                message:'add another step?'
            }
            questions.installationStepFollowUp = {
                type:'input',
                name:'installationStep|LOOP',
                message:'add a step (again; no labels, we still got you holmes)'
            }

questions.usage = {
    type:'confirm',
    name:'usage|CONFIRM',
    message:'Does your project require an explanation on how to use?'
};
    questions.usageFollowUp = {
        type:'list',
        name:'usage|FORK',
        message:'choose a way to describe the Usage of this project',
        choices:[
            {
                name:"It's a brief sentence",
                value:'usage|Sentence'
            },
            {
                name:"I'd prefer to write step by step instructions",
                value:'usag|Step'
            }
        ]
    }
        questions.usageSentence = {
        type:'input',
        name:'usage',
        message:"Describe how to use this project (1 - 2 sentences)"
        }   
        questions.usageStep = {
            type:'input',
            name:'usageStep',
            message:"add a step (no need to label the steps, we got you)"
        } 
            questions.confirmUsageStep = {
                type:'confirm',
                name:'confirmUsageStep',
                message:'add another step?'
            }

questions.contributing = {
    type:'confirm',
    name:'CONFIRMcontributing',
    message:'Does your project require information on how to contribute?'
};
    questions.contributingFollowUp = {
        type:'list',
        name:'FORKcontributing',
        message:'choose a way to describe how to contribute',
        choices:[
            {
                name:"It's a brief sentence",
                value:'contributing|Sentence'
            },
            {
                name:"I'd prefer to write step by step instructions",
                value:'contributing|Step'
            }
        ]
    }
        questions.contributingSentence = {
        type:'input',
        name:'contributing',
        message:"Describe how to contribute to this project (1 - 2 sentences)"
        }   
        questions.contributingStep = {
            type:'input',
            name:'contributingStep',
            message:"add a step (no need to label the steps, we got you)"
        } 
            questions.confirmContributingStep = {
                type:'confirm',
                name:'confirmContributingStep',
                message:'add another step?'
            }
questions.logo = {
    type:'confirm',
    name:'CONFIRMlogo',
    message:'Would you like to add a Logo to your README?'
}
    questions.logoFollowUp = {
        type:'input',
        name:'logo',
        message:'Great, provide a path img src, relative or a link'
    }
questions.licenseOwner = {
    type:'input',
    name:'licenseOwner',
    message:'Please provide the full name of the License Owner'
}    

questions.license = {
    type:"list",
    name:"license",
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
// first two questions to be asked, the rest is dynamically added based on user choices.
questions.order=[
    questions.username,
    questions.startFrom
]

