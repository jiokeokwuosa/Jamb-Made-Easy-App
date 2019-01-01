var cvaReady;

(function() {
    
    var onDeviceReady = function() {
		console.log("Entering onDeviceReady");
		//Let the user know that the deviceReady event has fired
		//alert('ready');
		//Set the variable that lets other parts of the program
		//know that Cordova has initialized
		cvaReady = true;
          navigator.notification.alert('Dear, Welcome to our Digital Computer Based Past Question on JAMB, I wish you success in your JAMB Exam, Kindly share the app with friends',null,'God Loves You','Close'); 

       	//===================================================
		//Do whatever other stuff you want to do on startup
		//===================================================
		console.log("Leaving onDeviceReady");
	};
    
	//add an event listener for the Cordova deviceReady event.
	document.addEventListener('deviceready', onDeviceReady, false);    
}());

function checkConnection() {
	if (cvaReady) {
	   if(navigator.connection.type){
    		var networkState = navigator.connection.type;
    		var states = {};
    		states[Connection.UNKNOWN] = 'Unknown connection';
    		states[Connection.ETHERNET] = 'Ethernet connection';
    		states[Connection.WIFI] = 'WiFi connection';
    		states[Connection.CELL_2G] = 'Cell 2G connection';
    		states[Connection.CELL_3G] = 'Cell 3G connection';
    		states[Connection.CELL_4G] = 'Cell 4G connection';
    		states[Connection.CELL] = 'Cell generic connection';
    		states[Connection.NONE] = 'No network connection';
    		return states[networkState];
            
        }else{
            alert("Sorry the connection plugin is not supported");
            }    
	} else {
		alert("device is not ready");
	}
}

$(".close").bind('click',goodbye);

    function goodbye(){
         navigator.notification.confirm('Do you want to Exit?',doContinue,'Please Confirm',['Yes','No']);     
    }

function doContinue(button){
  var buttonNum=button;
  if(buttonNum=="1" || buttonNum==1 && navigator.app){
    navigator.app.exitApp();
  }else if(buttonNum=="1" || buttonNum==1 && navigator.device){
    navigator.device.exitApp();
  }
}









//demo
var currentquestion = 0;
var correctAnswers = 0;

var myform=$("#myform");
function setupOptions() {
  $('#question',myform).html(parseInt(currentquestion) + 1 + ". " + allQuestions[currentquestion].question);
  var options = allQuestions[currentquestion].choices;
   var formHtml='';
   
      for (var i = 0; i < options.length; i++) {       
        var option=allQuestions[currentquestion].choices[i];
        var button='#option'+i;
        $(button,myform).html(option);
      }
          
  
}


function checkAns() {
  if ($("input[name=option]:checked",myform).val() == allQuestions[currentquestion].correctAnswer) {
       
        if(navigator.notification){
          navigator.notification.alert('Keep it Up',null,'Correct!','Continue');  
        }else{
            alert('Correct!!!'); 
          }
        
    correctAnswers++;
  }else{
       var correctAnswer=allQuestions[currentquestion].choices[allQuestions[currentquestion].correctAnswer];       
        if(navigator.notification){
          navigator.notification.alert('The correct answer is: '+correctAnswer,null,'Oops!','Continue');  
        }else{
            alert('Oops, thats wrong, the correct answer is '+correctAnswer);
          }
    }
  
}  
 

$("#stage",myform).hide();
$("#return",myform).hide(); 
$('#startbutton',myform).bind('click',start); 

function start(){ 
 var currentquestion = 0;
 var correctAnswers = 0;
 clearInterval(timerId);
 counter=0;
 $("#start",myform).hide();
 $("#time",myform).hide(); 
 $("#stage",myform).fadeIn();   
 setupOptions();  
 var timerId=setInterval(updateTime, 1500);
}

function duration(counter){
        if(counter>=60){
           counter1=Math.floor(counter/60);
           counter2=counter%60;       
              if(counter1>=60){
                counter5=Math.floor(counter1/60);
                counter6=counter1%60;
                counter8=counter5+' Hour(s), '+counter6+' Min(s) and '+counter2+' secs'; 
                
              }else{              
                  counter8=counter1+' Min(s) and '+counter2+' secs';     
                 
                }
            
        }else{
            counter8=counter+' sec(s)';
          
          }
        return counter8;
}  

function updateTime() {
    counter=counter+1;
    var result=duration(counter);
    $("#output",myform).text('Time: '+result);
        if (currentquestion == allQuestions.length-1) {
           document.getElementById("time").innerHTML ='You Spent about '+ result+' <br> My timming can be funny and faster!';
        }
  
}

$("input[name=option]",myform).bind('click',main);

function main(event){
    event.preventDefault();
    checkAns();
    currentquestion++;
    
    if (currentquestion < allQuestions.length) {
      setupOptions();   
    }    
   
    if (currentquestion == allQuestions.length) {
       $("#stage",myform).hide();
       $("#return",myform).show();
       $("#time",myform).show();
       $("#result",myform).html("You correctly answered " + correctAnswers + " out of " + currentquestion + " questions! "); 
          currentquestion=0; 
          correctAnswers=0; 
       $("#result",myform).show();   
          
          
    }
}

$("#return",myform).bind('click',dismiss);

function dismiss(event){
   
   $("#result",myform).hide();
   $("#time",myform).hide();
   $("#return",myform).hide();
   $("#start",myform).css('display','');
   
        
}
//end of demo

$(".a").bind('click',navigate);

function navigate(event){
       var address=this.id;
       //window.localStorage['passcode']='';
        //window.localStorage['passcode']='89876543';
       if(window.localStorage['passcode'] && window.localStorage['passcode']=='89876543'){
        $.mobile.changePage(address);
       }else{
         $.mobile.changePage("index.html#activation");
         }    
}
//activate app
$("#activate").on('click', activate);

function activate(event){
    event.preventDefault();
   var code=$('#code').val();
    if(code==''){
       if(navigator.notification){
          navigator.notification.alert('Please Enter Activation Code',null,'Alert','Ok');  
        }else{
            alert('Enter Activation Code'); 
          } 
    }else{
        //remember to check network
             if(checkConnection()=='No network connection'){
                   navigator.notification.alert('No Network Connection',null,'Network Error','Close');                
             }else{                 
                var loading = document.getElementById('loading');
                loading.style.display=""; 
                
                    $.ajax({
                        type:"Post",
                        //remember to change the content security policy @index page while deploying to web to reflect this url
                        //system ip via phone:192.168.43.179, localhost:127.0.0.1
                        url:"http://www.godslovetechnologies.com.ng/successapps/biology.php",
                        data:"code="+code,
                        success:function(result){
                          if(result=='chijioke'){
                            window.localStorage['passcode']='89876543';
                            alert('Activation Successful');
                            $('#myActivate').hide(); 
                            $.mobile.changePage("index.html#main");
                          }else{
                                if(navigator.notification){
                                  navigator.notification.alert(result,null,'Alert','Ok');  
                                }else{
                                    alert(result); 
                                  }
                            }
                            var loading = document.getElementById('loading');
                            loading.style.display="none"; 
                                                      
                        },
                        start:function(){
                                                     
                        },
                        stop:function(){
                            
                        },
                        fail:function(jqXHR){
                            $('#status').html('An error occurred: ' + jqXHR.status).append(jqXHR.responseText);
                            $("activate").show();
                        }
                    
                    
                    });
                
              }//network
      }
    
}
//end of activation


//takes me to the year
$('.mystage').bind('click',myStage);


function myStage(event){
   var year=this.name;
   $.mobile.changePage("index.html#"+year);       
}



// section1
var currentquestion1 = 0;
var correctAnswers1 = 0; 

var myform1=$("#myform1");
$("#stage1",myform1).hide();
$("#return1",myform1).hide(); 
$('#startbutton1',myform1).bind('click',start1); 

function start1(){    
 count1=0;
 var currentquestion1 = 0;
 var correctAnswers1 = 0; 
 
 clearInterval(timer1);
 $("#start1",myform1).hide();
 $("#time1",myform1).hide(); 
 $("#stage1",myform1).fadeIn(); 
  setupOptions1();  
 var timer1=setInterval(updateTime1, 1500);
 
}

function updateTime1() {
    count1=count1+1;
    var result=duration(count1);
    $("#output1",myform1).text('Time: '+result);
        if (currentquestion1 == twentyeighteenA.length-1) {
           document.getElementById("time1").innerHTML ='You Spent about '+ result+' <br> My timming can be funny and faster!';
        }
    
}

