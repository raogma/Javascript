function editElement(HTMLElement, match, replacer){
    let matcher = new RegExp(match, 'g')
    HTMLElement.textContent = HTMLElement.textContent.replace(matcher, replacer);    
}
