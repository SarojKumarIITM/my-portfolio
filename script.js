var typed = new Typed(".text", {
    strings: ["Full Stack Developer", "MERN Stack Developer", "Web Developer", "Backend Developer"],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});

const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = contactForm.elements["name"].value.trim();
    const email = contactForm.elements["email"].value.trim();
    const subject = contactForm.elements["subject"].value.trim();
    const message = contactForm.elements["message"].value.trim();

    if (!name || !email || !subject || !message) {
        formStatus.textContent = "Please fill in all fields.";
        return;
    }

    const phoneNumber = "919508435516";

    const whatsappMessage = `
        Hello Saroj! I contacted you through your portfolio.\n\n` +
        `Name: ${name}\n` +
        `Email: ${email}\n` +
        `Subject: ${subject}\n` +
        `Message: ${message};`
    
    const whatsappURL =
        `https://wa.me/${phoneNumber}?text= `+
        encodeURIComponent(whatsappMessage);

    const newWindow = window.open(
        whatsappURL,
        "_blank",
        "noopener,noreferrer"
    );

    if (newWindow) {
        formStatus.textContent =
            "WhatsApp opened. Review your message and press Send.";
    } else {
        formStatus.textContent =
            "Opening WhatsApp. If it did not open, check your browser's pop-up settings.";
        window.location.href = whatsappURL;
    }
});

const canvas = document.getElementById("particles-canvas");
const ctx = canvas.getContext("2d");

let particles = [];
let w, h;

function resizeCanvas() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;

    const count = Math.min(80, Math.floor((w * h) / 14000));

    particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        dx: (Math.random() - 0.5) * 0.5,
        dy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 1.5 + 1
    }));
}

function animate() {
    ctx.clearRect(0, 0, w, h);

    particles.forEach((p, i) => {
        p.x += p.dx;
        p.y += p.dy;

        if (p.x < 0 || p.x > w) p.dx *= -1;
        if (p.y < 0 || p.y > h) p.dy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = "#35d9ff";
        ctx.shadowBlur = 8;
        ctx.shadowColor = "#00bfff";
        ctx.fill();
        ctx.shadowBlur = 0;

        for (let j = i + 1; j < particles.length; j++) {
            const q = particles[j];
            const distance = Math.hypot(p.x - q.x, p.y - q.y);

            if (distance < 120) {
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(q.x, q.y);
                ctx.strokeStyle =
                    `rgba(53, 217, 255, ${1 - distance / 120})`;
                ctx.lineWidth = 0.5;
                ctx.stroke();
            }
        }
    });

    requestAnimationFrame(animate);
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();
animate();