function setupOptions1() {
    
  $('#question1',myform1).html(parseInt(currentquestion1) + 1 + ". " + twentyeighteenA[currentquestion1].question);
  var options = twentyeighteenA[currentquestion1].choices;
   var formHtml='';
   
      for (var i = 0; i < options.length; i++) {       
        var option=twentyeighteenA[currentquestion1].choices[i];
        var button='#1opt'+i;
        $(button,myform1).html(option);
      }
          
  
}

function checkAns1() {
  if ($("input[name=1opt]:checked",myform1).val() == twentyeighteenA[currentquestion1].correctAnswer) {
       
        if(navigator.notification){
          navigator.notification.alert('Keep it Up',null,'Correct!','Continue');  
        }else{
            alert('Correct!!!'); 
          }
        
    correctAnswers1++;
  }else{
       var correctAnswer=twentyeighteenA[currentquestion1].choices[twentyeighteenA[currentquestion1].correctAnswer];       
        if(navigator.notification){
          navigator.notification.alert('The correct answer is: '+correctAnswer,null,'Oops!','Continue');  
        }else{
            alert('Oops, thats wrong, the correct answer is '+correctAnswer);
          }
    }
  
} 

$("input[name=1opt]",myform1).bind('click',main1);

function main1(event){
    event.preventDefault();
    checkAns1();
    currentquestion1++;
    
    if (currentquestion1 < twentyeighteenA.length) {
      setupOptions1();   
    }    
   
    if (currentquestion1 == twentyeighteenA.length) {
       $("#stage1",myform1).hide();
       $("#return1",myform1).show();
       $("#time1",myform1).show();
       $("#result1",myform1).html("You correctly answered " + correctAnswers1 + " out of " + currentquestion1 + " questions! ");       
       $("#result1",myform1).show(); 
       
       currentquestion1 = 0;
       correctAnswers1 = 0;   
          
          
    }
}
 
$("#return1",myform1).bind('click',dismiss1);

function dismiss1(event){
   
   $("#result1",myform1).hide();
   $("#time1",myform1).hide();
   $("#return1",myform1).hide();
   $("#start1",myform1).css('display','');
     
        
}

// end section1 


// section2
var currentquestion2 = 0;
var correctAnswers2 = 0; 

var myform2=$("#myform2");
$("#stage2",myform2).hide();
$("#return2",myform2).hide(); 
$('#startbutton2',myform2).bind('click',start2); 

function start2(){ 
 count2=0;
 var currentquestion2 = 0;
 var correctAnswers2 = 0;   
 clearInterval(timer2);
 $("#start2",myform2).hide();
 $("#time2",myform2).hide(); 
 $("#stage2",myform2).fadeIn();   
 setupOptions2();  
 var timer2=setInterval(updateTime2, 1500);
}

function updateTime2() {
    count2=count2+1;
    var result=duration(count2);
    $("#output2",myform2).text('Time: '+result);
        if (currentquestion2 == twentyeighteenB.length-1) {
           document.getElementById("time2").innerHTML ='You Spent about '+ result+' <br> My timming can be funny and faster!';
        }
    
}

function setupOptions2() {
  $('#question2',myform2).html(parseInt(currentquestion2) + 1 + ". " + twentyeighteenB[currentquestion2].question);
  var options = twentyeighteenB[currentquestion2].choices;
   var formHtml='';
   
      for (var i = 0; i < options.length; i++) {       
        var option=twentyeighteenB[currentquestion2].choices[i];
        var button='#2opt'+i;
        $(button,myform2).html(option);
      }
          
  
}

function checkAns2() {
  if ($("input[name=2opt]:checked",myform2).val() == twentyeighteenB[currentquestion2].correctAnswer) {
       
        if(navigator.notification){
          navigator.notification.alert('Keep it Up',null,'Correct!','Continue');  
        }else{
            alert('Correct!!!'); 
          }
        
    correctAnswers2++;
  }else{
       var correctAnswer=twentyeighteenB[currentquestion2].choices[twentyeighteenB[currentquestion2].correctAnswer];       
        if(navigator.notification){
          navigator.notification.alert('The correct answer is: '+correctAnswer,null,'Oops!','Continue');  
        }else{
            alert('Oops, thats wrong, the correct answer is '+correctAnswer);
          }
    }
  
} 

$("input[name=2opt]",myform2).bind('click',main2);

function main2(event){
    event.preventDefault();
    checkAns2();
    currentquestion2++;
    
    if (currentquestion2 < twentyeighteenB.length) {
      setupOptions2();   
    }    
   
    if (currentquestion2 == twentyeighteenB.length) {
       $("#stage2",myform2).hide();
       $("#return2",myform2).show();
       $("#time2",myform2).show();
       $("#result2",myform2).html("You correctly answered " + correctAnswers2 + " out of " + currentquestion2 + " questions! ");       
       $("#result2",myform2).show(); 
       
       currentquestion2 = 0;
       correctAnswers2 = 0;   
          
          
    }
}
 
$("#return2",myform2).bind('click',dismiss2);

function dismiss2(event){
   
   $("#result2",myform2).hide();
   $("#time2",myform2).hide();
   $("#return2",myform2).hide();
   $("#start2",myform2).css('display','');
     
        
}

// end section2 


// section3
var currentquestion3 = 0;
var correctAnswers3 = 0; 

var myform3=$("#myform3");
$("#stage3",myform3).hide();
$("#return3",myform3).hide(); 
$('#startbutton3',myform3).bind('click',start3); 

function start3(){ 
 count3=0;
 var currentquestion3 = 0;
 var correctAnswers3 = 0;   
 clearInterval(timer3);
 $("#start3",myform3).hide();
 $("#time3",myform3).hide(); 
 $("#stage3",myform3).fadeIn();   
 setupOptions3();  
 var timer3=setInterval(updateTime3, 1500);
}

function updateTime3() {
    count3=count3+1;
    var result=duration(count3);
    $("#output3",myform3).text('Time: '+result);
        if (currentquestion3 == twentyeighteenC.length-1) {
           document.getElementById("time3").innerHTML ='You Spent about '+ result+' <br> My timming can be funny and faster!, Oops, one question is missing';
        }
    
}

function setupOptions3() {
  $('#question3',myform3).html(parseInt(currentquestion3) + 1 + ". " + twentyeighteenC[currentquestion3].question);
  var options = twentyeighteenC[currentquestion3].choices;
   var formHtml='';
   
      for (var i = 0; i < options.length; i++) {       
        var option=twentyeighteenC[currentquestion3].choices[i];
        var button='#3opt'+i;
        $(button,myform3).html(option);
      }
          
  
}

function checkAns3() {
  if ($("input[name=3opt]:checked",myform3).val() == twentyeighteenC[currentquestion3].correctAnswer) {
       
        if(navigator.notification){
          navigator.notification.alert('Keep it Up',null,'Correct!','Continue');  
        }else{
            alert('Correct!!!'); 
          }
        
    correctAnswers3++;
  }else{
       var correctAnswer=twentyeighteenC[currentquestion3].choices[twentyeighteenC[currentquestion3].correctAnswer];       
        if(navigator.notification){
          navigator.notification.alert('The correct answer is: '+correctAnswer,null,'Oops!','Continue');  
        }else{
            alert('Oops, thats wrong, the correct answer is '+correctAnswer);
          }
    }
  
} 

$("input[name=3opt]",myform3).bind('click',main3);

function main3(event){
    event.preventDefault();
    checkAns3();
    currentquestion3++;
    
    if (currentquestion3 < twentyeighteenC.length) {
      setupOptions3();   
    }    
   
    if (currentquestion3 == twentyeighteenC.length) {
       $("#stage3",myform3).hide();
       $("#return3",myform3).show();
       $("#time3",myform3).show();
       $("#result3",myform3).html("You correctly answered " + correctAnswers3 + " out of " + currentquestion3 + " questions! ");       
       $("#result3",myform3).show(); 
       
       currentquestion3 = 0;
       correctAnswers3 = 0;   
          
          
    }
}
 
$("#return3",myform3).bind('click',dismiss3);

function dismiss3(event){
   
   $("#result3",myform3).hide();
   $("#time3",myform3).hide();
   $("#return3",myform3).hide();
   $("#start3",myform3).css('display','');
     
        
}

// end section3


// section4
var currentquestion4 = 0;
var correctAnswers4 = 0; 

