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

                      
      loadFriends();
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


      let div = el('new-user');
      div.innerHTML = `<form>
        <label for="name">Name:</label><br>
        <input type="text" id="name" name="name"><br>
        <label for="password">Password</label><br>
        <input type="text" id="password" name="password">
        <input type='submit' value='Submit'>
                      </form>`;
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



/* Event Handlers */

    /* Add friend handler  */
const postFriendRequest = (data,target) => {
  //replace all u1 with current_user
  console.log(`HEADERS: ${headers}`)
    console.log(data)
    console.log(`target: ${target}`)
    const u1 = data[0];
    const u2 = target;
    console.log(`u1: ${u1.id}`);
    console.log(`u2: ${u2}`);
    fetch('http://localhost:3000/friend_requests',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept':  'application/json'
      },
      body: JSON.stringify({
        requestor_id: u1.id,
        receiver_id: u2,
        status: "pending"
      })
    })
}
const handleAddFriend = (e) => {
  // console.log(`e: ${e.target.dataset.id}`)
  fetch('http://localhost:3000/users')
  .then(resp => resp.json())
  .then(data => postFriendRequest(data,e.target.dataset.id))
}

    /* Header navigation handling */
const headerHandler = () => {
  el('feed-header');
  el('my-boards-header');
  el('friends-header').addEventListener("click",(e)=>{ 
    e.preventDefault();
    console.log("ITS HAPPENING")
    getFriends(e)});
  el('users-header').addEventListener("click", (e) => { 
    e.preventDefault();
    getUsers(e.target.dataset.id);
  });
  el('create-boards-header')
  
}
    /* friend request button handlers */
const handleAcceptBtn = (target) => {
  console.log(`ACCEPT-TARGET: ${target}`);
  fetch(`http://localhost:3000/friend_requests/${target}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Accept':  'application/json'
    },
    body: JSON.stringify({
      id: target,
      status: "accepted"
    })
  })
  getFriends();
}
const handleDeclineBtn = (target) => {
  console.log(`DECLINE-TARGET: ${target}`);
  fetch(`http://localhost:3000/friend_requests/${target}`, {
    method: 'DELETE'
  })
  getFriends();
}

/* Rendering Functions */

    /* Friends list */
const renderFriends = (data,target) => {
  console.log(data)
  console.log(`target: ${target}`)
  const u1 = data[0];
  const u2 = target;
  console.log(`u1: ${u1.id}`);
  console.log(`u2: ${u2}`);
  const container = el('friends-list')
  const pendingContainer = el('requests-pending')
  container.innerHTML = '';
  pendingContainer.innerHTML = '';
  data.forEach(request => {
    console.log(`requestor: ${request.requestor.id}`)
    console.log(`receiver: ${request.receiver.id}`)
    /* Accepted friends */
    if ((request.requestor.id == u1.id || request.receiver.id == u1.id) && request.status == 'accepted'){
      let li = document.createElement('li'); 
      let name = document.createElement('h1');
      let bio = document.createElement('p');
      //make if statment for requestor or receiver
      console.log(request)
      if (request.requestor.id != u1.id){
        name = request.requestor.name;
        bio = request.requestor.bio;
      }
      else {
        name = request.receiver.name;
        bio = request.receiver.bio;
      }
      li.append(name);
      li.append(document.createElement('p'))
      li.append(bio);
      li.append(document.createElement('p'))
      li.append(document.createElement('p'))
      container.append(li); 
    }
    else if ((request.requestor.id == u1.id || request.receiver.id == u1.id) && request.status == 'pending'){
      let li = document.createElement('li'); 
      let name = document.createElement('h1');
      let bio = document.createElement('p');
      
      /* buttons */
      let acceptBtn = document.createElement('button');
      acceptBtn.innerText = "Accept";
      acceptBtn.dataset.friendRequest = request.id;
      acceptBtn.addEventListener("click", (e) => handleAcceptBtn(e.target.dataset.friendRequest))
      let declineBtn = document.createElement('button');
      declineBtn.innerText = "Decline";
      declineBtn.dataset.friendRequest = request.id
      declineBtn.addEventListener("click", (e) => handleDeclineBtn(e.target.dataset.friendRequest))
      /* /buttons */

      //make if statment for requestor or receiver
      console.log(request)
      if (request.requestor.id != u1.id){
        name = request.requestor.name;
        bio = request.requestor.bio;
      }
      else {
        name = request.receiver.name;
        bio = request.receiver.bio;
      }
      li.append(name);
      li.append(acceptBtn);
      li.append(declineBtn);
      li.append(document.createElement('p'))
      li.append(bio);
      li.append(document.createElement('p'))
      li.append(document.createElement('p'))
      pendingContainer.append(li); 
    }
  })
}
const getFriends = (e) => {
  fetch('http://localhost:3000/friend_requests')
  .then(resp => resp.json())
  .then(data => renderFriends(data,e))
}

    /* User page */
const renderUsers = (users) => {
  const usersList = el("users");
  usersList.innerHTML = '';
  users.forEach(user => {
    /* declaring empty elements */
    let li = document.createElement('li');
    let name = document.createElement('h2');
    let bio = document.createElement('p');
    /* initializing */
    name.innerText = user.name;
    bio.innerText = user.bio;
    /* add friend button */
    addFriendBtn = document.createElement('button');
    addFriendBtn.innerText = 'Add Friend';
    addFriendBtn.style=('color:blue; background-color:orange');
    addFriendBtn.dataset.id = (user.id);
    addFriendBtn.addEventListener("click", (e) => handleAddFriend(e));

    /* appending elements to list */
    li.append(name);
    li.append(bio);
    li.append(addFriendBtn);
    /* appending list to container */
    usersList.append(li);
  });
}
const getUsers = () =>{
  fetch('http://localhost:3000/users')
  .then(resp => resp.json())
  .then(data => renderUsers(data))
}
