//declariations
let divMenu = document.querySelector('#ramen-menu');
let divDetails = document.querySelector('#ramen-detail');

//initial fetch request
fetch('http://localhost:3000/ramens')
.then(res => res.json())
.then(image => image.forEach(renderImg));


function renderImg(ramen){
    const img = document.createElement('img');
    img.src = ramen.image;
    img.id = ramen.id;
    img.onclick = displayDetails;

    divMenu.append(img);
    
}

function displayDetails(e){
    fetch('http://localhost:3000/ramens')
    .then(res => res.json())
    .then(info => renderDetails(info[`${e.target.id-1}`]));
}

function renderDetails(i){
    const img = document.querySelector('.detail-image');
    img.src = i.image;
 
    const h2 = document.querySelector('.name');
    h2.textContent = i.name;

    const h3 = document.querySelector('.restaurant');
    h3.textContent = i.restaurant;

    let span = document.querySelector('#rating-display');
    span.textContent = i.rating;

    let p = document.querySelector('#comment-display');
    p.textContent = i.comment;
}

function addRamen(e){
    e.preventDefault();
    const ramenObj = {
        name: e.target.name.value,
        restaurant: e.target.restaurant.value,
        image: e.target.image.value,
        rating: e.target.rating.value,
        comment: e.target['new-comment'].value
    };
    renderImg(ramenObj);
    renderDetails(ramenObj);
    console.log(e.target['new-comment'].value);
}

document.querySelector('#new-ramen').addEventListener('submit', addRamen);