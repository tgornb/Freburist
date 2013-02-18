
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

function addVenueService(name,addr,tel,type,lat,lng){
    alert("Don't touch me!");
    var HttPRequest = Inint_AJAX();
    var url = 'http://raspberrybove.azurewebsites.net/Service/AddVenue.asmx?op=AddVenues'; 
    var pmeters = "name=" + encodeURIComponent(name)+
        "&lat="+encodeURIComponent(lat)+
        "&lng="+encodeURIComponent(lng)+
        "&type="+encodeURIComponent(type)+
        "&address="+encodeURIComponent(addr)+
        "&tel="+encodeURIComponent(tel);
        
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
            window.location = "nearme.html";
        }
				
    }
}
