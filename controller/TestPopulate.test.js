const util = require('util');
global.TextEncoder = util.TextEncoder;
global.TextDecoder = util.TextDecoder;


const PopulateTest = require('./PopulateTest');


test('executed', ()=>{
    const result = PopulateTest();
});
