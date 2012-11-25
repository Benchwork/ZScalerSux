var accInput = document.getElementsByName('lognsfc')[0];
var accButton = document.getElementsByName('lsubmit')[0];
var passInput = document.getElementsByName('passsfc')[0];
var passButton = document.getElementsByName('bsubmit')[0];

var account = "";
var password = "";

var accLabel = document.createElement('label');
var passLabel = document.createElement('label');
var accSaveInp = document.createElement('input');
var passSaveInp = document.createElement('input');
var container = document.createElement('div');
var button = document.createElement('input');
var link = document.createElement('a');

button.value = "Save";
accSaveInp.name = "accSaveInp";
passSaveInp.name = "passSaveInp";

passSaveInp.type = "password";
button.type = "button";

accSaveInp.onchange = function () {account = this.value;};
passSaveInp.onchange = function () {password = this.value;};

accLabel.htmlFor = "accSaveInp";
passLabel.htmlFor = "passSaveInp";

accLabel.innerHTML = 'Account: ';
passLabel.innerHTML = 'Password: ';

accLabel.style.display = "none";
accSaveInp.style.display = "none";
passLabel.style.display = "none";
passSaveInp.style.display = "none";
button.style.display = "none";

container.appendChild(link);
container.appendChild(accLabel);
container.appendChild(accSaveInp);
container.appendChild(passLabel);
container.appendChild(passSaveInp);
container.appendChild(button);

container.style.position = "absolute";
container.style.right = "5px";
container.style.top = "5px";
container.style.fontFamily = "Verdana";
container.style.fontSize = "10px";

link.style.color = "#00E";
link.innerHTML = "[ Options ]";
link.href = "#";

accLabel.style.float = "left";
passLabel.style.float = "left";
accLabel.style.paddingTop = "5px";
passLabel.style.paddingTop = "5px";
passLabel.style.clear = "both";
accSaveInp.style.float = "right";
passSaveInp.style.float = "right";
button.style.float = "right";
button.style.clear = "both";
button.onclick = function () {
  link.style.display = "";
  accLabel.style.display = "none";
  accSaveInp.style.display = "none";
  passLabel.style.display = "none";
  passSaveInp.style.display = "none";
  button.style.display = "none";
  chrome.extension.sendRequest({type: "save", acc: account, pass: password}, function(response) {lazyLogIn();});
};
link.onclick = function () {
  link.style.display = "none";
  accLabel.style.display = "";
  accSaveInp.style.display = "";
  passLabel.style.display = "";
  passSaveInp.style.display = "";
  button.style.display = "";
};

document.getElementsByTagName('body')[0].appendChild(container);

lazyLogIn();

function lazyLogIn() {
  chrome.extension.sendRequest({type: "load"}, function(response) {
    account = response.acc == null ? '' : response.acc;
    password = response.pass == null ? '' : response.pass;
    accSaveInp.value = account;
    passSaveInp.value = password;
    if(account != '' && account != null && password != '' && password != null) {
      if (accInput != null && accInput.type.toLowerCase() != "hidden"){
        accInput.value = account;
        accButton.click();
      } else if (passInput != null){
        passInput.value = password;
        passButton.click();
      }
    }
  });
}