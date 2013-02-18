/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
if ((typeof cordova == 'undefined') && (typeof Cordova == 'undefined')) alert('Cordova variable does not exist. Check that you have included cordova.js correctly');
if (typeof CDV == 'undefined') alert('CDV variable does not exist. Check that you have included cdv-plugin-fb-connect.js correctly');
if (typeof FB == 'undefined') alert('FB variable does not exist. Check that you have included the Facebook JS SDK file.');
            
FB.Event.subscribe('auth.login', function(response) {
    //alert('auth.login event');
    //window.location = 'nearme.html';
    document.getElementById("btnLogin").innerHTML = '';
});
            
FB.Event.subscribe('auth.logout', function(response) {
    alert('auth.logout event');
    });
            
FB.Event.subscribe('auth.sessionChange', function(response) {
    //alert('auth.sessionChange event');
    });
            
FB.Event.subscribe('auth.statusChange', function(response) {
    //alert('auth.statusChange event');
    });
            
/*function getSession() {
alert("session: " + JSON.stringify(FB.getSession()));
}
             */
function getLoginStatus() {
    FB.getLoginStatus(function(response) {
        if (response.status == 'connected') {
            alert('logged in');
        } else {
            alert('not logged in');
        }
    },true);
}
var friendIDs = [];
var fdata;
function me() {
    FB.api('/me/friends', {
        fields: 'id, name, picture'
    },  function(response) {
        if (response.error) {
            alert(JSON.stringify(response.error));
        } else {
            var data = document.getElementById('data');
            fdata=response.data;
            console.log("fdata: "+fdata);
            response.data.forEach(function(item) {
                var d = document.createElement('div');
                d.innerHTML = "<img src="+item.picture+"/>"+item.name;
                data.appendChild(d);
            });
        }
        var friends = response.data;
        console.log(friends.length); 
        for (var k = 0; k < friends.length && k < 200; k++) {
            var friend = friends[k];
            var index = 1;

            friendIDs[k] = friend.id;
        //friendsInfo[k] = friend;
        }
        console.log("friendId's: "+friendIDs);
    });
}
            
function logout() {
    FB.logout(function(response) {
        alert('logged out');
        window.location = 'index.html';
    });
}
            
function login() {
    FB.login(
        function(response) {
            FB.api('/me', function(response) {
                var id = response.id;
                var username = response.username;
                var name = response.name;
                var email = response.email;
                var imgURL = "https://graph.facebook.com/"+response.id+"/picture";
                createUser(id,username,name,email,imgURL);
            });
            if (response.session) {
                alert('logged in');
            } else {
                alert('not logged in');
            }
        },
        {
            scope: "email"
        }
        );
    
        
        
}
			
			
function facebookWallPost() {
    console.log('Debug 1');
    var params = {
        method: 'feed',
        name: 'Freburist Checkin',
        link: 'www.it.kmitl.ac.th',
        picture: 'http://powerbeam.host22.com/Freburist/images/freburist_logo128.png',
        caption: 'Breburist Checkin',
        description: 'คุณได้มาเช็คอินที่นี่แล้ว'
    };
    console.log(params);
    FB.ui(params, function(obj) {
        console.log(obj);
    });
}
            
function publishStoryFriend() {
    randNum = Math.floor ( Math.random() * friendIDs.length ); 

    var friendID = friendIDs[randNum];
    if (friendID == undefined){
        alert('please click the me button to get a list of friends first');
    }else{
        console.log("friend id: " + friendID );
        console.log('Opening a dialog for friendID: ', friendID);
        var params = {
            method: 'feed',
            to: friendID.toString(),
            name: 'Facebook Dialogs',
            link: 'https://developers.facebook.com/docs/reference/dialogs/',
            picture: 'http://fbrell.com/f8.jpg',
            caption: 'Reference Documentation',
            description: 'Dialogs provide a simple, consistent interface for applications to interface with users.'
        };
        FB.ui(params, function(obj) {
            console.log(obj);
        });
    }
}
            

            
function my(){
    FB.api('/me', function(response) {
        //alert(response.name+","+response.email);
        var img = document.getElementById("photo_profile");
        var data = document.getElementById("data");
        var id = response.id;
        var username = response.username;
        var name = response.name;
        var email = response.email;
        var imgURL = "https://graph.facebook.com/"+response.id+"/picture";
        img.innerHTML = '<img src="https://graph.facebook.com/'+response.id+'/picture"/>';
        data.innerHTML = 'id: '+id+'<br>'+
        'Username: '+username+'<br>'+
        'Name: '+name+'<br>'+
        'Email: '+email+'<br>'+
        'Session: '+response.session+'<br>'+
        'Status: '+response.status;
    });
}


