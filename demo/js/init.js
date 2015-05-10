$(document).ready(function() {
  $('#header').load('header.html', '', function() {
    $.material.init();
  });
  $('#footer').load('footer.html', '', function() {
    $.material.init();
  });
  $.material.init();
});

function Request(argname) //获取get的值
  {
    var url = document.location.href;
    var arrStr = url.substring(url.indexOf("?") + 1).split("&");
    //return arrStr;
    for (var i = 0; i < arrStr.length; i++) {
      var loc = arrStr[i].indexOf(argname + "=");
      if (loc != -1) {
        return arrStr[i].replace(argname + "=", "").replace("?", "");
        break;
      }
    }
    return "";
  }
