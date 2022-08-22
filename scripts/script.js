'use strict'

//переменные для формы входа
let entranceForm = document.querySelector('.entrance-form');

let emailEntrance = document.querySelector('#entranceEnt');
let errorEmailEntrance = document.querySelector('#emailMessageEnt');
let emailStarEntrance = document.querySelector('#emailStarEnt');
let emailTitleEntrance = document.querySelector('#emailTitleEnt');

let passwordEntrance = document.querySelector('#passwordEnt');
let errorPasswordEntrance = document.querySelector('#passwordMessageEnt');
let passwordStarEntrance = document.querySelector('#passwordStarEnt');
let passwordTitleEntrance = document.querySelector('#passwordTitleEnt');

let checkEntrance = document.querySelector('#check-boxEnt');
checkEntrance.checked = false;
let errorCheckEntrance = document.querySelector('#checkMessageEnt');
let checkStarEntrance = document.querySelector('#checkStarEnt');
let labelCheckEntrance = document.querySelector('#checkbox_checkEnt');

let entranceBtn = document.querySelector('.entrance-registration');

//переход по кнопке "зарегестрироваться" на форму регистрации
entranceBtn.addEventListener('click', (e) => {
entrance.style.display = 'none';
registration.style.display = 'block';
});

//переменные для регистрации
let registrationForm = document.querySelector('.registration-form');

let email = document.querySelector('.registration-form__item', '.email');
let errorEmail = document.querySelector('#emailMessage');
let emailStar = document.querySelector('#emailStar');
let emailTitle = document.querySelector('#emailTitle');

let password = document.querySelector('#password');
let errorPassword = document.querySelector('#passwordMessage');
let passwordStar = document.querySelector('#passwordStar');
let passwordTitle = document.querySelector('#passwordTitle');

let check = document.querySelector('#check_box');
check.checked = false;
let errorCheck = document.querySelector('#checkMessage');
let checkStar = document.querySelector('#checkStar');
let labelCheck = document.querySelector('#checkbox_check');

let registrationData = {email: null, password: null};
let usersData = [];

let registrationBtn = document.querySelector('.registration-entrance');
let registration = document.querySelector('.registration');
let entrance = document.querySelector('.entrance');

//валидност е-мейла регистрации
function validateEmail(email) {
const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

return re.test(String(email).toLowerCase());
}

//проверка е-мейл на пустую строку и выведение еррор
function emptyEmail(email, errorEmail, emailStar, emailTitle) {
if(email.value === '') {
    email.classList.add('errorBorder');
    errorEmail.innerHTML = 'Поле обязательно для заполнения!';
    errorEmail.classList.add('errorColor');
    emailStar.classList.add('errorColor');
    emailTitle.classList.add('errorColor');
    return true;

} else {
    email.classList.remove('errorBorder');
    errorEmail.classList.remove('errorColor');
    emailStar.classList.remove('errorColor');
    emailTitle.classList.remove('errorColor');
    return false;
}
}

//проверка на валидность е-мейла регистрации
function invalidEmail(email, errorEmail, emailStar, emailTitle) {
if(!validateEmail(email.value)) {
    email.classList.add('errorBorder');
    errorEmail.innerHTML = 'Email невалидный!';
    errorEmail.classList.add('errorColor');
    emailStar.classList.add('errorColor');
    emailTitle.classList.add('errorColor');
    return true;
} else {
    email.classList.remove('errorBorder');
    errorEmail.classList.remove('errorColor');
    emailStar.classList.remove('errorColor');
    emailTitle.classList.remove('errorColor');
    return false;
}
}

//проверка на пустую строку и кол-во символов пароля регистрации
function emptyPassword(password, errorPassword, passwordStar, passwordTitle) {
if(password.value === '' || password.value === null) {
    password.classList.add('errorBorder');
    errorPassword.innerHTML = 'Поле обязательно для заполнения!';
    errorPassword.classList.add('errorColor');
    passwordStar.classList.add('errorColor');
    passwordTitle.classList.add('errorColor');
    return true;
} else if(password.value.length < 8) {
    password.classList.add('errorBorder');
    errorPassword.innerHTML = 'Пароль должен содержать как минимум 8 символов!';
    errorPassword.classList.add('errorColor');
    passwordStar.classList.add('errorColor');
    passwordTitle.classList.add('errorColor');
    return true;
} else {
    password.classList.remove('errorBorder');
    errorPassword.classList.remove('errorColor');
    passwordStar.classList.remove('errorColor');
    passwordTitle.classList.remove('errorColor');
    return false;
}
}

//добавление-удаление галочки в чекбоксе
labelCheck.addEventListener('click', (e) => {
if(check.checked) {
    check.checked = false;
    labelCheck.style.removeProperty('background');
} else {
    check.checked = true;
    labelCheck.style.background = "url('../images/check.svg') no-repeat 2px 2px";
}
});

//проверка чекбокса регистрации на галочку(чек)
function emptyCheck(check) {
if(check.checked) {
    labelCheck.classList.remove('errorBorder');
    checkStar.classList.remove('errorColor');
    errorCheck.classList.remove('errorColor');
    return false;
} else {
    labelCheck.classList.add('errorBorder');
    checkStar.classList.add('errorColor');
    errorCheck.classList.add('errorColor');
    return true;
}
}

