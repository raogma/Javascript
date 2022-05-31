function focused() {
    function onFocus(ev){
        let div = ev.target.parentElement;
        div.setAttribute('class', 'focused');
    }

    function onBlur(ev){
        let div = ev.target.parentElement;
        div.removeAttribute('class');
    }

    let inputs = Array.from(document.getElementsByTagName('input'));
    inputs.map(x => {
        x.addEventListener('blur', onBlur);
        x.addEventListener('focus', onFocus);
    })
}
