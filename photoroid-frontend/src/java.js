
let board;
let friend;

function el(id){
    return document.getElementById(id);
  }
  
/* Event Handlers */


    /* Header navigation handling */
      const headerHandler = () => {
        el('feed-header');
        el('my-boards-header').addEventListener("click",(e)=>{
          e.preventDefault();
          setu1ForBoard();
        });
        el('friends-header').addEventListener("click",(e)=>{ 
          e.preventDefault();
          console.log("ITS HAPPENING")
          getFriends(e)});
        el('users-header').addEventListener("click", (e) => { 
          e.preventDefault();
          getUsers(e.target.dataset.id);
        });
        el('create-boards-header').addEventListener("click", (e) => {
          e.preventDefault();
          generateBoardForm();
        })
      }

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

    /* Friend request button handlers */
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
        }).then(getFriends())
        
      }
      const handleDeclineBtn = (target) => {
        console.log(`DECLINE-TARGET: ${target}`);
        fetch(`http://localhost:3000/friend_requests/${target}`, {
          method: 'DELETE'
        }).then(getFriends())
      }

    /* Board form submit handler */
      const postUserBoard = (data,user) => {
        console.log(`USER: ${user}`)
        console.log(`DATA: ${data}`)
        fetch('http://localhost:3000/user_boards', {
          method: 'POST',
          headers,
          body: JSON.stringify({
            status: "active",
            user_id: user.id,
            board_id: data
          })
        })
      }
      const postBoard = (user) => {
        const title = el('board-title');
        const desc = el('board-description');      
        const u1 = user[0];
        // console.log(`another USer: ${u1}`)
        fetch('http://localhost:3000/boards', {
          method: 'POST',
          headers,
          body: JSON.stringify({
            description: desc.value,
            title: title.value
          })
        }).then(resp => resp.json())
        .then(data => postUserBoard(data.id,u1))
        
        //INSERT VIEW BOARD HERE
        
      }
      const handleBoardSubmitBtn = (e) => {
        e.preventDefault();
        fetch('http://localhost:3000/users') //This will go away once user sessions implement
        .then(resp => resp.json())
        .then(data => postBoard(data))

      }
    /* Invite handler */
      const postBoardRequest = (friend, board) => {
        fetch('http://localhost:3000/user_boards', {
          method: 'POST',
          headers,
          body: JSON.stringify({
            status: "pending",
            user_id: user.id,
            board_id: data
          })
        })
      }

      const boardList = (board) => {
        console.log(board)
        return fetch(`http://localhost:3000/user_boards`)
        .then(resp => resp.json())
        // .then(data => {
        //   data.forEach(userBoard => {
        //     if (userBoard.board_id == board){
        //       console.log("success!");
        //       console.log(userBoard);
        //       return userBoard;
            // }
          // })
        // })
      }
      const handleInviteBtn = (target) => {
        board = target.dataset.boardId
        let userBoardFound
        boardList(board).then(data => {
          data.forEach(userBoard => {
            if (userBoard.board_id == board){
              userBoardFound = userBoard;
            }
          })
        console.log(`FOUND THIS USER BOARD: ${JSON.stringify(userBoardFound)}`)
        //function to get user board
        if (!friend){
          //need to pass in an event argument here
          //getFriends();
        }
        else {
          postBoardRequests(friend, board);
        }
        });

      }
/* Rendering Functions */

    /* Create board form */
      const generateBoardForm = () => {
          /* clearing the trash */
          el('new-user').innerHTML = '';
          el('users').innerHTML = '';
          el('friends-list').innerHTML = '';
          el('requests-pending').innerHTML = '';

          const container = el('board-form')

          container.innerHTML = `
            <form id='new-form'>
              <label for="title">Title:</label>
              <input id="board-title" type="text" name="title"><br>
              <label for="description">Description</label>
              <textarea id="board-description" name="description" rows ='10' cols='30'></textarea>
              <br>
              <input id= 'create-board-submit-btn' type='submit' value='Submit'>
            </form>
            <br>
          `
          el('create-board-submit-btn').addEventListener("click", (e) => handleBoardSubmitBtn(e))
      }
    /* Boards index */ //******************NOT QUITE DONE HERE*******************
      const setu1ForBoard = () => { //this will be suplimented with current_user
        fetch('http://localhost:3000/users') //This will go away once user sessions implement
        .then(resp => resp.json())
        .then(data => {
          const u1 = data[0]
          getBoards(u1)
        })
      }
      const renderBoards = (boards, user) => {
         /* clearing the trash */
        el('friends-list').innerHTML = '';
        el('requests-pending').innerHTML = '';
        el('new-user').innerHTML = '';
        el('users').innerHTML = '';
        el('board-form').innerHTML = '';
        const container = el('board-list');
        container.innerHTML = '';

        console.log(boards);

        boards.forEach(board => { //YOU NEED TO CHECK FOR USERBOARD.STATUS == APPROVED
          console.log(`USER::::${user.id}`);
          board.users.forEach(iUser => {
            console.log(board)
            console.log(`iUsers:${iUser.id}`);
            if (iUser.id == user.id){
              console.log(`its working!!!!!${board}`);
              /* creating elements */
              let li = document.createElement('li');
              let title = document.createElement('h1');
              let description = document.createElement('p');
                /* invite button */
              let inviteBtn = document.createElement('button');
              inviteBtn.innerText = 'Invite Friend';
              inviteBtn.dataset.boardId = board.id;
              inviteBtn.type = ('button')
              inviteBtn.style = ('color:blue; background-color:orange');
              inviteBtn.addEventListener("click", (e) => handleInviteBtn(e.target));
              /* initializing elements */
              title.innerText = board.title;
              description.innerText = board.description;
              /* appending */
              li.append(title);
              li.append(description);
              li.append(inviteBtn);
              container.append(li)
            }            
          })
        })
      }
      const getBoards = (user) => {
        fetch('http://localhost:3000/boards')
        .then(resp => resp.json())
        .then(data => renderBoards(data, user))
      }
    /* Friends list */
      const renderFriends = (data,target) => {
        console.log(data);
        console.log(`target: ${target}`);
        const u1 = data[0];
        const u2 = target;
        console.log(`U1:::::${u1.id}`);
        console.log(`u2: ${u2}`);
        /* clearing the trash */
        el('board-list').innerHTML = '';
        const container = el('friends-list');
        const pendingContainer = el('requests-pending');
        el('new-user').innerHTML = '';
        el('users').innerHTML = '';
        el('board-form').innerHTML = '';
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
        /* clearing the trash */
        el('board-list').innerHTML = '';
        el('board-form').innerHTML = '';
        usersList.innerHTML = '';
        el('friends-list').innerHTML = '';
        el('new-user').innerHTML = '';
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
      