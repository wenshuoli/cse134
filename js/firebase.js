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

function signOut(){
    if(firebase.auth().currentUser)
        firebase.auth().signOut();
}

function checkLoginHome() {
    // Listening for auth state changes.
    // [START authstatelistener]
    var rest = getParameterByName('rest');
    if(rest)
        getHomeHistoryRest();
    else
        firebase.auth().onAuthStateChanged(function(user) {
            // [START_EXCLUDE silent]
            // [END_EXCLUDE]
            if (!firebase.auth().currentUser) {
                alert('You have been signed out, please log in again!');
                window.location.href = './index.html';
            }
            else{
                getHomeHistory();
            }
            // User is not signed in.
        });
}

function deleteResidual() {
    var paras = document.getElementsByClassName('IssueItem');
    while(paras[0]) {
        paras[0].parentNode.removeChild(paras[0]);
    }
    paras = document.getElementsByClassName('FunctionIcons');
    while(paras[0]) {
        paras[0].parentNode.removeChild(paras[0]);
    }

    paras = document.getElementsByClassName('FunctionIcon');
    while(paras[0]) {
        paras[0].parentNode.removeChild(paras[0]);
    }
    paras = document.getElementsByClassName('VagueLine');
    while(paras[0]) {
        paras[0].parentNode.removeChild(paras[0]);
    }
}

function getHomeHistory(){
    var database = firebase.database();
    //console.log(firebase.auth().currentUser);
    var userId = firebase.auth().currentUser.uid;
    var openIssuesRef = firebase.database().ref('/users/' + userId + '/open');
    openIssuesRef.on('value', function(snapshot)
    {
        deleteResidual();
        snapshot.forEach(function(childSnapshot){
            if(!childSnapshot.val().solved)
              createHomeElement(childSnapshot.key, childSnapshot.val());
        });
    });
    
}

function createHomeElement(issueId, issueVal){
    var html = 
    
    '<p class="IssueItem ' + issueId + '"onclick="checkDetail(\'' + issueId + '\')" >' + issueVal.title + '</p>' + 
    '<p class="IssueItem ' + issueId + '">' + issueVal.project + '</p>' + 
    '<p class="IssueItem '+ issueId+ '">' + issueVal.date + '</p>' + 
    '<div class="FunctionIcons ' + issueId + '">' + 
        '<img class="FunctionIcon" src="/images/Icons/edit.svg" alt="Edit_icon" onclick="editIssue(\'' + issueId + '\')">' + 
        '<img class="FunctionIcon" src="/images/Icons/check.svg" alt="Check_icon" onclick="resolveOverLayON(\'' + issueId + '\')">' + 
        '<img class="FunctionIcon" src="/images/Icons/delete.svg" alt="Delete_icon" onclick="deleteOverLayON(\'' + issueId + '\')">' + 
    '</div>' + 
    '<div class="VagueLine ' + issueId + '"></div>'
    
    var temp = document.createElement('div');
    temp.innerHTML = html;

    
    var list = document.getElementById('HomeIssueList');

    while (temp.firstChild) {
        list.appendChild(temp.firstChild);

    }

}

function checkLoginHis() {
    // Listening for auth state changes.
    // [START authstatelistener]
    firebase.auth().onAuthStateChanged(function(user) {
        // [START_EXCLUDE silent]
        // [END_EXCLUDE]
        if (!firebase.auth().currentUser) {
            alert('You have been signed out, please log in again!');
            window.location.href = './index.html';
        }
        else{
            getSolvedHistory();
        }
        // User is not signed in.
    });
}

function getSolvedHistory(){
    var database = firebase.database();
    //console.log(firebase.auth().currentUser);
    var userId = firebase.auth().currentUser.uid;
    var openIssuesRef = firebase.database().ref('/users/' + userId + '/open');
    openIssuesRef.on('value', function(snapshot)
    {
        deleteResidual();
        snapshot.forEach(function(childSnapshot){
            if(childSnapshot.val().solved)
                createSolvedElement(childSnapshot.key, childSnapshot.val());
        });
    });
    
}

