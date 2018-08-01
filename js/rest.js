function getHistoryRest(solved){
    var xmlhttp = new XMLHttpRequest();
    var url = "/db/db.json";
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var data  = JSON.parse(this.responseText);
            extractJson(data, solved);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function extractJson(data, solved){
    for(var key in data)
    {
        if(key!='nextId'){
            var issueVal= data[key];
            if (!solved && !issueVal.solved)
                createHomeElement(key, issueVal);
            if (solved && issueVal.solved)
                createSolvedElement(key, issueVal);
        }
    }
}

function addIssueRest(issue){
    var xmlhttp = new XMLHttpRequest();
    var url = "url";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var json = JSON.parse(xhr.responseText);
            console.log(json.email + ", " + json.password);
        }
    };
    var data = JSON.stringify({"email": "hey@mail.com", "password": "101010"});
    xhr.send(data);
}