var myform4=$("#myform4");
$("#stage4",myform4).hide();
$("#return4",myform4).hide(); 
$('#startbutton4',myform4).bind('click',start4); 

function start4(){ 
 count4=0;
 var currentquestion4 = 0;
 var correctAnswers4 = 0;   
 clearInterval(timer4);
 $("#start4",myform4).hide();
 $("#time4",myform4).hide(); 
 $("#stage4",myform4).fadeIn();   
 setupOptions4();  
 var timer4=setInterval(updateTime4, 1500);
}

function updateTime4() {
    count4=count4+1;
    var result=duration(count4);
    $("#output4",myform4).text('Time: '+result);
        if (currentquestion4 == twentysixteenA.length-1) {
           document.getElementById("time4").innerHTML ='You Spent about '+ result+' <br> My timming can be funny and faster!';
        }
    
}

function setupOptions4() {
  $('#question4',myform4).html(parseInt(currentquestion4) + 1 + ". " + twentysixteenA[currentquestion4].question);
  var options = twentysixteenA[currentquestion4].choices;
   var formHtml='';
   
      for (var i = 0; i < options.length; i++) {       
        var option=twentysixteenA[currentquestion4].choices[i];
        var button='#4opt'+i;
        $(button,myform4).html(option);
      }
          
  
}

function checkAns4() {
  if ($("input[name=4opt]:checked",myform4).val() == twentysixteenA[currentquestion4].correctAnswer) {
       
        if(navigator.notification){
          navigator.notification.alert('Keep it Up',null,'Correct!','Continue');  
        }else{
            alert('Correct!!!'); 
          }
        
    correctAnswers4++;
  }else{
       var correctAnswer=twentysixteenA[currentquestion4].choices[twentysixteenA[currentquestion4].correctAnswer];       
        if(navigator.notification){
          navigator.notification.alert('The correct answer is: '+correctAnswer,null,'Oops!','Continue');  
        }else{
            alert('Oops, thats wrong, the correct answer is '+correctAnswer);
          }
    }
  
} 

$("input[name=4opt]",myform4).bind('click',main4);

function main4(event){
    event.preventDefault();
    checkAns4();
    currentquestion4++;
    
    if (currentquestion4 < twentysixteenA.length) {
      setupOptions4();   
    }    
   
    if (currentquestion4 == twentysixteenA.length) {
       $("#stage4",myform4).hide();
       $("#return4",myform4).show();
       $("#time4",myform4).show();
       $("#result4",myform4).html("You correctly answered " + correctAnswers4 + " out of " + currentquestion4 + " questions! ");       
       $("#result4",myform4).show(); 
       
       currentquestion4 = 0;
       correctAnswers4 = 0;   
          
          
    }
}
 
$("#return4",myform4).bind('click',dismiss4);

function dismiss4(event){
   
   $("#result4",myform4).hide();
   $("#time4",myform4).hide();
   $("#return4",myform4).hide();
   $("#start4",myform4).css('display','');
     
        
}

// end section4


// section5
var currentquestion5 = 0;
var correctAnswers5 = 0; 

var myform5=$("#myform5");
$("#stage5",myform5).hide();
$("#return5",myform5).hide(); 
$('#startbutton5',myform5).bind('click',start5); 

function start5(){ 
 count5=0;
 var currentquestion5 = 0;
 var correctAnswers5 = 0;   
 clearInterval(timer5);
 $("#start5",myform5).hide();
 $("#time5",myform5).hide(); 
 $("#stage5",myform5).fadeIn();   
 setupOptions5();  
 var timer5=setInterval(updateTime5, 1500);
}

function updateTime5() {
    count5=count5+1;
    var result=duration(count5);
    $("#output5",myform5).text('Time: '+result);
        if (currentquestion5 == twentysixteenB.length-1) {
           document.getElementById("time5").innerHTML ='You Spent about '+ result+' <br> My timming can be funny and faster!';
        }
    
}

function setupOptions5() {
  $('#question5',myform5).html(parseInt(currentquestion5) + 1 + ". " + twentysixteenB[currentquestion5].question);
  var options = twentysixteenB[currentquestion5].choices;
   var formHtml='';
   
      for (var i = 0; i < options.length; i++) {       
        var option=twentysixteenB[currentquestion5].choices[i];
        var button='#5opt'+i;
        $(button,myform5).html(option);
      }
          
  
}

function checkAns5() {
  if ($("input[name=5opt]:checked",myform5).val() == twentysixteenB[currentquestion5].correctAnswer) {
       
        if(navigator.notification){
          navigator.notification.alert('Keep it Up',null,'Correct!','Continue');  
        }else{
            alert('Correct!!!'); 
          }
        
    correctAnswers5++;
  }else{
       var correctAnswer=twentysixteenB[currentquestion5].choices[twentysixteenB[currentquestion5].correctAnswer];       
        if(navigator.notification){
          navigator.notification.alert('The correct answer is: '+correctAnswer,null,'Oops!','Continue');  
        }else{
            alert('Oops, thats wrong, the correct answer is '+correctAnswer);
          }
    }
  
} 

$("input[name=5opt]",myform5).bind('click',main5);

function main5(event){
    event.preventDefault();
    checkAns5();
    currentquestion5++;
    
    if (currentquestion5 < twentysixteenB.length) {
      setupOptions5();   
    }    
   
    if (currentquestion5 == twentysixteenB.length) {
       $("#stage5",myform5).hide();
       $("#return5",myform5).show();
       $("#time5",myform5).show();
       $("#result5",myform5).html("You correctly answered " + correctAnswers5 + " out of " + currentquestion5 + " questions! ");       
       $("#result5",myform5).show(); 
       
       currentquestion5 = 0;
       correctAnswers5 = 0;   
          
          
    }
}
 
$("#return5",myform5).bind('click',dismiss5);

function dismiss5(event){
   
   $("#result5",myform5).hide();
   $("#time5",myform5).hide();
   $("#return5",myform5).hide();
   $("#start5",myform5).css('display','');
     
        
}

// end section5


// section6
var currentquestion6 = 0;
var correctAnswers6 = 0; 

var myform6=$("#myform6");
$("#stage6",myform6).hide();
$("#return6",myform6).hide(); 
$('#startbutton6',myform6).bind('click',start6); 

function start6(){ 
 count6=0;
 var currentquestion6 = 0;
 var correctAnswers6 = 0;   
 clearInterval(timer6);
 $("#start6",myform6).hide();
 $("#time6",myform6).hide(); 
 $("#stage6",myform6).fadeIn();   
 setupOptions6();  
 var timer6=setInterval(updateTime6, 1500);
}

function updateTime6() {
    count6=count6+1;
    var result=duration(count6);
    $("#output6",myform6).text('Time: '+result);
        if (currentquestion6 == twentysixteenC.length-1) {
           document.getElementById("time6").innerHTML ='You Spent about '+ result+' <br> My timming can be funny and faster!';
        }
    
}

function setupOptions6() {
  $('#question6',myform6).html(parseInt(currentquestion6) + 1 + ". " + twentysixteenC[currentquestion6].question);
  var options = twentysixteenC[currentquestion6].choices;
   var formHtml='';
   
      for (var i = 0; i < options.length; i++) {       
        var option=twentysixteenC[currentquestion6].choices[i];
        var button='#6opt'+i;
        $(button,myform6).html(option);
      }
          
  
}

function checkAns6() {
  if ($("input[name=6opt]:checked",myform6).val() == twentysixteenC[currentquestion6].correctAnswer) {
       
        if(navigator.notification){
          navigator.notification.alert('Keep it Up',null,'Correct!','Continue');  
        }else{
            alert('Correct!!!'); 
          }
        
    correctAnswers6++;
  }else{
       var correctAnswer=twentysixteenC[currentquestion6].choices[twentysixteenC[currentquestion6].correctAnswer];       
        if(navigator.notification){
          navigator.notification.alert('The correct answer is: '+correctAnswer,null,'Oops!','Continue');  
        }else{
            alert('Oops, thats wrong, the correct answer is '+correctAnswer);
          }
    }
  
} 

$("input[name=6opt]",myform6).bind('click',main6);

function main6(event){
    event.preventDefault();
    checkAns6();
    currentquestion6++;
    
    if (currentquestion6 < twentysixteenC.length) {
      setupOptions6();   
    }    
   
    if (currentquestion6 == twentysixteenC.length) {
       $("#stage6",myform6).hide();
       $("#return6",myform6).show();
       $("#time6",myform6).show();
       $("#result6",myform6).html("You correctly answered " + correctAnswers6 + " out of " + currentquestion6 + " questions! ");       
       $("#result6",myform6).show(); 
       
       currentquestion6 = 0;
       correctAnswers6 = 0;   
          
          
    }
}
 
