/*
SPDX-License-Identifier: Apache-2.0
*/

'use strict';

// Fabric smart contract classes
const { Contract, Context } = require('fabric-contract-api');

// supplychainnet specifc classes
const Station = require('./station.js');
const Asset = require('./asset.js');
const Activity = require('./activity.js');

//  EVENT
const EVENT_TYPE = "bcpocevent";


/**
 * A custom context provides easy access to list of all products
 */
class SupplychainContext extends Context {
    constructor() {
        super();
    }
}

/**
 * Define product smart contract by extending Fabric Contract class
 */
class SupplychainContract extends Contract {

    constructor() {
        // Unique namespace when multiple contracts per chaincode file
        super('org.supplychainnet.contract');
    }

    /**
     * Define a custom context for product
    */
    createContext() {
        return new SupplychainContext();
    }

    /**
     * Instantiate to perform any setup of the ledger that might be required.
     * @param {Context} ctx the transaction context
     */
    async init(ctx) {
        // No implementation required with this example
        // It could be where data migration is performed, if necessary
        console.log('Instantiate the contract');
    }

    //---------- USERMANAGEMENT -----------------

    /**
      * getCurrentUserId
      * To be called by application to get the type for a user who is logged in
      *
      * @param {Context} ctx the transaction context
      * Usage:  getCurrentUserId ()
     */
    async getCurrentUserId(ctx) {

        let id = [];
        id.push(ctx.clientIdentity.getID());
        var begin = id[0].indexOf("/CN=");
        var end = id[0].lastIndexOf("::/C=");
        let userid = id[0].substring(begin + 4, end);
        return userid;
    }

    /**
      * getCurrentUserType
      * To be called by application to get the type for a user who is logged in
      *
      * @param {Context} ctx the transaction context
      * Usage:  getCurrentUserType ()
     */
    async getCurrentUserType(ctx) {

        let userid = await this.getCurrentUserId(ctx);

        //  check user id;  if admin, return type = admin;
        //  else return value set for attribute "type" in certificate;
        if (userid == "admin") {
            return userid;
        }
        return ctx.clientIdentity.getAttributeValue("usertype");
    }



    //---------- STATION -----------------

    /**
     * createStation
     *
     * @param {Context} ctx the transaction context
     * @param {String} stationId
     * @param {String} name
     * 
     * Usage: submitTransaction ('createStation', 'Station001', 'Wareneingang')
     * Usage: [{"stationId":"station-001","name":"Qualitätsicherung"}]
     * 
     * curl -X POST -H "authorization: Basic SEVCOkhFQg==" -H "Content-Type: application/json" -d "{\"stationId\":\"Station020\",\"name\":\"Qualitätssicherung\"}" "http://localhost:3000/api/stations/"
    */
   async createStation(ctx, args) {

        //TODO
        // Access Control: This transaction should only be invoked by a Producer or Retailer
        let userType = await this.getCurrentUserType(ctx);
        
        //TODO
        if ((userType != "admin") && // admin only has access as a precaution.
            (userType != "producer") &&
            (userType != "retailer"))
            throw new Error(`This user does not have access to create a station`);


        const station_details = JSON.parse(args);
        const stationId = station_details.stationId;

        console.log("incoming asset fields: " + JSON.stringify(station_details));
        
        // Check if a station already exists with id=stationId
        var stationAsBytes = await ctx.stub.getState(stationId);
        if (stationAsBytes && stationAsBytes.length > 0) {
            throw new Error(`Error Message from createStation. Station with stationID = ${stationId} already exists.`);
        }

        // Create a new Station object
        let station = Station.createInstance(stationId);
        station.stationId = station_details.stationId;
        station.name = station_details.name;


        // Update ledger
        await ctx.stub.putState(stationId, station.toBuffer());

        // Define and set event
        const event_obj = station;
        event_obj.event_type = "createStation";   //  add the field "event_type" for the event to be processed

        try {
            await ctx.stub.setEvent(EVENT_TYPE, event_obj.toBuffer());
        }
        catch (error) {
            console.log("Error in sending event");
        }
        finally {
            console.log("Attempted to send event = ", station);
        }

        // Must return a serialized station to caller of smart contract
        return station.toBuffer();
    }

