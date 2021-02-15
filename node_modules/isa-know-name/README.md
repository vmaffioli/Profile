# isa-know-name

A simple validation to check if a string is a know first name.

At this point the main function just compares an input string with a json list loaded by the function. Currently with 7000+ know names.

The focus of this project are build and upload a simple NPM Package, for studies pruporses.

## Instalation: 
    npm install isa-know-name 
    
## In code usage example:
    const isa = require('is-know-name');

## To check if string/array contains a know name:
Returns a boolean value (true or false)

    const result = isa.check('string or array here')

## To filter the string/input 
Returns a new array with only know names

    const result = isa.filter('string or array here')


\
\
\
\
\

 To add names to the package edit the data.json located in root of this package.

https://www.npmjs.com/package/isa-know-name
