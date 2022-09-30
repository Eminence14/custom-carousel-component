const prevBtn = document.querySelector('.nav.left')
const nextBtn = document.querySelector('.nav.right')
const track = document.querySelector('.track')
const slides = Array.from(track.children)
const navigate = document.querySelector('.navigate')
const navBtn = Array.from(navigate.children)
const slideWidth = slides[0].getBoundingClientRect().width

// Set slide position
function setSlide(slide, index) {
    slide.style.left = `${slideWidth * index}px`
}
slides.forEach(setSlide)

function moveSlide(currentSlide, targetSlide) {
    track.style.transform = `translateX(-${targetSlide.style.left})`
    currentSlide.classList.remove('current')
    targetSlide.classList.add('current')
}

function updateDots(currentDot, targetDot) {
    currentDot.classList.remove('current')
    targetDot.classList.add('current')
}

function showArrow(targetIndex) {
    if (targetIndex === 0) {
        prevBtn.classList.add('hide')
        nextBtn.classList.remove('hide')
    } else if (targetIndex === slides.length - 1) {
        prevBtn.classList.remove('hide')
        nextBtn.classList.add('hide')
    } else {
        prevBtn.classList.remove('hide')
        nextBtn.classList.remove('hide')
    }
}

// click on the next button to go to the next slide
nextBtn.addEventListener('click', () => {
    const currentSlide = track.querySelector('.current')
    const nextSlide = currentSlide.nextElementSibling;
    const currentDot = navigate.querySelector('.current')
    const nextDot = currentDot.nextElementSibling;
    const nextIndex = slides.indexOf(nextSlide)

    showArrow(nextIndex)
    updateDots(currentDot, nextDot)
    moveSlide(currentSlide, nextSlide)
})

// click on the previous button to go back
prevBtn.addEventListener('click', () => {
    const currentSlide = track.querySelector('.current')
    const prevSlide = currentSlide.previousElementSibling;
    const currentDot = navigate.querySelector('.current')
    const prevDot = currentDot.previousElementSibling;
    const prevIndex = slides.indexOf(prevSlide)

    showArrow(prevIndex)
    updateDots(currentDot, prevDot)
    moveSlide(currentSlide, prevSlide)
})

// click on nav bars should move to the required slide
navigate.addEventListener('click', e => {
    const targetDot = e.target.closest('button')
    if (!targetDot) return;

    const currentSlide = track.querySelector('.current')
    const currentDot = navigate.querySelector('.current')
    const targetIndex = navBtn.findIndex(dot => dot === targetDot)
    const targetSlide = slides[targetIndex]

    showArrow(targetIndex)
    updateDots(currentDot, targetDot)
    moveSlide(currentSlide, targetSlide)
})

// Set interval to loop infinitely
const timerFunc = () => {
    const timer = setInterval(() => {
        const currentSlide = track.querySelector('.current')

        if (slides.indexOf(currentSlide) + 1 === slides.length) {
            clearInterval(timer)

            currentDot = navigate.querySelector('.current')
            targetSlide = slides[0]
            targetDot = navBtn[0]
            targetIndex = 0

            showArrow(targetIndex)
            updateDots(currentDot, targetDot)
            moveSlide(currentSlide, targetSlide)

            timerFunc()
        } else {
            nextBtn.click()
        }
    }, 5000);
}
timerFunc()