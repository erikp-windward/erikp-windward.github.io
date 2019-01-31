//Pricing Page Slider For Windward Studios (Made By Erik Pohle - 1/22/2019) FINAL

//All Prices To Be Changed
var pricePerDesignerMonthly = 60;
var pricePerDesignerQuarterly = 162;
var pricePerDesignerAnnually = 612;

var scoutTotalMonthly_Bronze = 209;
var scoutTotalQuarterly_Bronze = 564;
var scoutTotalAnnually_Bronze = 2131;
var scoutTotalMonthly_Silver = 366;
var scoutTotalQuarterly_Silver = 988;
var scoutTotalAnnually_Silver = 3733;
var scoutTotalMonthly_Gold = 549;
var scoutTotalQuarterly_Gold = 1482;
var scoutTotalAnnually_Gold = 5599;
var scoutTotalMonthly_Platinum = 823;
var scoutTotalQuarterly_Platinum = 2222;
var scoutTotalAnnually_Platinum = 8394;

var customTotalMonthly_2Cores = 496;
var customTotalQuarterly_2Cores = 1339;
var customTotalAnnually_2Cores = 5059;
var customTotalMonthly_4Cores = 744;
var customTotalQuarterly_4Cores = 2008;
var customTotalAnnually_4Cores = 7588;
var customTotalMonthly_6Cores = 930;
var customTotalQuarterly_6Cores = 2511;
var customTotalAnnually_6Cores = 9486;
var customTotalMonthly_8Cores = 1116;
var customTotalQuarterly_8Cores = 3013;
var customTotalAnnually_8Cores = 11383;

//Initialize variables from HTML side. Includes all the different range sliders used.
var batchRange = document.getElementById("batchRange");
var immediateRange = document.getElementById("immediateRange");
var hoursRange = document.getElementById("hoursRange");
var minutesRange = document.getElementById("minutesRange");
var serverRange = document.getElementById("serverRange");
var designerRange = document.getElementById("designerRange");
var numServers = serverRange.value;
var numDesigners = designerRange.value;
var batchNum = batchRange.value;
var immediateNum = immediateRange.value;
var minutesNum = minutesRange.value;
var hoursNum = hoursRange.value;

//Global Variables for Total Price (No need to update these with prices, just here for easier access)
var serverPriceMonthly = 0;
var serverPriceQuarterly = 0;
var serverPriceAnnually = 0;
var designerPriceMonthly = 0;
var designerPriceQuarterly = 0;
var designerPriceAnnually = 0;

//Updates all the prices on initial page load
//updateNumDesigners(numDesigners);
//updateServerPrices(numServers);

//Handles highlighting table rows
var defaultColor = "f2f2f2";
var highlightColor = "rgba(190, 222, 244, 1)";
var highlightScout = document.getElementById("tableIn");
highlightScout.style.backgroundColor = highlightColor;

//Print the value of each range slider into the output text. Default values only. Not updated here.
document.getElementById("batchNum").innerHTML = Number(batchRange.value).toLocaleString();
document.getElementById("immediateNum").innerHTML = Number(immediateRange.value).toLocaleString();
document.getElementById("hoursNum").innerHTML = Number(hoursRange.value).toLocaleString();
document.getElementById("minNum").innerHTML = Number(minutesRange.value).toLocaleString();
document.getElementById("serverNum").innerHTML = serverRange.value;
document.getElementById("designerNum").innerHTML = designerRange.value;

var maxPages = 5000;

//Update the current slider value for batch range slider (each time you drag the slider handle).
batchRange.oninput = function () {

    //Print new value to corresponding html id.
    document.getElementById("batchNum").innerHTML = Number(this.value).toLocaleString();

    //Make max slider range value for both Batch Range Slider and Immediate Range Slider equal to 5 Minutes Range Slider Current Value
    document.getElementById("hoursRange").setAttribute("max", this.value);
    document.getElementById("minutesRange").setAttribute("max", this.value);
    document.getElementById("hoursMinutesRangeMax").innerHTML = Number(this.value).toLocaleString();

    //Update prices
    var highlightScout = document.getElementById("tableIn");
    var highlightCustom = document.getElementById("product");

    //If range value is less than or equal to 60,000 -> highlight Scout table row and rever Custom table row
    if (this.value <= 60000) {
        highlightScout.style.backgroundColor = highlightColor;
        highlightCustom.style.backgroundColor = defaultColor;
    }

    //If range value is greater than 60,0000 -> highlight Custom table row and revert Scout table row
    else {
        highlightCustom.style.backgroundColor = highlightColor;
        highlightScout.style.backgroundColor = defaultColor;
    }

    windwardRecommendsPagesBatch(this.value);
    scoutPlan(this.value);
    payPerServer(this.value);
    maxPages = this.value;
    serverOrReport();
}

//Update the current slider value for immediate range slider (each time you drag the slider handle).
immediateRange.oninput = function () {

    //Print new value to corresponding html id.
    document.getElementById("immediateNum").innerHTML = Number(this.value).toLocaleString();

    //Make max slider range value for both Batch Range Slider and Immediate Range Slider equal to 5 Minutes Range Slider Current Value
    document.getElementById("hoursRange").setAttribute("max", this.value);
    document.getElementById("minutesRange").setAttribute("max", this.value);
    document.getElementById("hoursMinutesRangeMax").innerHTML = Number(this.value).toLocaleString();

    //Update prices
    var highlightScout = document.getElementById("tableIn");
    var highlightCustom = document.getElementById("product");

    //If range value is less than or equal to 60,000 -> highlight Scout table row and rever Custom table row
    if (this.value <= 60000) {
        highlightScout.style.backgroundColor = highlightColor;
        highlightCustom.style.backgroundColor = defaultColor;
    }

    //If range value is greater than 60,0000 -> highlight Custom table row and revert Scout table row
    else {
        highlightCustom.style.backgroundColor = highlightColor;
        highlightScout.style.backgroundColor = defaultColor;
    }

    windwardRecommendsPagesImmediate(this.value);
    scoutPlan(this.value);
    payPerServer(this.value);
    maxPages = this.value;
    serverOrReport();
}

