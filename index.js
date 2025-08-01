'use strict';

const shim = require('fabric-shim');
const MyAssetContract = require('./lib/my-smart-contract.js');

shim.start(new MyAssetContract());
