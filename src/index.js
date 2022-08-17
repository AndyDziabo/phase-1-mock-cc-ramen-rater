//declariations
let divMenu = document.querySelector('#ramen-menu');
let divDetails = document.querySelector('#ramen-detail');
let detailTrigger = true;
let selectedRamen = 1;

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

    if(detailTrigger === true){
        detailTrigger = !detailTrigger;
        renderDetails(ramen);
    };
    
}

function displayDetails(e){
    fetch('http://localhost:3000/ramens')
    .then(res => res.json())
    .then(info => renderDetails(info[`${e.target.id-1}`]));
}

function renderDetails(i){
    selectedRamen = i.id;

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
    console.log(ramenObj);
    fetch('http://localhost:3000/ramens', {
        method: 'POST',
        header: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(ramenObj)
    })
    .then(res => res.json())
    .then(data => {
        renderImg(ramenObj);
        renderDetails(ramenObj);
    });
}

function editRamen(e){
    e.preventDefault();
    const update = {
        rating: e.target.rating.value,
        comment: e.target['new-comment'].value
    };

    fetch(`http://localhost:3000/ramens/${selectedRamen}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Accept':'application/json'
        },
        body: JSON.stringify(update)
    })
    .then(res => res.json())
    .then(data => {
        renderDetails(data);
    });
    // console.log(e.target.id.value);
    // console.log(e.target['new-comment'].value);
}

document.querySelector('#new-ramen').addEventListener('submit', addRamen);
document.querySelector('#edit-ramen').addEventListener('submit', editRamen);