//Update the current slider value for hours range slider (each time you drag the slider handle).
hoursRange.oninput = function () {

    //Print new value to corresponding html id.
    var output = document.getElementById("hoursNum");
    output.innerHTML = Number(this.value).toLocaleString();

    //Make max slider range value for both Batch Range Slider and Immediate Range Slider equal to 5 Minutes Range Slider Current Value
    document.getElementById("batchRange").setAttribute("min", this.value);
    document.getElementById("immediateRange").setAttribute("min", this.value);
    document.getElementById("immediateBatchRangeMin").innerHTML = Number(this.value).toLocaleString();
    document.getElementById("batchNum").innerHTML = Number(this.value).toLocaleString();
    document.getElementById("immediateNum").innerHTML = Number(this.value).toLocaleString();

    //Update prices
    var highlightScout = document.getElementById("tableIn");
    var highlightCustom = document.getElementById("product");

    //If range value is less than or equal to 60,000 -> highlight Scout table row and rever Custom table row
    if (this.value <= 60000) {
        highlightScout.style.backgroundColor = highlightColor;
        highlightCustom.style.backgroundColor = defaultColor;
    }

    //If range value is greater than 60,0000 -> highlight Custom table row and revert Scout table row
    else {
        highlightCustom.style.backgroundColor = highlightColor;
        highlightScout.style.backgroundColor = defaultColor;
    }

    windwardRecommendsPagesBatch(this.value);
}

//Update the current slider value for minute range slider (each time you drag the slider handle).
minutesRange.oninput = function () {

    //Print new value to corresponding html id.
    var output = document.getElementById("minNum");
    output.innerHTML = Number(this.value).toLocaleString();

    //Make max slider range value for both Batch Range Slider and Immediate Range Slider equal to 5 Minutes Range Slider Current Value
    document.getElementById("batchRange").setAttribute("min", this.value);
    document.getElementById("immediateRange").setAttribute("min", this.value);
    document.getElementById("immediateBatchRangeMin").innerHTML = Number(this.value).toLocaleString();
    document.getElementById("batchNum").innerHTML = Number(this.value).toLocaleString();
    document.getElementById("immediateNum").innerHTML = Number(this.value).toLocaleString();

    //Update prices
    var highlightScout = document.getElementById("tableIn");
    var highlightCustom = document.getElementById("product");

    //If range value is less than or equal to 60,000 -> highlight Scout table row and rever Custom table row
    if (this.value <= 60000) {
        highlightScout.style.backgroundColor = highlightColor;
        highlightCustom.style.backgroundColor = defaultColor;
    }

    //If range value is greater than 60,0000 -> highlight Custom table row and revert Scout table row
    else {
        highlightCustom.style.backgroundColor = highlightColor;
        highlightScout.style.backgroundColor = defaultColor;
    }

    windwardRecommendsPagesImmediate(this.value);
}

//Update the current slider value for server range slider (each time you drag the slider handle).
serverRange.oninput = function () {

    numServers = this.value;
    //updateServerPrices(numServers);

    //Print new value to corresponding html id.
    var output = document.getElementById("serverNum");
    output.innerHTML = this.value;

    payPerServer(maxPages);
}

//Update the current slider value for designer range slider (each time you drag the slider handle).
designerRange.oninput = function () {

    numDesigners = this.value;
    //updateNumDesigners(numDesigners);

    //Print new value to corresponding html id.
    var output = document.getElementById("designerNum");
    output.innerHTML = this.value;

    var checkBatch = document.getElementById("batch");
    var immediateNum = document.getElementById("immediateNum");
    var batchNum = document.getElementById("batchNum");

    if (checkBatch.checked) {
        windwardRecommendsPagesImmediate(maxPages);
    }
    else {
        windwardRecommendsPagesBatch(maxPages);
    }

    scoutPlan(maxPages);
    payPerServer(maxPages);
}

