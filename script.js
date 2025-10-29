// Data do início do namoro
const startDate = new Date('2022-09-28T00:00:00');

// Criar partículas de coração flutuantes
function createFloatingHearts() {
    const container = document.getElementById('heartsContainer');
    const hearts = ['❤️', '💕', '💖', '💗', '💓', '💝'];
    
    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'heart-particle';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (Math.random() * 5 + 8) + 's';
        heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
        container.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 10000);
    }, 300);
}

// Calcular tempo juntos
function updateCounter() {
    const now = new Date();
    const diff = now - startDate;
    
    const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
    const months = Math.floor((diff % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24 * 30.44));
    const days = Math.floor((diff % (1000 * 60 * 60 * 24 * 30.44)) / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    animateCounter('years', years);
    animateCounter('months', months);
    animateCounter('days', days);
    animateCounter('hours', hours);
}

// Animar números do contador
function animateCounter(id, target) {
    const element = document.getElementById(id);
    const current = parseInt(element.textContent) || 0;
    
    if (current !== target) {
        const increment = target > current ? 1 : -1;
        const newValue = current + increment;
        element.textContent = newValue;
        
        if (newValue !== target) {
            setTimeout(() => animateCounter(id, target), 50);
        }
    }
}

// Scroll suave para seção
function scrollToSection(id) {
    const element = document.getElementById(id);
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Galeria de fotos - Modal
let currentImageIndex = 0;
const galleryItems = document.querySelectorAll('.gallery-item');
const modal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const modalCounter = document.getElementById('modalCounter');

// Abrir modal ao clicar na imagem
galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        openModal(index);
    });
});

function openModal(index) {
    currentImageIndex = index;
    const img = galleryItems[index].querySelector('img');
    modal.style.display = 'block';
    modalImage.src = img.src;
    updateModalCounter();
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function changeImage(direction) {
    currentImageIndex += direction;
    
    if (currentImageIndex < 0) {
        currentImageIndex = galleryItems.length - 1;
    } else if (currentImageIndex >= galleryItems.length) {
        currentImageIndex = 0;
    }
    
    const img = galleryItems[currentImageIndex].querySelector('img');
    modalImage.style.opacity = '0';
    
    setTimeout(() => {
        modalImage.src = img.src;
        modalImage.style.opacity = '1';
        updateModalCounter();
    }, 200);
}

function updateModalCounter() {
    modalCounter.textContent = `${currentImageIndex + 1} / ${galleryItems.length}`;
}

// Fechar modal
document.querySelector('.close-modal').addEventListener('click', closeModal);

// Fechar modal ao clicar fora da imagem
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// Navegação por teclado
document.addEventListener('keydown', (e) => {
    if (modal.style.display === 'block') {
        if (e.key === 'Escape') {
            closeModal();
        } else if (e.key === 'ArrowLeft') {
            changeImage(-1);
        } else if (e.key === 'ArrowRight') {
            changeImage(1);
        }
    }
});

// Animação ao scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar elementos para animação
document.querySelectorAll('.counter-item, .gallery-item, .message-content p').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(el);
});

// Efeito parallax suave no hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-content');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - scrolled / 700;
    }
});

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    createFloatingHearts();
    updateCounter();
    setInterval(updateCounter, 60000); // Atualizar a cada minuto
    
    // Adicionar efeito de transição suave nas imagens do modal
    modalImage.style.transition = 'opacity 0.3s ease';
    
    // Preload das imagens
    galleryItems.forEach(item => {
        const img = item.querySelector('img');
        const preloadImg = new Image();
        preloadImg.src = img.src;
    });
});

// Prevenir drag nas imagens
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('dragstart', (e) => e.preventDefault());
});

// Easter egg - confetes ao clicar no coração grande
document.querySelector('.heart-big')?.addEventListener('click', createConfetti);

function createConfetti() {
    const colors = ['#ff6b9d', '#c44569', '#ffa07a', '#667eea', '#764ba2'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = '50%';
        confetti.style.top = '50%';
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '9999';
        
        document.body.appendChild(confetti);
        
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 300 + 200;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        
        let x = 0, y = 0;
        let opacity = 1;
        
        const animation = setInterval(() => {
            y += vy / 60;
            x += vx / 60;
            opacity -= 0.02;
            
            confetti.style.transform = `translate(${x}px, ${y}px) rotate(${x + y}deg)`;
            confetti.style.opacity = opacity;
            
            if (opacity <= 0) {
                clearInterval(animation);
                confetti.remove();
            }
        }, 1000 / 60);
    }
}

// Funções para Modal do Envelope
function openEnvelope() {
    const envelopeModal = document.getElementById('envelopeModal');
    envelopeModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Resetar animações
    const envelope = envelopeModal.querySelector('.envelope');
    const letter = envelopeModal.querySelector('.letter');
    envelope.style.animation = 'none';
    letter.style.animation = 'none';
    
    setTimeout(() => {
        envelope.style.animation = 'envelopeFloat 3s ease-in-out infinite';
        letter.style.animation = 'letterRise 1s ease-out 2s forwards';
    }, 10);
    
    // Adicionar confetes de comemoração
    setTimeout(() => {
        createConfetti();
    }, 2500);
}

function closeEnvelope() {
    const envelopeModal = document.getElementById('envelopeModal');
    envelopeModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Funções para Modal do Presente
function openGift() {
    const giftModal = document.getElementById('giftModal');
    giftModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Resetar animações
    const giftBase = giftModal.querySelector('.gift-base');
    const giftLid = giftModal.querySelector('.gift-lid');
    const giftReveal = giftModal.querySelector('.gift-reveal');
    const qualityCards = giftModal.querySelectorAll('.quality-card');
    
    giftBase.style.animation = 'none';
    giftLid.style.animation = 'none';
    giftReveal.style.animation = 'none';
    qualityCards.forEach(card => {
        card.style.animation = 'none';
    });
    
    setTimeout(() => {
        giftBase.style.animation = 'giftShake 0.5s ease-in-out 0.5s';
        giftLid.style.animation = 'lidOpen 1s ease-out 1.5s forwards';
        giftReveal.style.animation = 'giftReveal 1s ease-out 2.5s forwards';
        
        qualityCards.forEach((card, index) => {
            card.style.animation = `cardPop 0.5s ease-out ${2.6 + index * 0.1}s backwards`;
        });
    }, 10);
    
    // Adicionar confetes quando revelar
    setTimeout(() => {
        createConfetti();
    }, 3000);
}

function closeGift() {
    const giftModal = document.getElementById('giftModal');
    giftModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Fechar modais ao clicar fora
document.addEventListener('DOMContentLoaded', () => {
    const envelopeModal = document.getElementById('envelopeModal');
    const giftModal = document.getElementById('giftModal');
    
    if (envelopeModal) {
        envelopeModal.addEventListener('click', (e) => {
            if (e.target === envelopeModal) {
                closeEnvelope();
            }
        });
    }
    
    if (giftModal) {
        giftModal.addEventListener('click', (e) => {
            if (e.target === giftModal) {
                closeGift();
            }
        });
    }
    
    // Fechar modais com ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (envelopeModal && envelopeModal.style.display === 'block') {
                closeEnvelope();
            }
            if (giftModal && giftModal.style.display === 'block') {
                closeGift();
            }
        }
    });
});
