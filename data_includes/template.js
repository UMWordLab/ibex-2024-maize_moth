PennController.ResetPrefix(null); // makes commmand names simpler

// template to load experimental stimuli from CSV file
Template("gulordava_amaze.csv", row => {
    // sssign group based on a Latin Square design (alternating between 'list1' and 'list2')
    var group = row.group; // ese the group column directly from csv (list1 or list2)

    // generate the trial
    return newTrial([row.label, row.num], "PennController", newTrial(
        newController("Maze", {s: row.sentence, a: row.alternative, redo: true, time: 1000, emess: "Incorrect. Please wait..."})
            .print()
            .log()
            .wait()
    )
    .log("counter", __counter_value_from_server__)
    .log("num", row.num)               
    .log("label", row.label)     
    .log("group", group) // Log the assigned group
    );
});