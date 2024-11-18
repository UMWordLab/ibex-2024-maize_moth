PennController.ResetPrefix(null); // makes commmand names simpler

// trial to collect participant ID
newTrial("IDentry",
    newVar("partID").global(), // declare partID as a global variable
    newText("instr", "Please enter your Prolific ID:").print(),
    newHtml("partpage", "<input type='text' id='partID' name='participant ID' min='1' max='120'>").print(),
    newButton("Next").print().wait(
        getVar("partID").set(v => $("#partID").val()).testNot.is('') // wait for a valid input
    )
)
.log("partID", getVar("partID")); // ;og participant ID

// header to log ID on every trial
// run at the beginning of each trial
Header(
    newVar("partID").global() 
)
.log("partid", getVar("partID")); // log ID for each trial