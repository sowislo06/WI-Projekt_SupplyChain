/*
SPDX-License-Identifier: Apache-2.0
*/

'use strict';

// Utility class for ledger state
const State = require('../ledger-api/state.js');

/**
 * Activity class extends State class
 * Class will be used by application and smart contract to define a Activity
 */
class Activity extends State {

    constructor(obj) {
        super(Activity.getClass(), [obj.activityId]);
        Object.assign(this, obj);
    }

    /*
    Definition:  Class Activity:
      {String}  activityId
      {String} name
      {Asset} asset
      {Station} station
      {Date} startDate
      {Date} endDate
      {User} user
    */

    /**
     * Basic getters and setters
     * 
     * Setter should never be called explicitly!
     * ID is set at the time of constructor call.
     * 
    */
    getId() {
        return this.activityId;
    }


    static fromBuffer(buffer) {
        return Activity.deserialize(Buffer.from(JSON.parse(buffer)));
    }

    toBuffer() {
        return Buffer.from(JSON.stringify(this));
    }

    /**
     * Deserialize a state data to  Activity
     * @param {Buffer} data to form back into the object
     */
    static deserialize(data) {
        return State.deserializeClass(data, Activity);
    }

    /**
     * Factory method to create a Activity object
     */
    static createInstance(activityId) {
        return new Activity({activityId});
    }

    static getClass() {
        return 'org.supplychainnet.activity';
    }
}

module.exports = Activity;
//Brauche ich glaube ich nicht!
//module.exports.orderStates = orderState;
