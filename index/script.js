const isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
    },
    any: function () {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

const menu = document.querySelector('.menu__body')
const menuBtn = document.querySelector('.menu__icon')

const body = document.body

if (menu && menuBtn) {
    menuBtn.addEventListener('click', () => {
        menu.classList.toggle('active')
        menuBtn.classList.toggle('active')
        body.classList.toggle('lock')
    })

    menu.querySelectorAll('.menu__link').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('active')
            menuBtn.classList.remove('active')
            body.classList.remove('lock')
        })
    })
}


const anchors = document.querySelectorAll('a[href*="#"]')

anchors.forEach(anchor => {
    anchor.addEventListener('click', event => {
        event.preventDefault();

        const blockID = anchor.getAttribute('href').substring(1)

        document.getElementById(blockID).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        })
    })
})

const productsMenuBtns = document.querySelectorAll('.products__item')

productsMenuBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        if (e.target.classList.contains('products__submenu') || e.target.classList.contains('products__submenu__container')) {
            return
        }
        const isActive = btn.classList.contains('active')
        productsMenuBtns.forEach((el) => el.classList.remove('active'))
        if (isActive) {
            btn.classList.remove('active')
        } else {
            btn.classList.add('active')
        }
    })
    if (!isMobile.any()) {
        btn.addEventListener('mouseenter', () => {
            btn.classList.toggle('active')
        })
        btn.addEventListener('mouseleave', () => {
            if (!btn.classList.contains('active')) {
                return
            }
            btn.classList.toggle('active')
        })
    }
})

document.addEventListener('click', (e) => {
    if (e.target.closest('.products__item')) {
        return
    }
    else {
        productsMenuBtns.forEach((el) => el.classList.remove('active'))
    }
})

if (!isMobile.any()) {
    const slider = document.querySelector('.popular__list')
    let mouseDown = false
    let startX, scrollLeft

    let startDragging = function (e) {
        mouseDown = true
        startX = e.pageX - slider.offsetLeft
        scrollLeft = slider.scrollLeft
    };
    let stopDragging = function () {
        mouseDown = false
    };

    slider.addEventListener('mousemove', (e) => {
        e.preventDefault()
        if (!mouseDown) { return }
        const x = e.pageX - slider.offsetLeft
        const scroll = x - startX
        slider.scrollLeft = scrollLeft - scroll
    });

    slider.addEventListener('mousedown', startDragging, false)
    slider.addEventListener('mouseup', stopDragging, false)
    slider.addEventListener('mouseleave', stopDragging, false)
} else {
    const slider = document.querySelector('.popular__list')
    slider.style.overflowX = 'scroll'
}