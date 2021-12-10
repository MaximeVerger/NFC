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
