function userScroll() {
    const navbar = document.querySelector(".navbar");
    const toTopBtn = document.querySelector("#to-top");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("navbar-sticky");
            toTopBtn.classList.add("show");
        } else {
            navbar.classList.remove("contact");
            toTopBtn.classList.remove("show");
        }
    });
}

function scrollToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

function incrementStats() {
    const counters = document.querySelectorAll(".counter");

    counters.forEach((counter) => {
        counter.innerText = 0;

        const updateCounter = () => {
            const target = +counter.getAttribute("data-target");
            const c = +counter.innerText;

            const increment = target / 200;

            if (c < target) {
                counter.innerText = Math.ceil(c + increment);
                setTimeout(updateCounter, 1);
            } else {
                counter.innerText = target;
            }
        };

        updateCounter();
    });
}

// Event Listeners
document.addEventListener("DOMContentLoaded", userScroll);
document.addEventListener("DOMContentLoaded", incrementStats);
document.querySelector("#to-top").addEventListener("click", scrollToTop);

document.addEventListener("DOMContentLoaded", function () {
    const boxes = document.querySelectorAll(".box");

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                }
            });
        },
        { threshold: 0.5 }
    ); // Ajuste o valor do threshold conforme necessário

    boxes.forEach((box) => {
        observer.observe(box);
    });
});

document.addEventListener("DOMContentLoaded", function () {
    // Intercepta os cliques nos links e rola suavemente até a seção correspondente
    document
        .getElementById("home-link")
        .addEventListener("click", function (event) {
            event.preventDefault();
            document
                .getElementById("home")
                .scrollIntoView({ behavior: "smooth" });
        });

    document
        .getElementById("sobre-link")
        .addEventListener("click", function (event) {
            event.preventDefault();
            document
                .getElementById("sobre")
                .scrollIntoView({ behavior: "smooth" });
        });

    document
        .getElementById("equipe-link")
        .addEventListener("click", function (event) {
            event.preventDefault();
            document
                .getElementById("equipe")
                .scrollIntoView({ behavior: "smooth" });
        });

    document
        .getElementById("contato-link")
        .addEventListener("click", function (event) {
            event.preventDefault();
            document
                .getElementById("contato")
                .scrollIntoView({ behavior: "smooth" });
        });

    document
        .getElementById("duvida-link")
        .addEventListener("click", function (event) {
            event.preventDefault();
            document
                .getElementById("duvida")
                .scrollIntoView({ behavior: "smooth" });
        });
});

window.onload = function () {
    window.scrollTo(0, 0);
};

console.clear();

const { gsap, imagesLoaded } = window;

const buttons = {
    prev: document.querySelector(".btn--left"),
    next: document.querySelector(".btn--right"),
};
const cardsContainerEl = document.querySelector(".cards__wrapper");
const appBgContainerEl = document.querySelector(".app__bg");

const cardInfosContainerEl = document.querySelector(".info__wrapper");

buttons.next.addEventListener("click", () => swapCards("right"));

buttons.prev.addEventListener("click", () => swapCards("left"));

function swapCards(direction) {
    const currentCardEl = cardsContainerEl.querySelector(".current--card");
    const previousCardEl = cardsContainerEl.querySelector(".previous--card");
    const nextCardEl = cardsContainerEl.querySelector(".next--card");

    const currentBgImageEl = appBgContainerEl.querySelector(".current--image");
    const previousBgImageEl =
        appBgContainerEl.querySelector(".previous--image");
    const nextBgImageEl = appBgContainerEl.querySelector(".next--image");

    changeInfo(direction);
    swapCardsClass();

    removeCardEvents(currentCardEl);

    function swapCardsClass() {
        currentCardEl.classList.remove("current--card");
        previousCardEl.classList.remove("previous--card");
        nextCardEl.classList.remove("next--card");

        currentBgImageEl.classList.remove("current--image");
        previousBgImageEl.classList.remove("previous--image");
        nextBgImageEl.classList.remove("next--image");

        currentCardEl.style.zIndex = "50";
        currentBgImageEl.style.zIndex = "-2";

        if (direction === "right") {
            previousCardEl.style.zIndex = "20";
            nextCardEl.style.zIndex = "30";

            nextBgImageEl.style.zIndex = "-1";

            currentCardEl.classList.add("previous--card");
            previousCardEl.classList.add("next--card");
            nextCardEl.classList.add("current--card");

            currentBgImageEl.classList.add("previous--image");
            previousBgImageEl.classList.add("next--image");
            nextBgImageEl.classList.add("current--image");
        } else if (direction === "left") {
            previousCardEl.style.zIndex = "30";
            nextCardEl.style.zIndex = "20";

            previousBgImageEl.style.zIndex = "-1";

            currentCardEl.classList.add("next--card");
            previousCardEl.classList.add("current--card");
            nextCardEl.classList.add("previous--card");

            currentBgImageEl.classList.add("next--image");
            previousBgImageEl.classList.add("current--image");
            nextBgImageEl.classList.add("previous--image");
        }
    }
}

