const socket = io('http://localhost:3000')

const form = document.querySelector('.msg-form')
const formContainer = document.querySelector('.form-container')
const messageInput = document.querySelector('.msg-input')

const user = prompt('Enter a username:') //enter a username
addMessage('You joined the chat!')  //display welcome message
socket.emit('new-user', user)   //sent the new user to the server

socket.on('message', data => {
    addMessage(`${data.user}: ${data.message}`)   
})

socket.on('user-joined', user => {
    addMessage(`${user} has joined the chat!`)  //Send a notification that a user has joined   
})

form.addEventListener('submit', e=> {
    e.preventDefault()                       
    const message = messageInput.value  
    addMyMessage(`You: ${message}`)        //whenever a message is sent, it is displayed on your browser
    socket.emit('send-message', message)     
    messageInput.value = ''       
})
 
function addMessage(message){  
    const displayedMessage = document.createElement('p')   
    displayedMessage.innerText = message  
    formContainer.append(displayedMessage)  
}

function addMyMessage(message){
    const displayedMessage = document.createElement('p');   
    displayedMessage.innerText = message;  
    displayedMessage.style.textAlign = "right";
    displayedMessage.style.padding = "5px";
    displayedMessage.style.borderRadius = "25px";
    displayedMessage.style.backgroundColor = "gray";
    displayedMessage.style.color = "white";
    formContainer.append(displayedMessage);  
}