    /**
     * queryStation
     *
     * @param {Context} ctx the transaction context
     * @param {String}  stationId
     * 
     * Usage:  queryStation ('Station001')
     * Usage: ["Station001"]
     *
    */
    async queryStation(ctx, stationId) {
        console.info('============= queryStation ===========');

        if (stationId.length < 1) {
            throw new Error('stationId is required as input')
        }

        var stationAsBytes = await ctx.stub.getState(stationId);

        //  Set an event (irrespective of whether the station existed or not)
        // define and set EVENT_TYPE
        let queryEvent = {
            type: EVENT_TYPE,
            stationId: stationId,
            desc: "Query Station was executed for " + stationId
        };
        await ctx.stub.setEvent(EVENT_TYPE, Buffer.from(JSON.stringify(queryEvent)));

        if (!stationAsBytes || stationAsBytes.length === 0) {
            throw new Error(`Error Message from queryStation: Station with stationId = ${stationId} does not exist.`);
        }

        // Access Control:

        var station = Station.deserialize(stationAsBytes);
        let userId = await this.getCurrentUserId(ctx);

        if (userId != "admin") {// admin only has access as a precaution.
            throw new Error(`${userId} does not have access to the details of station ${stationId}`);
        }

        console.log("Station: " + station);


        // Return a serialized station to caller of smart contract
        return stationAsBytes;
        //return station;
    }


    /**
     * queryAllStations
     * 
     * @param {Context} ctx the transaction context
     * 
     * Usage:  queryAllStations ()
     * 
     * curl -X GET -H "authorization: Basic YWRtaW46YWRtaW5wdw==" "http://localhost:3000/api/stations/"  
    */
    async queryAllStations(ctx) {
        const startKey = 'station-0000';
        const endKey = 'station-ZZZZ';

        const iterator = await ctx.stub.getStateByRange(startKey, endKey);

        const allResults = [];
        while (true) {
            const res = await iterator.next();

            if (res.value && res.value.value.toString()) {
    
                console.log(res.value.value.toString('utf8'));

                const Key = res.value.key;
                let Record;
                try {
                    Record = JSON.parse(res.value.value.toString('utf8'));
                } catch (err) {
                    console.log(err);
                    Record = res.value.value.toString('utf8');
                }
                
                allResults.push(Record);
                
            }
            if (res.done) {
                console.log('end of data');
                await iterator.close();
                console.info(allResults);
                return allResults;
            }

        }
    }

    /**
     * deleteStation
     *
     * @param {Context} ctx the transaction context
     * @param {String}  args
     * Usage:  deleteStation ('Station001')
     * 
     * curl -X DELETE -H "authorization: Basic YWRtaW46YWRtaW5wdw" "http://localhost:3000/api/stations/Station987" 
     */

    async deleteStation(ctx, stationId) {

        console.info('============= deleteStation ===========');
        if (stationId.length < 1) {
            throw new Error('Station Id required as input')
        }
        console.log("stationId = " + stationId);

        var queryAssets = await this.queryAssetsFromStation(ctx, stationId);
        if(queryAssets.length > 1) {
            throw new Error('Products are still in the warehouse')
        }

        // Retrieve the current station using key provided
        var stationAsBytes = await ctx.stub.getState(stationId);

        if (!stationAsBytes || stationAsBytes.length === 0) {
            throw new Error(`Error Message from deleteStation: Station with stationId = ${stationId} does not exist.`);
        }

        // Access Control: This transaction should only be invoked by designated originating Retailer or Producer
        var station = Station.deserialize(stationAsBytes);
        let userId = await this.getCurrentUserId(ctx);

        if (userId != "admin") // admin only has access as a precaution. 
            throw new Error(`${userId} does not have access to delete station ${stationId}`);

        await ctx.stub.deleteState(stationId); //remove the station from chaincode state
    }


    //---------- ASSET -----------------

