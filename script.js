// Data de início do namoro
const startDate = new Date('2022-09-28T00:00:00');

// Função para criar partículas flutuantes
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleSymbols = ['💕', '💖', '💗', '💓', '💝', '🌸', '🌺', '✨', '⭐', '💫'];
    
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.fontSize = Math.random() * 20 + 10 + 'px';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.opacity = Math.random() * 0.5 + 0.2;
        particle.innerHTML = particleSymbols[Math.floor(Math.random() * particleSymbols.length)];
        particle.style.animation = `float ${Math.random() * 10 + 5}s ease-in-out infinite`;
        particle.style.animationDelay = Math.random() * 5 + 's';
        particlesContainer.appendChild(particle);
    }
}

// Função para calcular o tempo juntos
function updateTimeCounter() {
    const now = new Date();
    const diff = now - startDate;
    
    // Calcular anos, meses, dias e horas
    const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
    const remainingAfterYears = diff % (1000 * 60 * 60 * 24 * 365.25);
    const months = Math.floor(remainingAfterYears / (1000 * 60 * 60 * 24 * 30.44));
    const remainingAfterMonths = remainingAfterYears % (1000 * 60 * 60 * 24 * 30.44);
    const days = Math.floor(remainingAfterMonths / (1000 * 60 * 60 * 24));
    const remainingAfterDays = remainingAfterMonths % (1000 * 60 * 60 * 24);
    const hours = Math.floor(remainingAfterDays / (1000 * 60 * 60));
    
    // Total de dias
    const totalDays = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    // Atualizar elementos com animação
    animateValue('years', 0, years, 2000);
    animateValue('months', 0, months, 2000);
    animateValue('days', 0, days, 2000);
    animateValue('hours', 0, hours, 2000);
    animateValue('totalDays', 0, totalDays, 2000);
}

// Função para animar números
function animateValue(id, start, end, duration) {
    const element = document.getElementById(id);
    if (!element) return;
    
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
            element.textContent = Math.floor(end);
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Função para observar elementos e adicionar animações quando visíveis
function observeElements() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    // Observar todos os elementos que devem animar
    const elementsToAnimate = document.querySelectorAll('.timeline-item, .reason-card, .lily-item, .counter-item');
    elementsToAnimate.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(50px)';
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(element);
    });
}

// Função para scroll suave
function smoothScroll() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            window.scrollTo({
                top: window.innerHeight,
                behavior: 'smooth'
            });
        });
    }
}

// Função para adicionar efeito de parallax
function parallaxEffect() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-content');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Sistema de música de fundo
let isPlaying = false;
let audio = null;

function setupMusicToggle() {
    const musicToggle = document.getElementById('musicToggle');
    const musicIcon = document.getElementById('musicIcon');
    
    if (musicToggle) {
        // Inicializar o áudio
        // INSTRUÇÕES: Coloque seu arquivo de música na mesma pasta do site
        // e substitua 'musica.mp3' pelo nome do seu arquivo
        audio = new Audio('musica.mp3');
        audio.loop = true; // A música vai repetir infinitamente
        audio.volume = 0.5; // Volume em 50% (pode ajustar de 0.0 a 1.0)
        
        musicToggle.addEventListener('click', () => {
            if (isPlaying) {
                // Pausar música
                audio.pause();
                musicIcon.textContent = '🎵';
                musicToggle.style.opacity = '0.7';
            } else {
                // Tocar música
                audio.play().catch(error => {
                    console.log('Erro ao tocar música:', error);
                    alert('Por favor, adicione um arquivo chamado "musica.mp3" na pasta do site ou atualize o nome no código!');
                });
                musicIcon.textContent = '🎶';
                musicToggle.style.opacity = '1';
            }
            isPlaying = !isPlaying;
            
            // Feedback visual
            musicToggle.style.animation = 'heartbeat 0.5s ease-in-out';
            setTimeout(() => {
                musicToggle.style.animation = '';
            }, 500);
        });
    }
}

