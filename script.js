/* =========================================================
   MUHAMMAD HASSNAIN - PORTFOLIO
   MAIN JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {



    /* =====================================================
       MOBILE MENU
    ===================================================== */

    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");

    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", () => {

            menuToggle.classList.toggle("active");
            navMenu.classList.toggle("active");

            const expanded =
                menuToggle.classList.contains("active");

            menuToggle.setAttribute(
                "aria-expanded",
                expanded
            );
        });


        /* Close menu when clicking a navigation link */

        const navLinks =
            navMenu.querySelectorAll(".nav-link");

        navLinks.forEach(link => {

            link.addEventListener("click", () => {

                menuToggle.classList.remove("active");
                navMenu.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );
            });

        });


        /* Close menu when clicking outside */

        document.addEventListener("click", event => {

            if (
                navMenu.classList.contains("active") &&
                !navMenu.contains(event.target) &&
                !menuToggle.contains(event.target)
            ) {

                menuToggle.classList.remove("active");
                navMenu.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );
            }

        });

    }


    /* =====================================================
       HEADER SCROLL EFFECT
    ===================================================== */

    const header = document.getElementById("header");

    const handleHeaderScroll = () => {

        if (!header) return;

        if (window.scrollY > 30) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    };

    window.addEventListener(
        "scroll",
        handleHeaderScroll,
        { passive: true }
    );

    handleHeaderScroll();


    /* =====================================================
       ACTIVE NAVIGATION LINK
    ===================================================== */

    const sections =
        document.querySelectorAll("section[id]");

    const navigationLinks =
        document.querySelectorAll(".nav-link");

    const updateActiveNav = () => {

        const scrollPosition =
            window.scrollY + 150;

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop =
                section.offsetTop;

            const sectionHeight =
                section.offsetHeight;

            if (
                scrollPosition >= sectionTop &&
                scrollPosition < sectionTop + sectionHeight
            ) {
                currentSection = section.id;
            }

        });

        navigationLinks.forEach(link => {

            link.classList.remove("active");

            const href =
                link.getAttribute("href");

            if (
                currentSection &&
                href === `#${currentSection}`
            ) {
                link.classList.add("active");
            }

        });

    };

    window.addEventListener(
        "scroll",
        updateActiveNav,
        { passive: true }
    );

    updateActiveNav();


    /* =====================================================
       SMOOTH SCROLL
    ===================================================== */

    document.querySelectorAll(
        'a[href^="#"]'
    ).forEach(anchor => {

        anchor.addEventListener("click", event => {

            const targetId =
                anchor.getAttribute("href");

            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            const headerHeight =
                header
                    ? header.offsetHeight
                    : 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });


    /* =====================================================
       BACK TO TOP
    ===================================================== */

    const backToTop =
        document.getElementById("backToTop");

    const updateBackToTop = () => {

        if (!backToTop) return;

        if (window.scrollY > 500) {
            backToTop.classList.add("show");
        } else {
            backToTop.classList.remove("show");
        }

    };

    window.addEventListener(
        "scroll",
        updateBackToTop,
        { passive: true }
    );

    updateBackToTop();


    if (backToTop) {

        backToTop.addEventListener("click", () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }


    /* =====================================================
       SCROLL REVEAL ANIMATION
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".service-card, " +
            ".project-card, " +
            ".skill-card, " +
            ".process-item, " +
            ".about-content, " +
            ".about-visual, " +
            ".contact-info, " +
            ".contact-form-wrapper"
        );


    if (
        "IntersectionObserver" in window &&
        revealElements.length > 0
    ) {

        const revealObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "revealed"
                            );

                            revealObserver.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.12
                }
            );


        revealElements.forEach(element => {

            element.classList.add(
                "reveal"
            );

            revealObserver.observe(element);

        });

    }


const contactForm = document.querySelector("#contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = document.querySelector("#name").value.trim();
        const email = document.querySelector("#email").value.trim();
        const subject = document.querySelector("#subject").value.trim();
        const message = document.querySelector("#message").value.trim();

        if (!name || !email || !subject || !message) {
            alert("Please fill in all fields.");
            return;
        }

        const whatsappNumber = "923437860590";

        const whatsappMessage =
`*New Website Inquiry*

*Name:* ${name}
*Email:* ${email}
*Subject:* ${subject}

*Message:*
${message}`;

        const whatsappURL =
            `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

        window.open(whatsappURL, "_blank");
    });
}


    /* =====================================================
       EMAIL VALIDATION
    ===================================================== */

    function isValidEmail(email) {

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        return emailPattern.test(email);

    }


    /* =====================================================
       NOTIFICATION
    ===================================================== */

    const notification =
        document.querySelector(".notification");

    const notificationMessage =
        notification
            ? notification.querySelector(
                ".notification-content span"
            )
            : null;

    const notificationClose =
        notification
            ? notification.querySelector(
                ".notification-close"
            )
            : null;


    let notificationTimer;


    function showNotification(message) {

        if (!notification) {
            return;
        }


        if (notificationMessage) {

            notificationMessage.textContent =
                message;

        }


        notification.classList.add("show");


        clearTimeout(notificationTimer);


        notificationTimer =
            setTimeout(() => {

                notification.classList.remove(
                    "show"
                );

            }, 4500);

    }


    if (notificationClose) {

        notificationClose.addEventListener(
            "click",
            () => {

                notification.classList.remove(
                    "show"
                );

                clearTimeout(
                    notificationTimer
                );

            }
        );

    }


    /* =====================================================
       PROJECT LINKS
    ===================================================== */

    /*
     * Real project links are allowed to open.
     *
     * Placeholder links are only blocked when
     * data-placeholder="true" is present.
     */

    document.querySelectorAll(
        '[data-placeholder="true"]'
    ).forEach(link => {

        link.addEventListener("click", event => {

            event.preventDefault();

            showNotification(
                "This link will be available soon."
            );

        });

    });


    /* =====================================================
       EXTERNAL LINKS
    ===================================================== */

    document.querySelectorAll(
        'a[target="_blank"]'
    ).forEach(link => {

        if (!link.hasAttribute("rel")) {

            link.setAttribute(
                "rel",
                "noopener noreferrer"
            );

        }

    });


    /* =====================================================
       CURRENT YEAR
    ===================================================== */

    const currentYear =
        document.querySelector(
            "#currentYear"
        );

    if (currentYear) {

        currentYear.textContent =
            new Date().getFullYear();

    }


    /* =====================================================
       TYPING EFFECT
    ===================================================== */

    const typingElement =
        document.querySelector(
            ".typing-text"
        );


    if (typingElement) {

        const words = [
            "Full-Stack Developer",
            "Web Developer",
            "Software Developer"
        ];

        let wordIndex = 0;
        let characterIndex = 0;

        let deleting = false;


        function typeEffect() {

            const currentWord =
                words[wordIndex];


            if (!deleting) {

                characterIndex++;

                typingElement.textContent =
                    currentWord.substring(
                        0,
                        characterIndex
                    );


                if (
                    characterIndex ===
                    currentWord.length
                ) {

                    deleting = true;

                    setTimeout(
                        typeEffect,
                        1500
                    );

                    return;
                }

            } else {

                characterIndex--;

                typingElement.textContent =
                    currentWord.substring(
                        0,
                        characterIndex
                    );


                if (characterIndex === 0) {

                    deleting = false;

                    wordIndex =
                        (wordIndex + 1) %
                        words.length;

                }

            }


            setTimeout(
                typeEffect,
                deleting ? 55 : 90
            );

        }


        typeEffect();

    }


    /* =====================================================
       SKILL BAR ANIMATION
    ===================================================== */

    const skillBars =
        document.querySelectorAll(
            ".skill-progress"
        );


    if (
        "IntersectionObserver" in window &&
        skillBars.length > 0
    ) {

        const skillObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            const bar =
                                entry.target;

                            const width =
                                bar.getAttribute(
                                    "data-width"
                                );


                            if (width) {

                                bar.style.width =
                                    `${width}%`;

                            }


                            skillObserver.unobserve(
                                bar
                            );

                        }

                    });

                },
                {
                    threshold: 0.5
                }
            );


        skillBars.forEach(bar => {

            bar.style.width = "0";

            skillObserver.observe(bar);

        });

    }


    /* =====================================================
       CURSOR GLOW EFFECT
    ===================================================== */

    const cursorGlow =
        document.createElement("div");

    cursorGlow.className =
        "cursor-glow";

    document.body.appendChild(
        cursorGlow
    );


    let cursorX = 0;
    let cursorY = 0;

    let glowX = 0;
    let glowY = 0;


    document.addEventListener(
        "mousemove",
        event => {

            cursorX = event.clientX;
            cursorY = event.clientY;

        }
    );


    function animateCursorGlow() {

        glowX +=
            (cursorX - glowX) * 0.12;

        glowY +=
            (cursorY - glowY) * 0.12;


        cursorGlow.style.transform =
            `translate3d(
                ${glowX}px,
                ${glowY}px,
                0
            )`;


        requestAnimationFrame(
            animateCursorGlow
        );

    }


    if (
        window.matchMedia(
            "(pointer: fine)"
        ).matches
    ) {

        animateCursorGlow();

    } else {

        cursorGlow.remove();

    }


    /* =====================================================
       PROJECT CARD TILT EFFECT
    ===================================================== */

    const projectCards =
        document.querySelectorAll(
            ".project-card"
        );


    if (
        window.matchMedia(
            "(pointer: fine)"
        ).matches
    ) {

        projectCards.forEach(card => {

            card.addEventListener(
                "mousemove",
                event => {

                    const rect =
                        card.getBoundingClientRect();


                    const x =
                        event.clientX -
                        rect.left;


                    const y =
                        event.clientY -
                        rect.top;


                    const centerX =
                        rect.width / 2;


                    const centerY =
                        rect.height / 2;


                    const rotateX =
                        (y - centerY) /
                        35;


                    const rotateY =
                        (centerX - x) /
                        35;


                    card.style.transform =
                        `perspective(900px)
                         rotateX(${rotateX}deg)
                         rotateY(${rotateY}deg)
                         translateY(-5px)`;

                }
            );


            card.addEventListener(
                "mouseleave",
                () => {

                    card.style.transform =
                        "";

                }
            );

        });

    }


    /* =====================================================
       DISABLE IMAGE DRAG
    ===================================================== */

    document.querySelectorAll(
        "img"
    ).forEach(image => {

        image.setAttribute(
            "draggable",
            "false"
        );

    });


    /* =====================================================
       CONSOLE MESSAGE
    ===================================================== */

    console.log(
        "%c Muhammad Hassnain Portfolio ",
        "color:#3b82f6;font-size:18px;font-weight:bold;"
    );

    console.log(
        "%c Full-Stack Web Developer ",
        "color:#22d3ee;font-size:13px;"
    );

});