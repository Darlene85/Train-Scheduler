//key to firebase
var config = {
    apiKey: "AIzaSyDMBlbEU3uBuxrMb7BgKujn2DQLCcRMqc8",
    authDomain: "train-schedule-bdc6e.firebaseapp.com",
    databaseURL: "https://train-schedule-bdc6e.firebaseio.com",
    projectId: "train-schedule-bdc6e",
    storageBucket: "train-schedule-bdc6e.appspot.com",
    messagingSenderId: "25958879409"
  };
//connects to firebase
firebase.initializeApp(config);

//creates variable for firebase
var database = firebase.database();

//submit onclick functiton for user input
$("#add-info").on("click", function (event) {
    //prevents the page from refreshing
    event.preventDefault();
    //variables for user input
    var name = $("#name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var time = $("#time-input").val().trim();
    var frequency = $("#frequency-input").val().trim();
    
    //variable to hold user's input
    var newTrain = {
        name: name,
        destination: destination,
        time: time,
        frequency: frequency
    }
    //adds input to firebase
    database.ref().push(newTrain)
    //shows user input
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.time);
    console.log(newTrain.frequency);
    //alerts user that their information has been submitted
    alert("Train successfully added");
    //this clears the use input
    $("#name-input").val("");
    $("#destination-input").val("");
    $("#time-input").val("");
    $("#frequency-input").val("");
});
//this is a function to add input to firebase
database.ref().on("child_added", function (childSnapshot) {
    //this console logs the snapshot of user input
    console.log(childSnapshot.val());
    //this creates variables that will pull the value of each input
    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var trainTime = childSnapshot.val().time;
    var trainFrequency = childSnapshot.val().frequency;
    //this will console the added train info
    console.log(trainName);
    console.log(trainDestination);
    console.log(trainTime);
    console.log(trainFrequency);

    // var militaryTime = moment.format("HHmm");
    
    
    //this creates table data that will appear written to the table
    var $trainTime = $("<td>").text(trainTime);
    var $trainName = $("<td>").text(trainName);
    var $trainDest = $("<td>").text(trainDestination);
    var $trainFreq = $("<td>").text(trainFrequency);
    //this is creating a new row and appending the targeted information 
    var $newRow = $("<tr>").append($trainTime,$trainName,$trainDest,$trainFreq)
    //this says that the table is the heirarchy and the information below will hold where the information will append to
    $("table > tbody").append($newRow);

});