// Função para adicionar efeito de coração ao clicar
function addClickHearts() {
    document.addEventListener('click', (e) => {
        const heart = document.createElement('div');
        heart.innerHTML = '💕';
        heart.style.position = 'fixed';
        heart.style.left = e.clientX + 'px';
        heart.style.top = e.clientY + 'px';
        heart.style.fontSize = '30px';
        heart.style.pointerEvents = 'none';
        heart.style.animation = 'floatUpAndFade 2s ease-out forwards';
        heart.style.zIndex = '9999';
        document.body.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 2000);
    });
}

// Adicionar CSS para animação de coração ao clicar
const style = document.createElement('style');
style.textContent = `
    @keyframes floatUpAndFade {
        0% {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
        100% {
            opacity: 0;
            transform: translateY(-100px) scale(1.5);
        }
    }
`;
document.head.appendChild(style);

// Função para atualizar contadores em tempo real
function startRealTimeCounter() {
    setInterval(() => {
        const now = new Date();
        const diff = now - startDate;
        
        const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
        const remainingAfterYears = diff % (1000 * 60 * 60 * 24 * 365.25);
        const months = Math.floor(remainingAfterYears / (1000 * 60 * 60 * 24 * 30.44));
        const remainingAfterMonths = remainingAfterYears % (1000 * 60 * 60 * 24 * 30.44);
        const days = Math.floor(remainingAfterMonths / (1000 * 60 * 60 * 24));
        const remainingAfterDays = remainingAfterMonths % (1000 * 60 * 60 * 24);
        const hours = Math.floor(remainingAfterDays / (1000 * 60 * 60));
        
        const totalDays = Math.floor(diff / (1000 * 60 * 60 * 24));
        
        document.getElementById('years').textContent = years;
        document.getElementById('months').textContent = months;
        document.getElementById('days').textContent = days;
        document.getElementById('hours').textContent = hours;
        document.getElementById('totalDays').textContent = totalDays;
    }, 60000); // Atualizar a cada minuto
}

// Função para adicionar efeito de neve de flores
function createFlowerSnow() {
    const flowers = ['🌸', '🌺', '💐', '🌼', '🌷'];
    
    setInterval(() => {
        const flower = document.createElement('div');
        flower.innerHTML = flowers[Math.floor(Math.random() * flowers.length)];
        flower.style.position = 'fixed';
        flower.style.left = Math.random() * 100 + '%';
        flower.style.top = '-50px';
        flower.style.fontSize = Math.random() * 20 + 15 + 'px';
        flower.style.opacity = Math.random() * 0.5 + 0.3;
        flower.style.pointerEvents = 'none';
        flower.style.zIndex = '999';
        flower.style.animation = `fallDown ${Math.random() * 5 + 5}s linear forwards`;
        document.body.appendChild(flower);
        
        setTimeout(() => {
            flower.remove();
        }, 10000);
    }, 2000);
}

// Adicionar CSS para animação de queda
const fallStyle = document.createElement('style');
fallStyle.textContent = `
    @keyframes fallDown {
        0% {
            transform: translateY(-50px) rotate(0deg);
        }
        100% {
            transform: translateY(100vh) rotate(360deg);
        }
    }
`;
document.head.appendChild(fallStyle);

// Função para detectar scroll e adicionar efeitos
function handleScroll() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    
    if (hero) {
        hero.style.opacity = 1 - (scrolled / window.innerHeight);
    }
}

window.addEventListener('scroll', handleScroll);

// Função para criar confete de celebração
function createConfetti() {
    const colors = ['#ff69b4', '#ffb6d9', '#4a90e2', '#50c878', '#87ceeb'];
    const confettiCount = 100;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-10px';
        confetti.style.opacity = '0.8';
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '9999';
        confetti.style.animation = `fallDown ${Math.random() * 3 + 2}s linear forwards`;
        document.body.appendChild(confetti);
        
        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }
}

// Inicializar quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    updateTimeCounter();
    observeElements();
    smoothScroll();
    parallaxEffect();
    setupMusicToggle();
    addClickHearts();
    createFlowerSnow();
    startRealTimeCounter();
    
    // Criar confete quando a página carregar
    setTimeout(() => {
        createConfetti();
    }, 1000);
    
    // Mensagem no console para o desenvolvedor
    console.log('💕 Site criado com amor para Emily & Bernardo 💕');
    console.log('Juntos desde 28 de Setembro de 2022');
});