//Onload of the window, hide the batch range slider and the batch number. This way only the immediate range slider and immediate number is shown at first. Initialize any other values.
window.onload = function () {
    document.getElementById("hoursRange").style.display = "none";
    document.getElementById("hoursSlider").style.display = "none";
    document.getElementById("batchRange").style.display = "none";
    document.getElementById("batchNum").style.display = "none";
    document.getElementById("batchRange").setAttribute("min", 5000);
    document.getElementById("immediateRange").setAttribute("min", 5000);
    document.getElementById("hoursRange").setAttribute("max", 5000);
    document.getElementById("minutesRange").setAttribute("max", 5000);
    document.getElementById("hoursMinutesRangeMax").innerHTML = "5,000";
    document.getElementById("immediateBatchRangeMin").innerHTML = "5,000";
    windwardRecommendsPagesImmediate(immediateRange.value);

    document.getElementById("scoutDesigners").innerHTML = numDesigners;
    document.getElementById("designersScoutMonthly").innerHTML = "$" + pricePerDesignerMonthly;
    document.getElementById("designersScoutQuarterly").innerHTML = "$" + pricePerDesignerQuarterly;
    document.getElementById("designersScoutAnnually").innerHTML = "$" + pricePerDesignerAnnually;
    document.getElementById("scoutTotalMonthly").innerHTML = "$" + scoutTotalMonthly_Bronze.toLocaleString();
    document.getElementById("scoutTotalQuarterly").innerHTML = "$" + scoutTotalQuarterly_Bronze.toLocaleString();
    document.getElementById("scoutTotalAnnually").innerHTML = "$" + scoutTotalAnnually_Bronze.toLocaleString();

    document.getElementById("customDesigners").innerHTML = numDesigners;
    document.getElementById("customServers").innerHTML = numServers;
    document.getElementById("customCores").innerHTML = 2;
    document.getElementById("coresCustomMonthly").innerHTML = "$" + customTotalMonthly_2Cores.toLocaleString();
    document.getElementById("coresCustomQuarterly").innerHTML = "$" + customTotalMonthly_2Cores.toLocaleString();
    document.getElementById("coresCustomAnnually").innerHTML = "$" + customTotalAnnually_2Cores.toLocaleString();
    document.getElementById("designersCustomMonthly").innerHTML = "$" + (numDesigners * pricePerDesignerMonthly).toLocaleString();
    document.getElementById("designersCustomQuarterly").innerHTML = "$" + (numDesigners * pricePerDesignerQuarterly).toLocaleString();
    document.getElementById("designersCustomAnnually").innerHTML = "$" + (numDesigners * pricePerDesignerAnnually).toLocaleString();
    document.getElementById("serversCustomMonthly").innerHTML = "$" + (numServers * (customTotalMonthly_2Cores + (numDesigners * designerPriceMonthly))).toLocaleString();
    document.getElementById("serversCustomQuarterly").innerHTML = "$" + (numServers * (customTotalQuarterly_2Cores + (numDesigners * designerPriceQuarterly))).toLocaleString();
    document.getElementById("serversCustomAnnually").innerHTML = "$" + (numServers * (customTotalAnnually_2Cores + (numDesigners * designerPriceMonthly))).toLocaleString();
    document.getElementById("customTotalMonthly").innerHTML = "$" + (numServers * (customTotalMonthly_2Cores + numDesigners * pricePerDesignerMonthly)).toLocaleString();
    document.getElementById("customTotalQuarterly").innerHTML = "$" + (numServers * (customTotalQuarterly_2Cores + numDesigners * pricePerDesignerQuarterly)).toLocaleString();
    document.getElementById("customTotalAnnually").innerHTML = "$" + (numServers * (customTotalAnnually_2Cores + numDesigners * pricePerDesignerAnnually)).toLocaleString();
    document.getElementById("coresCustomMonthly").innerHTML = "$" + customTotalMonthly_2Cores.toLocaleString();
    document.getElementById("coresCustomQuarterly").innerHTML = "$" + customTotalQuarterly_2Cores.toLocaleString();
    document.getElementById("coresCustomAnnually").innerHTML = "$" + customTotalAnnually_2Cores.toLocaleString();
    document.getElementById("customTotalMonthly").innerHTML = "$" + (customTotalMonthly_2Cores + pricePerDesignerMonthly).toLocaleString();
    document.getElementById("customTotalQuarterly").innerHTML = "$" + (customTotalQuarterly_2Cores + pricePerDesignerQuarterly).toLocaleString();
    document.getElementById("customTotalAnnually").innerHTML = "$" + (customTotalAnnually_2Cores + pricePerDesignerAnnually).toLocaleString();
};

//Hide/Show the batch range slider and hide/show the immediate range slider.
function showDivBatch() {

    //Initialize variables from HTML side.
    var checkBatch = document.getElementById("batch");
    var batchRange = document.getElementById("batchRange");
    var immediateRange = document.getElementById("immediateRange");
    var immediateNum = document.getElementById("immediateNum");
    var batchNum = document.getElementById("batchNum");
    var hoursSlider = document.getElementById("hoursSlider");
    var hoursSliderRange = document.getElementById("hoursRange");
    var hoursSliderNum = document.getElementById("hoursNum");
    var minutesSlider = document.getElementById("minutesSlider");
    var minutesSliderRange = document.getElementById("minutesRange");

    //Depending on which radio button is checked, immediate vs batch, show the corresponding range slider and value of the range slider
    batchRange.style.display = checkBatch.checked ? "block" : "none";
    batchNum.style.display = checkBatch.checked ? "inline-block" : "none";
    immediateRange.style.display = checkBatch.checked ? "none" : "block";
    immediateNum.style.display = checkBatch.checked ? "none" : "inline-block";
    hoursSlider.style.display = checkBatch.checked ? "block" : "none";
    hoursSliderRange.style.display = checkBatch.checked ? "block" : "none";
    hoursSliderNum.style.display = checkBatch.checked ? "inline-block" : "none";
    minutesSlider.style.display = checkBatch.checked ? "none" : "block";
    minutesSliderRange.style.display = checkBatch.checked ? "none" : "block";

    if (checkBatch.checked) {
        windwardRecommendsPagesImmediate(immediateNum);
    }
    else {
        windwardRecommendsPagesBatch(batchNum);
    }
}

//Update the server prices within the table depending on current number of servers selected
/*function updateServerPrices(numCurServers) {
	
	//Find the table that will be getting updated
	var tableIn = document.getElementById("tableIn");
	
	//Calculate prices based on Monthly/Quarterly/Annually Prices * the current number of servers selected
	serverPriceMonthly = numCurServers * pricePerServerMonthly;
	serverPriceQuarterly = numCurServers * pricePerServerQuarterly;
	serverPriceAnnually = numCurServers * pricePerServerAnnually;
	
	//Update all table values that involved servers
	document.getElementById("serversScoutMonthly").innerHTML = "$" + serverPriceMonthly.toLocaleString();
	document.getElementById("serversScoutQuarterly").innerHTML = "$" + serverPriceQuarterly.toLocaleString();
	document.getElementById("serversScoutAnnually").innerHTML = "$" + serverPriceAnnually.toLocaleString();
	document.getElementById("serversCustomMonthly").innerHTML = "$" + serverPriceMonthly.toLocaleString();
	document.getElementById("serversCustomQuarterly").innerHTML = "$" + serverPriceQuarterly.toLocaleString();
    document.getElementById("serversCustomAnnually").innerHTML = "$" + serverPriceAnnually.toLocaleString();
    
	//Update total price of that column + row
	updateTotal();
}*/

