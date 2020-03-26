


let board = 0;
let friend = 0;



document.addEventListener('DOMContentLoaded', ()=>{
    headerHandler();
})
/*helper functions */
    function el(id){
        return document.getElementById(id);
    }
    const getBoardData = (id) => {
      return fetch(`http://localhost:3000/boards/${id}`)
      .then(resp => resp.json())
    }

/* Event Handlers */

    /* Header navigation handling */
      const headerHandler = () => {
        el('feed-header').addEventListener("click", (e) => {
          e.preventDefault();

        });
        el('my-boards-header').addEventListener("click",(e)=>{
          e.preventDefault();
          setu1ForBoard();
        });
        el('friends-header').addEventListener("click",(e)=>{ 
          e.preventDefault();
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
          const u1 = currentUser;
          const u2 = target;
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
        fetch('http://localhost:3000/users')
        .then(resp => resp.json())
        .then(data => postFriendRequest(data,e.target.dataset.id))
      }

    /* Friend request button handlers */
      const handleAcceptBtn = (target) => {
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
        fetch(`http://localhost:3000/friend_requests/${target}`, {
          method: 'DELETE'
        }).then(getFriends())
      }

    /* Board form submit handler */
      const postUserBoard = (data,user) => {
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
        const u1 = currentUser;
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
      const postBoardRequest = () => {
        fetch('http://localhost:3000/user_boards', {
          method: 'POST',
          headers,
          body: JSON.stringify({
            status: "pending",
            user_id: friend,
            board_id: board
          })
        }).then(() => {
          console.log("we made it this far")
          board = 0;
          friend = 0;
        })
      }

      const boardList = (board) => {
        return fetch(`http://localhost:3000/user_boards`)
        .then(resp => resp.json())
      }
      const handleInviteBtn = () => {
        console.log(`BOARD: ${board}`);
        console.log(`FRIEND: ${friend}`);
        if (board == 0) {
          console.log("getting boards")
          getBoards(currentUser);
          return;
        }
        if (friend == 0){
          console.log("getting friends");
          getFriends();
          return
        }
        let userBoardFound
        boardList(board).then(data => {
          data.forEach(userBoard => {
            if (userBoard.board_id == board){
              userBoardFound = userBoard;
            }
          })
        console.log(`FOUND THIS USER BOARD: ${JSON.stringify(userBoardFound)}`)
        //function to get user board
          postBoardRequest(friend, board);
        });
      }
      const handleAcceptBoardRequestBtn = (userBoardId) => {
        fetch(`http://localhost:3000/user_boards/${userBoardId}`,{
        method: 'PATCH',
        headers,
        body: JSON.stringify({
          id: userBoardId,
          status: "active"
        }) 
      }).then(getBoards(currentUser));
      }
      const handleDeclineBoardRequestBtn = (userBoardId) => {
        fetch(`http://localhost:3000/user_boards/${userBoardId}`,{
        method: 'DELETE'
        }).then(getBoards(currentUser));
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
          const u1 = currentUser;
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


        boards.forEach(iBoard => { //YOU NEED TO CHECK FOR USERBOARD.STATUS == APPROVED
          iBoard.users.forEach(iUser => {
            if (iUser.id == user.id){
              /* creating elements */
              let li = document.createElement('li');
              let title = document.createElement('h1');
              let description = document.createElement('p');
                /* invite button */
              let inviteBtn = document.createElement('button');
              inviteBtn.innerText = 'Invite Friend';
              inviteBtn.dataset.boardId = iBoard.id;
              inviteBtn.type = ('button')
              inviteBtn.style = ('color:blue; background-color:orange');
              inviteBtn.addEventListener("click", (e) => {
                board = e.target.dataset.boardId;
                handleInviteBtn();
              });
              /* initializing elements */
              title.innerText = iBoard.title;
              description.innerText = iBoard.description;
              /* appending */
              li.append(title);
              li.append(description);
              li.append(inviteBtn);
              container.append(li);
            }            
          })
        })
        getUserBoardsForRequestsRendering();
      }
      const renderUserBoardRequests = (userBoards) => {
        const container = el('board-requests-pending');
        container.innerHTML = '';
        userBoards.forEach(userBoard => {
          if (userBoard.user_id == currentUser.id && userBoard.status == "pending"){
            /* declare element variables */
            let li = document.createElement('li');
            let message = document.createElement('p')
            let acceptBoardRequestBtn = document.createElement('button');
            let declineBoardRequestBtn = document.createElement('button');
            
            /* initialize variables */
            acceptBoardRequestBtn.dataset.userBoardId = userBoard.id;
            declineBoardRequestBtn.dataset.userBoardId = userBoard.id;
            acceptBoardRequestBtn.innerText = 'Accept'
            declineBoardRequestBtn.innerText = 'Decline'
            getBoardData(userBoard.board_id).then(datas => {
                /* button logic */
              message.innerText = `You have ben invited to ${datas.title}!`;
              acceptBoardRequestBtn.addEventListener("click", (e) => handleAcceptBoardRequestBtn(e.target.dataset.userBoardId));
              declineBoardRequestBtn.addEventListener("click", (e) => handleDeclineBoardRequestBtn(e.target.dataset.userBoardId));

              /* append elements */
              li.append(message);
              li.append(acceptBoardRequestBtn);
              li.append(declineBoardRequestBtn);
              container.append(li);
            })

          }
        })
      }
      const getUserBoardsForRequestsRendering = () => {
        fetch('http://localhost:3000/user_boards')
        .then(resp => resp.json())
        .then(data => renderUserBoardRequests(data))
      }
      const getBoards = (user) => {
        fetch('http://localhost:3000/boards')
        .then(resp => resp.json())
        .then(data => renderBoards(data, user))
      }
    /* Friends list */
      const renderFriends = (data,target) => {
        const u1 = currentUser;
        const u2 = target;
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
          /* Accepted friends */
          if ((request.requestor.id == u1.id || request.receiver.id == u1.id) && request.status == 'accepted'){
            let li = document.createElement('li'); 
            let name = document.createElement('h1');
            let bio = document.createElement('p');
            let inviteBtn = document.createElement('button');

            //make if statment for requestor or receiver
            if (request.requestor.id != u1.id){
              name = request.requestor.name;
              bio = request.requestor.bio;
              inviteBtn.dataset.friendId = request.requestor.id;
              friend = request.requestor.id;
              inviteBtn.innerText = "Invite User"
            }
            else {
              name = request.receiver.name;
              bio = request.receiver.bio;
              inviteBtn.dataset.friendId = request.receiver.id;
              inviteBtn.innerText = "Invite User"
              friend = request.receiver.id;
            }
            inviteBtn.addEventListener("click", () => {
              handleInviteBtn()
            });
            li.append(name);
            li.append(document.createElement('p'))
            li.append(bio);
            li.append(inviteBtn);
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
            acceptBtn.addEventListener("click", (e) => handleAcceptBtn(e.target.dataset.friendRequest));
            let declineBtn = document.createElement('button');
            declineBtn.innerText = "Decline";
            declineBtn.dataset.friendRequest = request.id;
            declineBtn.addEventListener("click", (e) => handleDeclineBtn(e.target.dataset.friendRequest));
            /* /buttons */

            //make if statment for requestor or receiver
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