function createSolvedElement(issueId, issueVal){
    var html = 
    
    '<p class="IssueItem ' + issueId + '"onclick="checkDetail(\'' + issueId + '\')" >' + issueVal.title + '</p>' + 
    '<p class="IssueItem ' + issueId + '">' + issueVal.project + '</p>' + 
    '<p class="IssueItem '+ issueId+ '">' + issueVal.date + '</p>' + 
    '<div class="VagueLine ' + issueId + '"></div>'
    
    var temp = document.createElement('div');
    temp.innerHTML = html;

    
    var list = document.getElementById('IssueList');

    while (temp.firstChild) {
        list.appendChild(temp.firstChild);

    }
}

function edit(issueId){
    var database = firebase.database();
    //console.log(firebase.auth().currentUser);
    var userId = firebase.auth().currentUser.uid;

    var d = new Date();
    var issueDate = (d.getMonth() + 1) + '/' + d.getDate() + '/' + d.getFullYear();
    var issueTitle = document.getElementById('title').value;
    var issueProject = document.getElementById('project').value;
    var issueDiscription = document.getElementById('description').value;
    
    var openIssuesRef = firebase.database().ref('/users/' + userId + '/open/' + issueId);
    openIssuesRef.set({
            title: issueTitle,
            date: issueDate,
            project: issueProject,
            solved: false,
            description: issueDiscription
        });
}

function addIssue(){
    var database = firebase.database();
    //console.log(firebase.auth().currentUser);
    var userId = firebase.auth().currentUser.uid;


    var d = new Date();
    var issueDate = (d.getMonth() + 1) + '/' + d.getDate() + '/' + d.getFullYear();
    var issueTitle = document.getElementById('title').value;
    var issueProject = document.getElementById('project').value;
    var issueDiscription = document.getElementById('description').value;
    var issueFile = document.getElementById('file').files[0];
    var issue = {date:issueDate, title:issueTitle, description:issueDiscription, 
        solved:false, project:issueProject};

    var newIssueKey = firebase.database().ref('users/' + userId + '/open').push().key;
    var updates = {};
    updates['users/' + userId + '/open/' + newIssueKey] = issue;
    firebase.database().ref().update(updates, function(error){
        if (error) {
            alert('Oops! Something went wrong! Your issue didn\'t add successfully! Please Try Again');
        } else 
            uploadFile(newIssueKey, issueFile);
    });
    
}

function uploadFile(newIssueKey, issueFile){
    var storageRef = firebase.storage().ref();
    if(issueFile){
        var uploadTask = storageRef.child('Issues/' + newIssueKey).put(issueFile);
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, function(snapshot) {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case firebase.storage.TaskState.PAUSED: // or 'paused'
                        console.log('Upload is paused');
                        break;
                    case firebase.storage.TaskState.RUNNING: // or 'running'
                        console.log('Upload is running');
                        break;
                }
            }, function(error) {
                if(error){
                    alert('Oops! Something went wrong! Your file didn\'t upload successfully! Please delete this issue in the home page and try again!');
                    window.location.href = './home.html';
                }
            }, function() {
                // Upload completed successfully, now we can get the download URL
                uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                    console.log('File available at', downloadURL);
                });
                window.location.href = './home.html';
            });
    }
    else
        window.location.href = './home.html';
}

function discardAdd(){
    window.location.href = './home.html';
}

function resolveIssue(issueId) {
    var database = firebase.database();
    //console.log(firebase.auth().currentUser);
    var userId = firebase.auth().currentUser.uid;
    var openIssuesRef = firebase.database().ref('/users/' + userId + '/open/' + issueId);

    //Create variables to store the previous values
    var prevDate;
    var prevDescription;
    var prevProject;
    var prevTitle;
    //console.log("ref=" + openIssuesRef);
    openIssuesRef.on('value', function (snapshot) {
        //console.log(snapshot.val());
        prevDate = snapshot.val().date;
        prevDescription = snapshot.val().description;
        prevProject = snapshot.val().project;
        prevTitle = snapshot.val().title;
        //console.log("prevTitle=" + prevTitle);

        openIssuesRef.set({
            title: prevTitle,
            date: prevDate,
            project: prevProject,
            solved: true,
            description: prevDescription
        });

        //console.log(snapshot.val());
    });
    var el = document.getElementsByClassName('overlay');
    el[0].setAttribute("hidden", true);
}