    /**
     * createAsset
     *
     * 
     * @param {Context} ctx the transaction context
     * @param {String} assetId
     * @param {String} name
     * @param {String} stationId
     * Usage: submitTransaction ('createAsset', 'Asset001', 'Fifa 2020', 'Station001')
     * Usage: [{"assetId":"asset-1904","name":"Fifa 2020","stationId":"station-002"}]
     * 
     * Usage: [{"stationId":"Station001","name":"Wareneingang"}]
     * 
     * curl -X POST -H "authorization: Basic YWRtaW46YWRtaW5wdw==" -H "Content-Type: application/json" -d "{\"assetId\":\"Asset456\",\"name\":\"COD\",\"stationId\":\"Station001\"}" "http://localhost:3000/api/assets/"
    */
   async createAsset(ctx, args) {

        //TODO
        // Access Control: This transaction should only be invoked by a Producer or Retailer
        let userType = await this.getCurrentUserType(ctx);
        
        //TODO
        if ((userType != "admin") && // admin only has access as a precaution.
            (userType != "producer") &&
            (userType != "retailer"))
            throw new Error(`This user does not have access to create an asset`);


        const asset_details = JSON.parse(args);
        const assetId = asset_details.assetId;
        const stationId = asset_details.stationId;

        console.log("incoming asset fields: " + JSON.stringify(asset_details));
        
        // Check if a asset already exists with id=assetId
        var assetAsBytes = await ctx.stub.getState(assetId);
        if (assetAsBytes && assetAsBytes.length > 0) {
            throw new Error(`Error Message from createAsset. Asset with assetId = ${assetId} already exists.`);
        }

        //Query the Station object
        if (stationId.length < 1) {
            throw new Error('stationId is required as input')
        }
        /*var stationAsBytes = await ctx.stub.getState(stationId);
        if (!stationAsBytes || stationAsBytes.length === 0) {
            throw new Error(`Error Message from queryStation: Station with stationId = ${stationId} does not exist.`);
        }
        var station = Station.deserialize(stationAsBytes);
*/


        // Create a new Asset object
        let asset = Asset.createInstance(assetId);
        asset.assetId = asset_details.assetId;
        asset.name = asset_details.name;
        //asset.station = station;
        asset.stationId = asset_details.stationId;

        // Update ledger
        await ctx.stub.putState(assetId, asset.toBuffer());

        // Define and set event
        const event_obj = asset;
        event_obj.event_type = "createAsset";   //  add the field "event_type" for the event to be processed

        try {
            await ctx.stub.setEvent(EVENT_TYPE, event_obj.toBuffer());
        }
        catch (error) {
            console.log("Error in sending event");
        }
        finally {
            console.log("Attempted to send event = ", asset);
        }

        // Must return a serialized asset to caller of smart contract
        return asset.toBuffer();
        //return asset;
    }

    /**
     * queryAsset
     *
     * @param {Context} ctx the transaction context
     * @param {String}  assetId
     * 
     * Usage:  queryStation ('Asset001')
     * Usage: ["Asset001"]
     *
     * curl -X GET -H "authorization: Basic YWRtaW46YWRtaW5wdw==" "http://localhost:3000/api/assets/Asset001" 
    */
   async queryAsset(ctx, assetId) {
        console.info('============= queryAsset ===========');

        if (assetId.length < 1) {
            throw new Error('assetId is required as input')
        }

        var assetAsBytes = await ctx.stub.getState(assetId);

        //  Set an event (irrespective of whether the asset existed or not)
        // define and set EVENT_TYPE
        let queryEvent = {
            type: EVENT_TYPE,
            assetId: assetId,
            desc: "Query Asset was executed for " + assetId
        };
        await ctx.stub.setEvent(EVENT_TYPE, Buffer.from(JSON.stringify(queryEvent)));

        if (!assetAsBytes || assetAsBytes.length === 0) {
            throw new Error(`Error Message from queryAsset: Asset with assetId = ${assetId} does not exist.`);
        }

        // Access Control:

        var asset = Asset.deserialize(assetAsBytes);
        let userId = await this.getCurrentUserId(ctx);

        if (userId != "admin") {// admin only has access as a precaution.
            throw new Error(`${userId} does not have access to the details of asset ${assetId}`);
        }

        console.log("Asset: " + asset);


        // Return a serialized asset to caller of smart contract
         return assetAsBytes;
        //return asset;
    }

