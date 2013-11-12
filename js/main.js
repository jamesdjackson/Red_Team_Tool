<!--James Jackson-->
<!--ASD 1306-->
<!--Project 1-->

$('#splash').on('pageinit', function(){
});

$('#JobDataItems').on('pageinit', function(){
});

$('#newJob').on('pageshow', function(){
	var thisDate = new Date();
    var month = thisDate.getMonth() + 1;
    var dateVal = thisDate.getFullYear() + '-' + month + '-' + thisDate.getDate();
    $("#JobDate").val(dateVal);
    if ($("#additionalData").val()){
    	$('#addonData').show();
    } else {
    	$('#addonData').hide();
    }
    $('#JobType').change(function() {
		console.log("fired");
		if ($("#JobType").val() === "Custom") {
			$('#addonData').show();

		} else {
			$('#addonData').hide();

		}
	});

var JobEnumerator;
	var myForm = $('#testForm'),
		errorsLink = $("#errorsLink");
    var inputCheck;
    inputCheck = myForm.validate({
        required:{
            "JobList":{
                required:true
            },
            custom:{
                required:function (element) {
                    return ($("#JobType").val() === "Job Type");
                }
            }
        },
        messages:{
            qty:{ min:jQuery.format("Greater than {0}") }
        },

        invalidHandler:function (form, inputCheck) {
            errorsLink.click();
            var html = "";
            for (var key in inputCheck.submitted) {
                var label = $('label[for^="' + key + '"]').not("[generated]");
                var legend = label.closest("fieldset").find(".ui-controlgroup-label");
                var fieldName = legend.length ? legend.text() : label.text();
                html += "<li>" + fieldName + "</li>";
            }
            $("#formErrors").find("ul").html(html);
        },
        submitHandler:function (form) {
            storeData($("#testID").val());
            form.reset();
            testSequence();
        }
    });
	$(".reset").on('click',function() {
		window.location.reload();
	});
	testSequence($("#testID").val());
	$("#clearData").on('click',function() {
		clearLocal();
		window.location.reload();
	});
});

$(document).on( "pagebeforechange", function( e, data ) {
	if ( typeof data.toPage === "string" ) {
		var u = $.mobile.path.parseUrl( data.toPage ),
			re = /^#JobDataItems/;
		if ( u.hash.search(re) !== -1 ) {
			getJobs( u, data.options );
			e.preventDefault();
		}
	}
});

var fakeJobs = function (){
	for(var n in json){
		var id = n;
		localStorage.setItem(id, JSON.stringify(json[n]));
	}
};

var getJobs = function( urlObj, options ){
	var categoryName = urlObj.hash.replace( /.*category=/, "" ),
		pageSelector = urlObj.hash.replace( /\?.*$/, "" ),
		$page = $( pageSelector ),
		$header = $page.children( ":jqmData(role=header)" ),
		$content = $page.children( ":jqmData(role=content)" );
		structure = "<div id='Jobs' data-role='collapsible-set' data-content-theme='b'>",
		semantics = "";
		console.log("cat: " + categoryName);
		console.log("page: " + pageSelector);
	if (localStorage.length === 1 && localStorage.getItem("jobNumber")){
		alert("Adding notional Job data.");
		fakeJobs();
	}

var JobSerializer = [];
	for(var i = 0, j = localStorage.length; i < j; i++){
		if(Number(localStorage.key(i))/1 === Number(localStorage.key(i))){
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			var localData = JSON.parse(value);
			var editLink = "<div class='ui-grid-a'><div class='ui-block-a'><a class='edit' data-role='button' data-theme='b' data-icon='plus' href='#'>Edit Job</a></div>";
			var deleteLink = "<div class='ui-block-b'><a class='delete' data-role='button' data-theme='b' data-icon='minus' href='#'>Delete Test</a></div></div>";
			if (categoryName === localData["JobType"][1] ){
				JobSerializer.push(key);
				semantics += "<div id='jobUni' data-role='collapsible' data-inset='true'><h3>" +
                    ": " + localData["JobID"][1] + "</h3><ul data-role='listview' data-inset='true'>";
				for(var n in localData){
					var object = localData[n];
					semantics += "<li>" + object[0] + ": " +object[1] + "</li>";
				}
				semantics += "</ul>" + editLink + deleteLink + "</div>";
			} else if ( categoryName === "displayAll"){
				JobSerializer.push(key);
				semantics += "<div id='jobUni' data-role='collapsible' data-inset='true'><h3>" + ": " +
                    localData["JobID"][1] + "</h3><ul data-role='listview' data-inset='true'>";
				for(var n in localData){
					var object = localData[n];
					semantics += "<li>" + object[0] + ": " +object[1] + "</li>";
				}
				semantics += "</ul>" + editLink + deleteLink + "</div>";
			}
		}
	}

	semantics +="</div></ul>";
	if (categoryName != "displayAll"){
		$header.find( "h1" ).html(categoryName + " Jobs");
	} else {
		$header.find( "h1" ).html("All Jobs");
	}
	$content.html( structure + semantics);
	$('.delete').each(function(i){
		this.key = JobSerializer[i];
		$(this).on("click", deleteTest);
	});
	$('.edit').each(function(i){
		this.key = JobSerializer[i];
		$(this).on("click", editItem);
	});
		$page.page();
		$content.find( ":jqmData(role=collapsible-set)" ).collapsibleset();
		$content.find( ":jqmData(role=listview)" ).listview();
		$content.find( ":jqmData(role=button)" ).button();
		options.dataUrl = urlObj.href;
		$.mobile.changePage( $page, options );
}, JobEnumerator;

