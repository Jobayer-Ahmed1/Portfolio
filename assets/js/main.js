/*===== MENU SHOW =====*/ 
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)

    if(toggle && nav){
        toggle.addEventListener('click', ()=>{
            nav.classList.toggle('show')
        })
    }
}
showMenu('nav-toggle','nav-menu')

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    navMenu.classList.remove('show')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== SCROLL SHADOW ====================*/
const header = document.getElementById('header')

window.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
        header.classList.add('scroll')
    } else {
        header.classList.remove('scroll')
    }
}, { passive: true })


/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () =>{
    const scrollDown = window.scrollY

  sections.forEach(current =>{
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 58,
              sectionId = current.getAttribute('id'),
              sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')
        
        if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
            sectionsClass.classList.add('active-link')
        }else{
            sectionsClass.classList.remove('active-link')
        }                                                    
    })
}
window.addEventListener('scroll', scrollActive, { passive: true })

/*===== THEME TOGGLE =====*/
const themeToggle = document.getElementById('theme-toggle')
const themeIcon = document.getElementById('theme-icon')

const applyTheme = (theme) => {
    document.body.classList.toggle('dark', theme === 'dark')

    if (themeIcon) {
        themeIcon.className = theme === 'dark' ? 'bx bx-sun' : 'bx bx-moon'
    }

    if (themeToggle) {
        themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode')
    }
}

const savedTheme = localStorage.getItem('theme')
const preferredTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
applyTheme(savedTheme || preferredTheme)

themeToggle?.addEventListener('click', () => {
    const isDark = document.body.classList.contains('dark')
    const nextTheme = isDark ? 'light' : 'dark'
    applyTheme(nextTheme)
    localStorage.setItem('theme', nextTheme)
})

/*===== PROJECT IMAGE LIGHTBOX =====*/
const lightbox = document.getElementById('lightbox')
const lightboxImage = lightbox?.querySelector('.lightbox__image')
const lightboxTriggers = document.querySelectorAll('.work__preview')
const closeButtons = document.querySelectorAll('[data-close-lightbox]')

const openLightbox = (src, alt) => {
    if (!lightbox || !lightboxImage) return

    lightboxImage.src = src
    lightboxImage.alt = alt
    lightbox.classList.add('is-open')
    lightbox.setAttribute('aria-hidden', 'false')
    document.body.style.overflow = 'hidden'
}

const closeLightbox = () => {
    if (!lightbox || !lightboxImage) return

    lightbox.classList.remove('is-open')
    lightbox.setAttribute('aria-hidden', 'true')
    document.body.style.overflow = ''
    lightboxImage.removeAttribute('src')
    lightboxImage.alt = ''
}

lightboxTriggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
        const src = trigger.getAttribute('data-lightbox-src')
        const alt = trigger.getAttribute('data-lightbox-alt')
        if (src) openLightbox(src, alt || '')
    })
})

closeButtons.forEach((button) => {
    button.addEventListener('click', closeLightbox)
})

lightbox?.addEventListener('click', (event) => {
    if (event.target === lightbox || event.target.matches('[data-close-lightbox]')) {
        closeLightbox()
    }
})

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && lightbox?.classList.contains('is-open')) {
        closeLightbox()
    }
})

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '45px',
    duration: 700,
    delay: 0,
    easing: 'ease-out',
    reset: true,
    viewFactor: 0.15,
    mobile: true,
    useDelay: 'always'
});

sr.reveal('.home__data, .about__img, .skills__subtitle, .skills__text', { delay: 0 });
sr.reveal('.home__img, .about__subtitle, .about__text, .skills__img', { delay: 80 });
sr.reveal('.home__social-icon', { interval: 100, delay: 0 });
sr.reveal('.skills__data, .work__img, .contact__input', { interval: 100, delay: 0 });