    /**
        * queryAssetsFromStation
        * 
        * @param {Context} ctx the transaction context
        * @param {String} stationId
        * 
        * Usage: queryAssetsFromStation('Station001')
        * Usage: ["Station001"]
        * 
        * curl -X GET -H "authorization: Basic YWRtaW46YWRtaW5wdw==" "http://localhost:3000/api/assets-station/Station001"
        * 
    */
    async queryAssetsFromStation(ctx, stationId) {
        const startKey = 'asset-0000';
        const endKey = 'asset-ZZZZ';

        const iterator = await ctx.stub.getStateByRange(startKey, endKey);

        const allResults = [];
        while (true) {
            const res = await iterator.next();

            const stationName = res.value.getValue().toString('utf8');

            if (res.value && res.value.value.toString()) {
                if(stationName.includes(stationId)) {

                    console.log(res.value.value.toString('utf8'));

                    const Key = res.value.key;
                    let Record;
                    try {
                        Record = JSON.parse(res.value.value.toString('utf8'));
                    } catch (err) {
                        console.log(err);
                        Record = res.value.value.toString('utf8');
                    }
                    allResults.push(Record);
                }
                
            }
            if (res.done) {
                console.log('end of data');
                await iterator.close();
                console.info(allResults);
                return allResults;
            }
        }
    }

    /**
     * deleteAsset
     *
     * @param {Context} ctx the transaction context
     * @param {String}  args
     * Usage:  deleteAsset ('Asset001')
     * 
     * curl -X DELETE -H "authorization: Basic YWRtaW46YWRtaW5wdw" "http://localhost:3000/api/assets/Asset001" 
     */

    async deleteAsset(ctx, assetId) {

        console.info('============= deleteAsset ===========');
        if (assetId.length < 1) {
            throw new Error('assetId required as input')
        }
        console.log("assetId = " + assetId);


        // Retrieve the current station using key provided
        var assetAsBytes = await ctx.stub.getState(assetId);

        if (!assetAsBytes || assetAsBytes.length === 0) {
            throw new Error(`Error Message from deleteAsset: Station with assetId = ${assetId} does not exist.`);
        }

        // Access Control: This transaction should only be invoked by designated originating Retailer or Producer
        //var asset = Station.deserialize(assetAsBytes); Wird benötigt, wenn man Abfrage macht. Siehe deleteOrder
        let userId = await this.getCurrentUserId(ctx);

        if (userId != "admin") 
            throw new Error(`${userId} does not have access to delete asset ${assetId}`);

        await ctx.stub.deleteState(assetId); //remove the asset from chaincode state
    }

    /**
     * queryAllStations
     * 
     * @param {Context} ctx the transaction context
     * 
     * Usage:  queryAllOrders ()
     * 
     * curl -X GET -H "authorization: Basic YWRtaW46YWRtaW5wdw==" "http://localhost:3000/api/stations/"  
    */
    async queryAllAssets(ctx) {
        const startKey = 'asset-0000';
        const endKey = 'asset-ZZZZ';


        let userId = await this.getCurrentUserId(ctx);
 
        if (userId != "admin") // admin only has access as a precaution.
            throw new Error(`${userId} does not have access`);

        const iterator = await ctx.stub.getStateByRange(startKey, endKey);

        const allResults = [];
        while (true) {
            const res = await iterator.next();

            if (res.value && res.value.value.toString()) {

                console.log(res.value.value.toString('utf8'));

                const Key = res.value.key;
                let Record;
                try {
                    Record = JSON.parse(res.value.value.toString('utf8'));
                } catch (err) {
                    console.log(err);
                    Record = res.value.value.toString('utf8');
                }
            
                allResults.push(Record);
            
            }
            if (res.done) {
                console.log('end of data');
                await iterator.close();
                console.info(allResults);
                return allResults;
            }

        }
    }


