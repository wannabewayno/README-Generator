fs = require('fs');
module.exports = readmeTemplate = `
<p align="center">
    <img src={{logoPath}} width="300" alt="{{projectName}} logo">
    <br>
    <a href="#installation'>Installation</a>
    <a href="#usage'>Usage</a>
    <a href="#contributing'>Contributing</a>
    <a href="#license'>License</a>
    <a href="#questions'>Questions</a>
</p>

# {{projectName}}
> {{description}} 
### Motivation
    {{motivation}}
### Scope
    {{scope}}
### What does this try to solve?
    {{solutions}}
## {{deployed}}

## Installation
    {{installation}}
<h3 id="usage">Usage<h3>
    {{usage}}
<h3 id="contributing">Contributing</h3>
    {{contributing}}
<h3 id="license">License</h3>
    {{license}}
## Questions
    {{questions}}
`

fs.writeFile('README.md',readmeTemplate,(err)=>{
    if (err) throw err;
    console.log("Success! this license has been added to your repo");
});