// Menu toggle functionality
const menu = document.querySelector("#menu");
const nav = document.querySelector(".links");

menu.onclick = () => {
    menu.classList.toggle("bx-x");
    nav.classList.toggle('active');
}

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

console.log("GSAP and ScrollTrigger loaded successfully!");

// Simple fade-in animation for the about section
gsap.fromTo("#about", 
    {
        opacity: 0,
        y: 50
    },
    {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
            trigger: "#about",
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
        }
    }
);

// Slide up animation for service boxes
gsap.fromTo(".services-container .box", 
    {
        opacity: 0,
        y: 100
    },
    {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
            trigger: ".services-container",
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
        }
    }
);

// Scale animation for contact section
gsap.fromTo("#contact", 
    {
        opacity: 0,
        scale: 0.8
    },
    {
        opacity: 1,
        scale: 1,
        duration: 1,
        scrollTrigger: {
            trigger: "#contact",
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
        }
    }
);

// Skills list animation
gsap.fromTo(".skills ul li", 
    {
        opacity: 0,
        x: -50
    },
    {
        opacity: 1,
        x: 0,
        duration: 0.6,
        stagger: 0.1,
        scrollTrigger: {
            trigger: ".skills",
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
        }
    }
);

// GSAP effects for the website

// Fade-in effect for sections
const sections = document.querySelectorAll("section");
sections.forEach(section => {
    gsap.fromTo(section, 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, 
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
    );
});

// Staggered animation for navigation links
const navLinks = document.querySelectorAll(".links a");
gsap.fromTo(navLinks, 
    { opacity: 0, x: -20 },
    { opacity: 1, x: 0, duration: 0.5, stagger: 0.2 }
);

// Parallax effect for images
const images = document.querySelectorAll("img");
images.forEach(image => {
    gsap.fromTo(image, 
        { scale: 1.1 },
        { scale: 1, 
          scrollTrigger: {
            trigger: image,
            start: "top 100%",
            end: "bottom 0%",
            scrub: true
          }
        }
    );
});

// Button hover effect
const buttons = document.querySelectorAll(".btn");
buttons.forEach(button => {
    button.addEventListener("mouseenter", () => {
        gsap.to(button, { scale: 1.1, duration: 0.2 });
    });
    button.addEventListener("mouseleave", () => {
        gsap.to(button, { scale: 1, duration: 0.2 });
    });
});

// Smooth scroll to the contact section when 'Contact Me' button is clicked
const contactButton = document.querySelector(".btn-box .btn:nth-child(2)");
contactButton.addEventListener("click", (e) => {
    e.preventDefault();
    const contactSection = document.querySelector("#contact");
    const offset = contactSection.offsetTop;
    window.scrollTo({
        top: offset,
        behavior: "smooth"
    });
});

// Custom cursor implementation
const cursor = document.createElement("div");
cursor.classList.add("custom-cursor");
document.body.appendChild(cursor);

document.addEventListener("mousemove", (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
});

document.querySelectorAll("button, a").forEach((element) => {
    element.addEventListener("mouseenter", () => {
        cursor.style.transform = "scale(1.5)";
        cursor.style.backgroundColor = "rgba(0, 123, 255, 0.8)";
    });
    element.addEventListener("mouseleave", () => {
        cursor.style.transform = "scale(1)";
        cursor.style.backgroundColor = "rgba(255, 255, 255, 0.8)";
    });
});

// Stars and shooting stars animation
const canvas = document.getElementById("stars-background");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const stars = [];
const numStars = 100;

for (let i = 0; i < numStars; i++) {
    stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2,
        dx: Math.random() * 0.5 - 0.25,
        dy: Math.random() * 0.5 - 0.25,
    });
}

function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach((star) => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.fill();
        star.x += star.dx;
        star.y += star.dy;

        if (star.x < 0 || star.x > canvas.width) star.dx *= -1;
        if (star.y < 0 || star.y > canvas.height) star.dy *= -1;
    });
    requestAnimationFrame(drawStars);
}

drawStars();

function drawShootingStar() {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const length = Math.random() * 100 + 50;
    const speed = Math.random() * 5 + 2;

    let progress = 0;

    function animate() {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x - progress, y - progress);
        ctx.strokeStyle = "white";
        ctx.lineWidth = 2;
        ctx.stroke();

        progress += speed;
        if (progress < length) {
            requestAnimationFrame(animate);
        }
    }

    animate();
}

setInterval(drawShootingStar, 3000);
