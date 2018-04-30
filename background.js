// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

chrome.browserAction.onClicked.addListener(function(tab) { 
  

  chrome.tabs.executeScript({
      code: '(' + function() {
        var urlRegex = /^partner\.spreadshirt/;
        var debug = true ;

        function handleModalDialog(c, item) {
          let colors = document.querySelectorAll('.colors .color-circle p, .color-overlay .color-circle p');

          for (let color of colors) {
            if (color.textContent == c) {
              color.click();
              break;
            }
          }
          let button = document.getElementById('refinement-dialog-confirm');
          button.click();
        }
        function handleSimple(c, item) {
          let colors = item.querySelectorAll('.colors .color-circle p, .color-overlay .color-circle p');

          for (let color of colors) {
            if (color.textContent == c) {
              color.click();
              break;
            }
          }
        }

        if (!urlRegex.test(document.location.host)) {
          return;
        }

        let c = window.prompt('Color?', '');
        let items = document.querySelectorAll('.shuffle-item--visible');

        for (item of items ){
          let name = item.querySelectorAll('.group-name');

          let colorCircle = item.querySelectorAll('.category-footer .color-circle');
          if (colorCircle.length == 1) {
            colorCircle[0].click();  
            handleModalDialog(c, item);
          } else if (colorCircle.length == 2) {
            colorCircle[1].click();  
            handleSimple(c, item);
          }        

        }


        return {success: true, html: document.body.innerHTML};
      } + ')();'
  }, function(results) {
      console.log(results[0]);
  });
 
});