// Prevenir comportamento padrão em alguns elementos
document.addEventListener('contextmenu', (e) => {
    // Permite menu de contexto normalmente
});

// Adicionar evento de resize para responsividade
window.addEventListener('resize', () => {
    // Ajustar elementos se necessário
});

// Easter egg: Digitar "ILOVEYOU" mostra uma surpresa
let typedKeys = '';
document.addEventListener('keypress', (e) => {
    typedKeys += e.key.toUpperCase();
    if (typedKeys.includes('ILOVEYOU')) {
        createConfetti();
        alert('💕 Emily, você é o amor da minha vida! 💕');
        typedKeys = '';
    }
    if (typedKeys.length > 20) {
        typedKeys = typedKeys.slice(-20);
    }
});

/* ============================================
   NOVAS FUNCIONALIDADES
   ============================================ */

// ========== GALERIA DE FOTOS COM LIGHTBOX ==========

function setupPhotoGallery() {
    const photoItems = document.querySelectorAll('.photo-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.querySelector('.lightbox-close');
    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');
    
    let currentIndex = 0;
    const photos = [];
    
    // Coletar informações das fotos
    photoItems.forEach((item, index) => {
        const img = item.querySelector('img');
        const caption = item.querySelector('.photo-caption').textContent;
        
        if (img) {
            // Foto real encontrada
            photos.push({
                src: img.src,
                caption: caption,
                placeholder: false
            });
            
            item.addEventListener('click', () => {
                openLightbox(index);
            });
        } else {
            // Placeholder (sem imagem)
            photos.push({
                src: '',
                caption: caption,
                placeholder: true
            });
        }
    });
    
    function openLightbox(index) {
        currentIndex = index;
        lightboxImg.src = photos[index].src;
        lightboxCaption.textContent = photos[index].caption;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    function showNext() {
        currentIndex = (currentIndex + 1) % photos.length;
        updateLightboxImage();
    }
    
    function showPrev() {
        currentIndex = (currentIndex - 1 + photos.length) % photos.length;
        updateLightboxImage();
    }
    
    function updateLightboxImage() {
        if (!photos[currentIndex].placeholder) {
            // Pequena animação ao trocar foto
            lightboxImg.style.opacity = '0';
            setTimeout(() => {
                lightboxImg.src = photos[currentIndex].src;
                lightboxCaption.textContent = photos[currentIndex].caption;
                lightboxImg.style.opacity = '1';
            }, 150);
        }
    }
    
    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    if (prevBtn) prevBtn.addEventListener('click', showPrev);
    if (nextBtn) nextBtn.addEventListener('click', showNext);
    
    // Fechar ao clicar fora da imagem
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }
    
    // Navegação por teclado
    document.addEventListener('keydown', (e) => {
        if (lightbox && lightbox.classList.contains('active')) {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') showNext();
            if (e.key === 'ArrowLeft') showPrev();
        }
    });
}

// ========== FLIP CARDS INTERATIVOS ==========

function setupFlipCards() {
    const flipCards = document.querySelectorAll('.flip-card');
    
    flipCards.forEach(card => {
        // Para dispositivos touch, adicionar evento de clique
        card.addEventListener('click', () => {
            card.classList.toggle('flipped');
        });
    });
}

// ========== CONTADOR REGRESSIVO ==========

function updateCountdown() {
    const now = new Date();
    const currentYear = now.getFullYear();
    let nextAnniversary = new Date(currentYear, 8, 28, 0, 0, 0); // 28 de setembro
    
    // Se já passou este ano, usar próximo ano
    if (now > nextAnniversary) {
        nextAnniversary = new Date(currentYear + 1, 8, 28, 0, 0, 0);
    }
    
    const diff = nextAnniversary - now;
    
    // Calcular tempo restante
    const totalDays = Math.floor(diff / (1000 * 60 * 60 * 24));
    const months = Math.floor(totalDays / 30);
    const days = totalDays % 30;
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    // Atualizar elementos
    const monthsEl = document.getElementById('countdown-months');
    const daysEl = document.getElementById('countdown-days');
    const hoursEl = document.getElementById('countdown-hours');
    const minutesEl = document.getElementById('countdown-minutes');
    const messageEl = document.getElementById('countdown-message');
    
    if (monthsEl) monthsEl.textContent = months;
    if (daysEl) daysEl.textContent = days;
    if (hoursEl) hoursEl.textContent = hours;
    if (minutesEl) minutesEl.textContent = minutes;
    
    // Mensagem especial quando faltar menos de 30 dias
    if (messageEl) {
        if (totalDays <= 30 && totalDays > 7) {
            messageEl.textContent = '🎊 Está chegando! Mal posso esperar para celebrar com você! 💕';
        } else if (totalDays <= 7 && totalDays > 1) {
            messageEl.textContent = '🎉 Falta tão pouco! Prepare-se para uma surpresa especial! 💝';
        } else if (totalDays === 1) {
            messageEl.textContent = '🥳 AMANHÃ É O GRANDE DIA! Te amo muito! 💕';
        } else if (totalDays === 0) {
            messageEl.textContent = '🎊🎉 FELIZ ANIVERSÁRIO DE NAMORO, MEU AMOR! 💕💖💗';
            createConfetti();
        }
    }
}

// Atualizar contador a cada minuto
function startCountdown() {
    updateCountdown();
    setInterval(updateCountdown, 60000); // Atualizar a cada minuto
}

// ========== ANIMAÇÕES DE ENTRADA ==========

function setupScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observar novos elementos
    const newElements = document.querySelectorAll(
        '.photo-item, .flip-card, .countdown-item, .dream-card, .spotify-container'
    );
    
    newElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(50px)';
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(element);
    });
}

