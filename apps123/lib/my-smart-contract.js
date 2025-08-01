'use strict';

const { Contract } = require('fabric-contract-api');

class MyAssetContract extends Contract {

<<<<<<< HEAD
=======
    async init(ctx) {
        // This is optional in the Contract API, but you can include it
        console.info('============= START : Initialize Ledger ===========');
        return 'Chaincode initialized successfully';
    }

>>>>>>> master
    async initLedger(ctx) {
        console.info('============= START : Initialize Ledger ===========');
        
        const assets = [
            {
                ID: 'asset1',
<<<<<<< HEAD
                Color: 'blue', 
=======
                Color: 'blue',
>>>>>>> master
                Size: 5,
                Owner: 'Tomoko',
                AppraisedValue: 300,
            },
            {
                ID: 'asset2',
                Color: 'red',
                Size: 5,
<<<<<<< HEAD
                Owner: 'Brad', 
=======
                Owner: 'Brad',
>>>>>>> master
                AppraisedValue: 400,
            }
        ];

        for (const asset of assets) {
            asset.docType = 'asset';
            await ctx.stub.putState(asset.ID, Buffer.from(JSON.stringify(asset)));
            console.info(`Asset ${asset.ID} initialized`);
        }
        console.info('============= END : Initialize Ledger ===========');
<<<<<<< HEAD
        return 'Ledger initialized successfully';
=======
>>>>>>> master
    }

    async createAsset(ctx, id, color, size, owner, appraisedValue) {
        const asset = {
            ID: id,
            Color: color,
<<<<<<< HEAD
            Size: parseInt(size),
            Owner: owner,
            AppraisedValue: parseInt(appraisedValue),
=======
            Size: size,
            Owner: owner,
            AppraisedValue: appraisedValue,
>>>>>>> master
            docType: 'asset'
        };

        await ctx.stub.putState(id, Buffer.from(JSON.stringify(asset)));
<<<<<<< HEAD
        console.info(`Asset ${id} created`);
=======
>>>>>>> master
        return JSON.stringify(asset);
    }

    async readAsset(ctx, id) {
        const assetJSON = await ctx.stub.getState(id);
        if (!assetJSON || assetJSON.length === 0) {
            throw new Error(`The asset ${id} does not exist`);
        }
        return assetJSON.toString();
    }

    async getAllAssets(ctx) {
        const allResults = [];
        const iterator = await ctx.stub.getStateByRange('', '');
        let result = await iterator.next();
        while (!result.done) {
            const strValue = Buffer.from(result.value.value.toString()).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            allResults.push({ Key: result.value.key, Record: record });
            result = await iterator.next();
        }
        return JSON.stringify(allResults);
    }
}

module.exports = MyAssetContract;
