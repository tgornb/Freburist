/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
var map;
var infowindow;
var curMap;


function initializeMap(position) {
    addGeo(position);
    var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    var mapOptions = {
        zoom: 14,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById('mapholder'), mapOptions);
    
    //Show current location with customarker.
    var icon = 'images/User-yellow32.png';
    
    var currentMarker = new google.maps.Marker({
        position: latlng,
        map: map,
        icon: icon
    });
    var request = {
        location: latlng,
        radius: 1000,
        types: ['store','bank','food','atm','post_office','cafe','gas_station','hospital']
    };
    infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);
    service.search(request, callback);
    
    google.maps.event.addListener(map, 'click', function(e) {
        placeMarker(e.latLng, map);
    });
    
    var cityCircle;
    var populationOptions = {
        strokeColor: '#736AFF',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#736AFF',
        fillOpacity: 0.35,
        map: map,
        center: latlng,
        radius: 1000
    };
    cityCircle = new google.maps.Circle(populationOptions);
    
}

function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        
        for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
        }
    }
}

function createMarker(place) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
    });
    marker.setAnimation( google.maps.Animation.DROP );

    google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(place.name);
        infowindow.open(map, this);
    });
}
function placeMarker(position, map) {
    var marker = new google.maps.Marker({
        position: position,
        map: map
    });
    map.panTo(position);
}





//--------------AJAX----------------------------------------------------------
function Inint_AJAX () {
    var xmlhttp = false;
    if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }
    else
    {// code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    return xmlhttp;
}
function checkin(name,lat,lng,type,mode){
    var HttPRequest = Inint_AJAX();
    var url = 'http://192.168.1.100:8084/FreburistServerTest1/Checkin';  
    var pmeters = "name=" + encodeURIComponent(name)+
    "&lat=" + encodeURIComponent(lat)+
    "&lng=" + encodeURIComponent(lng)+
    "&type=" + encodeURIComponent(type)+
    "&mode=" + encodeURIComponent(mode);
    HttPRequest.open('POST',url,true);
    HttPRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    HttPRequest.send(pmeters);
    //alert(pmeters);
    HttPRequest.onreadystatechange = function()
    {
        //alert(HttPRequest.readyState);
        if(HttPRequest.readyState == 3)  // Loading Request
        {   
            //alert("Waiting...");
            
            document.getElementById("sMsg").innerHTML = "Waiting...";
        }

        if(HttPRequest.readyState == 4) // Return Request
        {
        	
            if(HttPRequest.responseText == 'OK!')
            {   
                alert(HttPRequest.responseText);
                window.location = "checkin.html";
            }
            else
            {   
                
                alert(HttPRequest.responseText);
            }
        }
				
    }
}
function addVenue(vName,latVal,lngVal,vCate,vAddr){
    var HttPRequest = Inint_AJAX();
    var url = 'http://192.168.1.100:8084/FreburistServerTest1/Checkin'; 
    var pmeters = "name=" + encodeURIComponent(vName)+
        "&lat="+encodeURIComponent(latVal)+
        "&lng="+encodeURIComponent(lngVal)+
        "&type="+encodeURIComponent(vCate)+
        "&address="+encodeURIComponent(vAddr);
        
    HttPRequest.open('POST',url,true);
    HttPRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    HttPRequest.send(pmeters);
        HttPRequest.onreadystatechange = function()
    {
        //alert(HttPRequest.readyState);
        if(HttPRequest.readyState == 3)  // Loading Request
        {   
           
        }

        if(HttPRequest.readyState == 4) // Return Request
        {
            window.location = "checkin.html";
        }
				
    }
}
function createUser(id,username,name,email,PhotoURL){
    alert("createUser()");
    var HttPRequest = Inint_AJAX();
    var url = 'http://192.168.1.100:8084/FreburistServerTest1/Registeration';  
    var pmeters = "fbID=" + encodeURIComponent(id)+
    "&fbUsername=" + encodeURIComponent(username)+
    "&fbName=" + encodeURIComponent(name)+
    "&fbEmail=" + encodeURIComponent(email)+
    "&fbPhotoURL=" + encodeURIComponent(PhotoURL);
    HttPRequest.open('POST',url,true);
    HttPRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    HttPRequest.send(pmeters);
    HttPRequest.onreadystatechange = function()
    {

        if(HttPRequest.readyState == 3)  // Loading Request
        {   
            
            
        }

        if(HttPRequest.readyState == 4) // Return Request
        {
            if(HttPRequest.responseText == 'OK!')
            {   
                alert(HttPRequest.responseText);
            //document.getElementById("sMsg").innerHTML = HttPRequest.responseText;
            }
            else
            {
                alert(HttPRequest.responseText);
            //document.getElementById("sMsg").innerHTML = HttPRequest.responseText;
            }
        }
				
    }
}



