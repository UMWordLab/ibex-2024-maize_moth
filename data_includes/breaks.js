PennController.ResetPrefix(null); // makes commmand names simpler

// function to insert breaks every 12 maze sentences
function modifyRunningOrder(ro) {
    var new_ro = []; // new running order to be created with breaks
    item_count = 0; // # of items processed

    // VARIABLES TO BE CHANGED 
    blockDim = 84; // # of items in a block
    breakCt = 12; // break occurs every # of items 
    maxItems = 95; // maximum # of items to include breaks for
    totalBlocks = 8; // total # of blocks in the experiment

    for (var i in ro) {
        var item = ro[i];

        // only items with specific prefixes should be includes
        if (item[0].type.startsWith("relative") || item[0].type.startsWith("and") || item[0].type.startsWith("adverb") || item[0].type.startsWith("filler")) {
            item_count++;
            new_ro.push(item);
            if (item_count % breakCt === 0 && item_count < maxItems) { // add break every 12 items
                if (item_count === blockDim) {
                    text = "End of block. Only 1 block left!";
                } else {
                    text="End of block. "+ (totalBlocks - (Math.floor(item_count / breakCt))) + " blocks left.";
                }
            } 
            ro[i].push(new DynamicElement("Message", {html: "<p>30-second break - stretch and look away from the screen briefly if needed.</p>", transfer: 30000 }));
        } else new_ro.push(item);
    } 
    return new_ro;
}