// ========== EFEITOS ESPECIAIS NOS CARDS DE SONHOS ==========

function setupDreamCards() {
    const dreamCards = document.querySelectorAll('.dream-card');
    
    dreamCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            // Adicionar efeito de brilho extra
            card.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

// ========== CONFIGURAR BOTÃO DO WHATSAPP ==========

function setupWhatsAppButton() {
    const whatsappBtn = document.querySelector('.whatsapp-button');
    
    if (whatsappBtn) {
        // Você pode customizar a mensagem aqui
        const currentHref = whatsappBtn.getAttribute('href');
        
        // Dica: Substitua SEU_NUMERO pelo número do WhatsApp (com código do país)
        // Exemplo: 5511999999999 para Brasil
        console.log('💡 Lembre-se de atualizar o número do WhatsApp no HTML!');
        console.log('Substitua SEU_NUMERO pelo número real (ex: 5511999999999)');
    }
}

// ========== INICIALIZAR TUDO ==========

// Modificar a inicialização existente para incluir as novas funções
const originalDOMContentLoaded = document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    updateTimeCounter();
    observeElements();
    smoothScroll();
    parallaxEffect();
    setupMusicToggle();
    addClickHearts();
    createFlowerSnow();
    startRealTimeCounter();
    
    // NOVAS FUNCIONALIDADES
    setupPhotoGallery();
    setupFlipCards();
    startCountdown();
    setupScrollAnimations();
    setupDreamCards();
    setupWhatsAppButton();
    
    // Criar confete quando a página carregar
    setTimeout(() => {
        createConfetti();
    }, 1000);
    
    // Mensagem no console
    console.log('💕 Site criado com amor para Emily & Bernardo 💕');
    console.log('Juntos desde 28 de Setembro de 2022');
    console.log('');
    console.log('🎨 Novas funcionalidades adicionadas:');
    console.log('✅ Galeria de fotos interativa');
    console.log('✅ Mensagens surpresa com flip cards');
    console.log('✅ Contador regressivo para próximo aniversário');
    console.log('✅ Seção de sonhos e planos');
    console.log('✅ Integração com Spotify');
    console.log('✅ Botão de WhatsApp');
    console.log('');
    console.log('📸 Para adicionar suas fotos:');
    console.log('1. Coloque as imagens na pasta do projeto');
    console.log('2. No HTML, substitua os placeholders por <img src="sua-foto.jpg">');
    console.log('');
    console.log('🎵 Para adicionar música do Spotify:');
    console.log('1. Crie uma playlist no Spotify');
    console.log('2. Pegue o código de embed');
    console.log('3. Cole no HTML conforme instruções');
});
