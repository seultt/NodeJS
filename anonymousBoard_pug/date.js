 
	var d = new Date()
	function gotdate(today){
    	var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    	return monthNames[today.getMonth()]+' '+'0'+today.getDate()
	}
	gotdate(d)