$("#return6",myform6).bind('click',dismiss6);

function dismiss6(event){
   
   $("#result6",myform6).hide();
   $("#time6",myform6).hide();
   $("#return6",myform6).hide();
   $("#start6",myform6).css('display','');
     
        
}

// end section6


// section7
var currentquestion7 = 0;
var correctAnswers7 = 0; 

var myform7=$("#myform7");
$("#stage7",myform7).hide();
$("#return7",myform7).hide(); 
$('#startbutton7',myform7).bind('click',start7); 

function start7(){ 
 count7=0;
 var currentquestion7 = 0;
 var correctAnswers7 = 0;   
 clearInterval(timer7);
 $("#start7",myform7).hide();
 $("#time7",myform7).hide(); 
 $("#stage7",myform7).fadeIn();   
 setupOptions7();  
 var timer7=setInterval(updateTime7, 1500);
}

function updateTime7() {
    count7=count7+1;
    var result=duration(count7);
    $("#output7",myform7).text('Time: '+result);
        if (currentquestion7 == twentyfifteenA.length-1) {
           document.getElementById("time7").innerHTML ='You Spent about '+ result+' <br> My timming can be funny and faster!';
        }
    
}

function setupOptions7() {
  $('#question7',myform7).html(parseInt(currentquestion7) + 1 + ". " + twentyfifteenA[currentquestion7].question);
  var options = twentyfifteenA[currentquestion7].choices;
   var formHtml='';
   
      for (var i = 0; i < options.length; i++) {       
        var option=twentyfifteenA[currentquestion7].choices[i];
        var button='#7opt'+i;
        $(button,myform7).html(option);
      }
          
  
}

function checkAns7() {
  if ($("input[name=7opt]:checked",myform7).val() == twentyfifteenA[currentquestion7].correctAnswer) {
       
        if(navigator.notification){
          navigator.notification.alert('Keep it Up',null,'Correct!','Continue');  
        }else{
            alert('Correct!!!'); 
          }
        
    correctAnswers7++;
  }else{
       var correctAnswer=twentyfifteenA[currentquestion7].choices[twentyfifteenA[currentquestion7].correctAnswer];       
        if(navigator.notification){
          navigator.notification.alert('The correct answer is: '+correctAnswer,null,'Oops!','Continue');  
        }else{
            alert('Oops, thats wrong, the correct answer is '+correctAnswer);
          }
    }
  
} 

$("input[name=7opt]",myform7).bind('click',main7);

function main7(event){
    event.preventDefault();
    checkAns7();
    currentquestion7++;
    
    if (currentquestion7 < twentyfifteenA.length) {
      setupOptions7();   
    }    
   
    if (currentquestion7 == twentyfifteenA.length) {
       $("#stage7",myform7).hide();
       $("#return7",myform7).show();
       $("#time7",myform7).show();
       $("#result7",myform7).html("You correctly answered " + correctAnswers7 + " out of " + currentquestion7 + " questions! ");       
       $("#result7",myform7).show(); 
       
       currentquestion7 = 0;
       correctAnswers7 = 0;   
          
          
    }
}
 
$("#return7",myform7).bind('click',dismiss7);

function dismiss7(event){
   
   $("#result7",myform7).hide();
   $("#time7",myform7).hide();
   $("#return7",myform7).hide();
   $("#start7",myform7).css('display','');
     
        
}

// end section7


// section8
var currentquestion8 = 0;
var correctAnswers8= 0; 

var myform8=$("#myform8");
$("#stage8",myform8).hide();
$("#return8",myform8).hide(); 
$('#startbutton8',myform8).bind('click',start8); 

function start8(){ 
 count8=0;
 var currentquestion8 = 0;
 var correctAnswers8 = 0;   
 clearInterval(timer8);
 $("#start8",myform8).hide();
 $("#time8",myform8).hide(); 
 $("#stage8",myform8).fadeIn();   
 setupOptions8();  
 var timer8=setInterval(updateTime8, 1500);
}

function updateTime8() {
    count8=count8+1;
    var result=duration(count8);
    $("#output8",myform8).text('Time: '+result);
        if (currentquestion8 == twentyfifteenB.length-1) {
           document.getElementById("time8").innerHTML ='You Spent about '+ result+' <br> My timming can be funny and faster!';
        }
    
}

function setupOptions8() {
  $('#question8',myform8).html(parseInt(currentquestion8) + 1 + ". " + twentyfifteenB[currentquestion8].question);
  var options = twentyfifteenB[currentquestion8].choices;
   var formHtml='';
   
      for (var i = 0; i < options.length; i++) {       
        var option=twentyfifteenB[currentquestion8].choices[i];
        var button='#8opt'+i;
        $(button,myform8).html(option);
      }
          
  
}

function checkAns8() {
  if ($("input[name=8opt]:checked",myform8).val() == twentyfifteenB[currentquestion8].correctAnswer) {
       
        if(navigator.notification){
          navigator.notification.alert('Keep it Up',null,'Correct!','Continue');  
        }else{
            alert('Correct!!!'); 
          }
        
    correctAnswers8++;
  }else{
       var correctAnswer=twentyfifteenB[currentquestion8].choices[twentyfifteenB[currentquestion8].correctAnswer];       
        if(navigator.notification){
          navigator.notification.alert('The correct answer is: '+correctAnswer,null,'Oops!','Continue');  
        }else{
            alert('Oops, thats wrong, the correct answer is '+correctAnswer);
          }
    }
  
} 

$("input[name=8opt]",myform8).bind('click',main8);

function main8(event){
    event.preventDefault();
    checkAns8();
    currentquestion8++;
    
    if (currentquestion8 < twentyfifteenB.length) {
      setupOptions8();   
    }    
   
    if (currentquestion8 == twentyfifteenB.length) {
       $("#stage8",myform8).hide();
       $("#return8",myform8).show();
       $("#time8",myform8).show();
       $("#result8",myform8).html("You correctly answered " + correctAnswers8 + " out of " + currentquestion8 + " questions! ");       
       $("#result8",myform8).show(); 
       
       currentquestion8 = 0;
       correctAnswers8 = 0;   
          
          
    }
}
 
$("#return8",myform8).bind('click',dismiss8);

function dismiss8(event){
   
   $("#result8",myform8).hide();
   $("#time8",myform8).hide();
   $("#return8",myform8).hide();
   $("#start8",myform8).css('display','');
     
        
}

// end section8


// section9
var currentquestion9 = 0;
var correctAnswers9= 0; 

var myform9=$("#myform9");
$("#stage9",myform9).hide();
$("#return9",myform9).hide(); 
$('#startbutton9',myform9).bind('click',start9); 

function start9(){ 
 count9=0;
 var currentquestion9 = 0;
 var correctAnswers9 = 0;   
 clearInterval(timer9);
 $("#start9",myform9).hide();
 $("#time9",myform9).hide(); 
 $("#stage9",myform9).fadeIn();   
 setupOptions9();  
 var timer9=setInterval(updateTime9, 1500);
}

function updateTime9() {
    count9=count9+1;
    var result=duration(count9);
    $("#output9",myform9).text('Time: '+result);
        if (currentquestion9 == twentyfifteenC.length-1) {
           document.getElementById("time9").innerHTML ='You Spent about '+ result+' <br> My timming can be funny and faster!';
        }
    
}

function setupOptions9() {
  $('#question9',myform9).html(parseInt(currentquestion9) + 1 + ". " + twentyfifteenC[currentquestion9].question);
  var options = twentyfifteenC[currentquestion9].choices;
   var formHtml='';
   
      for (var i = 0; i < options.length; i++) {       
        var option=twentyfifteenC[currentquestion9].choices[i];
        var button='#9opt'+i;
        $(button,myform9).html(option);
      }
          
  
}

function checkAns9() {
  if ($("input[name=9opt]:checked",myform9).val() == twentyfifteenC[currentquestion9].correctAnswer) {
       
        if(navigator.notification){
          navigator.notification.alert('Keep it Up',null,'Correct!','Continue');  
        }else{
            alert('Correct!!!'); 
          }
        
    correctAnswers9++;
  }else{
       var correctAnswer=twentyfifteenC[currentquestion9].choices[twentyfifteenC[currentquestion9].correctAnswer];       
        if(navigator.notification){
          navigator.notification.alert('The correct answer is: '+correctAnswer,null,'Oops!','Continue');  
        }else{
            alert('Oops, thats wrong, the correct answer is '+correctAnswer);
          }
    }
  
} 

