
//  - Information about clearing settings in Chrome (can't link to chrome:// URLs)
//  - Indicate if permissions are already granted, if the relevant API allows it.

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
  
    function displayOutcomeForNotifications(outcome) {
      switch(outcome) {
        case "granted":
          console.info(outcome, "notifications");
          document.getElementById("notifications").classList.add("success");
          break;
        case "denied":
        case "default":
          // "default" is supposed to be like "denied", except the user hasn't made an explicit decision yet.
          // https://notifications.spec.whatwg.org/#permission-model
          console.error(outcome, "notifications");
          document.getElementById("notifications").classList.add("error");
          break;
        default:
          throw "Unknown notification API response.";
      }
    };
  
    function triggerDownload() {
      // Based on http://stackoverflow.com/a/27280611
      var a = document.createElement('a');
      a.download = "test-image.png";
      a.href = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAABC0lEQVQYlTXPPUsCYQDA8b/e04tdQR5ZBpE3NAR6S0SDVDZKDQ2BY9TUy1foE0TQ1Edo6hOEkyUG0QuBRtQgl0hnenVdnZD5eLbU7xv8Avy5X16KhrQBg47EtpziXO6qBhAEeNEm0qr7VdBcLxt2mlnNbhVu0NMAgdj1wvjOoX2xdSt0L7MGgx2GGid8yLrJvJMUkbKfOF8N68bUIqcz2wQR7GUcYvJIr1dFQijvkh89xGV6BPPMwvMF/nQXJMgWiM+KLPX2tc0HNa/HUxDv2owpx7xV+023Hiwpdt7yhmcjj9/NdrIhn8LrPVmotctWVd01Nt27wH9T3YhHU5O+sT/6SuVZKa4cNGoAv/ZMas7pC/KaAAAAAElFTkSuQmCC";
      a.click();
    }
  
    navigator.getUserMedia = (
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia
    );
    navigator.requestFullscreen = (
      navigator.requestFullscreen ||
      navigator.webkitRequestFullscreen ||
      navigator.mozRequestFullscreen ||
      navigator.msRequestFullscreen
    );
    navigator.requestMIDIAccess = (
      navigator.requestMIDIAccess ||
      navigator.webkitRequestMIDIAccess ||
      navigator.mozRequestMIDIAccess ||
      navigator.msRequestMIDIAccess
    );
    document.body.requestFullScreen = (
      document.body.requestFullScreen ||
      document.body.webkitRequestFullScreen ||
      document.body.mozRequestFullScreen ||
      document.body.msRequestFullScreen
    );
    document.body.requestPointerLock = (
      document.body.requestPointerLock ||
      document.body.webkitRequestPointerLock ||
      document.body.mozRequestPointerLock ||
      document.body.msRequestPointerLock
    );
  
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
  
    // for (var type in register) {
    //   document.getElementById(type).addEventListener('click',
    //     register[type]
    //   );
    // }
  
  });