const myForm = document.querySelector('#my-form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const msg = document.querySelector('.msg');
const userList = document.querySelector('#users');
const phoneInput = document.querySelector('#phone');
const itemList = document.querySelector('#users');

// Listen for form submit
myForm.addEventListener('submit', onSubmit);
itemList.addEventListener('click', onDelete)
itemList.addEventListener('click', onEdit);

function onEdit(e) {
  var li = e.target.parentElement;
  if (e.target.classList.contains('edit'))
    for (let i = 0; i < localStorage.length; i++) {
      var key = localStorage.key(i); // Get the key at index i
      var firstChildText = li.firstChild.textContent; // Get the text content of the first child node
      // console.log(firstChildText);
      console.log('edit');

      // Check if the key is present in the text content
      if (firstChildText.indexOf(key) !== -1) {

        data = JSON.parse(localStorage.getItem(key));
        nameInput.value = data.userName;
        emailInput.value = data.email;
        phoneInput.value = data.phone;

        localStorage.removeItem(key); // Remove the item from localStorage
      }
    }


  itemList.removeChild(li); // Remove the <li> element from the DOM

}


function onDelete(e) {
  var li = e.target.parentElement;
  if (e.target.classList.contains('delete')) {
    for (let i = 0; i < localStorage.length; i++) {
      var key = localStorage.key(i); // Get the key at index i
      var firstChildText = li.firstChild.textContent; // Get the text content of the first child node
      console.log('delete');


      // Check if the key is present in the text content

      localStorage.removeItem(key); // Remove the item from localStorage

    }

    if (e.target.classList.contains('delete')) {
      itemList.removeChild(li); // Remove the <li> element from the DOM
    }
  }
}


function onSubmit(e) {
  e.preventDefault();

  if (nameInput.value === '' || emailInput.value === '' || phoneInput.value === '') {
    // alert('Please enter all fields');
    msg.classList.add('error');
    msg.innerHTML = 'Please enter all fields';

    // Remove error after 3 seconds
    setTimeout(() => msg.remove(), 3000);
  } else {
    // Create new list item with user
    const li = document.createElement('li');


    // creating delete button 
    const deleteButton = document.createElement('button');
    const editButton = document.createElement('button');
    deleteButton.className = "btn btn-danger btn-sm float-end delete"
    editButton.className = "btn btn-danger btn-sm float-end mr-4 edit"
    deleteButton.appendChild(document.createTextNode('Delete'))
    editButton.appendChild(document.createTextNode('Edit'));

    // Add text node with input values
    li.appendChild(document.createTextNode(`${nameInput.value} - ${emailInput.value} - ${phoneInput.value}`));
    li.appendChild(deleteButton);
    li.appendChild(editButton);
    // Add HTML
    // li.innerHTML = `<strong>${nameInput.value}</strong>e: ${emailInput.value}`;

    // storing user's details inside local storage
    // localStorage.setItem('username', nameInput.value);
    // localStorage.setItem('email', emailInput.value);


    // storing uniquely every user details



    // Append to ul
    userList.appendChild(li);
    addUserToLocalStorage(nameInput.value, emailInput.value, phoneInput.value);

    // Clear fields
    nameInput.value = '';
    emailInput.value = '';
    phoneInput.value = "";


  }
  function addUserToLocalStorage(nameInput, emailInput, phoneInput) {
    // Generate a unique key for the user (e.g., using a timestamp)
    const userKey = emailInput;
    const newUser = {
      userName: nameInput,
      email: emailInput,
      phone: phoneInput
    }

    // Store the user data in localStorage using the generated key
    localStorage.setItem(userKey, JSON.stringify(newUser));
  }
}