$("input[name=9opt]",myform9).bind('click',main9);

function main9(event){
    event.preventDefault();
    checkAns9();
    currentquestion9++;
    
    if (currentquestion9 < twentyfifteenC.length) {
      setupOptions9();   
    }    
   
    if (currentquestion9 == twentyfifteenC.length) {
       $("#stage9",myform9).hide();
       $("#return9",myform9).show();
       $("#time9",myform9).show();
       $("#result9",myform9).html("You correctly answered " + correctAnswers9 + " out of " + currentquestion9 + " questions! ");       
       $("#result9",myform9).show(); 
       
       currentquestion9 = 0;
       correctAnswers9 = 0;   
          
          
    }
}
 
$("#return9",myform9).bind('click',dismiss9);

function dismiss9(event){
   
   $("#result9",myform9).hide();
   $("#time9",myform9).hide();
   $("#return9",myform9).hide();
   $("#start9",myform9).css('display','');
     
        
}

// end section9


//section10
var currentquestion10 = 0;
var correctAnswers10= 0; 

var myform10=$("#myform10");
$("#stage10",myform10).hide();
$("#return10",myform10).hide(); 
$('#startbutton10',myform10).bind('click',start10); 

function start10(){ 
 count10=0;
 var currentquestion10 = 0;
 var correctAnswers10 = 0;   
 clearInterval(timer10);
 $("#start10",myform10).hide();
 $("#time10",myform10).hide(); 
 $("#stage10",myform10).fadeIn();   
 setupOptions10();  
 var timer10=setInterval(updateTime10, 1500);
}

function updateTime10() {
    count10=count10+1;
    var result=duration(count10);
    $("#output10",myform10).text('Time: '+result);
        if (currentquestion10 == twentyfourteen.length-1) {
           document.getElementById("time10").innerHTML ='You Spent about '+ result+' <br> My timming can be funny and faster!';
        }
    
}

function setupOptions10() {
  $('#question10',myform10).html(parseInt(currentquestion10) + 1 + ". " + twentyfourteen[currentquestion10].question);
  var options = twentyfourteen[currentquestion10].choices;
   var formHtml='';
   
      for (var i = 0; i < options.length; i++) {       
        var option=twentyfourteen[currentquestion10].choices[i];
        var button='#10opt'+i;
        $(button,myform10).html(option);
      }
          
  
}

function checkAns10() {
  if ($("input[name=10opt]:checked",myform10).val() == twentyfourteen[currentquestion10].correctAnswer) {
       
        if(navigator.notification){
          navigator.notification.alert('Keep it Up',null,'Correct!','Continue');  
        }else{
            alert('Correct!!!'); 
          }
        
    correctAnswers10++;
  }else{
       var correctAnswer=twentyfourteen[currentquestion10].choices[twentyfourteen[currentquestion10].correctAnswer];       
        if(navigator.notification){
          navigator.notification.alert('The correct answer is: '+correctAnswer,null,'Oops!','Continue');  
        }else{
            alert('Oops, thats wrong, the correct answer is: '+correctAnswer);
          }
    }
  
} 

$("input[name=10opt]",myform10).bind('click',main10);

function main10(event){
    event.preventDefault();
    checkAns10();
    currentquestion10++;
    
    if (currentquestion10 < twentyfourteen.length) {
      setupOptions10();   
    }    
   
    if (currentquestion10 == twentyfourteen.length) {
       $("#stage10",myform10).hide();
       $("#return10",myform10).show();
       $("#time10",myform10).show();
       $("#result10",myform10).html("You correctly answered " + correctAnswers10 + " out of " + currentquestion10 + " questions! ");       
       $("#result10",myform10).show(); 
       
       currentquestion10 = 0;
       correctAnswers10 = 0;   
          
          
    }
}
 
$("#return10",myform10).bind('click',dismiss10);

function dismiss10(event){
   
   $("#result10",myform10).hide();
   $("#time10",myform10).hide();
   $("#return10",myform10).hide();
   $("#start10",myform10).css('display','');
     
        
}

// end section10

// section11
var currentquestion11 = 0;
var correctAnswers11= 0; 

var myform11=$("#myform11");
$("#stage11",myform11).hide();
$("#return11",myform11).hide(); 
$('#startbutton11',myform11).bind('click',start11); 

function start11(){ 
 count11=0;
 var currentquestion11 = 0;
 var correctAnswers11 = 0;   
 clearInterval(timer11);
 $("#start11",myform11).hide();
 $("#time11",myform11).hide(); 
 $("#stage11",myform11).fadeIn();   
 setupOptions11();  
 var timer11=setInterval(updateTime11, 1500);
}

function updateTime11() {
    count11=count11+1;
    var result=duration(count11);
    $("#output11",myform11).text('Time: '+result);
        if (currentquestion11 == twentythirteen.length-1) {
           document.getElementById("time11").innerHTML ='You Spent about '+ result+' <br> My timming can be funny and faster! <br> One question is off';
        }
    
}

function setupOptions11() {
  $('#question11',myform11).html(parseInt(currentquestion11) + 1 + ". " + twentythirteen[currentquestion11].question);
  var options = twentythirteen[currentquestion11].choices;
   var formHtml='';
   
      for (var i = 0; i < options.length; i++) {       
        var option=twentythirteen[currentquestion11].choices[i];
        var button='#11opt'+i;
        $(button,myform11).html(option);
      }
          
  
}

function checkAns11() {
  if ($("input[name=11opt]:checked",myform11).val() == twentythirteen[currentquestion11].correctAnswer) {
       
        if(navigator.notification){
          navigator.notification.alert('Keep it Up',null,'Correct!','Continue');  
        }else{
            alert('Correct!!!'); 
          }
        
    correctAnswers11++;
  }else{
       var correctAnswer=twentythirteen[currentquestion11].choices[twentythirteen[currentquestion11].correctAnswer];       
        if(navigator.notification){
          navigator.notification.alert('The correct answer is: '+correctAnswer,null,'Oops!','Continue');  
        }else{
            alert('Oops, thats wrong, the correct answer is: '+correctAnswer);
          }
    }
  
} 

$("input[name=11opt]",myform11).bind('click',main11);

function main11(event){
    event.preventDefault();
    checkAns11();
    currentquestion11++;
    
    if (currentquestion11 < twentythirteen.length) {
      setupOptions11();   
    }    
   
    if (currentquestion11 == twentythirteen.length) {
       $("#stage11",myform11).hide();
       $("#return11",myform11).show();
       $("#time11",myform11).show();
       $("#result11",myform11).html("You correctly answered " + correctAnswers11 + " out of " + currentquestion11 + " questions! ");       
       $("#result11",myform11).show(); 
       
       currentquestion11 = 0;
       correctAnswers11 = 0;   
          
          
    }
}
 
$("#return11",myform11).bind('click',dismiss11);

function dismiss11(event){
   
   $("#result11",myform11).hide();
   $("#time11",myform11).hide();
   $("#return11",myform11).hide();
   $("#start11",myform11).css('display','');
     
        
}

// end section11


//  section12
var currentquestion12 = 0;
var correctAnswers12= 0; 

var myform12=$("#myform12");
$("#stage12",myform12).hide();
$("#return12",myform12).hide(); 
$('#startbutton12',myform12).bind('click',start12); 

function start12(){ 
 count12=0;
 var currentquestion12 = 0;
 var correctAnswers12 = 0;   
 clearInterval(timer12);
 $("#start12",myform12).hide();
 $("#time12",myform12).hide(); 
 $("#stage12",myform12).fadeIn();   
 setupOptions12();  
 var timer12=setInterval(updateTime12, 1500);
}

function updateTime12() {
    count12=count12+1;
    var result=duration(count12);
    $("#output12",myform12).text('Time: '+result);
        if (currentquestion12 == twentytwelve.length-1) {
           document.getElementById("time12").innerHTML ='You Spent about '+ result+' <br> My timming can be funny and faster!';
        }
    
}

function setupOptions12() {
  $('#question12',myform12).html(parseInt(currentquestion12) + 1 + ". " + twentytwelve[currentquestion12].question);
  var options = twentytwelve[currentquestion12].choices;
   var formHtml='';
   
      for (var i = 0; i < options.length; i++) {       
        var option=twentytwelve[currentquestion12].choices[i];
        var button='#12opt'+i;
        $(button,myform12).html(option);
      }
          
  
}

