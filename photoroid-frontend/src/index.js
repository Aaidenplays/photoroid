let totalUsers;
document.addEventListener('DOMContentLoaded', ()=>{
      console.log('Hey there Cowboy!');
      loadFriends();
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
