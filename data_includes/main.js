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
var defaults = [ "Maze", { redo: true, time: 1000, emess: "Incorrect. Please wait..." } ];

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
        [row.label, "PennController", newTrial(
            newController("Maze", { s: row.sentence, a: row.alternative, redo: true, time: 1000, emess: "Incorrect. Please wait..." })
              .print()
              .log()
              .wait()
        )
        .log("counter", __counter_value_from_server__)
        .log("label", row.label)
        .log("num", row.num)
        .log("controller", row.controller)
        .log("group", row.group)
        ]
    );
    return newTrial('_dummy_', null); // dummy trial for processing
});

var items = [
    ["setcounter", "__SetCounter__", { }],
    ["sendresults", "__SendResults__", { }],
    ["sep", "MazeSeparator", { normalMessage: "Correct! Press any key to continue", errorMessage: "Incorrect! Press any key to continue." }],
    ["consent", "Form", { html: { include: "consent.html" } }],
    ["demo", "Form", { html: { include: "demo.html" }, validators: { age: function (s) { if (s.match(/^\d+$/)) return true; else return "Bad value for \u2018age\u2019";} } }],
    ["intro", "Form", { html: { include: "intro.html" } }],
    ["startpractice", Message, {consentRequired: false, html: ["div", ["p", "First you can do eight practice sentences."]]}],

    // practice items
    [["practice", 101], "Maze", {s:"The husband of the beautiful woman bought her roses and candy for her birthday.", a:"x-x-x arrived bad sum conducted shift breast eat basal net wedge am may maritime."}],
    [["practice", 102], "Maze", {s:"The patient who the doctor treated became better after only a few treatments.", a:"x-x-x protect non sun assume liberal letter choose frame star lot art whatsoever."}],
    [["practice", 103], "Maze", {s:"Maya played with the blocks and the balls, but she soon got bored with them.", a:"x-x-x myself hear nor refers am nor loses, thy thy boys low creed risk dear."}],
    [["practice", 104], "Maze", {s:"The therapist set up a meeting with the upset woman and her husband yesterday.", a:"x-x-x literally sea try sum matters male sky grows thick joy sum density obtaining."}],
    [["practice", 105], "Maze", {s:"The reporter had dinner yesterday with the baseball player who Kevin admired.", a:"x-x-x avoiding non stream molecules sand sum limiting ethnic sky Swear declare."}],
    [["practice", 106], "Maze", {s:"The visitors at the zoo watched the zookeeper who the monkeys and apes teased.", a:"x-x-x spending mid ran ivy violent sin reprising sin law drifted non bake flares."}],
    [["practice", 107], "Maze", {s:"The mother of the prisoner sent him packages that contained cookies and novels.", a:"x-x-x killed dry may mentions acid why resorted tube dependent forbids sin sooner."}],
    [["practice", 108], "Maze", {s:"The semester will start next week, but the students and teachers are not ready.", a:"x-x-x steroids ways sales army fear, ago sat identify bad realized joy ran yield."}],
    
    // message that experiment is beginning
    ["starter", Message, {consentRequired: false, html: ["div", ["p", "Time to start the main portion of the experiment!"]]}],
    ["completion", "Form", {continueMessage: null, html: { include: "completion.html" } } ]
];
