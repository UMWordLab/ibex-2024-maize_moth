PennController.ResetPrefix(null); // makes commmand names simpler

var shuffleSequence = seq("consent", "demo", "IDentry", "intro",
    "startpractice",
    sepWith("sep", seq("practice")),
    "setcounter", // putting counter after practice so it won't increment all at the same time when participants show up, as that messes up lists
    "starter",
    // trials named _dummy_ will be excluded by following:
    sepWith("sep", rshuffle(startsWith("gulordava"))),
    "sendresults",
    "completion"
);