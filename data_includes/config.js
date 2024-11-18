PennController.ResetPrefix(null); // makes commmand names simpler
PennController.DebugOff(); // disables debug messages

var showProgressBar = false; // disables progress bar
var practiceItemTypes = ["practice"]; // practice trial types
var manualSendResults = true; // manual sending of results

// default maze settings
var defaults = [ 
    "Maze", { redo: true, time: 1000, emess: "Incorrect. Please wait..." } 
];
