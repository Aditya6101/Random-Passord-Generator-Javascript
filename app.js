const result = document.querySelector(".result"),
  passLength = document.querySelector(".password-length"),
  uppercase = document.querySelector(".uppercase"),
  lowercase = document.querySelector(".lowercase"),
  numbers = document.querySelector(".numbers"),
  symbols = document.querySelector(".symbols"),
  generateBtn = document.querySelector(".btn-generate"),
  copyBtn = document.querySelector(".btn-clipboard");

generateBtn.addEventListener("click", () => {
  const length = +passLength.value,
    isLower = lowercase.checked,
    isUpper = uppercase.checked,
    isNumbers = numbers.checked,
    isSymbols = symbols.checked;
  result.innerText = generatePass(
    length,
    isLower,
    isUpper,
    isNumbers,
    isSymbols
  );
});

copyBtn.addEventListener("click", () => {
  const textarea = document.createElement("textarea");
  const password = result.innerText;
  if (!password) {
    return;
  }
  textarea.value = password;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
  alert("Password Copied to Clipboard Successfully");
});

function generatePass(length, lower, upper, number, symbol) {
  let password = "";
  const typesCount = lower + upper + number + symbol;
  const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(
    (item) => Object.values(item)[0]
  );
  if (typesArr === 0) {
    return false;
  }

  for (let i = 0; i < length; i += typesCount) {
    typesArr.forEach((type) => {
      const funcName = Object.keys(type)[0];
      password += randomFunc[funcName]();
    });
  }
  const finalPass = password.slice(0, length);

  return finalPass;
}

const randomFunc = {
  lower: getLowercase,
  upper: getUppercase,
  number: getNumber,
  symbol: getSymbols,
};

function getLowercase() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}
function getUppercase() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}
function getNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}
function getSymbols() {
  const symbols = "!@#$%^&*()_-+=|?><.,';:{}[]`~";
  return symbols[Math.floor(Math.random() * symbols.length)];
}
