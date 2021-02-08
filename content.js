var usage = 0
var time = 0;
var size = 0;
var url = window.location.href;
window.onload=function(){

  chrome.runtime.sendMessage({siteReload: true,siteUrl: url}, function(response) {
    //console.log(response.userUsage);
  });
  updateUsage();
}

//get URL
//get total size of all the url
//


chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    if (request.greeting == "5"){
      //sendResponse({farewell: "goodbye"});
      alert("Pomodoro timer is up! It's break time! Start the timer in my main panel to continue");
    }
    else if (request.greeting == "10") {
      alert("Pomodoro timer is up! It's break time! Start the timer in my main panel to continue");
    }
    else if (request.greeting == "20") {
      window.close();
      // alert("Scheduled report! We've prepared your report and you can view it in my main panel :)");
      var div = document.createElement("div")
        div.className = "modal"
        div.id = "myModal"
        var div1 = document.createElement("div")
        div1.className="modal-content"
        div1.id = "modal"
        var div2 = document.createElement("div")
        div2.className = "modal-body"
        var div3 = document.createElement("div")
        div3.className = "label-8"
        div3.textContent = "Digipo Says:"
        var img = document.createElement("img")
        img.className = "carbon-footprint-img-modal"
        img.src = chrome.runtime.getURL("images/carbon/DigipoAvatar@3x.png")
        var div4 = document.createElement("div")
        div4.className = "label-6"
        div4.textContent = "Hi friend! You've been browsing through a lot of pages for a while now - why not take a quick break and let yourself and the device breathe? :)"
        var div5 = document.createElement("div")
        div5.className = "label-7"
        div5.textContent = "Also did you know bookmarking a page avoids wasting energy by not searching for it again?"
  
        var button = document.createElement("button")
        button.className = "button-ok"
        button.textContent = "OK"
        button.onclick = function(){
          document.getElementById("myModal").style.display="none"
        }
      
        div.appendChild(div1)
        div1.appendChild(div2)
        div2.appendChild(div3)
        div2.appendChild(div4)
        div2.appendChild(div5)
        div2.appendChild(button)
        div2.appendChild(img)

        function append(){
          if (!document.getElementById("myModal")){
            document.body.appendChild(div)
          }
          else{
            return
          }
        }
        
          append();

    }
  }
);



function updateUsage(){
    var userVisit = 1;
    var userUsage = 0;
    if (localStorage.getItem("setUserSiteUsage") === null) {
     localStorage.setItem("setUserSiteUsage", userVisit);
     userUsage = userVisit;
    }
    else {
      var userUsageUpdate = parseInt(localStorage.getItem("setUserSiteUsage"));
      localStorage.setItem("setUserSiteUsage", userUsageUpdate + 1);
      userUsage = userUsageUpdate + userVisit;
    }
    var loadTime = window.performance.timing.domContentLoadedEventEnd-window.performance.timing.navigationStart; 
    loadTime = loadTime / 1000;
    console.log('Page load time is '+ loadTime/1000);
    //sendData(userUsage,loadTime,fileSize);
    usage = userUsage;
    time = loadTime;
    //size = fileSize;
    run();
  }


  function sendData(userUsage,loadTime,fileSize){
    chrome.runtime.sendMessage({userUsage: userUsage,userTime: loadTime, totalMemorySize: fileSize,siteUrl: url}, function(response) {
        //console.log(response.userUsage);
      });
  }


function run() {
  const url = setUpQuery();
  fetch(url)
    .then(response => response.json())
    .then(json => {
      // See https://developers.google.com/speed/docs/insights/v5/reference/pagespeedapi/runpagespeed#response
      // to learn more about each of the properties in the response object.
      //showInitialContent(json.id);
      const lighthouse = json.lighthouseResult;
      const lighthouseTotalByteWeight = {'displayValue': lighthouse.audits['total-byte-weight'].displayValue};
      console.log(lighthouseTotalByteWeight);
      size =  lighthouseTotalByteWeight.displayValue.replace(/\D/g, "");
      size = parseInt(size) * 1.024 
      sendData(usage,time,size);
    });
}

function setUpQuery() {
  const api = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed';
  const parameters = {
    url: encodeURIComponent('https://developers.google.com')
  };
  let query = `${api}?`;
  for (key in parameters) {
    query += `${key}=${parameters[key]}`;
  }
  return query;
}