//Update the designer prices within the table depending on the current number of designers selected
/*function updateNumDesigners(numCurDesigner) {
    
	//Find the table that will be getting updated
	var tableIn = document.getElementById("tableIn");
	//Calculate prices based on Monthly/Quarterly/Annually Prices * the current number of designers selected
	//designerPriceMonthly = numCurDesigner * pricePerDesignerMonthly;
	//designerPriceQuarterly = numCurDesigner * pricePerDesignerQuarterly;
	//designerPriceAnnually = numCurDesigner * pricePerDesignerAnnually;
	//Update all table values that involved designers
	document.getElementById("designersScoutMonthly").innerHTML = numCurDesigner;
    document.getElementById("designersScoutQuarterly").innerHTML = numCurDesigner;
    document.getElementById("designersScoutAnnually").innerHTML = numCurDesigner;
    document.getElementById("designersCustomMonthly").innerHTML = numCurDesigner;
    document.getElementById("designersCustomQuarterly").innerHTML = numCurDesigner;
    document.getElementById("designersCustomAnnually").innerHTML = numCurDesigner;
}*/

//Update all the total prices of each column + row
function updateTotal() {
    document.getElementById("scoutTotalMonthly").innerHTML = "$" + (designerPriceMonthly + serverPriceMonthly).toLocaleString();
    document.getElementById("scoutTotalQuarterly").innerHTML = "$" + (designerPriceQuarterly + serverPriceQuarterly).toLocaleString();
    document.getElementById("scoutTotalAnnually").innerHTML = "$" + (designerPriceAnnually + serverPriceAnnually).toLocaleString();
    document.getElementById("customTotalMonthly").innerHTML = "$" + (designerPriceMonthly + serverPriceMonthly).toLocaleString();
    document.getElementById("customTotalQuarterly").innerHTML = "$" + (designerPriceQuarterly + serverPriceQuarterly).toLocaleString();
    document.getElementById("customTotalAnnually").innerHTML = "$" + (designerPriceAnnually + serverPriceAnnually).toLocaleString();

    //Call function that determines if we have a better configuration for users selected number of designers and servers
    //windwardRecommends();
}

//Determine if there is a better configuration for users selected number of designers and servers
//Hide Windward Recommends Row if users current configuration is acceptable
/*function windwardRecommends() {
	
	//JavaScript doesn't support casting to Floats so by setting the fixed decimal places to 2,
	//I am able to make my own Float
	var num = (numServers / numDesigners).toFixed(2);
	if(num > 1.00) {
		document.getElementById("windwardRecommended").style.display = "table-row";
		document.getElementById("windwardRecommendedServers").innerHTML = 1;
		document.getElementById("windwardRecommendedDesigners").innerHTML = numDesigners;
		document.getElementById("windwardDesignerPriceMonthly").innerHTML = "$" + (numDesigners * pricePerDesignerMonthly).toLocaleString();
		document.getElementById("windwardDesignerPriceQuarterly").innerHTML = "$" + (numDesigners * pricePerDesignerQuarterly).toLocaleString();
		document.getElementById("windwardDesignerPriceAnnually").innerHTML = "$" + (numDesigners * pricePerDesignerAnnually).toLocaleString();
		document.getElementById("windwardServerPriceMonthly").innerHTML = "$" + (pricePerServerMonthly).toLocaleString();
		document.getElementById("windwardServerPriceQuarterly").innerHTML = "$" + (pricePerServerQuarterly).toLocaleString();
		document.getElementById("windwardServerPriceAnnually").innerHTML = "$" + (pricePerServerAnnually).toLocaleString();
		document.getElementById("windwardTotalPriceMonthly").innerHTML = "$" + ((numDesigners * pricePerDesignerMonthly) + pricePerServerMonthly).toLocaleString(); 
		document.getElementById("windwardTotalPriceQuarterly").innerHTML = "$" + ((numDesigners * pricePerDesignerMonthly) + pricePerServerQuarterly).toLocaleString();
		document.getElementById("windwardTotalPriceAnnually").innerHTML = "$" + ((numDesigners * pricePerDesignerAnnually) + pricePerServerAnnually).toLocaleString();
	}
	else if(num >= 0.2 || Math.floor(numDesigners / 4) == 0) {
		document.getElementById("windwardRecommended").style.display = "none";
	}
	else {
		var numServers = Math.floor(numDesigners / 4);
		
		//Only have even number of servers on server range slider so do the same thing with the recommendation
		//No odd amount of servers
		numServers % 2 == 0 ? numServers : numServers += 1;
		
		document.getElementById("windwardRecommended").style.display = "table-row";
		document.getElementById("windwardRecommendedServers").innerHTML = numServers;
		document.getElementById("windwardRecommendedDesigners").innerHTML = numServers * 4;
		document.getElementById("windwardDesignerPriceMonthly").innerHTML = "$" + (numDesigners * pricePerDesignerMonthly).toLocaleString();
		document.getElementById("windwardDesignerPriceQuarterly").innerHTML = "$" + (numDesigners * pricePerDesignerQuarterly).toLocaleString();
		document.getElementById("windwardDesignerPriceAnnually").innerHTML = "$" + (numDesigners * pricePerDesignerAnnually).toLocaleString();
		document.getElementById("windwardServerPriceMonthly").innerHTML = "$" + (numServers * pricePerServerMonthly).toLocaleString();
		document.getElementById("windwardServerPriceQuarterly").innerHTML = "$" + (numServers * pricePerServerQuarterly).toLocaleString();
		document.getElementById("windwardServerPriceAnnually").innerHTML = "$" + (numServers * pricePerServerAnnually).toLocaleString();
		document.getElementById("windwardTotalPriceMonthly").innerHTML = "$" + ((numDesigners * pricePerDesignerMonthly) + (numServers * pricePerServerMonthly)).toLocaleString();
		document.getElementById("windwardTotalPriceQuarterly").innerHTML = "$" + ((numDesigners * pricePerDesignerQuarterly) + (numServers * pricePerServerQuarterly)).toLocaleString();
		document.getElementById("windwardTotalPriceAnnually").innerHTML = "$" + ((numDesigners * pricePerDesignerAnnually) + (numServers * pricePerServerAnnually)).toLocaleString();
	}
}*/

