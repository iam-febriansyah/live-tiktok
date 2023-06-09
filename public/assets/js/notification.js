var permissionNotif = false;
if(typeof Notification !== "undefined"){
    requestAndShowPermission()

    if(permissionNotif === "default"){
        requestAndShowPermission();
    }

    function requestAndShowPermission() {
        Notification.requestPermission(function (permission) {
            if (permission === "granted") {
                permissionNotif = permission;
            }
        });
    }
    
    function showNotification(title, body, url='') {
        let icon = `${baseUrl}/assets/images/favicon.png`;
        var notification = new Notification(title, { body, icon });
        notification.onclick = (event) => {
            notification.close();
            event.preventDefault();
            if(url != ''){
                window.open(url,'_blank');
            }
        }
     }
}

if(socket?.connected){
    console.log("Socket Connected")
}else{
    console.log('Socket : ', socket)
}
// socketFunction();

function socketFunction(){
    socket.on('socket_notif_' + user_id, function(data) {
        showNotification(data.title, data.body) 
    });
}
