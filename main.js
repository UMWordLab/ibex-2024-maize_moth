PennController.ResetPrefix(null); // makes commmand names simpler
PennController.DebugOff(); // disables debug messages

var shuffleSequence = seq(
    "code", "setcounter", "welcome", // setting counter and showing welcome message
    "intro-gram", "intro-practice", // intro and practice trials
    followEachWith("sep", "practice"), // inserting separators between practice trials
    "end-practice", // end of practice message
    followEachWith("sep",randomize(anyOf(startsWith("rel"),startsWith("and"), startsWith("adverb"), startsWith("filler")))), 
                   // main trials, randomized and separated 
    "explanation","instructions2", 
    anyOf("questionnaire"), // questionnaire section
    "topic","debriefing" //debriefing messages
);

var showProgressBar = false; // disables progress bar

// default configuration for questions
var defaults = [
		"Question", {
				as: ["yes", "no"], // answer choices
        presentAsScale: false,
        presentHorizontally: false,
    },
];

// generating a random code for participant completion
var code = Math.floor(Math.random()*100000000);

// messages for result submission and completion
var sendingResultsMessage = "The results are now being transferred. Please wait.";
var completionMessage = "Thank you for your participation.  The results were successfully transmitted.  Your participation code is: " + code.toString();
var completionErrorMessage = "The transmission of the results failed.  Please contact online_experiment@mit.edu and retry the transmission again by clicking the link.  Your participation code is: " + code.toString();

