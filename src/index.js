// See all ramen images in the `div` with the id of `ramen-menu`. When the page
//   loads, request the data from the server to get all the ramen objects. Then,
//   display the image for each of the ramen using an `img` tag inside the
//   `#ramen-menu` div.
const ramenMenu = document.querySelector('#ramen-menu');
let ramenData = [];
let detailTrigger = true;
let selectedId = 1;

getRamens();
function getRamens(){
    fetch('http://localhost:3000/ramens')
    .then(res => res.json())
    .then(data => {
    ramenData = data;
    data.forEach(addRamen);
    });
}

function addRamen(ramen){
    const menuImg = document.createElement('img');
    menuImg.id = ramen.id;
    menuImg.src = ramen.image;
    ramenMenu.append(menuImg);
    if(detailTrigger === true){
        detailTrigger = !detailTrigger;
        addDetail(ramen.id);
    }
}

// Click on an image from the `#ramen-menu` div and see all the info about that
//   ramen displayed inside the `#ramen-detail` div and where it says
//   `insert comment here` and `insert rating here`.
const detailImg = document.querySelector('#ramen-detail>.detail-image');
const detailName = document.querySelector('#ramen-detail>.name');
const detailRestaurant = document.querySelector('#ramen-detail>.restaurant');
const detailRating = document.querySelector('#rating-display');
const detailComment= document.querySelector('#comment-display');
ramenMenu.addEventListener('click', e => addDetail(e.target.id));

function addDetail(id){
    const selected = ramenData.find(r => r.id === parseInt(id));
    selectedId = id;

    detailImg.src = selected.image;
    detailName.textContent = selected.name;
    detailRestaurant.textContent = selected.restaurant;
    detailRating.textContent = selected.rating;
    detailComment.textContent = selected.comment;
}

// Create a new ramen after submitting the `new-ramen` form. The new ramen should
//   be added to the`#ramen-menu` div. The new ramen does not need to persist; in
//   other words, if you refresh the page, it's okay that the new ramen is no
//   longer on the page.
const newRamenForm = document.querySelector('#new-ramen');
const newName = document.querySelector('#new-name');
const newRestaurant = document.querySelector('#new-restaurant');
const newImage = document.querySelector('#new-image');
const newRating = document.querySelector('#new-rating');
const newComment = document.querySelector('#new-comment');

newRamenForm.addEventListener('submit', e => createNewRamen(e));

function createNewRamen(e){
    e.preventDefault();
    const newRamenObj = {
        name: e.target.name.value,
        restaurant: e.target.restaurant.value,
        image: e.target.image.value,
        rating: e.target.rating.value,
        comment: e.target['new-comment'].value
    };

    fetch('http://localhost:3000/ramens', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(newRamenObj)
    })
    .then(res => res.json())
    .then(data => {
        ramenData.push(data);
        addRamen(data);
    });
    
}

// Update the rating and comment for a ramen by submitting a form. Changes should
//   be reflected on the frontend. No need to persist. You can add this HTML to the
//   `index.html` file to create the edit form:
const editRamenForm = document.querySelector('#edit-ramen');
const editRating = document.querySelector('#new-rating');
const editComment = document.querySelector('#new-comment');
editRamenForm.addEventListener('submit', e => editRamen(e));

function editRamen(e){
    e.preventDefault();
    fetch(`http://localhost:3000/ramens/${selectedId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            "rating": e.target.rating.value,
            "comment": e.target['new-comment'].value
        })
    })
    .then(res => res.json())
    .then(data => {
        ramenData[selectedId-1] = data;
        addDetail(selectedId);
    });
    
}

// Delete a ramen (you can add a "delete" button if you'd like, or use an
//   existing element to handle the delete action). The ramen should be removed
//   from the `ramen-menu` div, and should not be displayed in the `ramen-detail`
//   div. No need to persist.

const deleteBtn = document.querySelector('#delete-btn');
deleteBtn.addEventListener('click', deleteRamen);

function deleteRamen(){
    fetch(`http://localhost:3000/ramens/${selectedId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    .then(res => res.json)
    .then(data => {
        ramenMenu.innerHTML = "";
        detailTrigger = true;
        getRamens();
    });

    
}
