function create_footer(container){
    let footer = create_element("footer", container, "mainFrameFooter");

    let previousWeekButton = create_element("button", footer, "previousWeekButton", "<");
    previousWeekButton.onclick = changeWeek;

    create_current_week_entry(footer);

    let nextWeekButton = create_element("button", footer, "nextWeekButton", ">");
    nextWeekButton.onclick = changeWeek;
}



function create_current_week_entry(container){
    let currentWeekEntry = create_element("input", container, "currentWeekEntry");
    
    currentWeekEntry.placeholder = "week number";
    currentWeekEntry.value = 32; // input's value

    currentWeekEntry.addEventListener("compositionstart", (e) => {
        currentWeekEntry.disabled = true; // allow to disable composition

        sleep(5); // need to call sleep since keyUp can't be used to enable it

        currentWeekEntry.disabled = false;
    });

    currentWeekEntry.onkeydown = (e) => {
        // Array.from : take list and return a list with the 'i + 1' op
        // Array(n) : 0 to n-1
        let numberKeyCodes = Array.from(Array(10), (_, i) => i + 48); // 48 - 57 -> 0 - 9 ;
        let actionKeyCodes = [8].concat(Array.from(Array(4), (_, i) => i + 37)); // 8 -> backspace; 37 - 40 -> arrow keys

        let isActionKey = actionKeyCodes.includes(e.keyCode); // check if pressed key is one of the action keys
        
        let isNumberKey = numberKeyCodes.includes(e.keyCode); // same for number keys
        let isBetween_1_50 = false;

        // only check if a number key is pressed
        if (isNumberKey){
            let lastVal = e.target.value;

            isBetween_1_50 = (lastVal + e.key < 50 && lastVal + e.key > 0); // check if new value is between 1 and 50 included
        }


        let isOk = isActionKey || e.ctrlKey || (isNumberKey && isBetween_1_50); // correct key
        

        return isOk; // allow input change if key is ok
    };



    // update tt if input has changed and if it's not empty
    currentWeekEntry.addEventListener("input", e => {
        if (currentWeekEntry.value != ""){
            update_tt(currentWeekEntry.value);
        }
    });
}


// allow to change week number using the left and right button
function changeWeek(){
    let currentWeekEntry = document.querySelector("#currentWeekEntry");

    if (this.id == "previousWeekButton" && currentWeekEntry.value > 1){ // check if the left button was pressed and if the value is greater than 1 (to avoid value 0)
        currentWeekEntry.value -= 1;
    } else if (this.id == "nextWeekButton" && currentWeekEntry.value < 50){ // same for right button and 50
        currentWeekEntry.value = Number(currentWeekEntry.value) + 1;
    }
    
    update_tt(currentWeekEntry.value);
}