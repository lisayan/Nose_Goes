function MusuWriter(app) {
  this.appContext = app;
}

var musu;
Musubi.ready(function(context) {
    musu = new MusuWriter(context);

	$("#post_button").click(function(e) {	
		var style = "font-size:16px;";
    	var text = $("#text_area").val();
    	var html = '<span style="' + style + '">' + text + '</span>';
    	var imageURL = "http://lisayan.github.com/Nose-Goes/musubi/apps/images/nose_goes_icon.gif";
    	
    	var content = { "__html" : html, "text" : text, "imageURL" : imageURL};
      	var obj = new SocialKit.Obj({type : "game_start", json: content})
      	musu.appContext.feed.post(obj);
 		//musu.appContext.quit();
    }); 
    function quit() {	
    	musu.appContext.quit();
    };
});	