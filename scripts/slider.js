const hero = document.querySelector('.hero');
let i = 0;
let img = ['01','02','03','04','05', '06'];
let time = 3000;
function changeBG(){
    hero.style.background = `url(img/${img[i]}.png)`;
    hero.style.backgroundPosition = 'center'
    hero.style.backgroundSize = 'cover'
    if (i<img.length-1) {
        i++
    } else {
        i =0
    }
    setTimeout(() => {
        changeBG()
    }, time);
}