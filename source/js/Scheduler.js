var THEME;
var daysOfWeek = new Array(7);
daysOfWeek[0]=  "Sunday";
daysOfWeek[1] = "Monday";
daysOfWeek[2] = "Tuesday";
daysOfWeek[3] = "Wednesday";
daysOfWeek[4] = "Thursday";
daysOfWeek[5] = "Friday";
daysOfWeek[6] = "Saturday";

var DAYTIME_LOWSUN = "DAYTIME_LOWSUN";
var DAYTIME = "DAYTIME";
var UNDERGROUND = "UNDERGROUND";
var AFTERHOURS = "AFTERHOURS";
var CHAINSAW = "CHAINSAW";

var tempThemeCount = 0;

function setTheme(){
	var date = new Date();
	var currentHour = date.getHours();
	var weekday = daysOfWeek[date.getDay()];
	if((currentHour >= 5 && currentHour < 7) || (currentHour >= 17 && currentHour < 20)){		
		THEME = DAYTIME_LOWSUN;				//THEME for morning/evening sunset/sunrise. Used between 5-7am and 5-7pm
	}else if(currentHour >= 7 && currentHour < 17){		
		THEME = DAYTIME;						//THEME for typical daytime between 7am and 5pm
	}
	//Figure out nightime THEME, which requires knowing the day of the week
	else if(weekday === "Sunday" || weekday === "Monday" || weekday === "Saturday"){	
		THEME = UNDERGROUND;
	}else if(weekday === "Tuesday" || weekday === "Wednesday" || weekday === "Thursday"){
		THEME = AFTERHOURS;
	}else if(weekday === "Friday"){
		THEME = CHAINSAW;
	}

	print(THEME);
}

//used to cycle through the themes for testing
function changeTheme(){
	if(tempThemeCount === 0){
		THEME = DAYTIME_LOWSUN;
	}else if(tempThemeCount === 1){
		THEME = DAYTIME;
	}else if(tempThemeCount === 2){
		THEME = UNDERGROUND;
	}else if(tempThemeCount === 3){
		THEME = AFTERHOURS;
	}else if(tempThemeCount === 4){
		THEME = CHAINSAW;
	}

	tempThemeCount++;
	if(tempThemeCount > 4)
		tempThemeCount = 0;
}