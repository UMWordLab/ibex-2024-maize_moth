PennController.ResetPrefix(null); // makes commmand names simpler

// template to load experimental stimuli from CSV file
Template("gulordava_amaze.csv", row => newTrial("gulordava_" + row.label + "_" + row.item, "PennController", newTrial(
        newController("Maze", {s: row.sentence, a: row.alternative, redo: true, time: 1000, emess: "Incorrect. Please wait..."})
            .print()
            .log()
            .wait()
    )
    .log("counter", __counter_value_from_server__)   
    .log("item", row.item)         
    .log("label", row.label)     
    .log("group", row.group) // log the assigned group
    )
)