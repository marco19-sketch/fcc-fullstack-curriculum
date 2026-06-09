const checkBtn = document.getElementById('check-btn');
const textInput = document.getElementById('text-input');
let result = document.getElementById('result');

function cleanInput(str) {
  const regex = /[\s()\/,_.-]/g;
  return str.replace(regex, '');
}

checkBtn.addEventListener('click', () => {
  if (textInput.value === '') {
    return alert ('Please input a value');
  } 

  const cleanedInput = cleanInput(textInput.value).toLowerCase();
  console.log(cleanedInput);
  const reverse = cleanedInput.split('').reverse().join('');
  
  if (reverse === cleanedInput) {
    result.style.display = 'block';
    result.innerText = `"${textInput.value}" is a palindrome!`;
  } else {
    result.style.display = 'block';
    result.innerText = `"${textInput.value}" is  not a palindrome!`;
  }
  //textInput.value = '';
});

textInput.addEventListener('click', () => {
  textInput.value = '';
  result.style.display = 'none';
});
