const password = document.querySelectorAll(".password");
const btn = document.querySelector("button");
const copybtn = document.querySelectorAll(".copybtn");
let symbol = document.querySelector(".symbols");
let number = document.querySelector(".numbers");
const passwordRange = document.querySelector(".pickNumber");
const msg = document.querySelector(".msg")

let copy = false;
let range = 15;
passwordRange.value = 15;

let characters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]
const Numbers =["0", "1", "2", "3", "4", "5", "6", "7", "8", "9",]

const symbols =["~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?",
"/"];

btn.addEventListener("click", generate);
copybtn[0].addEventListener("click", function () {
  copyText(password[0]);
});

copybtn[1].addEventListener("click", function () {
  copyText(password[1]);
});

symbol.addEventListener("change", () => {
  if (symbol.checked) {
    characters = [...characters, ...symbols];
  } else if (!symbol.checked) {
    let sym = /[-._!"`'#%&,:;<>=@{}~\$\(\)\*\+\/\\\?\[\]\^\|]+/g;
    characters = characters.filter((x) => !x.match(sym));
  }
});

number.addEventListener("change", () => {
  if (number.checked) {
    characters = [...characters, ...Numbers];
  } else if (!number.checked) {
    characters = characters.filter((x) => isNaN(x));
  }
});

passwordRange.addEventListener("change", () => {
  range = passwordRange.value;
  console.log(range);
  if (passwordRange.value > 127 || passwordRange.value < 15) {
    passwordRange.value = 15;
    range = 15;
    msg.setAttribute('class', 'show-msg')
  }else{
    msg.classList.remove("show-msg");
    msg.setAttribute('class', 'msg')
  }
});

function generate() {
  let password1 = "";
  let password2 = "";

  for (let index = 0; index < range; index++) {
    password1 += characters[Math.floor(Math.random() * characters.length)];
    password2 += characters[Math.floor(Math.random() * characters.length)];
  }
  password[0].innerText = password1;
  password[1].innerText = password2;
  copy = true;
}

function copyText(element) {
  if (copy && range > 0) {
    let Text = element.innerText;
    let input = document.createElement("input");
    input.setAttribute("value", Text);
    document.body.appendChild(input);
    input.select();
    document.execCommand("copy");
    input.parentNode.removeChild(input);
    element.focus();
    setTimeout(function() {
      element.blur();
    },2500)
  }
}



