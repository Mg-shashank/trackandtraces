/*
# Copyright 2019 Brillio
*/

'use strict';
const shim = require('fabric-shim');
const util = require('util');

/************************************************************************************************
 * 
 * GENERAL FUNCTIONS 
 * 
 ************************************************************************************************/

/**
 * Executes a query using a specific key
 * 
 * @param {*} key - the key to use in the query
 */
async function queryByKey(stub, key) {
  console.log('============= START : queryByKey ===========');
  console.log('##### queryByKey key: ' + key);

  let resultAsBytes = await stub.getState(key); 
  if (!resultAsBytes || resultAsBytes.toString().length <= 0) {
    throw new Error('##### queryByKey key: ' + key + ' does not exist');
  }
  console.log('##### queryByKey response: ' + resultAsBytes);
  console.log('============= END : queryByKey ===========');
  return resultAsBytes;
}


async function queryByString(stub, queryString) {
  console.log('============= START : queryByString ===========');
  console.log("##### queryByString queryString: " + queryString);

  let docType = "";
  let startKey = "";
  let endKey = "";
  let jsonQueryString = JSON.parse(queryString);
  if (jsonQueryString['selector'] && jsonQueryString['selector']['docType']) {
    docType = jsonQueryString['selector']['docType'];
    startKey = docType + "0";
    endKey = docType + "z";
  }
  else {
    throw new Error('##### queryByString - Cannot call queryByString without a docType element: ' + queryString);   
  }

  let iterator = await stub.getStateByRange(startKey, endKey);

  let allResults = [];
  while (true) {
    let res = await iterator.next();

    if (res.value && res.value.value.toString()) {
      let jsonRes = {};
      console.log('##### queryByString iterator: ' + res.value.value.toString('utf8'));

      jsonRes.Key = res.value.key;
      try {
        jsonRes.Record = JSON.parse(res.value.value.toString('utf8'));
      } 
      catch (err) {
        console.log('##### queryByString error: ' + err);
        jsonRes.Record = res.value.value.toString('utf8');
      }

      let jsonRecord = jsonQueryString['selector'];
      // If there is only a docType, no need to filter, just return all
      console.log('##### queryByString jsonRecord - number of JSON keys: ' + Object.keys(jsonRecord).length);
      if (Object.keys(jsonRecord).length == 1) {
        allResults.push(jsonRes);
        continue;
      }
      for (var key in jsonRecord) {
        if (jsonRecord.hasOwnProperty(key)) {
          console.log('##### queryByString jsonRecord key: ' + key + " value: " + jsonRecord[key]);
          if (key == "docType") {
            continue;
          }
          console.log('##### queryByString json iterator has key: ' + jsonRes.Record[key]);
          if (!(jsonRes.Record[key] && jsonRes.Record[key] == jsonRecord[key])) {
            // we do not want this record as it does not match the filter criteria
            continue;
          }
          allResults.push(jsonRes);
        }
      }
      // ******************* End LevelDB filter handling ******************************************

    }
    if (res.done) {
      await iterator.close();
      console.log('##### queryByString all results: ' + JSON.stringify(allResults));
      console.log('============= END : queryByString ===========');
      return Buffer.from(JSON.stringify(allResults));
    }
  }
}

/************************************************************************************************
 * 
 * CHAINCODE
 * 
 ************************************************************************************************/