var testSequence = function (value){
	console.log("Start testSequence");
	console.log("testSequence value:");
	console.log(value);
	console.log(localStorage.getItem("jobNumber"));
	if (localStorage.getItem("jobNumber") !== value && value !== "" && value !== undefined ){
		console.log("First testSequence");
	} else if (localStorage.getItem("jobNumber")) {
		JobEnumerator = localStorage["jobNumber"];
		$("#testID").val(Number(JobEnumerator));
		console.log("Second testSequence");
	} else {
		JobEnumerator = 0099;
		localStorage.setItem("jobNumber", JobEnumerator.toString());
		$("#testID").val(JobEnumerator);
		console.log("testSequence");
	};
	console.log("testSequence");
};

var storeData = function(key){
	console.log("Start storeData");
	console.log("storeData key:");
	console.log(key);
	if (!key || key === undefined){
		var id = JobEnumerator;
		var num = Number($("#testID").val())+1;
		localStorage["jobNumber"] = num.toString();
	} else {
		var id = key;
		
	}
	var JobForm				= {};
		JobForm.JobID		= ["Job ID", $("#testID").val()];
		JobForm.clientID		= ["Client ID", $("#clientID").val()];
		JobForm.address		= ["Address", $("#address").val()];
		JobForm.city		= ["City", $("#city").val()];
		JobForm.state		= ["State", $("#state").val()];
		JobForm.zipcode		= ["Zipcode", $("#zipcode").val()];
		JobForm.phone		= ["Phone", $("#phone").val()];
		JobForm.email		= ["Email", $("#email").val()];
		JobForm.JobDate		= ["JobDate Date", $("#JobDate").val()];
		JobForm.incidentReponse	= ["Incident Response", $('input:radio[name=rush]:checked').val()];
		JobForm.JobType		= ["Job Type", $("#JobType").val()];
		JobForm.additionalData	= ["Custom Info", $("#additionalData").val()];
	localStorage.setItem(id, JSON.stringify(JobForm));
	if (!key || key === undefined){
		alert(JobEnumerator + " Saved");
	} else {
		alert(key + " Saved");
	}
	testSequence();
	console.log("storeData");
};

var	deleteTest = function (){
	var ask = confirm("Delete this?");
	if(ask){
		console.log(this.key);
		localStorage.removeItem(this.key);
		alert("Job was deleted!");
		$(this).parents().filter('#jobUni').remove();
		$( "#Jobs" ).collapsibleset( "refresh" );
	} else{
		alert("Evidence was not deleted.");
	}
};

var editItem = function (){
	var value = localStorage.getItem(this.key);
	var JobForm = JSON.parse(value);
	console.log(value);
	$.mobile.changePage( "#newJob");
	$("#testID").val(JobForm.JobID[1]);
	$("#clientID").val(JobForm.clientID[1]);
	$("#address").val(JobForm.address[1]);
	$("#city").val(JobForm.city[1]);
	$("#state").val(JobForm.state[1]);
	$("#zipcode").val(JobForm.zipcode[1]);
	$("#phone").val(JobForm.phone[1]);
	$("#email").val(JobForm.email[1]);
	$("#JobDate").val(JobForm.JobDate[1]);
	$('input:radio[name=rush]:checked').val(JobForm.incidentReponse[1]);
	$("#JobType").val(JobForm.JobType[1]);
	$("#additionalData").val(JobForm.additionalData[1]);
	$('select').selectmenu('refresh', true);
	console.log("Ran editItem");
};
					
var clearLocal = function(){
	localStorage.clear();
	alert("All evidence deleted!");

};

$('#currentJob').on('pageinit', function(){
    $('#dataDisplayList').empty();
    $("#xml").on('click', function(){
        console.log("XML Format");
        $.ajax({
            url: 'xhr/data.xml',
            type: 'GET',
            dataType: 'xml',
            success: function(r){
                $('#dataDisplayList').empty();
                var Jobs = $( r );
                console.log(r);
                Jobs.find("job").each(function(){
                    var job = $(this);
                    $(
                        '<li data-role="list-divider">' + job.find("number").text() + '</li>' +
                            '<li>' +
                            '<p class="ui-li-aside ui-li-desc">' + job.find("tested").text() + '</p>' +
                            '<p class="ui-li-desc">' + '<strong>' + job.find("type").text() + " Job for " +
                                job.find("clientID").text() + '</strong>' + '</p>' +
                            '<p class="ui-li-desc">' + "Vulnerabilities: "+job.find("mitigations").text()+'</p>'+
                            '</li>'
                    ).appendTo('#dataDisplayList');
                });
                $('#dataDisplayList').listview('refresh');
            }
        });
        return false;
    });
});