function checkAns12() {
  if ($("input[name=12opt]:checked",myform12).val() == twentytwelve[currentquestion12].correctAnswer) {
       
        if(navigator.notification){
          navigator.notification.alert('Keep it Up',null,'Correct!','Continue');  
        }else{
            alert('Correct!!!'); 
          }
        
    correctAnswers12++;
  }else{
       var correctAnswer=twentytwelve[currentquestion12].choices[twentytwelve[currentquestion12].correctAnswer];       
        if(navigator.notification){
          navigator.notification.alert('The correct answer is: '+correctAnswer,null,'Oops!','Continue');  
        }else{
            alert('Oops, thats wrong, the correct answer is: '+correctAnswer);
          }
    }
  
} 

$("input[name=12opt]",myform12).bind('click',main12);

function main12(event){
    event.preventDefault();
    checkAns12();
    currentquestion12++;
    
    if (currentquestion12 < twentytwelve.length) {
      setupOptions12();   
    }    
   
    if (currentquestion12 == twentytwelve.length) {
       $("#stage12",myform12).hide();
       $("#return12",myform12).show();
       $("#time12",myform12).show();
       $("#result12",myform12).html("You correctly answered " + correctAnswers12 + " out of " + currentquestion12 + " questions! ");       
       $("#result12",myform12).show(); 
       
       currentquestion12 = 0;
       correctAnswers12 = 0;   
          
          
    }
}
 
$("#return12",myform12).bind('click',dismiss12);

function dismiss12(event){
   
   $("#result12",myform12).hide();
   $("#time12",myform12).hide();
   $("#return12",myform12).hide();
   $("#start12",myform12).css('display','');
     
        
}

// end section12


// section13
var currentquestion13 = 0;
var correctAnswers13= 0; 

var myform13=$("#myform13");
$("#stage13",myform13).hide();
$("#return13",myform13).hide(); 
$('#startbutton13',myform13).bind('click',start13); 

function start13(){ 
 count13=0;
 var currentquestion13 = 0;
 var correctAnswers13 = 0;   
 clearInterval(timer13);
 $("#start13",myform13).hide();
 $("#time13",myform13).hide(); 
 $("#stage13",myform13).fadeIn();   
 setupOptions13();  
 var timer13=setInterval(updateTime13, 1500);
}

function updateTime13() {
    count13=count13+1;
    var result=duration(count13);
    $("#output13",myform13).text('Time: '+result);
        if (currentquestion13 == twentyeleven.length-1) {
           document.getElementById("time13").innerHTML ='You Spent about '+ result+' <br> My timming can be funny and faster!';
        }
    
}

function setupOptions13() {
  $('#question13',myform13).html(parseInt(currentquestion13) + 1 + ". " + twentyeleven[currentquestion13].question);
  var options = twentyeleven[currentquestion13].choices;
   var formHtml='';
   
      for (var i = 0; i < options.length; i++) {       
        var option=twentyeleven[currentquestion13].choices[i];
        var button='#13opt'+i;
        $(button,myform13).html(option);
      }
          
  
}

function checkAns13() {
  if ($("input[name=13opt]:checked",myform13).val() == twentyeleven[currentquestion13].correctAnswer) {
       
        if(navigator.notification){
          navigator.notification.alert('Keep it Up',null,'Correct!','Continue');  
        }else{
            alert('Correct!!!'); 
          }
        
    correctAnswers13++;
  }else{
       var correctAnswer=twentyeleven[currentquestion13].choices[twentyeleven[currentquestion13].correctAnswer];       
        if(navigator.notification){
          navigator.notification.alert('The correct answer is: '+correctAnswer,null,'Oops!','Continue');  
        }else{
            alert('Oops, thats wrong, the correct answer is: '+correctAnswer);
          }
    }
  
} 

$("input[name=13opt]",myform13).bind('click',main13);

function main13(event){
    event.preventDefault();
    checkAns13();
    currentquestion13++;
    
    if (currentquestion13 < twentyeleven.length) {
      setupOptions13();   
    }    
   
    if (currentquestion13 == twentyeleven.length) {
       $("#stage13",myform13).hide();
       $("#return13",myform13).show();
       $("#time13",myform13).show();
       $("#result13",myform13).html("You correctly answered " + correctAnswers13 + " out of " + currentquestion13 + " questions! ");       
       $("#result13",myform13).show(); 
       
       currentquestion13 = 0;
       correctAnswers13 = 0;   
          
          
    }
}
 
$("#return13",myform13).bind('click',dismiss13);

function dismiss13(event){
   
   $("#result13",myform13).hide();
   $("#time13",myform13).hide();
   $("#return13",myform13).hide();
   $("#start13",myform13).css('display','');
     
        
}

// end section13


// section14
var currentquestion14 = 0;
var correctAnswers14= 0; 

var myform14=$("#myform14");
$("#stage14",myform14).hide();
$("#return14",myform14).hide(); 
$('#startbutton14',myform14).bind('click',start14); 

function start14(){ 
 count14=0;
 var currentquestion14 = 0;
 var correctAnswers14 = 0;   
 clearInterval(timer14);
 $("#start14",myform14).hide();
 $("#time14",myform14).hide(); 
 $("#stage14",myform14).fadeIn();   
 setupOptions14();  
 var timer14=setInterval(updateTime14, 1500);
}

function updateTime14() {
    count14=count14+1;
    var result=duration(count14);
    $("#output14",myform14).text('Time: '+result);
        if (currentquestion14 == twentyten.length-1) {
           document.getElementById("time14").innerHTML ='You Spent about '+ result+' <br> My timming can be funny and faster!';
        }
    
}

function setupOptions14() {
  $('#question14',myform14).html(parseInt(currentquestion14) + 1 + ". " + twentyten[currentquestion14].question);
  var options = twentyten[currentquestion14].choices;
   var formHtml='';
   
      for (var i = 0; i < options.length; i++) {       
        var option=twentyten[currentquestion14].choices[i];
        var button='#14opt'+i;
        $(button,myform14).html(option);
      }
          
  
}

function checkAns14() {
  if ($("input[name=14opt]:checked",myform14).val() == twentyten[currentquestion14].correctAnswer) {
       
        if(navigator.notification){
          navigator.notification.alert('Keep it Up',null,'Correct!','Continue');  
        }else{
            alert('Correct!!!'); 
          }
        
    correctAnswers14++;
  }else{
       var correctAnswer=twentyten[currentquestion14].choices[twentyten[currentquestion14].correctAnswer];       
        if(navigator.notification){
          navigator.notification.alert('The correct answer is: '+correctAnswer,null,'Oops!','Continue');  
        }else{
            alert('Oops, thats wrong, the correct answer is: '+correctAnswer);
          }
    }
  
} 

$("input[name=14opt]",myform14).bind('click',main14);

function main14(event){
    event.preventDefault();
    checkAns14();
    currentquestion14++;
    
    if (currentquestion14 < twentyten.length) {
      setupOptions14();   
    }    
   
    if (currentquestion14 == twentyten.length) {
       $("#stage14",myform14).hide();
       $("#return14",myform14).show();
       $("#time14",myform14).show();
       $("#result14",myform14).html("You correctly answered " + correctAnswers14 + " out of " + currentquestion14 + " questions! ");       
       $("#result14",myform14).show(); 
       
       currentquestion14 = 0;
       correctAnswers14 = 0;   
          
          
    }
}
 
$("#return14",myform14).bind('click',dismiss14);

function dismiss14(event){
   
   $("#result14",myform14).hide();
   $("#time14",myform14).hide();
   $("#return14",myform14).hide();
   $("#start14",myform14).css('display','');
     
        
}

// end section14

// section15
var currentquestion15 = 0;
var correctAnswers15= 0; 

var myform15=$("#myform15");
$("#stage15",myform15).hide();
$("#return15",myform15).hide(); 
$('#startbutton15',myform15).bind('click',start15); 

function start15(){ 
 count15=0;
 var currentquestion15 = 0;
 var correctAnswers15 = 0;   
 clearInterval(timer15);
 $("#start15",myform15).hide();
 $("#time15",myform15).hide(); 
 $("#stage15",myform15).fadeIn();   
 setupOptions15();  
 var timer15=setInterval(updateTime15, 1500);
}