//Display Windward Recommends Table Row with updated prices, number of servers, and number of designers
function displayWindwardRecommends(servers, designers, cores) {
    document.getElementById("windwardRecommended").style.display = "table-row";
    document.getElementById("windwardRecommendedServers").innerHTML = servers;
    document.getElementById("windwardRecommendedDesigners").innerHTML = designers;
    document.getElementById("windwardRecommendedCores").innerHTML = cores;
    document.getElementById("windwardDesignerPriceMonthly").innerHTML = "$" + (designers * pricePerDesignerMonthly).toLocaleString();
    document.getElementById("windwardDesignerPriceQuarterly").innerHTML = "$" + (designers * pricePerDesignerQuarterly).toLocaleString();
    document.getElementById("windwardDesignerPriceAnnually").innerHTML = "$" + (designers * pricePerDesignerAnnually).toLocaleString();

    if (cores == 2) {
        document.getElementById("windwardCorePriceMonthly").innerHTML = "$" + customTotalMonthly_2Cores.toLocaleString();
        document.getElementById("windwardCorePriceQuarterly").innerHTML = "$" + customTotalQuarterly_2Cores.toLocaleString();
        document.getElementById("windwardCorePriceAnnually").innerHTML = "$" + customTotalAnnually_2Cores.toLocaleString();
        document.getElementById("windwardServerPriceMonthly").innerHTML = "$" + (servers * (customTotalMonthly_2Cores + (designers * designerPriceMonthly))).toLocaleString();
        document.getElementById("windwardServerPriceQuarterly").innerHTML = "$" + (servers * (customTotalQuarterly_2Cores + (designers * designerPriceQuarterly))).toLocaleString();
        document.getElementById("windwardServerPriceAnnually").innerHTML = "$" + (servers * (customTotalAnnually_2Cores + (designers * designerPriceAnnually))).toLocaleString();
        document.getElementById("windwardTotalPriceMonthly").innerHTML = "$" + (servers * (designers * pricePerDesignerMonthly + customTotalMonthly_2Cores)).toLocaleString();
        document.getElementById("windwardTotalPriceQuarterly").innerHTML = "$" + (servers * (designers * pricePerDesignerQuarterly + customTotalQuarterly_2Cores)).toLocaleString();
        document.getElementById("windwardTotalPriceAnnually").innerHTML = "$" + (servers * (designers * pricePerDesignerAnnually + customTotalAnnually_2Cores)).toLocaleString();
    }
    else if (cores == 4) {
        document.getElementById("windwardCorePriceMonthly").innerHTML = "$" + customTotalMonthly_4Cores.toLocaleString();
        document.getElementById("windwardCorePriceQuarterly").innerHTML = "$" + customTotalQuarterly_4Cores.toLocaleString();
        document.getElementById("windwardCorePriceAnnually").innerHTML = "$" + customTotalAnnually_4Cores.toLocaleString();
        document.getElementById("windwardServerPriceMonthly").innerHTML = "$" + (servers * (customTotalMonthly_4Cores + (designers * designerPriceMonthly))).toLocaleString();
        document.getElementById("windwardServerPriceQuarterly").innerHTML = "$" + (servers * (customTotalQuarterly_4Cores + (designers * designerPriceQuarterly))).toLocaleString();
        document.getElementById("windwardServerPriceAnnually").innerHTML = "$" + (servers * (customTotalAnnually_4Cores + (designers * designerPriceAnnually))).toLocaleString();
        document.getElementById("windwardTotalPriceMonthly").innerHTML = "$" + (servers * (designers * pricePerDesignerMonthly + customTotalMonthly_4Cores)).toLocaleString();
        document.getElementById("windwardTotalPriceQuarterly").innerHTML = "$" + (servers * (designers * pricePerDesignerQuarterly + customTotalQuarterly_4Cores)).toLocaleString();
        document.getElementById("windwardTotalPriceAnnually").innerHTML = "$" + (servers * (designers * pricePerDesignerAnnually + customTotalAnnually_4Cores)).toLocaleString();
    }
    else if (cores == 6) {
        document.getElementById("windwardCorePriceMonthly").innerHTML = "$" + customTotalMonthly_6Cores.toLocaleString();
        document.getElementById("windwardCorePriceQuarterly").innerHTML = "$" + customTotalQuarterly_6Cores.toLocaleString();
        document.getElementById("windwardCorePriceAnnually").innerHTML = "$" + customTotalAnnually_6Cores.toLocaleString();
        document.getElementById("windwardServerPriceMonthly").innerHTML = "$" + (servers * (customTotalMonthly_6Cores + (designers * designerPriceMonthly))).toLocaleString();
        document.getElementById("windwardServerPriceQuarterly").innerHTML = "$" + (servers * (customTotalQuarterly_6Cores + (designers * designerPriceQuarterly))).toLocaleString();
        document.getElementById("windwardServerPriceAnnually").innerHTML = "$" + (servers * (customTotalAnnually_6Cores + (designers * designerPriceAnnually))).toLocaleString();
        document.getElementById("windwardTotalPriceMonthly").innerHTML = "$" + (servers * (designers * pricePerDesignerMonthly + customTotalMonthly_6Cores)).toLocaleString();
        document.getElementById("windwardTotalPriceQuarterly").innerHTML = "$" + (servers * (designers * pricePerDesignerQuarterly + customTotalQuarterly_6Cores)).toLocaleString();
        document.getElementById("windwardTotalPriceAnnually").innerHTML = "$" + (servers * (designers * pricePerDesignerAnnually + customTotalAnnually_6Cores)).toLocaleString();
    }
    else {
        document.getElementById("windwardCorePriceMonthly").innerHTML = "$" + customTotalMonthly_8Cores.toLocaleString();
        document.getElementById("windwardCorePriceQuarterly").innerHTML = "$" + customTotalQuarterly_8Cores.toLocaleString();
        document.getElementById("windwardCorePriceAnnually").innerHTML = "$" + customTotalAnnually_8Cores.toLocaleString();
        document.getElementById("windwardServerPriceMonthly").innerHTML = "$" + (servers * (customTotalMonthly_8Cores + (designers * designerPriceMonthly))).toLocaleString();
        document.getElementById("windwardServerPriceQuarterly").innerHTML = "$" + (servers * (customTotalQuarterly_8Cores + (designers * designerPriceQuarterly))).toLocaleString();
        document.getElementById("windwardServerPriceAnnually").innerHTML = "$" + (servers * (customTotalAnnually_8Cores + (designers * designerPriceAnnually))).toLocaleString();
        document.getElementById("windwardTotalPriceMonthly").innerHTML = "$" + (servers * (designers * pricePerDesignerMonthly + customTotalMonthly_8Cores)).toLocaleString();
        document.getElementById("windwardTotalPriceQuarterly").innerHTML = "$" + (servers * (designers * pricePerDesignerQuarterly + customTotalQuarterly_8Cores)).toLocaleString();
        document.getElementById("windwardTotalPriceAnnually").innerHTML = "$" + (servers * (designers * pricePerDesignerAnnually + customTotalAnnually_8Cores)).toLocaleString();
    }
}

