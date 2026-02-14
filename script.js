// Create floating hearts background
function createFloatingHearts() {
    const heartBg = document.getElementById('heartBg');
    const hearts = ['💕', '💖', '💗', '💝', '💘'];
    
    for (let i = 0; i < 12; i++) {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDelay = Math.random() * 15 + 's';
        heart.style.fontSize = (Math.random() * 15 + 12) + 'px';
        heartBg.appendChild(heart);
    }
}

// Create hearts burst effect
function createHeartBurst(x, y) {
    const hearts = ['💕', '💖', '💗', '💝', '💘'];
    for (let i = 0; i < 8; i++) {
        const heart = document.createElement('div');
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.position = 'fixed';
        heart.style.left = x + 'px';
        heart.style.top = y + 'px';
        heart.style.fontSize = '20px';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '9999';
        
        const angle = (i / 8) * Math.PI * 2;
        const velocity = 100;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        
        document.body.appendChild(heart);
        
        let posX = x;
        let posY = y;
        let opacity = 1;
        
        const animate = () => {
            posX += vx * 0.02;
            posY += vy * 0.02;
            opacity -= 0.02;
            
            heart.style.left = posX + 'px';
            heart.style.top = posY + 'px';
            heart.style.opacity = opacity;
            heart.style.transform = 'scale(' + opacity + ')';
            
            if (opacity > 0) {
                requestAnimationFrame(animate);
            } else {
                heart.remove();
            }
        };
        
        requestAnimationFrame(animate);
    }
}

// Create confetti
function createConfetti() {
    const colors = ['#ff6b9d', '#ffb3c6', '#ffd700', '#ff1493', '#ff69b4'];
    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.top = '-10px';
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDelay = Math.random() * 0.3 + 's';
            confetti.style.transform = 'rotate(' + (Math.random() * 360) + 'deg)';
            document.body.appendChild(confetti);

            setTimeout(() => confetti.remove(), 3000);
        }, i * 30);
    }
}

// Create sparkles on button hover
function createSparkles(e) {
    for (let i = 0; i < 3; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            const offsetX = (Math.random() - 0.5) * 30;
            const offsetY = (Math.random() - 0.5) * 30;
            sparkle.style.left = (e.pageX + offsetX) + 'px';
            sparkle.style.top = (e.pageY + offsetY) + 'px';
            document.body.appendChild(sparkle);

            setTimeout(() => sparkle.remove(), 1000);
        }, i * 50);
    }
}

// Initialize
createFloatingHearts();

// Get all screen elements
const intro1 = document.getElementById('intro1');
const intro2 = document.getElementById('intro2');
const intro3 = document.getElementById('intro3');
const intro4 = document.getElementById('intro4');
const intro5 = document.getElementById('intro5');
const nextBtn1 = document.getElementById('nextBtn1');
const nextBtn2 = document.getElementById('nextBtn2');
const nextBtn3 = document.getElementById('nextBtn3');
const nextBtn4 = document.getElementById('nextBtn4');
const nextBtn5 = document.getElementById('nextBtn5');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const questionDiv = document.getElementById('question');
const successDiv = document.getElementById('success');

let moveCount = 0;

// Intro navigation
nextBtn1.addEventListener('click', function() {
    intro1.classList.add('hidden');
    intro2.classList.remove('hidden');
    createExtraHearts(8);
});

nextBtn2.addEventListener('click', function() {
    intro2.classList.add('hidden');
    intro3.classList.remove('hidden');
    createExtraHearts(10);
});

nextBtn3.addEventListener('click', function() {
    intro3.classList.add('hidden');
    intro4.classList.remove('hidden');
    createExtraHearts(10);
});

nextBtn4.addEventListener('click', function() {
    intro4.classList.add('hidden');
    intro5.classList.remove('hidden');
    createExtraHearts(12);
});

nextBtn5.addEventListener('click', function() {
    intro5.classList.add('hidden');
    questionDiv.classList.remove('hidden');
    createExtraHearts(15);
});

