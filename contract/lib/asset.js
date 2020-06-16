/*
SPDX-License-Identifier: Apache-2.0
*/

'use strict';

// Utility class for ledger state
const State = require('../ledger-api/state.js');

/**
 * Asset class extends State class
 * Class will be used by application and smart contract to define a Asset
 */
class Asset extends State {

    constructor(obj) {
        super(Asset.getClass(), [obj.assetId]);
        Object.assign(this, obj);
    }

    /*
    Definition:  Class Asset:
      {String}  assetId
      {String} name
      {String} stationId
    */

    /**
     * Basic getters and setters
     * 
     * Setter should never be called explicitly!
     * ID is set at the time of constructor call.
     * 
    */
    getId() {
        return this.assetId;
    }


    static fromBuffer(buffer) {
        return Asset.deserialize(Buffer.from(JSON.parse(buffer)));
    }

    toBuffer() {
        return Buffer.from(JSON.stringify(this));
    }

    /**
     * Deserialize a state data to  Asset
     * @param {Buffer} data to form back into the object
     */
    static deserialize(data) {
        return State.deserializeClass(data, Asset);
    }

    /**
     * Factory method to create a Asset object
     */
    static createInstance(assetId) {
        return new Asset({assetId});
    }

    static getClass() {
        return 'org.supplychainnet.asset';
    }
}

module.exports = Asset;
//Brauche ich glaube ich nicht!
//module.exports.orderStates = orderState;