function changeInfo(direction) {
    let currentInfoEl = cardInfosContainerEl.querySelector(".current--info");
    let previousInfoEl = cardInfosContainerEl.querySelector(".previous--info");
    let nextInfoEl = cardInfosContainerEl.querySelector(".next--info");

    gsap.timeline()
        .to([buttons.prev, buttons.next], {
            duration: 0.2,
            opacity: 0.5,
            pointerEvents: "none",
        })
        .to(
            currentInfoEl.querySelectorAll(".text"),
            {
                duration: 0.4,
                stagger: 0.1,
                translateY: "-120px",
                opacity: 0,
            },
            "-="
        )
        .call(() => {
            swapInfosClass(direction);
        })
        .call(() => initCardEvents())
        .fromTo(
            direction === "right"
                ? nextInfoEl.querySelectorAll(".text")
                : previousInfoEl.querySelectorAll(".text"),
            {
                opacity: 0,
                translateY: "40px",
            },
            {
                duration: 0.4,
                stagger: 0.1,
                translateY: "0px",
                opacity: 1,
            }
        )
        .to([buttons.prev, buttons.next], {
            duration: 0.2,
            opacity: 1,
            pointerEvents: "all",
        });

    function swapInfosClass() {
        currentInfoEl.classList.remove("current--info");
        previousInfoEl.classList.remove("previous--info");
        nextInfoEl.classList.remove("next--info");

        if (direction === "right") {
            currentInfoEl.classList.add("previous--info");
            nextInfoEl.classList.add("current--info");
            previousInfoEl.classList.add("next--info");
        } else if (direction === "left") {
            currentInfoEl.classList.add("next--info");
            nextInfoEl.classList.add("previous--info");
            previousInfoEl.classList.add("current--info");
        }
    }
}

function updateCard(e) {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const centerPosition = {
        x: box.left + box.width / 2,
        y: box.top + box.height / 2,
    };
    let angle = Math.atan2(e.pageX - centerPosition.x, 0) * (35 / Math.PI);
    gsap.set(card, {
        "--current-card-rotation-offset": `${angle}deg`,
    });
    const currentInfoEl = cardInfosContainerEl.querySelector(".current--info");
    gsap.set(currentInfoEl, {
        rotateY: `${angle}deg`,
    });
}

function resetCardTransforms(e) {
    const card = e.currentTarget;
    const currentInfoEl = cardInfosContainerEl.querySelector(".current--info");
    gsap.set(card, {
        "--current-card-rotation-offset": 0,
    });
    gsap.set(currentInfoEl, {
        rotateY: 0,
    });
}

function initCardEvents() {
    const currentCardEl = cardsContainerEl.querySelector(".current--card");
    currentCardEl.addEventListener("pointermove", updateCard);
    currentCardEl.addEventListener("pointerout", (e) => {
        resetCardTransforms(e);
    });
}

initCardEvents();

function removeCardEvents(card) {
    card.removeEventListener("pointermove", updateCard);
}

function init() {
    let tl = gsap.timeline();

    tl.to(cardsContainerEl.children, {
        delay: 0.15,
        duration: 0.5,
        stagger: {
            ease: "power4.inOut",
            from: "right",
            amount: 0.1,
        },
        "--card-translateY-offset": "0%",
    })
        .to(
            cardInfosContainerEl
                .querySelector(".current--info")
                .querySelectorAll(".text"),
            {
                delay: 0.5,
                duration: 0.4,
                stagger: 0.1,
                opacity: 1,
                translateY: 0,
            }
        )
        .to(
            [buttons.prev, buttons.next],
            {
                duration: 0.4,
                opacity: 1,
                pointerEvents: "all",
            },
            "-=0.4"
        );
}

const carousel = document.querySelector(".carousel"),
    firstImg = carousel.querySelectorAll("img")[0],
    arrowIcons = document.querySelectorAll(".wrapper i");

let isDragStart = false,
    isDragging = false,
    prevPageX,
    prevScrollLeft,
    positionDiff;

