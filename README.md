# HadSLP2 Parser
This is a simple lib with no deps that will format HadSLP2 data from the met office in a way that can be used in JS.  

The exposes one function that takes in a string and outputs a multi level object.  
The object is formated
year.month.vertdeg.horzdeg

The vertdeg goes from -90 to 90 indicating 90N to 90S
The horzdeg goes from -180 to 175 indicating 180W to 175E

The format of the data can be found at https://www.metoffice.gov.uk/hadobs/hadslp2/data/Read_instructions_HADSLP2_5dg  

Note: There are differences in the data after 2005 which have to be taken in to account.  
Futher details are on the met office download page https://www.metoffice.gov.uk/hadobs/hadslp2/data/download.html  

## To use

1. Download the near real time data https://www.metoffice.gov.uk/hadobs/hadslp2/data/hadslp2r.asc.gz
2. Gunzip the file
3. Read in the `hadslp2r.asc` file

## Example
```javascript
const fs = require('fs').promises;
const hadSLP2 = require('./lib/hadslp2');

(async() => {
    const rawBuffer = await fs.readFile('./hadslp2r.asc');
    const rawStrings = rawBuffer.toString()
    const pressureData = hadSLP2(rawStrings);
})();
```

