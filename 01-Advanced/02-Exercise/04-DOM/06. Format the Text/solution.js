function solve() {
  let text = document.getElementById('input').value;
  let sentences = text
                    .split('.')
                    .filter(x => x!== '')
                    .map(x=>x + '.');
  let output = document.getElementById('output');

  let paragraphArr = [];
  for (let sentence of sentences) {
    if (paragraphArr.length === 3){
      output.innerHTML += `<p>${paragraphArr.join('')}</p>`;
      paragraphArr = [];
    }
    paragraphArr.push(sentence);
  }
  if (paragraphArr.length > 0){
    output.innerHTML += `<p>${paragraphArr.join('')}</p>`;
  }
}