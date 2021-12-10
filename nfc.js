// // const ndef = new NDEFReader();

// // async function startScanning() {
// //     await ndef.scan();
// //     ndef.onreading = event => {
// //     /* handle NDEF messages */
// //     };
// // }

// const nfcPermissionStatus = await navigator.permissions.query({ name: "nfc" });
// consoleLog(nfcPermissionStatus)
// consoleLog("nfcPermissionStatus")

// // if (nfcPermissionStatus.state === "granted") {
// //     // NFC access was previously granted, so we can start NFC scanning now.
// //     startScanning();
// // } else {
// //     // Show a "scan" button.
// //     document.querySelector("#scanButton").style.display = "block";
// //     document.querySelector("#scanButton").onclick = event => {
// //     // Prompt user to allow UA to send and receive info when they tap NFC devices.
// //     startScanning();
// //     };
// // }

// async function readTag() {
//     if ("NDEFReader" in window) {
//         const ndef = new NDEFReader();
//         try {
//         await ndef.scan();
//         ndef.onreading = event => {
//             const decoder = new TextDecoder();
//             for (const record of event.message.records) {
//             consoleLog("Record type:  " + record.recordType);
//             consoleLog("MIME type:    " + record.mediaType);
//             consoleLog("=== data ===\n" + decoder.decode(record.data));
//             }
//         }
//         } catch(error) {
//         consoleLog(error);
//         }
//     } else {
//         consoleLog("Web NFC is not supported.");
//     }
// }

// async function writeTag() {
//     if ("NDEFReader" in window) {
//         const ndef = new NDEFReader();
//         try {
//         await ndef.write("What Web Can Do Today");
//         consoleLog("NDEF message written!");
//         } catch(error) {
//         consoleLog(error);
//         }
//     } else {
//         consoleLog("Web NFC is not supported.");
//     }
// }

// function consoleLog(data) {
//     var logElement = document.getElementById('log');
//     logElement.innerHTML += data + '\n';
// }

window.addEventListener("load", function() {

    var toggle = document.querySelector("#toggle");
    toggle.classList.add("instant");
    if (window.location.protocol == "https:") {
        toggle.classList.add("https");
        toggle.protocol = "http:";
    } else if (window.location.protocol == "http:") {
        toggle.classList.add("http");
        toggle.protocol = "https:";
    }
    setTimeout(function() {
        toggle.classList.remove("instant");
    }, 10);

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
        },
    }

    document.getElementById('nfc').addEventListener('click', register['nfc'])

});
