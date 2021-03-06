/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
const fragment = document.createDocumentFragment();
const sections = document.querySelectorAll("section");

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
function createNavItem(id, name){
    const navItem = `<a class ="menu__link" data-id="${id}">${name}</a>`;
    return navItem;
}
// the following function was made with the help of https://www.javascripttutorial.net/dom/css/check-if-an-element-is-visible-in-the-viewport/
function isInViewport(element) {
    const { top, bottom } = element.getBoundingClientRect();
    const vHeight = (window.innerHeight || document.documentElement.clientHeight);

    return (
        (top > 0 || bottom > 0) &&
        top < vHeight
    );
}


/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
function buildNavbar(){
    for(let i = 0; i < sections.length; i++){
        const newMenuItem = document.createElement("li");
        const sectionId = sections[i].getAttribute("id");
        const sectionName = sections[i].getAttribute("data-nav");
        newMenuItem.innerHTML = createNavItem(sectionId, sectionName);
        fragment.appendChild(newMenuItem);
    }
    const navbarList = document.getElementById('navbar__list')
    navbarList.appendChild(fragment);
}

// Add class 'active' to section when near top of viewport
function setToActive(){
    for (let i = 0; i < sections.length; i++){
        if (isInViewport(sections[i])){
            sections[i].classList.add("your-active-class");
        }else{
            sections[i].classList.remove("your-active-class");
        }
    }
}


// Scroll to anchor ID using scrollTO event
function scrollToSection(event) {
    event.preventDefault();
    if(event.target.nodeName === "A"){
        const sectionId = event.target.getAttribute('data-id');
        const section = document.getElementById(sectionId);
        section.scrollIntoView({behavior: "smooth"});
    }
}
/**
 * End Main Functions
 * Begin Events
 * 
*/


// Build menu 
buildNavbar();
// Scroll to section on link click
const navBarList = document.getElementById('navbar__list')
navBarList.addEventListener('click', function(event){
    scrollToSection(event)
})
// Set sections as active
document.addEventListener('scroll', function(){
    setToActive();
});