var items = [
    // display the random completion code
    ["code", "DashedSentence", { s: code.toString(), mode: "speeded acceptability", wordTime: 1 }],
    // set counter for participant tracking
    ["setcounter", "__SetCounter__", { }],
    // welcome message with introductory text
    ["welcome", "Message", { html: '<h2>Thank you very much for your participation!</h2> ...' }],
    // explanation trial w/ an open-ended question 
    ["explanation", "Form", { html: 'How was your experience ... <textarea name="explanation" rows="3" cols="50"></textarea>' }],
    // instructions about background questions
    ["instructions2", "Message", { html:'Now please answer a couple of questions about your background.  In accordance with the ethics guidelines of the Massachusetts Institute of Technology, this information will be stored in anonymous form and it will be impossible to link it to you.'}],
    // age question
    ["questionnaire", "Form", { html:'How old are you? <input type="text" name="age" size="2" maxlength="2" autofocus="true"/>'}],
    // gender question
    ["questionnaire", "Question", { q: "Please select your gender.", as: ["Male", "Female", "Other"] }],
    // state question
    ["questionnaire", "Form", { html: 'Please select your home state: <select name="state"> <option value="other">[other]</option> <option value="AL">AL</option> <option value="AK">AK</option> <option value="AS">AS</option> <option value="AZ">AZ</option> <option value="AR">AR</option> <option value="CA">CA</option> <option value="CO">CO</option> <option value="CT">CT</option> <option value="DE">DE</option> <option value="DC">DC</option> <option value="FM">FM</option> <option value="FL">FL</option> <option value="GA">GA</option> <option value="GU">GU</option> <option value="HI">HI</option> <option value="ID">ID</option> <option value="IL">IL</option> <option value="IN">IN</option> <option value="IA">IA</option> <option value="KS">KS</option> <option value="KY">KY</option> <option value="LA">LA</option> <option value="ME">ME</option> <option value="MH">MH</option> <option value="MD">MD</option> <option value="MA">MA</option> <option value="MI">MI</option> <option value="MN">MN</option> <option value="MS">MS</option> <option value="MO">MO</option> <option value="MT">MT</option> <option value="NE">NE</option> <option value="NV">NV</option> <option value="NH">NH</option> <option value="NJ">NJ</option> <option value="NM">NM</option> <option value="NY">NY</option> <option value="NC">NC</option> <option value="ND">ND</option> <option value="MP">MP</option> <option value="OH">OH</option> <option value="OK">OK</option> <option value="OR">OR</option> <option value="PW">PW</option> <option value="PA">PA</option> <option value="PR">PR</option> <option value="RI">RI</option> <option value="SC">SC</option> <option value="SD">SD</option> <option value="TN">TN</option> <option value="TX">TX</option> <option value="UT">UT</option> <option value="VT">VT</option> <option value="VI">VI</option> <option value="VA">VA</option> <option value="WA">WA</option> <option value="WV">WV</option> <option value="WI">WI</option> <option value="WY">WY</option> </select>'}],
    // highest level of education question
    ["questionnaire", "Question", {q:"Please select the highest level of education you have attained:", as:["Less than high school", "High school graduate", "Some college", "2-year college degree", "4-year college degree", "Professional degree", "Doctorate"]}],
    // more questions
    ["questionnaire", "Question", { q: "Are you a citizen of the United States?" }],
    ["questionnaire", "Question", { q: "Are you a native speaker of English?" }],
    ["questionnaire", "Question", { q: "Do you currently reside in the United States?" }],
    ["topic", "Form", { html: 'Very briefly, what do you think this study is about? <textarea name="topic" rows="3" cols="50"></textarea>' }],
    // debrief message
    ["debriefing", "Message", { html: 'Thank you. You will receive the participation code on the next page. .</p>\n\n<p>Purpose of this study (feel free to skip): We’re generally interested in how the human brain processes language. The present study is testing out a new method for studying what types of sentence constructions are easier or harder to read. Your data will help us to answer these questions.</p>'}],
    // introduction
    ["intro-gram", "Message", { html: "<p>For this experiment, please place your left index finger on the 'e' key and your right index finger on the 'i' key.</p><p> You will read sentences word by word. On each screen you will see two options: one will be the next word in the sentence, and one will not. Select the word that continues the sentence by pressing 'e' (left-hand) for the word on the left or pressing 'i' (right-hand) for the word on the right.</p><p>Select the best word as quickly as you can, but without making too many errors.</p>"}],
    // practice trials intro
    ["intro-practice", "Message", { html: "The following items are for practice." }],
    // end of practice message
    ["end-practice", "Message", { html: "End of practice. The experiment will begin next." }],
    // separator messages between maze trials
    ["sep", "MazeSeparator", { normalMessage: "Correct! Press any key to continue", errorMessage: "Incorrect! Press any key to continue." }],
    // completion message
    ["done", "Message", { html: "All done!" }]
    
    // ADDITIONAL ITEMS
    ["setcounter", "__SetCounter__", { }],
    ["sendresults", "__SendResults__", { }],
    ["sep", "MazeSeparator", { normalMessage: "Correct! Press any key to continue", errorMessage: "Incorrect! Press any key to continue." }],
    ["consent", "Form", { html: { include: "consent.html" } }],
    ["demo", "Form", { html: { include: "demo.html" }, validators: { age: function (s) { if (s.match(/^\d+$/)) return true; else return "Bad value for \u2018age\u2019";} } }],
    ["intro", "Form", { html: { include: "intro1.html" } }],
    ["startpractice", Message, {consentRequired: false, html: ["div", ["p", "First you can do three practice sentences."]]}],

    // practice items
    [["practice", 801], "Maze", {s:"The teacher perplexed the first class.", a:"x-x-x tends bisects done continues holy"}],
    [["practice", 802], "Maze", {s:"The boss understandably smiled during the meeting.", a:"x-x-x about obligatoriness filters allow push considerably."}],
    [["practice", 803], "Maze", {s:"The father chuckled while he cleaned.", a:"x-x-x slid quadratic goals add analyst."}],

    // message that experiment is beginning
    ["starter", Message, {consentRequired: false, html: ["div", ["p", "Time to start the main portion of the experiment!"]]}],
    ["completion", "Form", {continueMessage: null, html: { include: "completion.html" } } ],

];

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