function getArticleGenerator(articles) {
    let div = document.querySelector('#content');

    function inner(){
        if (articles.length > 0){
            let art = document.createElement('article');
            art.textContent = articles.shift();
            div.appendChild(art);
        }      
    }
    return inner;
}

// let showNext = getArticleGenerator([
//     "Cats are the most popular pet in the United States: There are 88 million pet cats and 74 million dogs.",
//     "A group of cats is called a clowder.",
//     "Cats have over 20 muscles that control their ears.",
//     "A cat has been mayor of Talkeetna, Alaska, for 15 years. His name is Stubbs.",
//     "The world's largest cat measured 48.5 inches long."
// ]);
