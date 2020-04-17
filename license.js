const fs = require('fs');
const Chosenlicense = require('./license-boilerplate/ncsa');
stamps={};
stamps.year="2020";
stamps.owner="Wayne Griffiths";
stamps.projectName="Recipedia";
stamps.projectURL="recipedia.netlify.australia";

function stamp(license,stamps){
    let stampStart = 0;  
    while (stampStart !== -1){
        //Guard Clause
        stampStart = license.indexOf("{{");
        if (stampStart === -1){
            return license;
        }
        stampEnd = license.indexOf("}}",stampStart);
        stampName = license.substring(stampStart+2,stampEnd);
        license = license.replace(`{{${stampName}}}`,stamps[stampName]);
    }
    return license;
}

if (Chosenlicense.requireStamping){
    Chosenlicense.license = stamp(Chosenlicense.license,stamps);
}

fs.writeFile('LICENSE.md',Chosenlicense.license,(err)=>{
    if (err) throw err;
    console.log("Success! this license has been added to your repo");
});
