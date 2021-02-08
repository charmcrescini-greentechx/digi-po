//const { start } = require("repl");

let viewReport = document.getElementById('btn-report');
if (viewReport != null) {
  viewReport.onclick = function(element) {
    window.location.href="report.html";
  };
}


let pomodoro = document.getElementById('btn-pomodoro');
if (pomodoro != null) {
  pomodoro.onclick = function(element) {
    window.location.href="pomodoro.html";
  };
}

let pomodoroStart = document.getElementById('btn-pomodoro-start');
if (pomodoroStart != null) {
  pomodoroStart.onclick = function(element) {
    window.location.href="pomodoro3.html";
  };
}


let pomodoroBreak5 = document.getElementById('btn-pomodoro-break5');
if (pomodoroBreak5 != null) {
  pomodoroBreak5.onclick = function(element) {
    //myVar = setTimeout(myTimer(5), 3000);
    window.location.href="pomodoro2.html";
  };
}


let pomodoroBreak10 = document.getElementById('btn-pomodoro-break10');
if (pomodoroBreak10 != null) {
  pomodoroBreak10.onclick = function(element) {
   // myVar = setTimeout(myTimer(10), 5000);
    window.location.href="pomodoro2.html";
  };
}


let pomodoroStop = document.getElementById('btn-pomodoro-stop');
if (pomodoroStop != null) {
  pomodoroStop.onclick = function(element) {
    window.location.href="pomodoro1.html";
  };
}
let taskDone = document.getElementById('btn-pomodoro-done');
if (taskDone != null) {
  taskDone.onclick = function(element) {
    //setTimeout(myTimer2, 1000);
    window.location.href="popup.html";
 
  };
}


// let timer1 = document.getElementById('btn-timer1');
// timer1.onclick = function(element) {
//   myVar = setTimeout(myTimer1, 5000);
// };

// let timer2 = document.getElementById('btn-timer2');
// timer2.onclick = function(element) {
//   myVar = setTimeout(myTimer2, 10000);
// };

// let timer3 = document.getElementById('btn-timer3');
// timer3.onclick = function(element) {
//   myVar = setTimeout(myTimer3, 15000);
// };


var userUsage = localStorage.getItem("setUserSiteUsage");
var userTime = localStorage.getItem("setUserSiteTime");
var userSize = localStorage.getItem("setUserNetworkSize");
var siteReload =  localStorage.getItem("siteReload");
var calculating = document.getElementById("calculating");
var doneCalculating = document.getElementById("calculateDone");



if (siteReload == "true") {
  doneCalculating.style.display = "none";
  calculating.style.display = "block";
  localStorage.setItem("siteReload", false);
}
else {
  if (userSize == "undefined")
  {
    doneCalculating.style.display = "none";
    calculating.style.display = "block";
  }
  else {
    var ghg = 0.25 * parseFloat(userUsage) * parseFloat(userTime) * parseFloat(userSize);
    doneCalculating.style.display = "block";
    calculating.style.display = "none";
    document.getElementById('totalPageGHG').innerHTML = + parseFloat(ghg).toFixed(2) + " GHG";
  }

}

window.addEventListener('storage', function(e) {
    var usage = localStorage.getItem("setUserSiteUsage");
    var time = localStorage.getItem("setUserSiteTime");
    var size = localStorage.getItem("setUserNetworkSize");
    var url = localStorage.getItem("siteUrl");
    var ghg = 0.25 * parseFloat(usage) * parseFloat(time) * parseFloat(size);
    document.getElementById('totalPageGHG').innerHTML = + parseFloat(ghg).toFixed(2) + " GHG";
    doneCalculating.style.display = "block";
    calculating.style.display = "none";
    // setTimeout(function(){
    //     console.log('after');
    // },10000);
    localStorage.setItem("siteReload", false);
    //setTimeout(myTimer2(), 5000);
        setTimeout(function(){
       // console.log('after');
       myTimer2();
    },10000);
});

function timer() {
  var handler = function() {
    var date = new Date();
    var sec = date.getSeconds();
    var min = date.getMinutes();
    document.getElementById("time").textContent = (min < 10 ? "0" + min : min) + ":" + (sec < 10 ? "0" + sec : sec);
  };
  setInterval(handler, 1000);
  handler();
}

function myTimer(timer) {
  //alert('5 seconds');
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {greeting: timer}, function(response) {
      console.log(response.farewell);
    });
  });
}
function myTimer2() {
  //alert('5 seconds');
  //alert('1 second');
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {greeting: "20"}, function(response) {
      console.log(response.farewell);
      window.close();
    });
  });
}

// function myTimer3() {
//   //alert('15 seconds');
//   chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//     chrome.tabs.sendMessage(tabs[0].id, {greeting: "15"}, function(response) {
//       console.log(response.farewell);
//     });
//   });
// }