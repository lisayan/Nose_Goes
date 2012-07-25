function MusuWriter(app) {
  this.appContext = app;
}

function foo() {
	alert("yo");
}

var game_array = new Array();

var musu;
Musubi.ready(function(context) {
    musu = new MusuWriter(context);
    
    alert("hi bob");
    
    $("#start_button").click(function(e) {
    	var text = "Started a Nose Goes. Hurry and join in if you don't want to lose!";
    	var text3 = "<img src='http://lisayan.github.com/Nose_Goes/musubi/apps/images/nose_goes_icon.png'>";
    	var html = text + text3;
    	var content = { "__html" : html, "text" : text};
      	var obj = new SocialKit.Obj({type : "1", json: content});
      	musu.appContext.feed.post(obj); //post message for game start
      	
      	var user_obj = makeUser(context);    //person starting game
      	
	});
    
    $("#the_nose").click(function(e) {
    	var text = "Pressed the nose!";
    	var html = text;
    	var content = { "__html" : html, "text" : text};
      	var obj = new SocialKit.Obj({type : "user_post", json: content})
      	musu.appContext.feed.post(obj);
      	
      	var player_obj = makeUser(context);
     	game_array.push(player_obj);
      	
   		if (game_array.length == context.feed.members.length) {
     		var text = musubi.appContext.user() + " lost the Nose Goes!";
    		var html = text;
    		var content = { "__html" : html, "text" : text};
      		var obj = new SocialKit.Obj({type : "end_game", json: content})
      		musu.appContext.feed.post(obj);  
      	} 
      	
      	musu.appContext.quit();
	});
	
/*	$("#post_button").click(function(e) {
    	var text1 = "Started a Nose Goes. Here is the message - ";
    	var text = $("#text_area").val();
    	var text2 = " - Hurry and join in if you don't want to lose!";
    	var text3 = "<img src='http://lisayan.github.com/Nose_Goes/musubi/apps/images/nose_goes_icon.png'>";
    	var html = text1 + text + text2 + text3;
    	var content = { "__html" : html, "text" : text};
      	var obj = new SocialKit.Obj({type : "1", json: content});
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
		var data = context.feed.query("type='nose_goes_state'", "_id desc limit 1")[0];
		var start_obj_DbObj = new SocialKit.DbObj(data);
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


