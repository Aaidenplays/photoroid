const headers = {
  'Content-Type': 'application/json',
  'Accept':  'application/json'
}

let current_user;

let totalUsers;
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

                      

                    });
el('user-login').addEventListener('click', ()=>{
      console.log('You clicked the button')
      let div = el('new-user');
      div.innerHTML = `<form>
        <label for="name">Name:</label><br>
        <input type="text" id="name" name="name"><br>
        <label for="password">Password</label><br>
        <input type="text" id="password" name="password">
        <input type='submit' value='Submit'>
                      </form>`;
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





/* Event Handlers */
const postFriendRequest = (data,target) => {
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

  //replace all u1 with current_user

}

/* Header Handling */
const headerHandler = () => {
  el('feed-header');
  el('my-boards-header');
  el('friends-header').addEventListener("click",(e)=>{ 
    e.preventDefault();
    console.log("ITS HAPPENING")
    loadFriends()});
  el('users-header').addEventListener("click", (e) => { 
    e.preventDefault();
    getUsers();
  });
  el('create-boards-header')
  
}

/* Rendering Functions */



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