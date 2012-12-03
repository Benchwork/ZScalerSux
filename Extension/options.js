function saveOptions() {
  var request = {
    type: "save",
    acc: document.getElementById('account').value,
    pass: document.getElementById('password').value
  };
  chrome.extension.sendRequest(request, function(response) {
    setTimeout(function() { alert('Changes successfully saved.'); } , 0);
    // ^ Used because the handler does not wait for the alert window to be closed.
  });
}

function loadOptions() {
  chrome.extension.sendRequest({type: "load"}, function(response) {
    document.getElementById('account').value = response.acc;
    document.getElementById('password').value = response.pass;
  });
}

document.addEventListener('DOMContentLoaded', loadOptions);
document.querySelector('.bsubmit').addEventListener('click', saveOptions);