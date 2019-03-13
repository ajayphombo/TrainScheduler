
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyA87c7RdfD_llF2BBo2QO_XRLgzZXdiYkc",
    authDomain: "newpro-5d09e.firebaseapp.com",
    databaseURL: "https://newpro-5d09e.firebaseio.com",
    projectId: "newpro-5d09e",
    storageBucket: "newpro-5d09e.appspot.com",
    messagingSenderId: "495885513859"
  };
  firebase.initializeApp(config);
  
var database = firebase.database();

$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  var trainName = $("#train-name-input").val().trim();
  var trainDestination = $("#destination-input").val().trim();
  var timeFirst = moment($("#first-time-input").val().trim(), "HHmm").format("X");
  var freq = $("#frequency-input").val().trim();
 

  var newTrain = {
    name: trainName,
    destination: trainDestination,
    firstTime: timeFirst ,
    frequency: freq,
  
  };

  database.ref().push(newTrain);

 console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.firstTime);
  console.log(newTrain.frequency);

  alert("New Train Schedule added");

  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-time-input").val("");
  $("#frequency-input").val("");
});

database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  var trainName = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().destination;
  var timeFirst = childSnapshot.val().firstTime;
  var freq = childSnapshot.val().frequency;
  
  console.log(trainName);
  console.log(trainDestination);
  console.log(timeFirst);
  console.log(freq);
  var timeFirstConverted = moment(timeFirst, "HH:mm").subtract(1, "years");
  var currentTime = moment();
  var diffTime = moment().diff(moment(timeFirstConverted), "minutes");
  var tRemainder = diffTime % freq;
  var timeUntillTrain = freq - tRemainder;
  var nextArrival = moment().add(timeUntillTrain, "minutes");

  
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(trainDestination),
    $("<td>").text(freq),
   $("<td>").text(nextArrival),
   $("<td>").text(timeUntillTrain),

    
  );

  $("#train-table > tbody").append(newRow);
});
