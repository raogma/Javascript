function solve() {
  let correctAnswers = ["onclick", "JSON.stringify()", "A programming API for HTML and XML documents"];
  let rightAnswers = 0;
  let sections = document.querySelectorAll("section");
  let i = 0;

  let buttons = Array.from(document.querySelectorAll('p[class="answer-text"]'));
  buttons.map(x => x.addEventListener('click', event => {
    if (correctAnswers.includes(event.target.textContent)){
      rightAnswers++;
    }
    sections[i].style.display = 'none';
    if (i + 1 < sections.length) {
      sections[i + 1].style.display = 'block';
      i++;
    } else {
      document.querySelector('#results').style.display = 'block';
      if (rightAnswers === sections.length) {
        document.querySelector('#results h1').textContent = "You are recognized as top JavaScript fan!";
      } else {
        document.querySelector('#results h1').textContent = `You have ${rightAnswers} right answers`;
      }
    }
  }))
}