email.addEventListener('input', (e) => {
emptyEmail(email, errorEmail, emailStar, emailTitle);
});

password.addEventListener('change', (e) => {
emptyPassword(password, errorPassword, passwordStar, passwordTitle);
});

check.addEventListener('change', () => {
emptyCheck();
});

//запись в хранилище при выполнении всех условий
registrationForm.addEventListener('submit', (e) => {
e.preventDefault();
if((!emptyEmail(email, errorEmail, emailStar, emailTitle) && !invalidEmail(email, errorEmail, emailStar, emailTitle)) &
!emptyPassword(password, errorPassword, passwordStar, passwordTitle) & !emptyCheck(check)) {
    registrationData.email = email.value;
    registrationData.password = password.value;
    console.log(registrationData);
    if(localStorage.getItem('userData') != null) {
        usersData = JSON.parse(localStorage.getItem('userData'));
    } else {
        usersData = [];
    }
    usersData.push(registrationData);
    localStorage.setItem('userData', JSON.stringify(usersData));
}
alert("Успешная регистрация");
});

let getUsers;

//Проверяем существование пользователя в хранилище, сравнение с данными из хранилища введенных данных
function isCorrect(registrationData) {
getUsers = JSON.parse(localStorage.getItem('userData'));
return getUsers.some(item => item.email === registrationData.email && item.password === registrationData.password);
}


//переключение на форму входа кнопкой авторизация
registrationBtn.addEventListener('click', (e) => {
registration.style.display = 'none';
entrance.style.display = 'block';
})

//проверка на пустую строку е-мейла входа
function correctEmail(emailEntrance, errorEmailEntrance, emailStarEntrance, emailTitleEntrance) {
if(emailEntrance.value === '') {
    emailEntrance.classList.add('errorBorder');
    errorEmailEntrance.classList.add('errorColor');
    emailStarEntrance.classList.add('errorColor');
    emailTitleEntrance.classList.add('errorColor');
      return false;
} else {
    emailEntrance.classList.remove('errorBorder');
    errorEmailEntrance.classList.remove('errorColor');
    emailStarEntrance.classList.remove('errorColor');
    emailTitleEntrance.classList.remove('errorColor');
    return true;
}
}

//проверка на пустую строку пароля входа
function correctPassword(passwordEntrance, errorPasswordEntrance, passwordStarEntrance, passwordTitleEntrance) {
if(passwordEntrance.value === "" || passwordEntrance.value === null) {
    passwordEntrance.classList.add('errorBorder');
    errorPasswordEntrance.classList.add('errorColor');
    passwordStarEntrance.classList.add('errorColor');
    passwordTitleEntrance.classList.add('errorColor');
    return false;
} else {
    passwordEntrance.classList.remove('errorBorder');
    errorPasswordEntrance.classList.remove('errorColor');
    passwordStarEntrance.classList.remove('errorColor');
    passwordTitleEntrance.classList.remove('errorColor');
    return true;
}
}

//окрашиваем в нужные цвета :)
function correctData() {
if(isCorrect({email: emailEntrance.value, password: passwordEntrance.value})) {
    emailEntrance.classList.remove('errorBorder');
    emailStarEntrance.classList.remove('errorColor');
    emailTitleEntrance.classList.remove('errorColor');
    passwordEntrance.classList.remove('errorBorder');
    errorPasswordEntrance.classList.remove('errorColor');
    passwordStarEntrance.classList.remove('errorColor');
    passwordTitleEntrance.classList.remove('errorColor');
    return true;
} else {
    emailEntrance.classList.add('errorBorder');
    emailStarEntrance.classList.add('errorColor');
    emailTitleEntrance.classList.add('errorColor');
    passwordEntrance.classList.add('errorBorder');
    errorPasswordEntrance.classList.add('errorColor');
    errorPasswordEntrance.innerHTML = 'Логин или Пароль невереный!';
    passwordStarEntrance.classList.add('errorColor');
    passwordTitleEntrance.classList.add('errorColor');
    return false;
}
}

//галочка в чекбоксе входа
labelCheckEntrance.addEventListener('click', (e) => {
if(checkEntrance.checked) {
    checkEntrance.checked = true;
    labelCheckEntrance.style.removeProperty('background');
} else {
    checkEntrance.checked = false;
    labelCheckEntrance.style.background = "url('../images/check.svg') no-repeat 2px 2px";
}
});

//проверка чекбокса входа
function correctCheck(checkEntrance) {
if(checkEntrance.checked) {
    labelCheckEntrance.classList.remove('errorBorder');
    checkStarEntrance.classList.remove('errorColor');
    errorCheckEntrance.classList.remove('errorColor');
    return true;
} else {
    labelCheckEntrance.classList.add('errorBorder');
    checkStarEntrance.classList.add('errorColor');
    errorCheckEntrance.classList.add('errorColor');
    return false;
}
}

let ready = document.querySelector('.ready');

entranceForm.addEventListener('submit', (e) => {
e.preventDefault();
if((correctEmail(emailEntrance, errorEmailEntrance, emailStarEntrance, emailTitleEntrance) & correctPassword(passwordEntrance, errorPasswordEntrance, passwordStarEntrance, passwordTitleEntrance) & correctCheck(checkEntrance)) && correctData()) {
    entrance.style.display = 'none';
    ready.style.display = 'block';
    console.log('готово!');
}
});