// Function to create extra hearts for transitions
function createExtraHearts(count) {
    const heartBg = document.getElementById('heartBg');
    const hearts = ['💕', '💖', '💗', '💝', '💘', '❤️'];
    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'floating-heart';
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.left = Math.random() * 100 + '%';
            heart.style.fontSize = (Math.random() * 25 + 15) + 'px';
            heart.style.opacity = '0.2';
            heart.style.animationDuration = (Math.random() * 3 + 2) + 's';
            heartBg.appendChild(heart);

            setTimeout(() => heart.remove(), 5000);
        }, i * 80);
    }
}

// Sparkle effect on Yes button hover
let sparkleInterval;
yesBtn.addEventListener('mouseenter', function() {
    const btn = this;
    sparkleInterval = setInterval(() => {
        const rect = btn.getBoundingClientRect();
        const x = rect.left + Math.random() * rect.width;
        const y = rect.top + Math.random() * rect.height;
        createSparkles({ pageX: x, pageY: y });
    }, 100);
});

yesBtn.addEventListener('mouseleave', function() {
    clearInterval(sparkleInterval);
});

// Add click effect to Yes button
yesBtn.addEventListener('click', function(e) {
    // Create heart burst at click position
    createHeartBurst(e.clientX, e.clientY);
    
    // Button press animation
    this.style.transform = 'scale(0.9)';
    setTimeout(() => {
        this.style.transform = 'scale(1)';
    }, 100);
});

// Yes button click
yesBtn.addEventListener('click', function() {
    questionDiv.classList.add('hidden');
    successDiv.classList.remove('hidden');
    createConfetti();
    
    // Add more floating hearts
    const heartBg = document.getElementById('heartBg');
    const hearts = ['💕', '💖', '💗', '💝', '💘', '❤️', '🥰', '😍'];
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'floating-heart';
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.left = Math.random() * 100 + '%';
            heart.style.fontSize = (Math.random() * 30 + 20) + 'px';
            heart.style.opacity = '0.3';
            heart.style.animationDuration = (Math.random() * 3 + 2) + 's';
            heartBg.appendChild(heart);

            setTimeout(() => heart.remove(), 5000);
        }, i * 50);
    }
});

// No button - make it run away!
function moveNoButton() {
    moveCount++;
    
    if (moveCount >= 3) {
        noBtn.textContent = 'Fine, Yes! 💕';
        noBtn.className = 'btn-yes';
        noBtn.onclick = function(e) {
            createHeartBurst(e.clientX, e.clientY);
            setTimeout(() => yesBtn.click(), 100);
        };
        // Add pulse effect
        noBtn.style.animation = 'heartbeat 0.5s ease-in-out 3';
        return;
    }

    const messages = ['Are you sure? 🥺', 'Please? 💝', 'Pretty please? 🥰'];
    noBtn.textContent = messages[moveCount - 1];

    // Shake animation
    noBtn.style.animation = 'shake 0.5s';
    setTimeout(() => {
        noBtn.style.animation = '';
    }, 500);

    const container = document.querySelector('.button-container');
    const containerRect = container.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();
    
    const maxX = containerRect.width - btnRect.width - 40;
    const maxY = 100;
    
    const randomX = (Math.random() - 0.5) * maxX;
    const randomY = (Math.random() - 0.5) * maxY;
    
    noBtn.style.transform = 'translate(' + randomX + 'px, ' + randomY + 'px)';
    
    // Make Yes button grow and pulse
    yesBtn.style.transform = 'scale(1.2)';
    yesBtn.style.animation = 'pulse 0.5s ease-in-out';
}

noBtn.addEventListener('mouseenter', moveNoButton);
noBtn.addEventListener('touchstart', function(e) {
    e.preventDefault();
    moveNoButton();
});

// Reset Yes button when leaving No button
noBtn.addEventListener('mouseleave', function() {
    yesBtn.style.transform = 'scale(1)';
});