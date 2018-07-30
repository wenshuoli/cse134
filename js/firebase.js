var config = {
    apiKey: "AIzaSyDAiuDpPsIWCRUdQJKLj-nbzafO8_ATcvg",
    authDomain: "cse134-230c9.firebaseapp.com",
    databaseURL: "https://cse134-230c9.firebaseio.com",
    projectId: "cse134-230c9",
    storageBucket: "cse134-230c9.appspot.com",
    messagingSenderId: "33880794193"
};
firebase.initializeApp(config);

function initApp() {
    // Listening for auth state changes.
    // [START authstatelistener]
    firebase.auth().onAuthStateChanged(function(user) {
        // [START_EXCLUDE silent]
        // [END_EXCLUDE]
        if (firebase.auth().currentUser) {
            window.location.href = './home.html';
        }
        // User is signed in.
    });
}

function checkLogin() {
    // Listening for auth state changes.
    // [START authstatelistener]
    firebase.auth().onAuthStateChanged(function(user) {
        // [START_EXCLUDE silent]
        // [END_EXCLUDE]
        if (!firebase.auth().currentUser) {
            window.location.href = './index.html';
        }
        else{
            getHistory();
        }
        // User is not signed in.
    });
}

function getHistory(){
    var database = firebase.database();
    //console.log(firebase.auth().currentUser);
    var userId = firebase.auth().currentUser.uid;
    var openIssuesRef = firebase.database().ref('users/' + userId + '/opens');
    openIssuesRef.on('value', function(snapshot)
    {
        console.log(snapshot.child('YHReqChPivJWV7n2CdWb'));
        snapshot.forEach(function(childSnapshot){
            console.log(1);
            console.log(childSnapshot.key);
        });
    });
    
}