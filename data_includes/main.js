PennController.ResetPrefix(null); // makes commmand names simpler
PennController.DebugOff(); // disables debug messages

var shuffleSequence = seq("consent", "demo", "IDentry", "intro",
                          "startpractice",
                          sepWith("sep", seq("practice")),
                          "setcounter", // putting counter after practice so it won't increment all at the same time when participants show up, as that messes up lists
                          "starter",
                          // trials named _dummy_ will be excluded by following:
                          sepWith("sep", randomize(anyOf(startsWith("adverb"),startsWith("and"), startsWith("filler"), startsWith("relative")))),
                          "sendresults",
                          "completion"
);

// trial to collect participant ID
newTrial("IDentry",
    newVar("partID").global(), // ceclare partID as a global variable
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

var showProgressBar = false; // disables progress bar
var practiceItemTypes = ["practice"]; // practice trial types
var manualSendResults = true; // manual sending of results

// default maze settings
var defaults = [
    "Maze", { redo: true, time: 1000, emess: "Incorrect. Please wait..." }
];

// function to insert breaks every 12 maze sentences
function modifyRunningOrder(ro) {
    var new_ro = []; // new running order to be created with breaks
    item_count = 0; // # of items processed
    for (var i in ro) {
        var item = ro[i];

        // only items with specific prefixes should be includes
        if (item[0].type.startsWith("rel")|| item[0].type.startsWith("and") || item[0].type.startsWith("adverb")||item[0].type.startsWith("filler")) {
            item_count++;
            new_ro.push(item);
            if (item_count % 12 === 0 && item_count < 95) { // add break every 20 items
                // block = 84 items
                if (item_count === 84) text = "End of block. Only 1 block left!";
                else text="End of block. "+ (8 - (Math.floor(item_count / 12))) + " blocks left.";
            } new_ro[i].push(new DynamicElement("Message", {html: "<p>30-second break - stretch and look away from the screen briefly if needed.</p>", transfer: 30000 }));
            /*                 ro[i].push(new DynamicElement("Message", 
                              { html: "<p>30-second break - stretch and look away from the screen briefly if needed.</p>", transfer: 30000 }));
                              */
        } else new_ro.push(item);
    } return new_ro;
  }

// template to load experimental stimuli from CSV file
Template("gulordava_amaze.csv", row => {
    items.push(
        [[row.label, row.item], "PennController", newTrial(
            newController("Maze", { s: row.sentence, a: row.alternative, redo: true, time: 1000, emess: "Incorrect. Please wait..." })
              .print()
              .log()
              .wait()
        )
        .log("counter", __counter_value_from_server__)
        .log("item", row.item)
        .log("cond1", row.cond1)
        .log("cond2", row.cond2)
        .log("cond3", row.cond3)
        .log("cond4", row.cond4)
        .log("group", row.group)
        ]
    );
    return newTrial('_dummy_', null); // dummy trial for processing
});

// messages for result submission and completion
var sendingResultsMessage = "The results are now being transferred. Please wait.";
var completionMessage = "Thank you for your participation.  The results were successfully transmitted.  Your participation code is: " + code.toString();
var completionErrorMessage = "The transmission of the results failed.  Please contact online_experiment@mit.edu and retry the transmission again by clicking the link.  Your participation code is: " + code.toString();

var items = [
    ["setcounter", "__SetCounter__", { }],
    ["sendresults", "__SendResults__", { }],
    ["sep", "MazeSeparator", { normalMessage: "Correct! Press any key to continue", errorMessage: "Incorrect! Press any key to continue." }],
    ["consent", "Form", { html: { include: "consent.html" } }],
    ["demo", "Form", { html: { include: "demo.html" }, validators: { age: function (s) { if (s.match(/^\d+$/)) return true; else return "Bad value for \u2018age\u2019";} } }],
    ["intro", "Form", { html: { include: "intro.html" } }],
    ["startpractice", Message, {consentRequired: false, html: ["div", ["p", "First you can do three practice sentences."]]}],

    // practice items
    [["practice", 801], "Maze", {s:"The teacher perplexed the first class.", a:"x-x-x tends bisects done continues holy"}],
    [["practice", 802], "Maze", {s:"The boss understandably smiled during the meeting.", a:"x-x-x about obligatoriness filters allow push considerably."}],
    [["practice", 803], "Maze", {s:"The father chuckled while he cleaned.", a:"x-x-x slid quadratic goals add analyst."}],

    // message that experiment is beginning
    ["starter", Message, {consentRequired: false, html: ["div", ["p", "Time to start the main portion of the experiment!"]]}],
    ["completion", "Form", {continueMessage: null, html: { include: "completion.html" } } ],

];
