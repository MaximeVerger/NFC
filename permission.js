window.addEventListener("load", function() {

    function displayOutcome(type, outcome) {
        return function() {
            var argList = [outcome, type].concat([].slice.call(arguments));
            switch(outcome) {
            case "success":
                console.info.apply(console, argList);
                break;
            case "error":
                console.error.apply(console, argList);
                break;
            default:
                console.log.apply(console, argList);
            }
            document.getElementById(type).classList.remove('success', 'error', 'default');
            document.getElementById(type).classList.add(outcome);
        };
    };

    var register = {
        "nfc": function() {
            if ('NDEFReader' in window) {
            const reader = new NDEFReader();
            reader.scan()
            .then(() => {
                displayOutcome("nfc", "success")("Successfully started NFC scan");
            })
            .catch((err) => {
                displayOutcome("nfc", "error")(err);
            });
            } else {
            displayOutcome("nfc", "error")("NDEFReader is not available");
            }
        }
    };
    
    document.getElementById("nfc").addEventListener('click', register["nfc"]);
    
});