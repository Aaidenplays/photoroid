const headers = {
  'Content-Type': 'application/json',
  'Accept':  'application/json'
}
let currentUser;
let current_user;

let totalUsers;
let userThing;
document.addEventListener('DOMContentLoaded', ()=>{
      console.log('Hey there Cowboy!');
      // headerHandler();
      // loadFriends();
      // getUsers();

el('new-login').addEventListener('click', (event)=>{

    let div = el('new-user')
    div.innerHTML= `
      <form id='new-login'>
         <label for="name">Name:</label>
         <input type="text" id="name" name="name"><br>
         <label for="bio">Bio:</label>
         <textarea id='bio' name='bio' rows ='10' cols='30'></textarea>
         <br>
         <input type='submit' value='Submit'>
          </form>`;
        let btn = el('new-login')
        btn.addEventListener('submit', (event)=> {
          event.preventDefault();

          let newName = event.target.children[1].value;
          let newBio = event.target.children[4].value;
          let newUser = {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                name: newName,
                  bio: newBio
                })
              };
              createUser(newUser);
            });
  });




el('user-login').addEventListener('click', ()=>{
console.log('You clicked the button')
      let div = el('new-user');



      div.innerHTML = `
        <h3>Sign in below with Name:</h3>
        <form id='sign-in'>
          <label for="name">Name:</label>
          <input type="text" id="name" name="name"><br>

          <input type='submit' value='Submit'>
        </form>`;
        let btnForm = el('sign-in')
        btnForm.addEventListener('submit', (event)=>{
          event.preventDefault();
          console.log(el('name').value);
          loginUser(el('name').value);
          // getIdByName(el('name').value);
      });

});




})
function loadFriends(){
  fetch('http://localhost:3000/users')
  .then(r=>r.json())
  .then(json =>{
    totalUsers = json.length
    el('total-users').innerText = `Total Users: ${totalUsers}`;
    el('users').innerHTML = '';
    for(const i in json){
      let ul = el('users');
      let userLi = document.createElement('li');
      userLi.innerHTML = `<h1>${json[i].name}</h1>
                          <p>${json[i].bio}</p>`;
      ul.appendChild(userLi);

    };
  })

}
function el(id){
  return document.getElementById(id);
}

function createUser(userObj){

  fetch('http:localhost:3000/users',userObj)
  .then(r=>r.json())
  .then(json=>{
    currentUser = json
    el('new-user').innerHTML ='';
    loginUser(currentUser.name);
  })

}
function loginUser(name){

  fetch(`http://localhost:3000/users/log_user_in`, {
    method:'POST',
    headers: headers,
    body: JSON.stringify({
      name: name
    })
  })
  .then(r => r.json())
  .then(json => {
    currentUser = json

    let pageHeader = el('h3-id')
    el('new-user').innerHTML=''
    pageHeader.innerText = currentUser.name
    let signOutBtn = document.createElement('button')
    signOutBtn.setAttribute('id', 'sign-out')
    signOutBtn.innerText = 'Sign Out'
    pageHeader.append(signOutBtn)
    signOutBtn.addEventListener('click', (e)=>{
      signOut();
    })

    // let newJs = document.createElement('script')
    // newJs.setAttribute('src','src/java.js')
  });
}
function getIdByName(nameU){
  fetch('http://localhost:3000/users')
  .then(r => r.json())
  .then(json=>{
    userThing = json;
    loginUser(userThing.find((element) =>
      element.name === nameU
    ).id);

  });
}
function signOut(){
  location.reload()
  // currentUser ='';
}
function addPostForm(id){
 let boardDiv = el('board-form');
  boardDiv.innerHTML = `<form id='post-data'>
          <input for='id' type='hidden' name='id'>
          <label for='title'> Title </label>
          <input for='title' name='title' type='text'>
          <label for='img'> Upload Image: </label>
          <input id='img-input' type='text' name='img'>
          <input type='submit' value='Submit Post'>

  </form>`
  // boardDiv.innerHTML = `<form id='post-data' action='http://localhost:3000/media'
  //                         enctype='multipart/form-data'
  //                         method='post'>
  // <input for='id' type='hidden' name='id'>
  // <label for='title'> Title </label>
  // <input for='title' name='title' type='text'>
  // <label for='file'> Upload Board media </label>
  // <input id='img-input' type='file' name='file'>
  // <input type='submit' value='Submit Post'>
  // </form>
  // `;
  // el('post-data').id.value = id
  el('post-data').addEventListener('submit', (event)=>{
    event.preventDefault();
    let title = event.target.title.value

    let boardId = id

    let media = event.target.img.value
    console.log(`Board Id: ${id}`)


    addPost(title,media,boardId);
  })
  // add func to handle meia post requests
}
function addPost(postTitle,img, id){
  console.log(`title:${postTitle},img:${img},id:${id}`)
  fetch('http://localhost:3000/media', {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      title: postTitle,
      // media: postMedia,
      image: img,
      board_id: id
    }),

  })
}
