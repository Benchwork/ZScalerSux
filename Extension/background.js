chrome.extension.onRequest.addListener(
  function(request, sender, sendResponse) {
    if (request.type == "save") {
      localStorage['account'] = request.acc;
      localStorage['password'] = request.pass;
      sendResponse({});
    } else if (request.type == "load") {
      sendResponse({
        acc: localStorage['account'] == null ? '' : localStorage['account'],
        pass: localStorage['password'] == null ? '' : localStorage['password']
      });
    } else {
      sendResponse({}); // snub them.
    }
  }
);