function getHomeHistoryRest(){
    var xmlhttp = new XMLHttpRequest();
    var url = "https://cse134-230c9.firebaseio.com/rest.json";
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var data  = JSON.parse(this.responseText);
            extractJson(data);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();

}

function extractJson(data){

    for(var key in data)
    {
        if(key!='nextId'){
            var issueVal= data[key];
            if(!issueVal.solved)
                createHomeElement(key, issueVal);
        }
    }
}

function addIssueRest(issue){
    var xmlhttp = new XMLHttpRequest();
    var url = 'https://cse134-230c9.firebaseio.com/rest.json';
    xmlhttp.open("POST", url, true);
    xmlhttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            var json = JSON.parse(xmlhttp.responseText);
            window.location.href = './home.html?rest=true';
        }
    };
    var data = JSON.stringify(issue);
    xmlhttp.send(data);
}

function resolveIssueRest(issueId){
    var xmlhttp = new XMLHttpRequest();
    var url = 'https://cse134-230c9.firebaseio.com/rest/' + issueId + '/solved.json';
    xmlhttp.open("PUT", url, true);
    v
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            var json = JSON.parse(xmlhttp.responseText);
            //console.log(json);
            location.reload();
        }
    };
    var data = JSON.stringify(true);
    xmlhttp.send(data);
}

function deleteIssueRest(issueId){
    var xmlhttp = new XMLHttpRequest();
    var url = 'https://cse134-230c9.firebaseio.com/rest/' + issueId + '.json';
    xmlhttp.open("DELETE", url, true);
    xmlhttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            var json = JSON.parse(xmlhttp.responseText);
            //console.log(json);
            location.reload();
        }
    };
    xmlhttp.send();
}

function loadEditContentRest(issueId){
    var xmlhttp = new XMLHttpRequest();
    var url = 'https://cse134-230c9.firebaseio.com/rest/' + issueId + '.json';
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var data  = JSON.parse(this.responseText);
            loadEditContentToHtml(data);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function saveEditIssueRest(issueId, editIssue){
    var xmlhttp = new XMLHttpRequest();
    var url = 'https://cse134-230c9.firebaseio.com/rest/' + issueId + '.json';
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            window.location.href = './home.html?rest=true';
        }
    };
    xmlhttp.open("PATCH", url, true);
    xmlhttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    var data = JSON.stringify(editIssue);
    xmlhttp.send(data);
}
