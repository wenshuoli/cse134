var rest = false;

if ('serviceWorker' in navigator) {
    // Use the window load event to keep the page load performant
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js');
    });
  }

window.onload = function () {
    var popup = document.getElementById('resolve-btn');
    if (popup) {
        popup.addEventListener('click', function () {
            if (this.classList.contains('hidden')) {
                this.classList.remove('hidden');
                this.classList.add('fadein');
            }
        });
    }
}

var deleted;
var resolved;

function deleteOverLayON(issueName){
    deleted = issueName;
    var el = document.getElementById('delete-popup');
    el.removeAttribute('hidden');
}

function resolveOverLayON(issueName){
    resolved = issueName;
    var el = document.getElementById('resolve-popup');
    el.removeAttribute('hidden');
}

function overLayOff(){
    deleted = null;
    resolved = null;
    var el = document.getElementsByClassName('overlay');
    el[0].setAttribute("hidden", true);
    el[1].setAttribute("hidden", true);
}

function addIssueLink(){
    if(rest)
        window.location.href = './addIssue.html?rest=true';
    else
        window.location.href = './addIssue.html';
}

function homeLink(){
    if(rest)
        window.location.href = './home.html?rest=true';
    else
        window.location.href = './home.html';
}

function resolvedIssueLink(){
    if(rest)
        window.location.href = './listHis.html?rest=true';
    else
        window.location.href = './listHis.html';

}

function editIssue(issueID){
    if(rest)
        var editIssueUrl = './editIssue.html?rest=true&editIssueId=' + issueID;
    else
        var editIssueUrl = './editIssue.html?editIssueId=' + issueID;
    window.location.href = editIssueUrl;
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

function loadEditContentToHtml(issueInfo){
    document.getElementById('title').value = issueInfo.title;
    document.getElementById('project').value = issueInfo.project;
    document.getElementById('description').value = issueInfo.description;
}

function loadDetailContentToHtml(issueInfo){
    document.getElementById('title').innerHTML = issueInfo.title;
    document.getElementById('project').innerHTML = issueInfo.project;
    document.getElementById('description').innerHTML = issueInfo.description;
    document.getElementById('date').innerHTML = issueInfo.date;
}

function checkDetail(issueID){
    if(rest)
        var issueDetailUrl = './issueDetails.html?rest=true&issueDetailId=' + issueID;
    else
        var issueDetailUrl = './issueDetails.html?issueDetailId=' + issueID;
    window.location.href = issueDetailUrl;
}