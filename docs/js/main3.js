// Without jQuery
// Define a convenience method and use it
let ready = (callback) => {
    if (document.readyState !== "loading") callback();
    else document.addEventListener("DOMContentLoaded", callback);
}

function setActive() {
    let the_Ul = document.querySelector(".flexContainer ul");
    let the_Li = document.querySelectorAll(".flexContainer li");
    let theHeader = document.querySelectorAll(".flexContainer h3");
    let first_Li = the_Ul.children[0];
    let fruitType = first_Li.querySelector('h3');
    let firstFruitTypeText = fruitType.innerHTML.toLowerCase();

    first_Li.classList.add("active");
    the_Ul.className = firstFruitTypeText; // sets class of parent ul on first load to whatever the first li child is

    for (let i = 0; i < the_Li.length; i++) {
        the_Li[i].onmouseenter = function () {
            let i = 0;
            let fruitType = this.children[i].innerHTML.toLowerCase().replace(/\s/g,'');
            while (i < the_Li.length) {
                the_Li[i++].classList.remove("active");
            }
            the_Ul.classList = fruitType; // sets class of parent ul dependent on the li which is currently onmouseover
        }
    }
    for (let i = 0;i < theHeader.length;i++) {
        let fruitTypeText = theHeader[i].innerHTML.replace(/\s/g,'').toLowerCase();
        //console.log((fruitTypeText) + " is the correct answer??!!!!!!!!!!!!!");
        the_Li[i].classList.add(fruitTypeText + "Parent");

    }
    the_Ul.onmouseleave = function () {
        first_Li.classList.add("active");
        this.classList = firstFruitTypeText; // sets class of parent ul back to whatever the first li child is
    };
}
/*

function setItemClass() {
    let theHeader = document.querySelectorAll('.flexContainer h3');
    let the_Li = document.querySelectorAll('.flexContainer li');

    for (let i = 0;i < theHeader.length;i++) {
        let fruitTypeText = theHeader[i].innerHTML.toLowerCase();
        //console.log((fruitTypeText) + " is the correct answer??!!!!!!!!!!!!!");
        the_Li[i].classList.add(fruitTypeText + "Parent");
    }
}

*/



//setActive();
/*ready(() => {});*/
window.addEventListener("load", function () {
    setActive();
    //setItemClass();
})