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
    var openIssuesRef = firebase.database().ref('/users/' + userId + '/open');
    openIssuesRef.on('value', function(snapshot)
    {
        snapshot.forEach(function(childSnapshot){
            createElement(childSnapshot.key, childSnapshot.val());
        });
    });
    
}

function createElement(issueId, issueVal){
    var html = 
    
    '<p class="IssueItem ' + issueId + '">' + issueVal.title + '</p>' + 
    '<p class="IssueItem ' + issueId + '">' + issueVal.project + '</p>' + 
    '<p class="IssueItem '+ issueId+ '">' + issueVal.date + '</p>' + 
    '<div class="FunctionIcons' + issueId + '">' + 
        '<img class="FunctionIcon" src="/images/Icons/edit.svg" alt="Edit_icon"></a>' + 
        '<img class="FunctionIcon" src="/images/Icons/check.svg" alt="Check_icon" onclick="resolveOverLayON(' + issueId + ')">' + 
        '<img class="FunctionIcon" src="/images/Icons/delete.svg" alt="Delete_icon" onclick="deleteOverLayON(' + issueId + ')">' + 
    '</div>' + 
    '<div class="VagueLine ' + issueId + '"></div>'
    
    var temp = document.createElement('div');
    temp.innerHTML = html;

    
    var list = document.getElementById('HomeIssueList');

    while (temp.firstChild) {
        list.appendChild(temp.firstChild);

    }

    console.log(html);
}