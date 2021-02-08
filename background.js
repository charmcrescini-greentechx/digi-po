// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

//const { debug } = require("console");

chrome.runtime.onInstalled.addListener(function() {
  // chrome.storage.sync.set({color: '#3aa757'}, function() {
  //   console.log('The color is green.');
  // });
  localStorage.setItem("color", '#3aa757');
  // chrome.storage.local.set({color: '#3aa757'}, function() {
     console.log('The color is green.');
  // });
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    
    chrome.declarativeContent.onPageChanged.addRules([{
      
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {hostEquals: 'developer.chrome.com'},
      })
      ],
          actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
    
  });

});
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    localStorage.setItem("setUserSiteUsage", request.userUsage);
    localStorage.setItem("setUserSiteTime", request.userTime);
    localStorage.setItem("setUserNetworkSize", request.totalMemorySize);
    localStorage.setItem("siteReload", request.siteReload);
    localStorage.setItem("dataLoad", 1);
    localStorage.setItem("siteUrl", request.siteUrl);
    //alert(request.siteUrl);
  }
);

