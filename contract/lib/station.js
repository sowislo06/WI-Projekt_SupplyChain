/*
SPDX-License-Identifier: Apache-2.0
*/

'use strict';

// Utility class for ledger state
const State = require('../ledger-api/state.js');

/**
 * Station class extends State class
 * Class will be used by application and smart contract to define a Station
 */
class Station extends State {

    constructor(obj) {
        super(Station.getClass(), [obj.stationId]);
        Object.assign(this, obj);
    }

    /*
    Definition:  Class Station:
      {String}  stationId
      {String} name
    */

    /**
     * Basic getters and setters
     * 
     * Setter should never be called explicitly!
     * ID is set at the time of constructor call.
     * 
    */
    getId() {
        return this.stationId;
    }


    static fromBuffer(buffer) {
        return Station.deserialize(Buffer.from(JSON.parse(buffer)));
    }

    toBuffer() {
        return Buffer.from(JSON.stringify(this));
    }

    /**
     * Deserialize a state data to  Station
     * @param {Buffer} data to form back into the object
     */
    static deserialize(data) {
        return State.deserializeClass(data, Station);
    }

    /**
     * Factory method to create a Station object
     */
    static createInstance(stationId) {
        return new Station({stationId});
    }

    static getClass() {
        return 'org.supplychainnet.station';
    }
}

module.exports = Station;
//Brauche ich glaube ich nicht!
//module.exports.orderStates = orderState;
