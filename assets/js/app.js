import "./../css/styles.scss" 

const page = document.body.dataset.page;

if (page === "startpage") {
    import('./startpage');
}
else if (page === "game") {
    import('./game');
}

