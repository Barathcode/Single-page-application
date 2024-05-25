//Showing and Hidding Functions
const showElement = (elementToShow='', elementToHide='') => {
    document.getElementById(elementToShow).classList.remove('hidden');
    document.getElementById(elementToHide).classList.add('hidden');
};

//function to sign up a new user
const signUp = () => {
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('signup-confirm-password').value;

    if (name === '' || email === '' || password === '' || confirmPassword === '') {
        alert('All fields are required');
        return;
    }

    if (password !== confirmPassword) {
        alert('Passwords do not match.');
        return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];

    if (users.some(user=>user.email===email)){
        alert('User already exits');
        return showElement('login-form','signup-form')
    }

    users.push({name,email,password})
    localStorage.setItem('users',JSON.stringify(users))
    alert('Sign up successful')

    showElement('login-form','signup-form')
}

//function to log in an existing user
const login = () => {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        document.getElementById('welcome-message').textContent = `Welcome ${user.name} - ${user.email}`;
        showElement('dashboard','login-form');
    } else {
        alert('Invalid Login');
    }
};

//Logout function
const logout=()=>{
    localStorage.removeItem('currentUser')

    //After logout the contents present inside of the input boxes should be blank for that we are using this code
    document.getElementById('login-email').value = '';
    document.getElementById('login-password').value = '';
    document.getElementById('signup-name').value = '';
    document.getElementById('signup-email').value = '';
    document.getElementById('signup-password').value = '';
    document.getElementById('signup-confirm-password').value = '';

    showElement('login-form','dashboard')
}

// This function is executed when the entire webpage has finished loading. 
// It checks if there is a currently logged-in user stored in the localStorage.
// If a user is found, it updates the welcome message with the user's name and email,
// and displays the dashboard section. Otherwise, it does nothing (leaving the login or sign-up form visible).
window.onload = () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
        document.getElementById('welcome-message').textContent = `Welcome ${currentUser.name} - ${currentUser.email}`;
        showElement('dashboard');
    }
};