    //---------- ACTIVITY -----------------

    /**
        * createActivity
        *
        * @param {Context} ctx the transaction context
        * @param {String} activityId
        * @param {String} name
        * @param {String} assetId
        * @param {String} stationId
        * 
        * Usage: submitTransaction ('createAsset', 'Asset001', 'Fifa 2020', 'Station001')
        * Usage: [{"activityId":"activity-2342","name":"Umlagerung","assetId":"asset-36bc","stationId":"station-22b1","document":"sdsdsd"}]
        * 
        * Usage: [{"stationId":"Station001","name":"Wareneingang"}]
        * 
        * curl -X POST -H "authorization: Basic YWRtaW46YWRtaW5wdw==" -H "Content-Type: application/json" -d "{\"activityId\":\"Activity385\",\"name\":\"Umlagerung\",\"assetId\":\"Asset001\",\"stationId\":\"Station001\"}" "http://localhost:3000/api/activities/"  
    */
    async createActivity(ctx, args) {

        //TODO
        // Access Control: This transaction should only be invoked by a Producer or Retailer
        let userType = await this.getCurrentUserType(ctx);
        
        //TODO
        if ((userType != "admin") && // admin only has access as a precaution.
            (userType != "producer") &&
            (userType != "retailer"))
            throw new Error(`This user does not have access to create an activity`);


        const activity_details = JSON.parse(args);
        const activityId = activity_details.activityId;
        const name = activity_details.name;
        const assetId = activity_details.assetId;
        const stationId = activity_details.stationId;
        const document = activity_details.document;

        console.log("incoming activity fields: " + JSON.stringify(activity_details));
        
        // Check if a activity already exists with id=activityId
        var activityAsBytes = await ctx.stub.getState(activityId);
        if (activityAsBytes && activityAsBytes.length > 0) {
            throw new Error(`Error Message from createActivity. Activity with activityId = ${activityId} already exists.`);
        }

        //Query the Station object
        if (stationId.length < 1) {
            throw new Error('stationId is required as input')
        }
        var stationAsBytes = await ctx.stub.getState(stationId);
        if (!stationAsBytes || stationAsBytes.length === 0) {
            throw new Error(`Error Message from queryStation: Station with stationId = ${stationId} does not exist.`);
        }
        var station = Station.deserialize(stationAsBytes);

        //Query the Asset object
        if (assetId.length < 1) {
            throw new Error('assetId is required as input')
        }
        var assetAsBytes = await ctx.stub.getState(assetId);
        if (!assetAsBytes || assetAsBytes.length === 0) {
            throw new Error(`Error Message from queryAsset: Asset with assetId = ${assetId} does not exist.`);
        }
        var asset = Asset.deserialize(assetAsBytes);

        //Get the Date
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        var now = mm + '/' + dd + '/' + yyyy;

        // Create a new Activity object
        let activity = Activity.createInstance(activityId);
        activity.activityId = activity_details.activityId;
        //Wird genutzt, um einen einzigartigen Vergleich herstellen zu können
        activity.assetId = assetId;
        //Wird genutzt, um den Namen des Assets anzeigen zu können
        activity.assetName = asset.name
        activity.stationId = station.name;
        activity.startDate = now;
        activity.user = userType;
        activity.document = document;



        // Update ledger
        await ctx.stub.putState(activityId, activity.toBuffer());

        // Define and set event
        const event_obj = activity;
        event_obj.event_type = "createActivity";   //  add the field "event_type" for the event to be processed

        try {
            await ctx.stub.setEvent(EVENT_TYPE, event_obj.toBuffer());
        }
        catch (error) {
            console.log("Error in sending event");
        }
        finally {
            console.log("Attempted to send event = ", activity);
        }

        // Must return a serialized activity to caller of smart contract
        return activity.toBuffer();
        //return activity;
    }