//Based off of users current selection of pages per month, determine optimal number of servers/designers
function windwardRecommendsPagesImmediate(pagesImmediate) {
    var servers = 0;
    var designers = numDesigners;
    var cores = 0;

    if (pagesImmediate <= 50000) {
        servers = 1;
        cores = 2;
    }
    else if (pagesImmediate <= 200000) {
        servers = 1;
        cores = 4;
    }
    else if (pagesImmediate <= 300000) {
        servers = 2;
        cores = 6;
    }
    else {
        servers = 2;
        cores = 8;
    }

    displayWindwardRecommends(servers, designers, cores);
}

//Based off of users current selection of pages per month, determine optimal number of servers/designers
function windwardRecommendsPagesBatch(pagesBatch) {
    var servers = 0;
    var designers = numDesigners;
    var cores = 0;

    if (pagesBatch <= 50000) {
        servers = 1;
        cores = 2;
    }
    else if (pagesBatch <= 100000) {
        servers = 1;
        cores = 4;
    }
    else if (pagesBatch <= 400000) {
        servers = 2;
        cores = 6;
    }
    else if (pagesBatch <= 500000) {
        servers = 2;
        cores = 8;
    }

    displayWindwardRecommends(servers, designers, cores);
}

//If total number of pages is within any of these values, change the scout plan accordingly
function scoutPlan(maxPages) {
    if (maxPages <= 5000) {
        document.getElementById("scoutPlan").innerHTML = "Bronze Plan";
        document.getElementById("scoutDesigners").innerHTML = numDesigners;
        document.getElementById("designersScoutMonthly").innerHTML = "$" + (numDesigners * pricePerDesignerMonthly).toLocaleString();
        document.getElementById("designersScoutQuarterly").innerHTML = "$" + (numDesigners * pricePerDesignerQuarterly).toLocaleString();
        document.getElementById("designersScoutAnnually").innerHTML = "$" + (numDesigners * pricePerDesignerAnnually).toLocaleString();
        document.getElementById("scoutTotalMonthly").innerHTML = "$" + (scoutTotalMonthly_Bronze + (numDesigners - 1) * pricePerDesignerMonthly).toLocaleString();
        document.getElementById("scoutTotalQuarterly").innerHTML = "$" + (scoutTotalQuarterly_Bronze + (numDesigners - 1) * pricePerDesignerQuarterly).toLocaleString();
        document.getElementById("scoutTotalAnnually").innerHTML = "$" + (scoutTotalAnnually_Bronze + (numDesigners - 1) * pricePerDesignerAnnually).toLocaleString();
    }
    else if (maxPages <= 15000) {
        document.getElementById("scoutPlan").innerHTML = "Silver Plan";
        document.getElementById("scoutDesigners").innerHTML = numDesigners;
        document.getElementById("designersScoutMonthly").innerHTML = "$" + (numDesigners * pricePerDesignerMonthly).toLocaleString();
        document.getElementById("designersScoutQuarterly").innerHTML = "$" + (numDesigners * pricePerDesignerQuarterly).toLocaleString();
        document.getElementById("designersScoutAnnually").innerHTML = "$" + (numDesigners * pricePerDesignerAnnually).toLocaleString();
        document.getElementById("scoutTotalMonthly").innerHTML = "$" + (scoutTotalMonthly_Silver + (numDesigners - 1) * pricePerDesignerMonthly).toLocaleString();
        document.getElementById("scoutTotalQuarterly").innerHTML = "$" + (scoutTotalQuarterly_Silver + (numDesigners - 1) * pricePerDesignerQuarterly).toLocaleString();
        document.getElementById("scoutTotalAnnually").innerHTML = "$" + (scoutTotalAnnually_Silver + (numDesigners - 1) * pricePerDesignerAnnually).toLocaleString();
    }
    else if (maxPages <= 30000) {
        document.getElementById("scoutPlan").innerHTML = "Gold Plan";
        document.getElementById("scoutDesigners").innerHTML = numDesigners;
        document.getElementById("designersScoutMonthly").innerHTML = "$" + (numDesigners * pricePerDesignerMonthly).toLocaleString();
        document.getElementById("designersScoutQuarterly").innerHTML = "$" + (numDesigners * pricePerDesignerQuarterly).toLocaleString();
        document.getElementById("designersScoutAnnually").innerHTML = "$" + (numDesigners * pricePerDesignerAnnually).toLocaleString();
        document.getElementById("scoutTotalMonthly").innerHTML = "$" + (scoutTotalMonthly_Gold + (numDesigners - 1) * pricePerDesignerMonthly).toLocaleString();
        document.getElementById("scoutTotalQuarterly").innerHTML = "$" + (scoutTotalQuarterly_Gold + (numDesigners - 1) * pricePerDesignerQuarterly).toLocaleString();
        document.getElementById("scoutTotalAnnually").innerHTML = "$" + (scoutTotalAnnually_Gold + (numDesigners - 1) * pricePerDesignerAnnually).toLocaleString();
    }
    else {
        document.getElementById("scoutPlan").innerHTML = "Platinum Plan";
        document.getElementById("scoutDesigners").innerHTML = numDesigners;
        document.getElementById("designersScoutMonthly").innerHTML = "$" + (numDesigners * pricePerDesignerMonthly).toLocaleString();
        document.getElementById("designersScoutQuarterly").innerHTML = "$" + (numDesigners * pricePerDesignerQuarterly).toLocaleString();
        document.getElementById("designersScoutAnnually").innerHTML = "$" + (numDesigners * pricePerDesignerAnnually).toLocaleString();
        document.getElementById("scoutTotalMonthly").innerHTML = "$" + (scoutTotalMonthly_Platinum + (numDesigners - 1) * pricePerDesignerMonthly).toLocaleString();
        document.getElementById("scoutTotalQuarterly").innerHTML = "$" + (scoutTotalQuarterly_Platinum + (numDesigners - 1) * pricePerDesignerQuarterly).toLocaleString();
        document.getElementById("scoutTotalAnnually").innerHTML = "$" + (scoutTotalAnnually_Platinum + (numDesigners - 1) * pricePerDesignerAnnually).toLocaleString();
    }
}

