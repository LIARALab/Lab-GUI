let edredonO = anime.timeline({
    duration: 500,
    easing: "linear"
});

edredonO.add({
    targets: '.litStyle',
    d: "M278.6,181a5.8,5.8,0,0,0-5.6,5.977v42.046A5.8,5.8,0,0,0,278.6,235H354l-2-49,0-5"
}).add({
    targets: '.bonhommeAnime',
    opacity: 1
});

let edredonF = anime.timeline({
    duration: 500,
    easing: "linear"
});

edredonF.add({
    targets: '.litStyle',
    d: "M278.6,181a5.8,5.8,0,0,0-5.6,5.977v42.046A5.8,5.8,0,0,0,278.6,235H354l-18-49,3-5"
}).add({
    targets: '.bonhommeAnime',
    opacity: 0
});