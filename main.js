const myForm = document.querySelector('#my-form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const msg = document.querySelector('.msg');
const userList = document.querySelector('#users');
const phoneInput = document.querySelector('#phone');
console.log(phoneInput);

// Listen for form submit
myForm.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();
  
  if(nameInput.value === '' || emailInput.value === '' || phoneInput == '') {
    // alert('Please enter all fields');
    msg.classList.add('error');
    msg.innerHTML = 'Please enter all fields';

    // Remove error after 3 seconds
    setTimeout(() => msg.remove(), 3000);
  } else {
    // Create new list item with user
    const li = document.createElement('li');

    // Add text node with input values
    li.appendChild(document.createTextNode(`${nameInput.value} - ${emailInput.value} - ${phoneInput.value}`));

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


  }
  function addUserToLocalStorage(nameInput, emailInput, phoneInput) {
    // Generate a unique key for the user (e.g., using a timestamp)
    const userKey = emailInput;
    const newUser = {
        userName :  nameInput,
        email    :  emailInput,
        phone    : phoneInput
    }
    
    // Store the user data in localStorage using the generated key
    localStorage.setItem(userKey, JSON.stringify(newUser));
  }
}