function deleteIssue(issueId){
    var storageRef = firebase.storage().ref();
    var database = firebase.database();
    //console.log(firebase.auth().currentUser);
    var userId = firebase.auth().currentUser.uid;
    var issueRef = firebase.database().ref('/users/' + userId + '/open/' + issueId);
    issueRef.remove(function(errer){
        if(errer)
            alert('Oops! Something went wrong. Please try again!');
        else{
            var desertRef = storageRef.child('Issues/' + issueId);
            desertRef.delete().then(function() {
                // File deleted successfully
              }).catch(function(error) {
                // Uh-oh, an error occurred!
              });
        }
    });
    var el = document.getElementsByClassName('overlay');
    el[1].setAttribute("hidden", true);
}

function editIssue(issueID){
    var editIssueUrl = './editIssue.html?editIssueId=' + issueID;
    window.location.href = editIssueUrl;
}

function saveEditIssue(){
    var database = firebase.database();
    //console.log(firebase.auth().currentUser);
    var userId = firebase.auth().currentUser.uid;
    var issueId = getParameterByName('editIssueId');
    var editIssuesRefKey = firebase.database().ref('/users/' + userId + '/open/' + issueId).key;

    var d = new Date();
    var newIssueDate = (d.getMonth() + 1) + '/' + d.getDate() + '/' + d.getFullYear();
    var newIssueTitle = document.getElementById('title').value;
    var newIssueProject = document.getElementById('project').value;
    var newIssueDescription = document.getElementById('description').value;
    var newIssueFile = document.getElementById('file').files[0];
    var editIssue = {date:newIssueDate, title:newIssueTitle, description:newIssueDescription, 
        solved:false, project:newIssueProject};

    var updates = {};
    updates['users/' + userId + '/open/' + editIssuesRefKey] = editIssue;
    firebase.database().ref().update(updates, function(error){
        if (error) {
            alert('Oops! Something went wrong! Your issue didn\'t edit successfully! Please Try Again');
        }  else {
            uploadFile(issueId, newIssueFile);
        }
           
    });
    
}

function discardEdit(){
    window.location.href = './home.html';
}

function checkDetail(issueID){
    var issueDetailUrl = './issueDetails.html?issueDetailId=' + issueID;
    window.location.href = issueDetailUrl;
}

function loadEditContent(){
    var database = firebase.database();
    //console.log(firebase.auth().currentUser);
    var userId = firebase.auth().currentUser.uid;
    var issueId = getParameterByName('editIssueId');
    var openIssuesRef = firebase.database().ref('/users/' + userId + '/open/' + issueId);
    openIssuesRef.on('value', function(snapshot)
    {
        var issueInfo = snapshot.val();
        document.getElementById('title').value = issueInfo.title;
        document.getElementById('project').value = issueInfo.project;
        document.getElementById('description').value = issueInfo.description;
        console.log(issueInfo);
    });

}

function loadDetailContent(){
    var userId = firebase.auth().currentUser.uid;
    var issueId = getParameterByName('issueDetailId');
    var issueRef = firebase.database().ref('/users/' + userId + '/open/' + issueId);
    issueRef.on('value', function(snapshot)
    {
        var issue = snapshot.val();
        document.getElementById('title').innerHTML = issue.title;
        document.getElementById('project').innerHTML = issue.project;
        document.getElementById('description').innerHTML = issue.description;
        document.getElementById('date').innerHTML = issue.date;
    });

}

function getIssueFile(){
    var issueId = getParameterByName('issueDetailId');
    var pathRef = firebase.storage().ref('Issues/' + issueId);
    pathRef.getDownloadURL().then(function(url) {
        downloadURL(url)

    }).catch(function(error){
        //if(error.code == 'storage/object_not_found')
            alert('It seems you didn\'t upload a file. You can upload a file by editting it!')
    })
}

function downloadURL(url) {
    var link = document.createElement("a");
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    delete link;
  }