function updateTime15() {
    count15=count15+1;
    var result=duration(count15);
    $("#output15",myform15).text('Time: '+result);
        if (currentquestion15 == section15.length-1) {
           document.getElementById("time15").innerHTML ='You Spent about '+ result+' <br> My timming can be funny and faster!';
        }
    
}

function setupOptions15() {
  $('#question15',myform15).html(parseInt(currentquestion15) + 1 + ". " + section15[currentquestion15].question);
  var options = section15[currentquestion15].choices;
   var formHtml='';
   
      for (var i = 0; i < options.length; i++) {       
        var option=section15[currentquestion15].choices[i];
        var button='#15opt'+i;
        $(button,myform15).html(option);
      }
          
  
}

function checkAns15() {
  if ($("input[name=15opt]:checked",myform15).val() == section15[currentquestion15].correctAnswer) {
       
        if(navigator.notification){
          navigator.notification.alert('Keep it Up',null,'Correct!','Continue');  
        }else{
            alert('Correct!!!'); 
          }
        
    correctAnswers15++;
  }else{
       var correctAnswer=section15[currentquestion15].choices[section15[currentquestion15].correctAnswer];       
        if(navigator.notification){
          navigator.notification.alert('The correct answer is: '+correctAnswer,null,'Oops!','Continue');  
        }else{
            alert('Oops, thats wrong, the correct answer is: '+correctAnswer);
          }
    }
  
} 

$("input[name=15opt]",myform15).bind('click',main15);

function main15(event){
    event.preventDefault();
    checkAns15();
    currentquestion15++;
    
    if (currentquestion15 < section15.length) {
      setupOptions15();   
    }    
   
    if (currentquestion15 == section15.length) {
       $("#stage15",myform15).hide();
       $("#return15",myform15).show();
       $("#time15",myform15).show();
       $("#result15",myform15).html("You correctly answered " + correctAnswers15 + " out of " + currentquestion15 + " questions! ");       
       $("#result15",myform15).show(); 
       
       currentquestion15 = 0;
       correctAnswers15 = 0;   
          
          
    }
}
 
$("#return15",myform15).bind('click',dismiss15);

function dismiss15(event){
   
   $("#result15",myform15).hide();
   $("#time15",myform15).hide();
   $("#return15",myform15).hide();
   $("#start15",myform15).css('display','');
     
        
}

// end section15


// section16
var currentquestion16 = 0;
var correctAnswers16= 0; 

var myform16=$("#myform16");
$("#stage16",myform16).hide();
$("#return16",myform16).hide(); 
$('#startbutton16',myform16).bind('click',start16); 

function start16(){ 
 count16=0;
 var currentquestion16 = 0;
 var correctAnswers16 = 0;   
 clearInterval(timer16);
 $("#start16",myform16).hide();
 $("#time16",myform16).hide(); 
 $("#stage16",myform16).fadeIn();   
 setupOptions16();  
 var timer16=setInterval(updateTime16, 1600);
}

function updateTime16() {
    count16=count16+1;
    var result=duration(count16);
    $("#output16",myform16).text('Time: '+result);
        if (currentquestion16 == section16.length-1) {
           document.getElementById("time16").innerHTML ='You Spent about '+ result+' <br> My timming can be funny and faster!';
        }
    
}

function setupOptions16() {
  $('#question16',myform16).html(parseInt(currentquestion16) + 1 + ". " + section16[currentquestion16].question);
  var options = section16[currentquestion16].choices;
   var formHtml='';
   
      for (var i = 0; i < options.length; i++) {       
        var option=section16[currentquestion16].choices[i];
        var button='#16opt'+i;
        $(button,myform16).html(option);
      }
          
  
}

function checkAns16() {
  if ($("input[name=16opt]:checked",myform16).val() == section16[currentquestion16].correctAnswer) {
       
        if(navigator.notification){
          navigator.notification.alert('Keep it Up',null,'Correct!','Continue');  
        }else{
            alert('Correct!!!'); 
          }
        
    correctAnswers16++;
  }else{
       var correctAnswer=section16[currentquestion16].choices[section16[currentquestion16].correctAnswer];       
        if(navigator.notification){
          navigator.notification.alert('The correct answer is: '+correctAnswer,null,'Oops!','Continue');  
        }else{
            alert('Oops, thats wrong, the correct answer is: '+correctAnswer);
          }
    }
  
} 

$("input[name=16opt]",myform16).bind('click',main16);

function main16(event){
    event.preventDefault();
    checkAns16();
    currentquestion16++;
    
    if (currentquestion16 < section16.length) {
      setupOptions16();   
    }    
   
    if (currentquestion16 == section16.length) {
       $("#stage16",myform16).hide();
       $("#return16",myform16).show();
       $("#time16",myform16).show();
       $("#result16",myform16).html("You correctly answered " + correctAnswers16 + " out of " + currentquestion16 + " questions! ");       
       $("#result16",myform16).show(); 
       
       currentquestion16 = 0;
       correctAnswers16 = 0;   
          
          
    }
}
 
$("#return16",myform16).bind('click',dismiss16);

function dismiss16(event){
   
   $("#result16",myform16).hide();
   $("#time16",myform16).hide();
   $("#return16",myform16).hide();
   $("#start16",myform16).css('display','');
     
        
}

// end section16

// section17
var currentquestion17 = 0;
var correctAnswers17= 0; 

var myform17=$("#myform17");
$("#stage17",myform17).hide();
$("#return17",myform17).hide(); 
$('#startbutton17',myform17).bind('click',start17); 

function start17(){ 
 count17=0;
 var currentquestion17 = 0;
 var correctAnswers17 = 0;   
 clearInterval(timer17);
 $("#start17",myform17).hide();
 $("#time17",myform17).hide(); 
 $("#stage17",myform17).fadeIn();   
 setupOptions17();  
 var timer17=setInterval(updateTime17, 1700);
}

function updateTime17() {
    count17=count17+1;
    var result=duration(count17);
    $("#output17",myform17).text('Time: '+result);
        if (currentquestion17 == section17.length-1) {
           document.getElementById("time17").innerHTML ='You Spent about '+ result+' <br> My timming can be funny and faster!';
        }
    
}

function setupOptions17() {
  $('#question17',myform17).html(parseInt(currentquestion17) + 1 + ". " + section17[currentquestion17].question);
  var options = section17[currentquestion17].choices;
   var formHtml='';
   
      for (var i = 0; i < options.length; i++) {       
        var option=section17[currentquestion17].choices[i];
        var button='#17opt'+i;
        $(button,myform17).html(option);
      }
          
  
}

function checkAns17() {
  if ($("input[name=17opt]:checked",myform17).val() == section17[currentquestion17].correctAnswer) {
       
        if(navigator.notification){
          navigator.notification.alert('Keep it Up',null,'Correct!','Continue');  
        }else{
            alert('Correct!!!'); 
          }
        
    correctAnswers17++;
  }else{
       var correctAnswer=section17[currentquestion17].choices[section17[currentquestion17].correctAnswer];       
        if(navigator.notification){
          navigator.notification.alert('The correct answer is: '+correctAnswer,null,'Oops!','Continue');  
        }else{
            alert('Oops, thats wrong, the correct answer is: '+correctAnswer);
          }
    }
  
} 

$("input[name=17opt]",myform17).bind('click',main17);

function main17(event){
    event.preventDefault();
    checkAns17();
    currentquestion17++;
    
    if (currentquestion17 < section17.length) {
      setupOptions17();   
    }    
   
    if (currentquestion17 == section17.length) {
       $("#stage17",myform17).hide();
       $("#return17",myform17).show();
       $("#time17",myform17).show();
       $("#result17",myform17).html("You correctly answered " + correctAnswers17 + " out of " + currentquestion17 + " questions! ");       
       $("#result17",myform17).show(); 
       
       currentquestion17 = 0;
       correctAnswers17 = 0;   
          
          
    }
}
 
$("#return17",myform17).bind('click',dismiss17);

function dismiss17(event){
   
   $("#result17",myform17).hide();
   $("#time17",myform17).hide();
   $("#return17",myform17).hide();
   $("#start17",myform17).css('display','');
     
        
}

// end section17

// section18
var currentquestion18 = 0;
var correctAnswers18= 0; 

var myform18=$("#myform18");
$("#stage18",myform18).hide();
$("#return18",myform18).hide(); 
$('#startbutton18',myform18).bind('click',start18); 