const showHideIcons = () => {
    // showing and hiding prev/next icon according to carousel scroll left value
    let scrollWidth = carousel.scrollWidth - carousel.clientWidth; // getting max scrollable width
    arrowIcons[0].style.display = carousel.scrollLeft == 0 ? "none" : "block";
    arrowIcons[1].style.display =
        carousel.scrollLeft == scrollWidth ? "none" : "block";
};

arrowIcons.forEach((icon) => {
    icon.addEventListener("click", () => {
        let firstImgWidth = firstImg.clientWidth + 14; // getting first img width & adding 14 margin value
        // if clicked icon is left, reduce width value from the carousel scroll left else add to it
        carousel.scrollLeft +=
            icon.id == "left" ? -firstImgWidth : firstImgWidth;
        setTimeout(() => showHideIcons(), 60); // calling showHideIcons after 60ms
    });
});

const autoSlide = () => {
    // if there is no image left to scroll then return from here
    if (
        carousel.scrollLeft - (carousel.scrollWidth - carousel.clientWidth) >
            -1 ||
        carousel.scrollLeft <= 0
    )
        return;

    positionDiff = Math.abs(positionDiff); // making positionDiff value to positive
    let firstImgWidth = firstImg.clientWidth + 14;
    // getting difference value that needs to add or reduce from carousel left to take middle img center
    let valDifference = firstImgWidth - positionDiff;

    if (carousel.scrollLeft > prevScrollLeft) {
        // if user is scrolling to the right
        return (carousel.scrollLeft +=
            positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff);
    }
    // if user is scrolling to the left
    carousel.scrollLeft -=
        positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
};

const dragStart = (e) => {
    // updatating global variables value on mouse down event
    isDragStart = true;
    prevPageX = e.pageX || e.touches[0].pageX;
    prevScrollLeft = carousel.scrollLeft;
};

const dragging = (e) => {
    // scrolling images/carousel to left according to mouse pointer
    if (!isDragStart) return;
    e.preventDefault();
    isDragging = true;
    carousel.classList.add("dragging");
    positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
    carousel.scrollLeft = prevScrollLeft - positionDiff;
    showHideIcons();
};

const dragStop = () => {
    isDragStart = false;
    carousel.classList.remove("dragging");

    if (!isDragging) return;
    isDragging = false;
    autoSlide();
};

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("touchstart", dragStart);

document.addEventListener("mousemove", dragging);
carousel.addEventListener("touchmove", dragging);

document.addEventListener("mouseup", dragStop);
carousel.addEventListener("touchend", dragStop);

function toggleDropdown(dropdownId) {
    var dropdownMenu = document.getElementById(dropdownId);
    dropdownMenu.classList.toggle("active");
}

document.addEventListener("DOMContentLoaded", function () {
    const swiperContainer = document.getElementById("swiperContainer");
    const swiperWrapper = swiperContainer.querySelector(".swiper-wrapper");
    const pagination = document.getElementById("pagination");

    let currentIndex = 0;

    function updatePagination() {
        const dots = Array.from(pagination.children);
        dots.forEach((dot, index) => {
            dot.classList.toggle("active", index === currentIndex);
        });
    }

    function updateSlidePosition() {
        const translateValue = -currentIndex * 100 + "%";
        swiperWrapper.style.transform = "translateX(" + translateValue + ")";
    }

    function goToSlide(index) {
        currentIndex = index;
        updateSlidePosition();
        updatePagination();
    }

    function createPaginationDots() {
        const numSlides = swiperWrapper.children.length;

        for (let i = 0; i < numSlides; i++) {
            const dot = document.createElement("div");
            dot.classList.add("pagination-dot");
            dot.addEventListener("click", () => goToSlide(i));
            pagination.appendChild(dot);
        }

        updatePagination();
    }

    function init() {
        createPaginationDots();

        // Add next and previous buttons
        const nextButton = document.createElement("button");
        nextButton.innerText = "Next";
        nextButton.addEventListener("click", () => {
            if (currentIndex < swiperWrapper.children.length - 1) {
                goToSlide(currentIndex + 1);
            }
        });

        const prevButton = document.createElement("button");
        prevButton.innerText = "Prev";
        prevButton.addEventListener("click", () => {
            if (currentIndex > 0) {
                goToSlide(currentIndex - 1);
            }
        });

        swiperContainer.appendChild(nextButton);
        swiperContainer.appendChild(prevButton);
    }

    init();
});
