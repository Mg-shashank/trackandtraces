pragma solidity ^0.4.17;

contract SupplyChainV1 { 

uint _batchCount;
uint _trailCount;


function SupplyChainV1 () public { 
      //Add anything which requires ontime execution
      _batchCount = 1;
      _trailCount = 1;
	}

struct Batch { 
        uint batchId;
        string batchName;
        string batchItems; 
        string timestamp;
    }

struct Location { 
        uint trailId;
        uint locationId;
        uint batchId;
        uint prevLocationId;
        string secret;
        string timestamp; 
}
 
mapping (uint => Batch) BatchList;
mapping (uint => Location) TrailList;

function createBatch(uint _bId, string _batchName, string _batchItems, string _createdOn) public returns(bool batchId) {
        
        BatchList[_batchCount].batchId = _bId;
        BatchList[_batchCount].batchName = _batchName;
        BatchList[_batchCount].batchItems = _batchItems;
        BatchList[_batchCount].timestamp = _createdOn; 

        _batchCount++;  

        return (batchId);
    }
  
 function getBatch(uint id) view public returns (uint,string,string,string) {  
     return (BatchList[id].batchId,BatchList[id].batchName,BatchList[id].batchItems,BatchList[id].timestamp);
 }

function getTotalBatches() view public returns (uint) { 
     return _batchCount - 1;
 } 

 function addTrailLocation(uint _trailId,uint _batchId, uint _locationId, uint _prevLocationId, string _secret, string _createdOn) public returns(bool sufficient) {
        
        TrailList[_trailCount].trailId = _trailId;
        TrailList[_trailCount].batchId = _batchId;
        TrailList[_trailCount].locationId = _locationId;  
        TrailList[_trailCount].prevLocationId = _prevLocationId;
        TrailList[_trailCount].secret = _secret;
        TrailList[_trailCount].timestamp = _createdOn; 

        _trailCount++;  

        return (true);
    }
  
 function getTrailLocation(uint id) view public returns (uint,uint,uint,uint,string,string) {  
     return (TrailList[id].trailId,TrailList[id].batchId,TrailList[id].locationId,TrailList[id].prevLocationId,TrailList[id].secret,TrailList[id].timestamp);
 }

function getTrailCounts() view public returns (uint) { 
     return _trailCount - 1;
 } 

}