function start18(){ 
 count18=0;
 var currentquestion18 = 0;
 var correctAnswers18 = 0;   
 clearInterval(timer18);
 $("#start18",myform18).hide();
 $("#time18",myform18).hide(); 
 $("#stage18",myform18).fadeIn();   
 setupOptions18();  
 var timer18=setInterval(updateTime18, 1800);
}

function updateTime18() {
    count18=count18+1;
    var result=duration(count18);
    $("#output18",myform18).text('Time: '+result);
        if (currentquestion18 == section18.length-1) {
           document.getElementById("time18").innerHTML ='You Spent about '+ result+' <br> My timming can be funny and faster!';
        }
    
}

function setupOptions18() {
  $('#question18',myform18).html(parseInt(currentquestion18) + 1 + ". " + section18[currentquestion18].question);
  var options = section18[currentquestion18].choices;
   var formHtml='';
   
      for (var i = 0; i < options.length; i++) {       
        var option=section18[currentquestion18].choices[i];
        var button='#18opt'+i;
        $(button,myform18).html(option);
      }
          
  
}

function checkAns18() {
  if ($("input[name=18opt]:checked",myform18).val() == section18[currentquestion18].correctAnswer) {
       
        if(navigator.notification){
          navigator.notification.alert('Keep it Up',null,'Correct!','Continue');  
        }else{
            alert('Correct!!!'); 
          }
        
    correctAnswers18++;
  }else{
       var correctAnswer=section18[currentquestion18].choices[section18[currentquestion18].correctAnswer];       
        if(navigator.notification){
          navigator.notification.alert('The correct answer is: '+correctAnswer,null,'Oops!','Continue');  
        }else{
            alert('Oops, thats wrong, the correct answer is: '+correctAnswer);
          }
    }
  
} 

$("input[name=18opt]",myform18).bind('click',main18);

function main18(event){
    event.preventDefault();
    checkAns18();
    currentquestion18++;
    
    if (currentquestion18 < section18.length) {
      setupOptions18();   
    }    
   
    if (currentquestion18 == section18.length) {
       $("#stage18",myform18).hide();
       $("#return18",myform18).show();
       $("#time18",myform18).show();
       $("#result18",myform18).html("You correctly answered " + correctAnswers18 + " out of " + currentquestion18 + " questions! ");       
       $("#result18",myform18).show(); 
       
       currentquestion18 = 0;
       correctAnswers18 = 0;   
          
          
    }
}
 
$("#return18",myform18).bind('click',dismiss18);

function dismiss18(event){
   
   $("#result18",myform18).hide();
   $("#time18",myform18).hide();
   $("#return18",myform18).hide();
   $("#start18",myform18).css('display','');
     
        
}

// end section18

// section19
var currentquestion19 = 0;
var correctAnswers19= 0; 

var myform19=$("#myform19");
$("#stage19",myform19).hide();
$("#return19",myform19).hide(); 
$('#startbutton19',myform19).bind('click',start19); 

function start19(){ 
 count19=0;
 var currentquestion19 = 0;
 var correctAnswers19 = 0;   
 clearInterval(timer19);
 $("#start19",myform19).hide();
 $("#time19",myform19).hide(); 
 $("#stage19",myform19).fadeIn();   
 setupOptions19();  
 var timer19=setInterval(updateTime19, 1900);
}

function updateTime19() {
    count19=count19+1;
    var result=duration(count19);
    $("#output19",myform19).text('Time: '+result);
        if (currentquestion19 == section19.length-1) {
           document.getElementById("time19").innerHTML ='You Spent about '+ result+' <br> My timming can be funny and faster!';
        }
    
}

function setupOptions19() {
  $('#question19',myform19).html(parseInt(currentquestion19) + 1 + ". " + section19[currentquestion19].question);
  var options = section19[currentquestion19].choices;
   var formHtml='';
   
      for (var i = 0; i < options.length; i++) {       
        var option=section19[currentquestion19].choices[i];
        var button='#19opt'+i;
        $(button,myform19).html(option);
      }
          
  
}

function checkAns19() {
  if ($("input[name=19opt]:checked",myform19).val() == section19[currentquestion19].correctAnswer) {
       
        if(navigator.notification){
          navigator.notification.alert('Keep it Up',null,'Correct!','Continue');  
        }else{
            alert('Correct!!!'); 
          }
        
    correctAnswers19++;
  }else{
       var correctAnswer=section19[currentquestion19].choices[section19[currentquestion19].correctAnswer];       
        if(navigator.notification){
          navigator.notification.alert('The correct answer is: '+correctAnswer,null,'Oops!','Continue');  
        }else{
            alert('Oops, thats wrong, the correct answer is: '+correctAnswer);
          }
    }
  
} 

$("input[name=19opt]",myform19).bind('click',main19);

function main19(event){
    event.preventDefault();
    checkAns19();
    currentquestion19++;
    
    if (currentquestion19 < section19.length) {
      setupOptions19();   
    }    
   
    if (currentquestion19 == section19.length) {
       $("#stage19",myform19).hide();
       $("#return19",myform19).show();
       $("#time19",myform19).show();
       $("#result19",myform19).html("You correctly answered " + correctAnswers19 + " out of " + currentquestion19 + " questions! ");       
       $("#result19",myform19).show(); 
       
       currentquestion19 = 0;
       correctAnswers19 = 0;   
          
          
    }
}
 
$("#return19",myform19).bind('click',dismiss19);

function dismiss19(event){
   
   $("#result19",myform19).hide();
   $("#time19",myform19).hide();
   $("#return19",myform19).hide();
   $("#start19",myform19).css('display','');
     
        
}

// end section19

// section20
var currentquestion20 = 0;
var correctAnswers20= 0; 

var myform20=$("#myform20");
$("#stage20",myform20).hide();
$("#return20",myform20).hide(); 
$('#startbutton20',myform20).bind('click',start20); 

function start20(){ 
 count20=0;
 var currentquestion20 = 0;
 var correctAnswers20 = 0;   
 clearInterval(timer20);
 $("#start20",myform20).hide();
 $("#time20",myform20).hide(); 
 $("#stage20",myform20).fadeIn();   
 setupOptions20();  
 var timer20=setInterval(updateTime20, 2000);
}

function updateTime20() {
    count20=count20+1;
    var result=duration(count20);
    $("#output20",myform20).text('Time: '+result);
        if (currentquestion20 == section20.length-1) {
           document.getElementById("time20").innerHTML ='You Spent about '+ result+' <br> My timming can be funny and faster!';
        }
    
}

function setupOptions20() {
  $('#question20',myform20).html(parseInt(currentquestion20) + 1 + ". " + section20[currentquestion20].question);
  var options = section20[currentquestion20].choices;
   var formHtml='';
   
      for (var i = 0; i < options.length; i++) {       
        var option=section20[currentquestion20].choices[i];
        var button='#20opt'+i;
        $(button,myform20).html(option);
      }
          
  
}

function checkAns20() {
  if ($("input[name=20opt]:checked",myform20).val() == section20[currentquestion20].correctAnswer) {
       
        if(navigator.notification){
          navigator.notification.alert('Keep it Up',null,'Correct!','Continue');  
        }else{
            alert('Correct!!!'); 
          }
        
    correctAnswers20++;
  }else{
       var correctAnswer=section20[currentquestion20].choices[section20[currentquestion20].correctAnswer];       
        if(navigator.notification){
          navigator.notification.alert('The correct answer is: '+correctAnswer,null,'Oops!','Continue');  
        }else{
            alert('Oops, thats wrong, the correct answer is: '+correctAnswer);
          }
    }
  
} 

$("input[name=20opt]",myform20).bind('click',main20);

function main20(event){
    event.preventDefault();
    checkAns20();
    currentquestion20++;
    
    if (currentquestion20 < section20.length) {
      setupOptions20();   
    }    
   
    if (currentquestion20 == section20.length) {
       $("#stage20",myform20).hide();
       $("#return20",myform20).show();
       $("#time20",myform20).show();
       $("#result20",myform20).html("You correctly answered " + correctAnswers20 + " out of " + currentquestion20 + " questions! ");       
       $("#result20",myform20).show(); 
       
       currentquestion20 = 0;
       correctAnswers20 = 0;   
          
          
    }
}
 
$("#return20",myform20).bind('click',dismiss20);

function dismiss20(event){
   
   $("#result20",myform20).hide();
   $("#time20",myform20).hide();
   $("#return20",myform20).hide();
   $("#start20",myform20).css('display','');
     
        
}

// end section20
