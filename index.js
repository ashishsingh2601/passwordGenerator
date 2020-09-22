//jshint esversion: 9
const characterAmountRange = document.getElementById('characterAmountRange');
const characterAmountNumber = document.getElementById('characterAmountNumber');
const form = document.getElementById('passwordGeneratorForm');
const includeUppercaseElement = document.getElementById('includeUppercase');
const includeSymbolsElement = document.getElementById('includeSymbols');
const includeNumbersElement = document.getElementById('includeNumbers');

//Storing char codes from charater table into some variables
const upper_charCodes = arrayFromLowToHigh(65, 90);
const lower_charCodes = arrayFromLowToHigh(97, 122);
const number_charCodes = arrayFromLowToHigh(48, 57);

//Concatenated because char codes of symbols have gaps in between
const symbol_charCodes = arrayFromLowToHigh(33, 47).concat(
    arrayFromLowToHigh(58, 64)
).concat(
    arrayFromLowToHigh(91, 96)
).concat(
    arrayFromLowToHigh(123, 126)
);


characterAmountNumber.addEventListener('input', syncCharacterAmount);
characterAmountRange.addEventListener('input', syncCharacterAmount);
form.addEventListener('submit', e => {
    e.preventDefault();
    const characterAmount = characterAmountNumber.value;
    const includeUppercase = includeUppercaseElement.checked;
    const includeSymbols = includeSymbolsElement.checked;
    const includeNumbers = includeNumbersElement.checked;
    
    const password = generatePassword(characterAmount, includeUppercase, includeSymbols, includeNumbers);
    password_display.innerText = password;
});

function generatePassword(characterAmount, includeUppercase, includeSymbols, includeNumbers){
    let charCodes = lower_charCodes;
    if(includeUppercase) charCodes = charCodes.concat(upper_charCodes);
    if(includeNumbers) charCodes = charCodes.concat(number_charCodes);
    if(includeSymbols) charCodes = charCodes.concat(symbol_charCodes);

    const passwordCharacters = [];      //Empty array 
    for(let i = 0; i < characterAmount; i++)
    {   const characterCode = charCodes[Math.floor(Math.random() * charCodes.length)];
        passwordCharacters.push(String.fromCharCode(characterCode));
    }
    return passwordCharacters.join('');
}
    
    function arrayFromLowToHigh(low, high)
    {   const array = [];
        for(let i = low; i <= high; i++)
        {
            array.push(i);
        }
        return array;
    }


function syncCharacterAmount(e){
    const value = e.target.value;
    characterAmountNumber.value = value;
    characterAmountRange.value = value;
}