    /**
         * queryActivity
         *
         * @param {Context} ctx the transaction context
         * @param {String}  activityId
         * 
         * Usage:  queryActivity ('Activity001')
         * Usage: ["Activity001"]
         *
         * curl -X GET -H "authorization: Basic YWRtaW46YWRtaW5wdw==" "http://localhost:3000/api/activities/Activity001"
         * curl -X GET -H "authorization: Basic YWRtaW46YWRtaW5wdw==" "http://localhost:3000/api/activities/Activity001" 
    */
    async queryActivity(ctx, activityId) {
        console.info('============= queryActivity ===========');

        if (activityId.length < 1) {
            throw new Error('activityId is required as input')
        }

        var activityAsBytes = await ctx.stub.getState(activityId);

        //  Set an event (irrespective of whether the activity existed or not)
        // define and set EVENT_TYPE
        let queryEvent = {
            type: EVENT_TYPE,
            activityId: activityId,
            desc: "Query Activity was executed for " + activityId
        };
        await ctx.stub.setEvent(EVENT_TYPE, Buffer.from(JSON.stringify(queryEvent)));

        if (!activityAsBytes || activityAsBytes.length === 0) {
            throw new Error(`Error Message from queryActivity: Activity with activityId = ${activityId} does not exist.`);
        }

        // Access Control:

        var activity = Activity.deserialize(activityAsBytes);
        let userId = await this.getCurrentUserId(ctx);

        if (userId != "admin") {// admin only has access as a precaution.
            throw new Error(`${userId} does not have access to the details of activity ${activityId}`);
        }

        console.log("Activity: " + activity);


        // Return a serialized activity to caller of smart contract
        return activityAsBytes;
        //return activity;
    }

    /**
     * queryAllActivities
     * 
     * @param {Context} ctx the transaction context
     * 
     * Usage:  queryAllActivities ()
     * 
     * curl -X GET -H "authorization: Basic YWRtaW46YWRtaW5wdw==" "http://localhost:3000/api/activities/"
    */
    async queryAllActivities(ctx) {
        const startKey = 'activity-0000';
        const endKey = 'activity-ZZZZ';

        const iterator = await ctx.stub.getStateByRange(startKey, endKey);

        const allResults = [];
        while (true) {
            const res = await iterator.next();

            if (res.value && res.value.value.toString()) {

                console.log(res.value.value.toString('utf8'));

                const Key = res.value.key;
                let Record;
                try {
                    Record = JSON.parse(res.value.value.toString('utf8'));
                } catch (err) {
                    console.log(err);
                    Record = res.value.value.toString('utf8');
                }
                
                allResults.push(Record);
                
            }
            if (res.done) {
                console.log('end of data');
                await iterator.close();
                console.info(allResults);
                return allResults;
            }
        }
    }

        /**
            * queryActivityFromAsset
            * 
            * @param {Context} ctx the transaction context
            * @param {String} assetId
            * 
            * Usage: queryActivityFromAsset('Asset001')
            * Usage: ["Asset001"]
            * 
            * curl -X GET -H "authorization: Basic YWRtaW46YWRtaW5wdw==" "http://localhost:3000/api/activities-asset/Asset001"
        */
    async queryActivityFromAsset(ctx, assetId) {
        const startKey = 'activity-0000';
        const endKey = 'activity-ZZZZ';

        const iterator = await ctx.stub.getStateByRange(startKey, endKey);

        const allResults = [];
        while (true) {
            const res = await iterator.next();

            const activityName = res.value.getValue().toString('utf8');

            if (res.value && res.value.value.toString()) {
                if(activityName.includes(assetId)) {

                    console.log(res.value.value.toString('utf8'));

                    const Key = res.value.key;
                    let Record;
                    try {
                        Record = JSON.parse(res.value.value.toString('utf8'));
                    } catch (err) {
                        console.log(err);
                        Record = res.value.value.toString('utf8');
                    }
                    allResults.push(Record);
                }
                
            }
            if (res.done) {
                console.log('end of data');
                await iterator.close();
                console.info(allResults);
                return allResults;
            }
        }
    }


}  //  Class SupplychainContract

module.exports = SupplychainContract;
