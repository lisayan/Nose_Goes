function MusuWriter(app) {
  this.appContext = app;
}

var start_obj;
var musu;
Musubi.ready(function(context) {
    musu = new MusuWriter(context);
    
    start_obj = musu.appContext.obj;
    
    if (start_obj == null) {
    	var text = "Started a Nose Goes. Hurry and join in if you don't want to lose!";
    	var text3 = "<img src='http://lisayan.github.com/Nose_Goes/musubi/apps/images/nose_goes_icon.png'>";
    	var html = text + text3;
    	var content = { "__html" : html, "text" : text};
      	var obj = new SocialKit.Obj({type : "game_session", json: content});
      	
      	musu.appContext.feed.post(obj); //post message for game start
      	
      	var user_obj = makeUser(context);    //person starting game
      	
      	setTimeout(func, 5000);
			function func() {
				alert("oh");
    			var data = musu.appContext.feed.query("type='game_session'", "_id desc limit 1");
				alert("shit");
				//
				//alert(data);
				
				data = data[data.length - 1]; //getting game state
				alert("what");
		      	start_obj = new SocialKit.DbObj(data); 
		      	alert("the");
		      	start_obj.post(user_obj); //adding starting player to game
		      	alert("fuck");
			}
  	}
      	
      	//make the post/query from thing a DbObj
      	//query for object you posted, post user object below that one

    
/*    $("#start_button").click(function(e) {
    	var text = "Started a Nose Goes. Hurry and join in if you don't want to lose!";
    	var text3 = "<img src='http://lisayan.github.com/Nose_Goes/musubi/apps/images/nose_goes_icon.png'>";
    	var html = text + text3;
    	var content = { "__html" : html, "text" : text};
      	var obj = new SocialKit.Obj({type : "game_session", json: content});
      	musu.appContext.feed.post(start_obj_DbObj); //post message for game start
      	alert("Started a New Game!");
	}); */
    
    $("#the_nose").click(function(e) {
    	var text = "Pressed the nose!";
    	var html = text;
    	var content = { "__html" : html, "text" : text};
      	var obj = new SocialKit.Obj({type : "user_post", json: content});
      	alert("ayo");
      	musu.appContext.feed.post(obj); //people shouldnt be able to click this later
      	
      	var player = makeUser(context);
      	
     	start_obj.post(player);
     	alert(start_obj.query("type='user'").length);
     	
		var name = player.json['name']; //getting name	
      	alert(context.feed.members.length);
   		if (start_obj.query("type='user'").length == context.feed.members.length) {
   			alert("we is ending the game");
     		var text = name + " lost the Nose Goes! Suckaaaaaa";
    		var html = text;
    		var content = { "__html" : html, "text" : text};
      		var end_obj = new SocialKit.Obj({type : "end_game", json: content})
      		musu.appContext.feed.post(end_obj);  
      	} 
   		else {
   			alert("we is NOT ending the game");
     		var text = "click this shit";
    		var html = text;
    		var content = { "__html" : html, "text" : text};
      		var ongoing_obj = new SocialKit.Obj({type : "ongoing_game", json: content})
      		musu.appContext.feed.post(ongoing_obj);  
      	} 
      	
      	//if not full then like keep filling it?
      	
    	musu.appContext.quit();
	});

/*	$("#post_button").click(function(e) {
    	var text1 = "Started a Nose Goes. Here is the message - ";
    	var text = $("#text_area").val();
    	var text2 = " - Hurry and join in if you don't want to lose!";
    	var text3 = "<img src='http://lisayan.github.com/Nose_Goes/musubi/apps/images/nose_goes_icon.png'>";
    	var html = text1 + text + text2 + text3;
    	var content = { "__html" : html, "text" : text};
      	var obj = new SocialKit.Obj({type : "game_session", json: content});
      	musu.appContext.feed.post(obj); //post message for game start
      	
      	var user_obj = makeUser(context);    //person starting game

		function func() {
    		var data = musu.appContext.feed.query("type='truth_dare_state'", "_id desc limit 1")[0]; //getting game state
		    start_obj_DbObj = new SocialKit.DbObj(data); 
		    start_obj_DbObj.post(user_obj);  //adding starting player to game
		}
      	
	}); */
    
    
/*    var state_data = musu.appContext.feed.query("type='1'", "_id desc limit 1");
    
    if(state_data.length > 0)
    {
    	var start_obj_DbObj = new SocialKit.DbObj(state_data[0]); //zero-ith game
    	var user_data = getUser(context); //pre-existing user status
    	if(user_data == null) //not joined
    	{
    		var user = makeUser(context);
    		start_obj_DbObj.post(user); 
    	}
    	else
    	{
    		var user = new SocialKit.DbObj(user_data);
    	//	var user_status = user.query("type='progress'");
    		
    	//	if(user_status == null){//show nose;}
    	//	else if (user_status != null){//show timetable;}
    	}
    } */
    
	//makes user object
	function makeUser(context)
	{
		var userID = context.user['id'];
		var user_json = {"id" : userID, "name" : context.user['name']};
		user_obj = new SocialKit.Obj({type: "user", json: user_json});
		return user_obj;
	}

	//returns the user
	function getUser(context)
	{
		var user_arr = start_obj_DbObj.query("type = 'user'");
		for(i=0; i<user_arr.length; i++){
			temp_user = new SocialKit.Obj(user_arr[i]);
			temp_ID = temp_user.json['id'];
			if(temp_ID == context.user['id']){
				return user_arr[i];
			}
		}
		return null;
	} 

});