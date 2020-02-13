import uuidv4 from "uuid/v4";
import * as jwt from "jsonwebtoken";
// import config from 'react-global-configuration';
const isLocalDev = true;
// const continuousUpdate = false;
const localLedgerId = "hellocdm";
const ledgerId = "hellocdm";
const applicationId = uuidv4();
const createToken = party => jwt.sign({ localLedgerId, ledgerId, applicationId, party }, "secret")

// Dev config
const localConfig = {
  isLocalDev,
  // continuousUpdate,
  tokens: {}
}
// parties.map(p => localConfig.tokens[p] = createToken(p));

// Track and Trace config
 // config.set({
const ttConfig = { 
  roleassign:{
    dist  :{role:'distributor'    ,name:'Steve'   ,email:'steve05022020@gmail.com'},
    manu  :{role:'manufacturer'   ,name:'Joe'     ,email:'joe015254@gmail.com'},
    serv  :{role:'serviceprovider',name:'Williams',email:'williams6733@gmail.com'},
    assign:{role:'qwe', name:'qwe', email:'qwe'}
   },
  }
const config = ttConfig;
export default config;
