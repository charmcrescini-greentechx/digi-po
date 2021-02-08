let viewSummary = document.getElementById('btn-summary');
viewSummary.onclick = function(element) {
  window.location.href="popup.html";
};
var userUsage = localStorage.getItem("setUserSiteUsage");
document.getElementById('userUsage').innerHTML = userUsage + "";

var userSize = localStorage.getItem("setUserNetworkSize");

var userTime = localStorage.getItem("setUserSiteTime");
// document.getElementById('loadTime').innerHTML = "0h 0m " + parseFloat(userTime).toFixed(2) + "s";
document.getElementById('sizeLoaded').innerHTML =  parseFloat(userSize).toFixed(2) + " kb";

var ghg = 0.25 * parseFloat(userUsage) * parseFloat(userTime) * parseFloat(userSize);

var totalUserUsageGHG = 0;
var totalSizeLoaded = 0;
var dataLoad = parseInt(localStorage.getItem("dataLoad")); 

var siteUrl = localStorage.getItem("siteUrl");
if (localStorage.getItem("totalUserGHGUsage") === null) {
  localStorage.setItem("totalUserGHGUsage", ghg);
  totalUserUsageGHG = ghg;
  localStorage.setItem("dataLoad", 0);
 }
else {
  var totalUserGHGUsageUpdate = parseFloat(localStorage.getItem("totalUserGHGUsage"));
  if (dataLoad == 1) {
    totalUserUsageGHG = totalUserGHGUsageUpdate + parseFloat(ghg);
    localStorage.setItem("totalUserGHGUsage", totalUserUsageGHG);
    localStorage.setItem("dataLoad", 0);
  }
  else {
    totalUserUsageGHG = totalUserGHGUsageUpdate;
    localStorage.setItem("dataLoad", 0);
  }
  
}

var prevGhg = 0;

if (localStorage.getItem("prevGhg") === null) {
  localStorage.setItem("prevGhg", ghg);
  localStorage.setItem("prevUrl", siteUrl);
  prevGhg = ghg;
  localStorage.setItem("dataLoad", 0);
 }
else {
  var prevGhgLocal = parseFloat(localStorage.getItem("prevGhg"));
  var prevUrl = localStorage.getItem("prevUrl");
  if ( ghg >= prevGhgLocal) {
    prevGhg = ghg;
    localStorage.setItem("prevGhg", ghg);
    localStorage.setItem("prevUrl", siteUrl);
    localStorage.setItem("dataLoad", 0);
  }
  else {
    prevGhg = prevGhg;
    localStorage.setItem("dataLoad", 0);
  }
  
}
var heavyUrl = localStorage.getItem("prevUrl");
document.getElementById('heavyUrl').innerHTML = heavyUrl.substring(8);



let divGhg = document.getElementById('ghg');
let ghgLabel = document.createElement('label');


//document.getElementById('pageGHG').innerHTML = + parseFloat(ghg).toFixed(2) + " GHG";




if (localStorage.getItem("totalSizeLoaded") === null) {
  localStorage.setItem("totalSizeLoaded", userSize);
  totalSizeLoaded = userSize;
  localStorage.setItem("dataLoad", 0);
 }
else {
  var totalSizeLoadedUpdate = parseFloat(localStorage.getItem("totalSizeLoaded"));
  if (dataLoad == 1) {
    totalSizeLoaded = totalSizeLoadedUpdate + parseFloat(userSize);
    localStorage.setItem("totalSizeLoaded", totalSizeLoaded);
    localStorage.setItem("dataLoad", 0);
  }
  else {
    totalSizeLoaded = totalSizeLoadedUpdate;
    localStorage.setItem("dataLoad", 0);
  }
  
}


document.getElementById('userTotalGHG').innerHTML = parseFloat(totalUserUsageGHG).toFixed(2) + " GHG";
