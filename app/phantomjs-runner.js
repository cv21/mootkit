var urls = [
	{
		name: "home",
		url: "https://mootkit.com"
	},
  {
    name: "home2",
    url: "https://mootkit.com"
  }
];

var fs = require('fs');

for(var i = 0; i < urls.length; i++) {
  var page = require('webpage').create();
  page.open(urls[i].url, function (status) {  	
    if (status == 'success') {
      var delay, checker = (function() {
        var html = page.evaluate(function () {
          var body = document.getElementsByTagName('body')[0];
          return document.getElementsByTagName('html')[0].outerHTML;
          // if(body.getAttribute('data-status') == 'ready') {
          //   return document.getElementsByTagName('html')[0].outerHTML;
          // }
        });        
        if(html) {
          clearTimeout(delay);          
          try {
            fs.write("/var/www/app.mootkit/rendered/01.html", html, 'w');
          } catch(e) {
            console.log(e);
          }          

          phantom.exit();
        }
      });
      delay = setInterval(checker, 100);
    }
  });	
}
