window.addEventListener('load', function() {
    window.scrollTo(0, 0); // Scrolls to the top of the page
});

if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual'; // Prevents the browser from restoring scroll position
}
let sideMenuVisible = false;

let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', function(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    updateOverlayPosition();
});

window.addEventListener('scroll', function() {
    let scrolled = window.scrollY;
    document.querySelector('.background').style.transform = `translateY(${scrolled * 0.6}px)`;

    updateOverlayPosition();
});


function updateOverlayPosition() {
    const overlay = document.querySelector('.overlay');
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollLeft = window.scrollX || document.documentElement.scrollLeft;
    overlay.style.top = `${mouseY + scrollTop - overlay.offsetHeight / 2}px`;
    overlay.style.left = `${mouseX + scrollLeft - overlay.offsetWidth / 2}px`;
}

let hiddenTexts = document.querySelectorAll('.hidden');

function revealText(index, offset) {

    if (index < 3+offset) {
        makeVisible(hiddenTexts[index]);
        setTimeout(() => revealText(index + 1, offset), 500);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    revealText(0, 0);
    document.getElementById('e').addEventListener('animationend', function handleAnimationEnd() {
        revealText(3, 3);
    });
});


function makeVisible(element) {
    element.classList.remove('hidden');
    element.classList.add('visible');
}

function toggleSideBar(){
    
    var targetElement = document.getElementById("navbar");
    var yPosition = targetElement.getBoundingClientRect().top;

    console.log('Y Position:', yPosition);

    if(yPosition != 0 && sideMenuVisible == false)
    {
        scrollToSection("about").then(openSideMenu);

    }

    else if(yPosition == 0 && sideMenuVisible == false){
        openSideMenu();
    }

    else if (sideMenuVisible == true){
        closeSideMenu();
    }
    
}

function openSideMenu(){
    document.getElementById("side-menu").style.transform = "translateX(0%)";
    sideMenuVisible = true;
    document.body.style.overflow = 'hidden';
}

function closeSideMenu(){
    document.getElementById("side-menu").style.transform = "translateX(-100%)";
    sideMenuVisible =false;
    window.onscroll = null;
    document.body.style.overflow = 'scroll';
}

function scrollToSection(id){


    if (sideMenuVisible == true){
        closeSideMenu();
    }
    var headerOffset = 90;
    var elementPosition = document.getElementById(id).getBoundingClientRect().top;
    var offsetPosition = elementPosition + window.scrollY - headerOffset;
  


    return new Promise((resolve) => {
        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
        });

        // Resolve the promise after scrolling completes
        setTimeout(resolve, 500); // Adjust the timeout as needed
    });
}


function scrollCircular() {
        
    let currentDegrees = scrollableElement.scrollTop * (2*Math.PI)/maxScroll;

    for (let i = 0; i<numberOfImages; i++){
        currentDegrees += degreeSection;
        images[i].style.top = String(Yradius * Math.sin(currentDegrees)) + "%";
        images[i].style.right = String(Xradius * Math.cos(currentDegrees)) + "%";
        images[i].style.zIndex = String(Math.round(Yradius * Math.cos(currentDegrees)));
        images[i].style.filter = 'blur(' + (-1* blurScale * Math.cos(currentDegrees)) + 'px)';

        if(images[i].id == "Microcontroller Programming image"){
            images[i].style.height = String(23 + (heightScale * Math.cos(currentDegrees))) + "%";
        }
        else{
            images[i].style.height = String(startHeight + (heightScale * Math.cos(currentDegrees))) + "%";
        }
    }

}

document.addEventListener('DOMContentLoaded', function() {
    let currentDegrees = 0;

    for (let i = 0; i<numberOfImages; i++){
        currentDegrees += degreeSection;
        images[i].style.top = String(Yradius * Math.sin(currentDegrees)) + "%";
        images[i].style.right = String(Xradius * Math.cos(currentDegrees)) + "%";
        images[i].style.zIndex = String(Math.round(Yradius * Math.cos(currentDegrees)));
        images[i].style.filter = 'blur(' + (-1* blurScale * Math.cos(currentDegrees)) + 'px)';

        if(images[i].id == "Microcontroller Programming image"){
            images[i].style.height = String(23 + (heightScale * Math.cos(currentDegrees))) + "%";
        }
        else{
            images[i].style.height = String(startHeight + (heightScale * Math.cos(currentDegrees))) + "%";
        }

    }


    
}, { once: true });


const images = document.querySelectorAll('.skill-icons');
const scrollableElement = document.getElementById('scroll-container');
scrollableElement.addEventListener('scroll', scrollCircular);

const scrollItems = document.querySelectorAll('.spacer');

let skillDesc = document.getElementById('skills-description');


const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        let currentImage = document.getElementById(entry.target.id + " image");
        if (entry.isIntersecting) {
            skillDesc.innerText = entry.target.id;
        }

    });
    }, {
    root: scrollableElement,
    threshold: 0.63 // Adjust threshold as needed
    });

    scrollItems.forEach(item => {
        observer.observe(item);
});

let isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

if(isTouchDevice){
        
    let startY;

    scrollableElement.addEventListener('touchstart', function(event) {
        startY = event.touches[0].pageY;
    });

    scrollableElement.addEventListener('touchmove', function(event) {
        const currentY = event.touches[0].pageY;
        const deltaY = startY - currentY;
        scrollableElement.scrollTop -= deltaY;
        startY = currentY;
        event.preventDefault();
    });
}


let maxScroll = scrollableElement.scrollHeight - scrollableElement.offsetHeight;

let Yradius = 30;
let Xradius = 12;
let heightScale = 4;
let startHeight = 20;
let blurScale = 3;
let numberOfImages = images.length;
let degreeSection = (2*Math.PI)/numberOfImages;




