function extractText() {
    let itemsCollection = Array.from(document.getElementsByTagName('li'));
    let text = itemsCollection.map(x=>x.textContent).join('\n');
    document.getElementsByTagName('textarea')[0].value = text;
}