'use strict';

<<<<<<< HEAD
const MyAssetContract = require('./lib/my-smart-contract.js');

module.exports.MyAssetContract = MyAssetContract;
module.exports.contracts = [MyAssetContract];
=======
const shim = require('fabric-shim');
const MyAssetContract = require('./lib/my-smart-contract.js');

shim.start(new MyAssetContract());
>>>>>>> master
