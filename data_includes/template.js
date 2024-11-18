PennController.ResetPrefix(null); // makes commmand names simpler

// template to load experimental stimuli from CSV file
Template("gulordava_amaze.csv", row => {
    items.push(
        // FIXME
        // DO I NEED ROW.NUM?? I didn't know what else to put here
        [[row.label, row.num], "PennController", newTrial(
            newController("Maze", {s: row.sentence, a: row.alternative, redo: true, time:1000, emess: "Incorrect. Please wait..."})
              .print()
              .log()
              .wait()
        )
        .log("counter", __counter_value_from_server__)
        .log("num", row.num)               
        .log("label", row.label)     
        ]
    );
    return newTrial('_dummy_',null);
});