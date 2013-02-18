/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
//------AJAX-----------------------------------------------------------
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
//-------Map----------------------------------------------------------
var map;
var infowindow;

function initializeMap(position) {
    alert(position.coords.latitude+","+position.coords.longitude);
    var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    var mapOptions = {
        zoom: 15,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById('mapholder'), mapOptions);
    //document.getElementById("latlng").innerHTML = position.coords.latitude+","+position.coords.longitude;
    infowindow = new google.maps.InfoWindow();
    var request = {
        location: latlng,
        radius: 900,
        types: ['restaurant','food']
    };
    var service = new google.maps.places.PlacesService(map);
    service.search(request, callback);
    //alert('asynData!');
    /*var HttPRequest = Inint_AJAX();
    var url = 'http://192.168.1.102:8084/FreburistServerTest1/MapMarker';
    HttPRequest.open('GET',url,true);
    HttPRequest.send();
    HttPRequest.onreadystatechange = function(){
        if(HttPRequest.readyState == 3)  // Loading Request
        {   
            
            document.getElementById("sMsg").innerHTML = "load...";
        }

        if(HttPRequest.readyState == 4) // Return Request
        {
            var mark  = new Array();
            var li = document.createElement('li');
            mark = HttPRequest.responseText.split('|');
            if(mark[0] == 'OK!')
            {   
                //document.getElementById("sMsg").innerHTML = mark+","+mark.length;
                for(var i = 0; i< mark.length; i++){
                    //document.getElementById("sMsg").innerHTML = mark[i]+'<br>';
                    //createMarker(mark[i]);
                	
                }
            }
            else
            {
            }
        }
    }*/
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