let Chaincode = class {

  /**
   * Initialize the state when the chaincode is either instantiated or upgraded
   * 
   * @param {*} stub 
   */
  async Init(stub) {
    console.log('=========== Init: Instantiated / Upgraded ngo chaincode ===========');
    return shim.success();
  }

  /**
   * The Invoke method will call the methods below based on the method name passed by the calling
   * program.
   * 
   * @param {*} stub 
   */
  async Invoke(stub) {
    console.log('============= START : Invoke ===========');
    let ret = stub.getFunctionAndParameters();
    console.log('##### Invoke args: ' + JSON.stringify(ret));

    let method = this[ret.fcn];
    if (!method) {
      console.error('##### Invoke - error: no chaincode function with name: ' + ret.fcn + ' found');
      throw new Error('No chaincode function with name: ' + ret.fcn + ' found');
    }
    try {
      let response = await method(stub, ret.params);
      console.log('##### Invoke response payload: ' + response);
      return shim.success(response);
    } catch (err) {
      console.log('##### Invoke - error: ' + err);
      return shim.error(err);
    }
  }

  /**
   * Initialize the state. This should be explicitly called if required.
   * 
   * @param {*} stub 
   * @param {*} args 
   */
  async initLedger(stub, args) {
    console.log('============= START : Initialize Ledger ===========');
    console.log('============= END : Initialize Ledger ===========');
  }


  /************************************************************************************************
   * 
   * Batch functions 
   * 
   ************************************************************************************************/

  /**
   * Creates a new Batch
   * 
   * @param {*} stub 
   * @param {*} args
   */
  async createBatch(stub, args) {
    console.log('============= START : createBatch ===========');
    console.log('##### createBatch arguments: ' + JSON.stringify(args));

    // args is passed as a JSON string
    let json = JSON.parse(args);
    let key = 'batch' + json['batchId'];
    json['docType'] = 'batch';

    console.log('##### createBatch payload: ' + JSON.stringify(json));

    await stub.putState(key, Buffer.from(JSON.stringify(json)));
    console.log('============= END : createBatch ===========');
  }
  
    async createOrder(stub, args) {
    console.log('============= START : createOrder ===========');
    console.log('##### createOrder arguments: ' + JSON.stringify(args));

    // args is passed as a JSON string
    let json = JSON.parse(args);
    let key = 'order' + json['orderId'];
    json['docType'] = 'order';

    console.log('##### createOrder payload: ' + JSON.stringify(json));

    await stub.putState(key, Buffer.from(JSON.stringify(json)));
    console.log('============= END : createOrder ===========');
  }


  /**
   * Retrieves a specfic batch
   * 
   * @param {*} stub 
   * @param {*} args 
   */
  async queryBatch(stub, args) {
    console.log('============= START : queryBatch ===========');
    console.log('##### queryBatch arguments: ' + JSON.stringify(args));

    // args is passed as a JSON string
    let json = JSON.parse(args);
    let key = 'batch' + json['batchId'];
    console.log('##### queryBatch key: ' + key);                                                                

    return queryByKey(stub, key);
  }
  
  async queryOrder(stub, args) {
    console.log('============= START : queryOrder ===========');
    console.log('##### queryOrder arguments: ' + JSON.stringify(args));

    // args is passed as a JSON string
    let json = JSON.parse(args);
    let key = 'order' + json['orderId'];
    console.log('##### queryOrder key: ' + key);                                                                

    return queryByKey(stub, key);
  }
  /**
   * Retrieves all batches
   * 
   * @param {*} stub 
   * @param {*} args 
   */
  async queryAllBatch(stub, args) {
    console.log('============= START : queryAllBatches ===========');
    console.log('##### queryAllBatches arguments: ' + JSON.stringify(args));
 
    let queryString = '{"selector": {"docType": "batch"}}';
    return queryByString(stub, queryString);
  }

    async queryAllOrder(stub, args) {
    console.log('============= START : queryAllOrders===========');
    console.log('##### queryAllOrders arguments: ' + JSON.stringify(args));
 
    let queryString = '{"selector": {"docType": "order"}}';
    return queryByString(stub, queryString);
  }
/**
   * Creates a new Organizaion
   * 
   * @param {*} stub 
   * @param {*} args - JSON as follows:
   * {
   *    "orgRegistrationNumber":"6322",
   *    "orgName":"Pets In Need",
   *    "orgtype":"Service Provider/ ,
   *    "orgDescription":"We help pets in need",
   *    "address":"1 Pet street",
   *    "contactNumber":"82372837",
   *    "contactEmail":"pets@petco.com"
   * }
   */
  
  async createOrg(stub, args) {
    console.log('============= START : createOrg ===========');
    console.log('##### createOrg arguments: ' + JSON.stringify(args));

    // args is passed as a JSON string
    let json = JSON.parse(args);
    let key = 'org' + json['orgRegistrationNumber'];
    json['docType'] = 'org';

    console.log('##### createOrg payload: ' + JSON.stringify(json));

    // Check if the ORG already exists
    let ORGQuery = await stub.getState(key);
    if (orgQuery.toString()) {
      throw new Error('##### createOrg - This ORG already exists: ' + json['orgRegistrationNumber']);
    }

    await stub.putState(key, Buffer.from(JSON.stringify(json)));
    console.log('============= END : createOrg ===========');
  }

/**
   * Retrieves a specfic org
   * 
   * @param {*} stub 
   * @param {*} args 
   */
  async queryOrg(stub, args) {
    console.log('============= START : queryOrg ===========');
    console.log('##### queryOrg arguments: ' + JSON.stringify(args));

    // args is passed as a JSON string
    let json = JSON.parse(args);
    let key = 'org' + json['orgRegistrationNumber'];
    console.log('##### queryOrg key: ' + key);

    return queryByKey(stub, key);
  }

  /**
   * Retrieves all orgs
   * 
   * @param {*} stub 
   * @param {*} args 
   */
  async queryAllOrgs(stub, args) {
    console.log('============= START : queryAllOrgs ===========');
    console.log('##### queryAllOrgs arguments: ' + JSON.stringify(args));
 
    let queryString = '{"selector": {"docType": "org"}}';
    return queryByString(stub, queryString);
  }


 

  /************************************************************************************************
   * 
   * Blockchain related functions 
   * 
   ************************************************************************************************/

  /**
   * Retrieves the Fabric block and transaction details for a key or an array of keys
   * 
   * @param {*} stub 
   * @param {*} args - JSON as follows:
   * [
   *    {"key": "a207aa1e124cc7cb350e9261018a9bd05fb4e0f7dcac5839bdcd0266af7e531d-1"}
   * ]
   * 
   */
  async queryHistoryForKey(stub, args) {
    console.log('============= START : queryHistoryForKey ===========');
    console.log('##### queryHistoryForKey arguments: ' + JSON.stringify(args));

    // args is passed as a JSON string
    let json = JSON.parse(args);
    let key = json['key'];
    let docType = json['docType']
    console.log('##### queryHistoryForKey key: ' + key);
    let historyIterator = await stub.getHistoryForKey(docType + key);
    console.log('##### queryHistoryForKey historyIterator: ' + util.inspect(historyIterator));
    let history = [];
    while (true) {
      let historyRecord = await historyIterator.next();
      console.log('##### queryHistoryForKey historyRecord: ' + util.inspect(historyRecord));
      if (historyRecord.value && historyRecord.value.value.toString()) {
        let jsonRes = {};
        console.log('##### queryHistoryForKey historyRecord.value.value: ' + historyRecord.value.value.toString('utf8'));
        jsonRes.TxId = historyRecord.value.tx_id;
        jsonRes.Timestamp = historyRecord.value.timestamp;
        jsonRes.IsDelete = historyRecord.value.is_delete.toString();
      try {
          jsonRes.Record = JSON.parse(historyRecord.value.value.toString('utf8'));
        } catch (err) {
          console.log('##### queryHistoryForKey error: ' + err);
          jsonRes.Record = historyRecord.value.value.toString('utf8');
        }
        console.log('##### queryHistoryForKey json: ' + util.inspect(jsonRes));
        history.push(jsonRes);
      }
      if (historyRecord.done) {
        await historyIterator.close();
        console.log('##### queryHistoryForKey all results: ' + JSON.stringify(history));
        console.log('============= END : queryHistoryForKey ===========');
        return Buffer.from(JSON.stringify(history));
      }
    }
  }
}
shim.start(new Chaincode());
