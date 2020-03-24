let totalUsers;
document.addEventListener('DOMContentLoaded', ()=>{
      console.log('Hey there Cowboy!');
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
      console.log('You clicked the button')
      let div = el('new-user');
      div.innerHTML = `<form>
        <label for="name">Name:</label>
        <input type="text" id="name" name="name"><br>

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
