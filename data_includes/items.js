PennController.ResetPrefix(null); // makes commmand names simpler

// all variables being used
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
