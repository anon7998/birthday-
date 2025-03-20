// Confetti Effect
const canvas = document.querySelector('.confetti');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const confettiParticles = [];
const popperParticles = []; // Party popper effect particles

class Confetti {
    constructor(x, y, size, speed) {
        this.x = x !== undefined ? x : Math.random() * canvas.width;
        this.y = y !== undefined ? y : Math.random() * canvas.height - canvas.height;
        this.size = size !== undefined ? size : Math.random() * 20 + 10;
        this.speed = speed !== undefined ? speed : Math.random() * 3 + 2;
        this.color = `hsl(${Math.random() * 360}, 100%, 70%)`;
        this.alpha = 1; // Opacity for fade-out effect
    }
    update() {
        this.y += this.speed;
        if (this.y > canvas.height) this.y = 0;
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1; // Reset opacity
    }
}

// Reduce confetti quantity here (Change 300 to a lower number)
function createConfetti() {
    for (let i = 0; i < 500; i++) { // 👈 For no. of balls 
        confettiParticles.push(new Confetti());
    }
}

// 🎉 Party Popper Effect 🎉
function createPopperEffect(x, y) {
    for (let i = 0; i < 10000; i++) {  // 40 small particles
        let speed = Math.random() * 80 + 2; // Faster burst effect
        let size = Math.random() * 20 + 1;
        let angle = Math.random() * Math.PI * 2;
        let vx = Math.cos(angle) * speed;
        let vy = Math.sin(angle) * speed;
        popperParticles.push({ x, y, size, vx, vy, alpha: 1, color: `hsl(${Math.random() * 360}, 100%, 70%)` });
    }
}

// 🎥 Animate Everything (Confetti & Party Popper)
function animateConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Falling confetti
    confettiParticles.forEach(particle => {
        particle.update();
        particle.draw();
    });

    // Popper explosion effect
    popperParticles.forEach((particle, index) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.alpha -= 0.02; // Fade out effect
        if (particle.alpha <= 0) popperParticles.splice(index, 1); // Remove faded particles

        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.alpha;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
    });

    requestAnimationFrame(animateConfetti);
}

// Click Event to Show Birthday Message and Popper Effect
document.getElementById("start-btn").addEventListener("click", function(event) {
    this.style.display = "none"; // Hide the button
    document.getElementById("birthday-message").classList.remove("hidden");

    // Toggle background effect
    document.body.classList.toggle("bg-reveal"); 

    // Get button position to trigger popper effect near it
    let rect = event.target.getBoundingClientRect();
    let centerX = rect.left + rect.width / 2;
    let centerY = rect.top + rect.height / 2;
    createPopperEffect(centerX, centerY); // 🎉 Trigger the popper effect
});


createConfetti();
animateConfetti();
