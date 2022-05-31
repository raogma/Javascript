import { navigation } from './views/nav.js'

export function changeView(ref, btnsToHide, btnsToShow) {
    navigation.prepareNav(btnsToHide, btnsToShow);
    let main = document.querySelector('main');
    main.replaceChildren();
    main.appendChild(ref);
}
