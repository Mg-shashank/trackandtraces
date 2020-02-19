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

const ttConfig = { 
  roleassign:{
    dist  :{role:'distributor'    ,name:'Steve'   ,email:'steve05022020@gmail.com'},
    manu  :{role:'manufacturer'   ,name:'Joe'     ,email:'joe015254@gmail.com'},
    serv  :{role:'serviceprovider',name:'Williams',email:'williams6733@gmail.com'},
    assign:{role:'qwe', name:'qwe', email:'qwe'},  
    dcoordinates: {lat: 35.0078,lng: -97.0929 , lat1:36.0015 ,lng1:-77.5804},
    mcoordinates: {lat: 35.5175, lng: -86.5804 ,lat1:35.0078 ,lng1:-97.0929 },
    initialCenter: {lat:39.648209,lng:-65.711185}
   },
  }
 const config = ttConfig;
export default config;
