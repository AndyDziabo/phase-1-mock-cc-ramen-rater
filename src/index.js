// See all ramen images in the `div` with the id of `ramen-menu`. When the page
//   loads, request the data from the server to get all the ramen objects. Then,
//   display the image for each of the ramen using an `img` tag inside the
//   `#ramen-menu` div.
const ramenMenu = document.querySelector('#ramen-menu');
let ramenData = [];
let detailTrigger = true;

fetch('http://localhost:3000/ramens')
.then(res => res.json())
.then(data => {
    ramenData = data;
    data.forEach(addRamen);
    
});

function addRamen(ramen){
    const menuImg = document.createElement('img');
    menuImg.src = ramen.image;
    menuImg.id = ramen.id;
    ramenMenu.append(menuImg);
    if(detailTrigger === true){
        detailTrigger = !detailTrigger;
        renderDetails(ramen.id);
    }
}
    

// - Click on an image from the `#ramen-menu` div and see all the info about that
//   ramen displayed inside the `#ramen-detail` div and where it says
//   `insert comment here` and `insert rating here`.
const detailImg = document.querySelector('#ramen-detail>.detail-image');
const detailName = document.querySelector('#ramen-detail>.name');
const detailRestaurant = document.querySelector('#ramen-detail>.restaurant');
const detailRating = document.querySelector('#rating-display');
const detailComment = document.querySelector('#comment-display');
ramenMenu.addEventListener('click', e => renderDetails(e.target.id));

function renderDetails(id){
    const selected = ramenData.find(r => r.id === parseInt(id));

    detailImg.src = selected.image;
    detailName.textContent = selected.name;
    detailRestaurant.textContent = selected.restaurant;
    detailRating.textContent = selected.rating;
    detailComment.textContent = selected.comment;
}


// - Create a new ramen after submitting the `new-ramen` form. The new ramen should
//   be added to the`#ramen-menu` div. The new ramen does not need to persist; in
//   other words, if you refresh the page, it's okay that the new ramen is no
//   longer on the page.

const newRamenForm = document.querySelector('#new-ramen');
newRamenForm.addEventListener('submit', e => addNewRamen(e));

function addNewRamen(e){
    e.preventDefault();
    const newRamenObj ={
        name: e.target.name.value,
        restaurant: e.target.restaurant.value,
        image: e.target.image.value,
        rating: e.target.rating.value,
        comment: e.target['new-comment'].value
    }

    fetch('http://localhost:3000/ramens', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(newRamenObj)
    })
    .then(res => res.json())
    .then(data => ramenData = data);

    //ramenData.push(newRamenObj);
    addRamen(newRamenObj);
    console.log(newRamenObj);
}

{/* <form id="new-ramen">
    <h4>Add New Ramen</h4>
    <label for="name">Name: </label>
    <input type="text" name="name" id="new-name" />
    <label for="restaurant">Restaurant: </label>
    <input type="text" name="restaurant" id="new-restaurant" />
    <label for="image">Image: </label>
    <input type="text" name="image" id="new-image" />
    <label for="rating">Rating: </label>
    <input type="number" name="rating" id="new-rating" />
    <label for="new-comment">Comment: </label>
    <textarea name="new-comment" id="new-comment"></textarea>
    <input type="submit" value="Create" />
  </form> */}
