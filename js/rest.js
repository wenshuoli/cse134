function getHomeHistoryRest(){
    var xmlhttp = new XMLHttpRequest();
    var url = "/db/db.json";
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