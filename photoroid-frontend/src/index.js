const headers = {
  'Content-Type': 'application/json',
  'Accept':  'application/json'
}

let current_user;

let totalUsers;
let userThing;
document.addEventListener('DOMContentLoaded', ()=>{
      console.log('Hey there Cowboy!');
      headerHandler();
      // getUsers();
      // loadFriends();

el('new-login').addEventListener('click', ()=>{
console.log('You clicked the button')
      let div = el('new-user');
      div.innerHTML = `<form>
        <label for="name">Name:</label><br>
        <input type="text" id="name" name="name"><br>
        <label for="password">Password</label><br>
        <input type="text" id="password" name="password"><br>
        <label for="confirmPassword">Confirm Password</label><br>
        <input type="text" id="confirmPassword" name="confirmPassword">
        <input type='submit' value='Submit'>
                      </form>`;
                      
  console.log('Hey there Cowboy!');

      loadFriends();
})//check later
el('new-login').addEventListener('submit', (event)=>{
  event.preventDefault()

    let newName = event.target.children[1].value;
    let newBio = event.target.children[4].value;
      let newUser = {
        method: 'POST',
        headers: {
          'Accept' : 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: newName,
          bio: newBio
        })
      };
      createUser(newUser);

  });
el('user-login').addEventListener('click', (event)=>{



el('new-login').addEventListener('click', ()=>{
console.log('You clicked the button')
      let div = el('new-user');
      div.innerHTML = `<form>
        <label for="name">Name:</label><br>
        <input type="text" id="name" name="name"><br>
        <label for="password">Password</label><br>
        <input type="text" id="password" name="password"><br>
        <label for="confirmPassword">Confirm Password</label><br>
        <input type="text" id="confirmPassword" name="confirmPassword">
        <input type='submit' value='Submit'>
                      </form>`;

      // let div = el('new-user');
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
          console.log(el('name').value)
          getIdByName(el('name').value);
      });
      div.innerHTML = `<form>
        <label for="name">Name:</label><br>
        <input type="text" id="name" name="name"><br>
        <label for="password">Password</label><br>
        <input type="text" id="password" name="password">
        <input type='submit' value='Submit'>
                      </form>`;
                    });



})
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
}
function loginUser(id){

  fetch(`http://localhost:3000/users/${id}`)
    .then(r=>r.json())
    .then(json => {
      document.innerHTML = ''
    })
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



function createUser(userObj){

  fetch('http:localhost:3000/users',userObj)
}
function loginUser(id){

  fetch(`http://localhost:3000/users/${id}`)
    .then(r=>r.json())
    .then(json => {
      document.innerHTML = ''
    })
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
























// const = () => 




