import BurgerMenu from "../../assets/js/burger-menu.js";

const burgerMenu = document.querySelector('.burger-menu');
const burgerNav = document.querySelector('.header__nav_burger-menu');
const openMenuBtn = document.querySelector('.header__burger-menu-btn');

new BurgerMenu(burgerMenu, burgerNav, openMenuBtn)

console.log('1')