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
    currentWeekEntry.value = 32;

    currentWeekEntry.min = 1;
    currentWeekEntry.max = 45;

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

        let isActionKey = actionKeyCodes.includes(e.keyCode);
        
        let isNumberKey = numberKeyCodes.includes(e.keyCode);
        let isBetween_1_50 = false;

        if (isNumberKey){
            let lastVal = e.target.value;

            isBetween_1_50 = (lastVal + e.key < 50 && lastVal + e.key > 0);
        }


        let isOk = isActionKey || e.ctrlKey || (isNumberKey && isBetween_1_50);
        

        return isOk;
    };




    currentWeekEntry.addEventListener("input", e => {
        update_edt(currentWeekEntry.value);
    });
}



function changeWeek(){
    let currentWeekEntry = document.querySelector("#currentWeekEntry");

    if (this.id == "previousWeekButton"){
        currentWeekEntry.value -= 1;
    } else {
        currentWeekEntry.value = Number(currentWeekEntry.value) + 1;
    }

    update_edt(currentWeekEntry.value);
    
}