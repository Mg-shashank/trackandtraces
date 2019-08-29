var accounts;
var account; 
var completeBatchList = [];  
var completeTrailList = [];  
var locationList = [];
var supplyChainMap;
var marker;
var strokeColors = ["red", "blue", "green", "yellow"];  
var isAdmin = true;

window.addEventListener('load', function() { 
  App.start();
});
 
window.App = {
  start: function() {
    var self = this;
    self.initialize();
    self.renderButton();
  },

  signIn: function() {
    var e = document.getElementById("loginType");
    var strUser = e.options[e.selectedIndex].value;
    console.log('Signing in as : ' + strUser);
    localStorage.setItem('loggedInUserDetails', strUser);
    location.reload();
  },

  renderButton : function renderButton() {
    var self = this;
    var loggedInObject = localStorage.getItem('loggedInUserDetails');
    console.log(loggedInObject);
    if (loggedInObject == ''){
       self.onFailure();     
    } else {
       self.onSuccess();
    }
  },

  onSuccess: function onSuccess() {

    var profile = localStorage.getItem('loggedInUserDetails');

    var profileHTML = "Welcome " + profile + " ! " ;
    
    isAdmin = profile.includes("admin");

    document.getElementById("userContent").innerHTML= profileHTML;  
    document.getElementById('unAuthorizedDiv').style.display = 'none';
    document.getElementById('authorizedDiv').style.display = 'block';
    document.getElementById('gSignIn').style.display = 'none'; 
    document.getElementById('gSignOut').style.display = 'block';

    if(isAdmin) {
      console.log("Admin logged in!!!")
      document.getElementById('batches').style.display = 'block'; 
      document.getElementById('locations').style.display = 'none'; 
      document.getElementById('achMenu').innerHTML  = 'Onboard Batches';  
    }
    else {
     console.log('Not an Admin !')
      document.getElementById('batches').style.display = 'none'; 
      document.getElementById('locations').style.display = 'block'; 
      document.getElementById('achMenu').innerHTML  = 'Location Trial'; 
    }
    
  },

  onFailure: function onFailure(error) {
    document.getElementById('unAuthorizedDiv').style.display = 'block';
    document.getElementById('authorizedDiv').style.display = 'none'; 
    document.getElementById('gSignIn').style.display = 'block';
    document.getElementById('gSignOut').style.display = 'none';
    document.getElementById("userContent").innerHTML = " ";
    console.log(error);
  }, 

  signOut: function signOut() {
      localStorage.setItem('loggedInUserDetails', '');
      var loggedInObject = localStorage.getItem('loggedInUserDetails');
      if (loggedInObject == null){        
        document.getElementById("userContent").innerHTML = " ";
        document.getElementById('unAuthorizedDiv').style.display = 'block';
        document.getElementById('authorizedDiv').style.display = 'none'; 
        document.getElementById('gSignIn').style.display = 'block';
        document.getElementById('gSignOut').style.display = 'none';
      }
      else {
        console.log('User was not logged out.')
      }
      location.reload();
  },

  initialize : function initialize() {  
    //this.getAllBatches(); 
    //this.getAllTrailLocations();
    this.PopulateLocations();
    this.populatebatchesDD();
  }, 

  initializeLocations : function () {   
    this.populatebatchesDD();
  }, 

  getAllBatches:  function() {  
    var self = this;  
    var instance; 

  SupplyChain.deployed().then(function(inst) {
      instance = inst;
      return instance.getTotalBatches.call();
    }).then(function(value) { 

      if(value.valueOf() == 0)
      {
        self.setStatus("No Batches Found."); 
        return;
      }
      else {
        self.setBatchList(value.valueOf()); 
      } 

    }).catch(function(e) {
      console.log(e);
      self.setStatus("Error getting balance; see log.");
    });
  },

  setBatchList: function async (total) { 
    var self = this;  
    completeBatchList =[];
    SupplyChain.deployed().then(function(inst) {
        var instance = inst;  
        for (var i=1; i <= total; i++) {   
          instance.getBatch.call(i).then(function(value) { 
            completeBatchList.push({index: i, batchId: value[0].valueOf(), batchName: value[1], batchItems : value[2], timestamp : value[3].valueOf()}); 
              var actIdx = completeBatchList.findIndex(x => x.batchId==value[0].valueOf());
              completeBatchList[actIdx].index = actIdx  + 1;
          });
        }   
    }); 
    
  },

  populateBatches: function() {
  
    this.setStatus(" ");
    
    //Create a HTML Table element.
    var table = document.createElement("TABLE"); 
    table.className = "table table-condensed";

    //Get the count of columns.
    var columnCount = 4;
    var headerList=["Batch ID","Batch Name", "Batch Items","Created On"];

    //Add the header row.
    var row = table.insertRow(-1);
    for (var i = 0; i < columnCount; i++) {
        var headerCell = document.createElement("TH");
        headerCell.style = "background-color:Black;color:white;font-weight: normal";
        headerCell.innerHTML = headerList[i];
        row.appendChild(headerCell);
    }

    //Add the data rows.
    for (var i = 0; i < completeBatchList.length; i++) {
        row = table.insertRow(-1);
        
        var cell = row.insertCell(-1);
        cell.innerHTML = completeBatchList[i].batchId;
        var cell = row.insertCell(-1);
        cell.innerHTML = completeBatchList[i].batchName; 
        var cell = row.insertCell(-1);
        cell.innerHTML = completeBatchList[i].batchItems;  
        var cell = row.insertCell(-1);   
        cell.innerHTML = completeBatchList[i].timestamp; 
    }

    var dvTable = document.getElementById("dvBatchTable");
    dvTable.innerHTML = ""; 
    dvTable.appendChild(table);

    this.populatebatchesDD();
  },

  CreateBatch :  function() {  
    var self = this; 
    var batchName = document.getElementById("txtBatchName").value;
    var batchItems = document.getElementById("txtBatchItems").value; 
    var uniqueId = new Date().getTime();
    var dateString = new Date();
    dateString = dateString.toLocaleDateString() + " - " + dateString.toLocaleTimeString();

    SupplyChain.deployed().then(function(inst) {
    var instance = inst; 
      var createdOn =  dateString.toString();
      document.getElementById('imgLoading').style.display = 'inline-block';
      self.setBatchStatus(" ");
      return instance.createBatch(uniqueId, batchName, batchItems,createdOn, {from: account,  gas: 3000000});
      }).then(function(value) { 
        console.log(value);
        if(value.receipt.blockNumber > 0) {
          document.getElementById('imgLoading').style.display = 'none';
          self.setBatchStatus("Batch Created Successfully, New Batch ID : " + uniqueId + " and Block # " + value.receipt.blockNumber + ".");
          self.getAllBatches(); 
          self.populatebatchesDD();
        }
        else {
          self.setBatchStatus("Batch creation failed");
        }
      }).catch(function(e) {
        console.log(e);
        document.getElementById('imgLoading').style.display = 'none';
        self.setStatus("Error in executing transaction; see log.");
      });

  },

  getAllTrailLocations:  function() {  
    var self = this;  
    var instance; 

  SupplyChain.deployed().then(function(inst) {
      instance = inst;
      return instance.getTrailCounts.call();
    }).then(function(value) { 

      if(value.valueOf() == 0)
      {
        self.setLogStatus("No Trail Locations Found."); 
        return;
      }
      else {
        self.setTrailLocationList(value.valueOf()); 
      } 

    }).catch(function(e) {
      console.log(e);
      self.setStatus("Error getting balance; see log.");
    });
  },

  setTrailLocationList: function async (total) { 
    var self = this;  
    completeTrailList =[];
    SupplyChain.deployed().then(function(inst) {
        var instance = inst;  
        for (var i=1; i <= total; i++) {   
          instance.getTrailLocation.call(i).then(function(value) { 
            completeTrailList.push({index: i, trailId: value[0].valueOf(), batchId: value[1].valueOf(), locId : value[2].valueOf(), prevLocId : value[3].valueOf(), secret : value[4], timestamp : value[5].valueOf()}); 
              var actIdx = completeTrailList.findIndex(x => x.trailId==value[0].valueOf());
              completeTrailList[actIdx].index = actIdx  + 1;
          });
        }   
    }); 
    
  },

  CreateLocation :  function() {  
    var self = this; 
    var batchId = document.getElementById("ddbatches").value;
    var LocationId = document.getElementById("ddLocations").value; 
    var locSecret = document.getElementById("txtLocSecret").value; 
    var locSecretCode = document.getElementById("txtLocSecretCode").value; 
    var encryptedSecret = CryptoJS.AES.encrypt(locSecret,locSecretCode).toString();
    var id;
    var dateString = new Date();
    dateString = dateString.toLocaleDateString() + " - " + dateString.toLocaleTimeString();

  var PrevLocationId = LocationId;

    SupplyChain.deployed().then(function(inst) {
    var instance = inst;  
    id = new Date().getTime();  
      var createdOn =  dateString.toString();
      document.getElementById('imgLoadingLoc').style.display = 'inline-block';
      self.setLogStatus(" ");
      return instance.addTrailLocation(id, batchId, LocationId,PrevLocationId,encryptedSecret,createdOn, {from: account,  gas: 3000000});
      }).then(function(value) { 
        console.log(value);
        if(value.receipt.blockNumber > 0) {
          document.getElementById('imgLoadingLoc').style.display = 'none';
          self.setLogStatus("Location trail created successfully, New Trail ID : " + id + " and Block # " + value.receipt.blockNumber + ".");
          self.getAllTrailLocations(); 
        }
        else {
          self.setLogStatus("location trail creation failed");
        }
      }).catch(function(e) {
        console.log(e);
        document.getElementById('imgLoadingLoc').style.display = 'none';
        self.setStatus("Error in executing transaction; see log.");
      });

  },

  populatebatchesDD : function () {

    var selBatchList = document.getElementById('ddbatches');  
    selBatchList.innerHTML = " ";  

    var selViewBatchList = document.getElementById('ddViewbatches');  
    selViewBatchList.innerHTML = " "; 
  
    var opt = document.createElement('option');
    opt.innerHTML = "--Select--";
    opt.value = "NA";  
    selBatchList.appendChild(opt); 

    var opt = document.createElement('option');
    opt.innerHTML = "--Select--";
    opt.value = "NA"; 
    selViewBatchList.appendChild(opt); 

    completeBatchList.forEach(element => {
      var opt = document.createElement('option');
      opt.innerHTML = element.batchName;
      opt.value = element.batchId;  
      selBatchList.appendChild(opt);
      
      var opt = document.createElement('option');
      opt.innerHTML = element.batchName;
      opt.value = element.batchId;
      selViewBatchList.appendChild(opt);  
    });

  },

  getSecret : function() {

    var batchId = document.getElementById("ddViewbatches").value;
    var LocationId = document.getElementById("ddViewLocations").value; 
    var secretCode = document.getElementById("txtViewLocSecretCode").value;
  
    var secretItem = completeTrailList.filter(item => (item.batchId == batchId && item.locId == LocationId));

    if(secretItem != undefined) { 
      var encryptedSecret = secretItem[0].secret;
      var decryptedSecret = CryptoJS.AES.decrypt(encryptedSecret, secretCode).toString(CryptoJS.enc.Utf8);
      if(decryptedSecret == "") {
        document.getElementById("lblSecretMsg").innerHTML = "Secret Message : No Secrets Found , Enter a Valid Secret Code";
      }
      else {
        document.getElementById("lblSecretMsg").innerHTML = "Secret Message : " + decryptedSecret;
      } 
    }
    else
    {
      document.getElementById("lblSecretMsg").innerHTML = "Secret Message : No Secrets Found , Enter a Valid Secret Code";
    }   
  },

  populateSummaryDetails : function () {
    
    //Populate Graph
    this.getGoogleMap(); 

    //Populate Statastics. 
    var totalTrans = document.getElementById("totalTrans");
    totalTrans.innerHTML = "Total Transactions Done : " + web3.eth.getTransactionCount(account);  

    var totalbatches = 0;   
    var totalTrails = 0; 

    totalbatches = completeBatchList.length;  
    totalTrails = completeTrailList.length;  

    var totalProv = document.getElementById("totalbatches");
    totalProv.innerHTML = "Total Batches : " + totalbatches;

    var totaltrails = document.getElementById("totaltrails");
    totaltrails.innerHTML = "Total Trails Recorded : " + totalTrails;
  },

  PopulateLocations : function () {

    locationList = [];
    locationList.push({id: 1, Name: "LA South - Manufacturer", Type:"Prd", Add:"3630 E Imperial Hwy Lynwood, CA 90262", ZipCode:"90262" , Lat:"33.930826", Long:"-118.203228"});
    locationList.push({id: 2, Name: "LA South - Warehouse", Type:"Wrh", Add:"2720 Tweedy Blvd South Gate, CA 90280", ZipCode:"90280" , Lat:"33.945406", Long:"-118.221941"});
    locationList.push({id: 3, Name: "LA South - Supplier", Type:"Sup", Add:"7807 Compton Ave Los Angeles, CA 90001", ZipCode:"90001" , Lat:"33.967812", Long:"-118.248003"});
    locationList.push({id: 4, Name: "LA South - Distributor", Type:"Dis", Add:"6500 S Hooper Ave Los Angeles, CA 90001", ZipCode:"90001" , Lat:"33.978996", Long:"-118.250856"});
    locationList.push({id: 5, Name: "LA South - Store", Type:"Str", Add:"5318 S Main St Los Angeles, CA 90037", ZipCode:"90037" , Lat:"33.994006", Long:"-118.273401"});
    
    locationList.push({id: 6, Name: "LA North - Manufacturer", Type:"Prd", Add:"8630 Garfield Ave South Gate, CA 90280", ZipCode:"90280" , Lat:"33.951957", Long:"-118.161821"});
    locationList.push({id: 7, Name: "LA North - Warehouse", Type:"Wrh", Add:"9588 Lakewood Blvd Downey, CA 90240", ZipCode:"90240" , Lat:"33.953114", Long:"-118.113457"});
    locationList.push({id: 8, Name: "LA North - Supplier", Type:"Sup", Add:"9220 Slauson Ave Pico Rivera, CA 90660", ZipCode:"91042" , Lat:"33.969019", Long:"-118.100430"});
    locationList.push({id: 9, Name: "LA North - Distributor", Type:"Dis", Add:"5600 Whittier Blvd Commerce, CA 90022", ZipCode:"90660" , Lat:"34.017719", Long:"-118.150405"});
    locationList.push({id: 10, Name: "LA North - Store", Type:"Str", Add:"2134 Montebello Town Center Montebello, CA 90640", ZipCode:"90640" , Lat:"34.036013", Long:"-118.085994"});


    var selLocList = document.getElementById('ddLocations');  
    selLocList.innerHTML = " "; 

    var selViewLocList = document.getElementById('ddViewLocations');  
    selViewLocList.innerHTML = " "; 
    
    var opt = document.createElement('option');
    opt.innerHTML = "--Select--";
    opt.Name = "NA";  
    selLocList.appendChild(opt);
    
    var opt = document.createElement('option');
    opt.innerHTML = "--Select--";
    opt.Name = "NA";
    selViewLocList.appendChild(opt); 

    locationList.forEach(element => {
      var opt = document.createElement('option');
      opt.innerHTML = element.Name;
      opt.value = element.id;  
      selLocList.appendChild(opt); 
      
      var opt = document.createElement('option');
      opt.innerHTML = element.Name;
      opt.value = element.id; 
      selViewLocList.appendChild(opt); 
    });

  },

  setStatus: function(message) {
      var status = document.getElementById("status");
      status.innerHTML = message;
  },

  setBatchStatus: function(message) {
    var status = document.getElementById("batchStatus");
    status.innerHTML = message;
  },

  setLogStatus: function(message) {
    var status = document.getElementById("LogStatus");
    status.innerHTML = message;
  },

  getGoogleMap: function getGoogleMap() {

    var self = this;
    var myLatlng = new google.maps.LatLng(locationList[0].Lat, locationList[0].Long)
    var mapOptions = {
        center: myLatlng,
        zoom: 11,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        marker: true
    };

    var infoWhover = new google.maps.InfoWindow();  
    var bounds = new google.maps.LatLngBounds();  
    var directionsService = new google.maps.DirectionsService(); 
    supplyChainMap = new google.maps.Map(document.getElementById("divMap"), mapOptions);  
    

    completeBatchList.forEach(function (element, idx) { 

      var currentTrailList = completeTrailList.filter(item => item.batchId == element.batchId);
      var totalLocs = currentTrailList.length;

      if(totalLocs <= 0) // to avoid loading error.
      return;

      var batchwayPoints = [];
      var directionsDisplay = new google.maps.DirectionsRenderer({
        polylineOptions: {
          strokeColor: strokeColors[idx]
        }
      }); 

      directionsDisplay.setMap(supplyChainMap);  
      directionsDisplay.setOptions( { suppressMarkers: true } );

      var orginLoc = locationList.find( x=>x.id==currentTrailList[0].locId);
      var destiLoc = locationList.find( x=>x.id==currentTrailList[totalLocs - 1].locId);
      var batchorigin = new google.maps.LatLng(orginLoc.Lat, orginLoc.Long);
      var batchdestination = new google.maps.LatLng(destiLoc.Lat, destiLoc.Long);

      for (var i=1; i <= totalLocs-2; i++) { 
        var interLoc = locationList.find( x=>x.id==currentTrailList[i].locId)
        var loc = new google.maps.LatLng(interLoc.Lat, interLoc.Long);  
          batchwayPoints.push({location: loc, stopover: true});     
      } 
        
      var request = {
        origin: batchorigin,
        destination: batchdestination,
        waypoints:batchwayPoints,
        optimizeWaypoints: true,
        travelMode: google.maps.DirectionsTravelMode.DRIVING
    };

        directionsService.route(request, function (response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response); 
            } else {
                alert("directions response " + status);
            }
        });

    }); 

    completeTrailList.forEach(element => {
  
      var Locdet = locationList.find( x=>x.id==element.locId); 

      marker = new google.maps.Marker({
        position: new google.maps.LatLng(Locdet.Lat, Locdet.Long),
        animation: google.maps.Animation.DROP,
        icon: this.setMarkerByType(Locdet.Type),
        map: supplyChainMap,
    }); 

    bounds.extend(marker.position);
      
    google.maps.event.addListener(infoWhover, 'domready', function() { 
      var iwOuter = $('.gm-style-iw'); 
      var iwBackground = iwOuter.prev(); 
      iwBackground.children(':nth-child(2)').css({'background' : 'Black'}); 
      var iwmain = iwBackground.children(':nth-child(2)'); 
      iwBackground.children(':nth-child(4)').css({'display' : 'none'}); 
      var iwCloseBtn = iwOuter.next();   
    });
    
    google.maps.event.addListener(marker, 'mouseover', (function(marker) {
    return function() {
      var itemBatch = completeBatchList.find(o => o.batchId === element.batchId); 
      var name = itemBatch.batchName;
      var batchItems = itemBatch.batchItems; 
      var LocName = Locdet.Name;
      var LocAdd = Locdet.Add;  
      var dateOfEntry = element.timestamp.toString().split("-")[0];  
      var timeOfEntry = element.timestamp.toString().split("-")[1]; 
      var type = "Location";
      var typeColor = '#00a1f1';  

      var content = "<div style=' max-height: 700px;'> <h3 style='color:" + typeColor + ";border-bottom: 1px white solid;'>" + type + "</h3>" +
        "<h4 style='color:orange;margin-bottom:4px;'>" + LocName + "</h4>" + 
        "<span>"+ LocAdd +"</span>" +
        "<h4 style='color:lightgreen;margin-bottom:4px;text-decoration: underline;'>" + "Batch Details" + "</h4>" + 
        " <label style='margin-bottom:4px;'>Name : " + name + " </label> <br> " +
        " <label style='margin-bottom:4px;'>Items : " + batchItems + " </label> <br> " + 
        " <label>Entry Date : " + dateOfEntry + " </label>  <br>" +
        " <label>Entry Time : " + timeOfEntry + " </label> </div>";

      infoWhover.setContent(content);  
      infoWhover.open(supplyChainMap, marker); 
      
      }
    })(marker));
    
    marker.addListener('mouseout', function() {
    // infoWhover.close(); 
    }); 


  }); 

    //(optional) restore the zoom level after the map is done scaling
    var listener = google.maps.event.addListener(supplyChainMap, "idle", function () {
      supplyChainMap.setZoom(11);
      google.maps.event.removeListener(listener);
    }); 
  
    google.maps.event.trigger(supplyChainMap, 'resize'); 
  
  },

  refreshMap : function () { 
  this.getGoogleMap(); 
  },

  setMarkerByType :function Markers(type) {
    var icon, urltype; 

    if(type == "Prd" )
      urltype = '../public/images/Markers/Factory.png';
    else if(type == "Wrh" )
      urltype = '../public/images/Markers/Warehouse.png';
    else if(type == "Dis" )
      urltype = '../public/images/Markers/Distributor.png';
    else if(type == "Sup" )
      urltype = '../public/images/Markers/Supplier.png';
    else if(type == "Str" )
      urltype = '../public/images/Markers/Store.png';
  
    icon =  { 
      url: urltype,
      scaledSize: new google.maps.Size(70, 70), // scaled size
      origin: new google.maps.Point(0,0), // origin
      anchor: new google.maps.Point(0, 0) // anchor
    } 
    return icon;
  },

  initMap: function () {
    var directionsService = new google.maps.DirectionsService();
    var directionsDisplay = new google.maps.DirectionsRenderer();
    var start = new google.maps.LatLng(37.7699298, -122.4469157);
    var end = new google.maps.LatLng(37.7683909618184, -122.51089453697205);
    var mapOptions = {
      zoom: 14,
      center: haight
    }
    var map = new google.maps.Map(document.getElementById('map'), mapOptions);
    directionsDisplay.setMap(map);
  },

  calcRoute: function () {
    var selectedMode = document.getElementById('mode').value;
    var request = {
        origin: haight,
        destination: oceanBeach,
        // Note that Javascript allows us to access the constant
        // using square brackets and a string value as its
        // "property."
        travelMode: google.maps.TravelMode[selectedMode]
    };
    directionsService.route(request, function(response, status) {
      if (status == 'OK') {
        directionsDisplay.setDirections(response);
      }
    });
  }
}; // End of Window.App