function payPerServer(maxPages) {
    if (maxPages <= 60000) {
        document.getElementById("customDesigners").innerHTML = numDesigners;
        document.getElementById("customServers").innerHTML = numServers;
        document.getElementById("customCores").innerHTML = 2;
        document.getElementById("coresCustomMonthly").innerHTML = "$" + customTotalMonthly_2Cores.toLocaleString();
        document.getElementById("coresCustomQuarterly").innerHTML = "$" + customTotalQuarterly_2Cores.toLocaleString();
        document.getElementById("coresCustomAnnually").innerHTML = "$" + customTotalAnnually_2Cores.toLocaleString();
        document.getElementById("designersCustomMonthly").innerHTML = "$" + (numDesigners * pricePerDesignerMonthly).toLocaleString();
        document.getElementById("designersCustomQuarterly").innerHTML = "$" + (numDesigners * pricePerDesignerQuarterly).toLocaleString();
        document.getElementById("designersCustomAnnually").innerHTML = "$" + (numDesigners * pricePerDesignerAnnually).toLocaleString();
        document.getElementById("serversCustomMonthly").innerHTML = "$" + (numServers * (customTotalMonthly_2Cores + (numDesigners * designerPriceMonthly))).toLocaleString();
        document.getElementById("serversCustomQuarterly").innerHTML = "$" + (numServers * (customTotalQuarterly_2Cores + (numDesigners * designerPriceQuarterly))).toLocaleString();
        document.getElementById("serversCustomAnnually").innerHTML = "$" + (numServers * (customTotalAnnually_2Cores + (numDesigners * designerPriceMonthly))).toLocaleString();
        document.getElementById("customTotalMonthly").innerHTML = "$" + (numServers * (customTotalMonthly_2Cores + numDesigners * pricePerDesignerMonthly)).toLocaleString();
        document.getElementById("customTotalQuarterly").innerHTML = "$" + (numServers * (customTotalQuarterly_2Cores + numDesigners * pricePerDesignerQuarterly)).toLocaleString();
        document.getElementById("customTotalAnnually").innerHTML = "$" + (numServers * (customTotalAnnually_2Cores + numDesigners * pricePerDesignerAnnually)).toLocaleString();
    }
    else if (maxPages <= 100000) {
        document.getElementById("customDesigners").innerHTML = numDesigners;
        document.getElementById("customServers").innerHTML = numServers;
        document.getElementById("customCores").innerHTML = 4;
        document.getElementById("coresCustomMonthly").innerHTML = "$" + customTotalMonthly_4Cores.toLocaleString();
        document.getElementById("coresCustomQuarterly").innerHTML = "$" + customTotalQuarterly_4Cores.toLocaleString();
        document.getElementById("coresCustomAnnually").innerHTML = "$" + customTotalAnnually_4Cores.toLocaleString();
        document.getElementById("designersCustomMonthly").innerHTML = "$" + (numDesigners * pricePerDesignerMonthly).toLocaleString();
        document.getElementById("designersCustomQuarterly").innerHTML = "$" + (numDesigners * pricePerDesignerQuarterly).toLocaleString();
        document.getElementById("designersCustomAnnually").innerHTML = "$" + (numDesigners * pricePerDesignerAnnually).toLocaleString();
        document.getElementById("serversCustomMonthly").innerHTML = "$" + (numServers * (customTotalMonthly_4Cores + (numDesigners * designerPriceMonthly))).toLocaleString();
        document.getElementById("serversCustomQuarterly").innerHTML = "$" + (numServers * (customTotalQuarterly_4Cores + (numDesigners * designerPriceQuarterly))).toLocaleString();
        document.getElementById("serversCustomAnnually").innerHTML = "$" + (numServers * (customTotalAnnually_4Cores + (numDesigners * designerPriceMonthly))).toLocaleString();
        document.getElementById("customTotalMonthly").innerHTML = "$" + (numServers * (customTotalMonthly_4Cores + numDesigners * pricePerDesignerMonthly)).toLocaleString();
        document.getElementById("customTotalQuarterly").innerHTML = "$" + (numServers * (customTotalQuarterly_4Cores + numDesigners * pricePerDesignerQuarterly)).toLocaleString();
        document.getElementById("customTotalAnnually").innerHTML = "$" + (numServers * (customTotalAnnually_4Cores + numDesigners * pricePerDesignerAnnually)).toLocaleString();
    }
    else if (maxPages <= 300000) {
        document.getElementById("customDesigners").innerHTML = numDesigners;
        document.getElementById("customServers").innerHTML = numServers;
        document.getElementById("customCores").innerHTML = 6;
        document.getElementById("coresCustomMonthly").innerHTML = "$" + customTotalMonthly_6Cores.toLocaleString();
        document.getElementById("coresCustomQuarterly").innerHTML = "$" + customTotalQuarterly_6Cores.toLocaleString();
        document.getElementById("coresCustomAnnually").innerHTML = "$" + customTotalAnnually_6Cores.toLocaleString();
        document.getElementById("designersCustomMonthly").innerHTML = "$" + (numDesigners * pricePerDesignerMonthly).toLocaleString();
        document.getElementById("designersCustomQuarterly").innerHTML = "$" + (numDesigners * pricePerDesignerQuarterly).toLocaleString();
        document.getElementById("designersCustomAnnually").innerHTML = "$" + (numDesigners * pricePerDesignerAnnually).toLocaleString();
        document.getElementById("serversCustomMonthly").innerHTML = "$" + (numServers * (customTotalMonthly_6Cores + (numDesigners * designerPriceMonthly))).toLocaleString();
        document.getElementById("serversCustomQuarterly").innerHTML = "$" + (numServers * (customTotalQuarterly_6Cores + (numDesigners * designerPriceQuarterly))).toLocaleString();
        document.getElementById("serversCustomAnnually").innerHTML = "$" + (numServers * (customTotalAnnually_6Cores + (numDesigners * designerPriceMonthly))).toLocaleString();
        document.getElementById("customTotalMonthly").innerHTML = "$" + (numServers * (customTotalMonthly_6Cores + numDesigners * pricePerDesignerMonthly)).toLocaleString();
        document.getElementById("customTotalQuarterly").innerHTML = "$" + (numServers * (customTotalQuarterly_6Cores + numDesigners * pricePerDesignerQuarterly)).toLocaleString();
        document.getElementById("customTotalAnnually").innerHTML = "$" + (numServers * (customTotalAnnually_6Cores + numDesigners * pricePerDesignerAnnually)).toLocaleString();

    }
    else if (maxPages <= 500000) {
        document.getElementById("customDesigners").innerHTML = numDesigners;
        document.getElementById("customServers").innerHTML = numServers;
        document.getElementById("customCores").innerHTML = 8;
        document.getElementById("coresCustomMonthly").innerHTML = "$" + customTotalMonthly_8Cores.toLocaleString();
        document.getElementById("coresCustomQuarterly").innerHTML = "$" + customTotalQuarterly_8Cores.toLocaleString();
        document.getElementById("coresCustomAnnually").innerHTML = "$" + customTotalAnnually_8Cores.toLocaleString();
        document.getElementById("designersCustomMonthly").innerHTML = "$" + (numDesigners * pricePerDesignerMonthly).toLocaleString();
        document.getElementById("designersCustomQuarterly").innerHTML = "$" + (numDesigners * pricePerDesignerQuarterly).toLocaleString();
        document.getElementById("designersCustomAnnually").innerHTML = "$" + (numDesigners * pricePerDesignerAnnually).toLocaleString();
        document.getElementById("serversCustomMonthly").innerHTML = "$" + (numServers * (customTotalMonthly_8Cores + (numDesigners * designerPriceMonthly))).toLocaleString();
        document.getElementById("serversCustomQuarterly").innerHTML = "$" + (numServers * (customTotalQuarterly_8Cores + (numDesigners * designerPriceQuarterly))).toLocaleString();
        document.getElementById("serversCustomAnnually").innerHTML = "$" + (numServers * (customTotalAnnually_8Cores + (numDesigners * designerPriceMonthly))).toLocaleString();
        document.getElementById("customTotalMonthly").innerHTML = "$" + (numServers * (customTotalMonthly_8Cores + numDesigners * pricePerDesignerMonthly)).toLocaleString();
        document.getElementById("customTotalQuarterly").innerHTML = "$" + (numServers * (customTotalQuarterly_8Cores + numDesigners * pricePerDesignerQuarterly)).toLocaleString();
        document.getElementById("customTotalAnnually").innerHTML = "$" + (numServers * (customTotalAnnually_8Cores + numDesigners * pricePerDesignerAnnually)).toLocaleString();
    }
}

//Calculate whether paying per report or paying per server is cheaper and whichever option is cheaper display it
function serverOrReport() {
    if (maxPages <= 60000) {
        document.getElementById("serverOrReport").innerHTML = "Pay Per Report";
    }
    else {
        document.getElementById("serverOrReport").innerHTML = "Pay Per Server";
    }
}