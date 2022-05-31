function solve() {
  let text = document.getElementById('text').value;
  let output = document.getElementById('naming-convention').value;
  let result = document.querySelector('.result-container span');
  text = text
          .split(' ')
          .map(x => x.toLowerCase());

  if (output === 'Camel Case'){
    text = [text[0]].concat(text
                              .slice(1)
                              .map(x => x[0].toUpperCase() + x.slice(1)));
  } else if(output === 'Pascal Case'){
    text = text.map(x=>x[0].toUpperCase() + x.slice(1));
  } else {
    result.textContent += 'Error!';
    return;
  }
  result.textContent += text.join('');
}
