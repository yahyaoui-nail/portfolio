document.addEventListener('DOMContentLoaded', () => {
    // Gestion du menu mobile (Burger Menu)
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Ferme le menu après un clic sur un lien (très important pour l'expérience mobile)
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }

    // Gestion du défilement fluide et de l'animation de surlignage
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            let targetElement = null;

            if (targetId === '#') {
                // Si l'ancre est "#", la cible est le corps du document pour remonter tout en haut
                targetElement = document.body;
            } else {
                // Sinon, la cible est la section avec l'ID correspondant (ex: #accueil)
                targetElement = document.querySelector(targetId);
            }

            if (targetElement) {
                // 1. Déclenche le défilement fluide
                // Utilise window.scrollTo pour le retour en haut si la cible est le body
                if (targetId === '#') {
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                } else {
                    targetElement.scrollIntoView({
                        behavior: 'smooth' 
                    });
                }

                // 2. Gestion de l'animation visuelle du titre (highlight)
                // L'animation n'est pertinente que si on cible une section spécifique (pas le retour simple en haut)
                if (targetId !== '#') {
                    // Le délai permet de s'assurer que le défilement est en cours ou terminé.
                    setTimeout(() => {
                        // Nettoie toute ancienne animation
                        const previousHighlights = document.querySelectorAll('.highlight-target');
                        previousHighlights.forEach(el => el.classList.remove('highlight-target'));
                        
                        // Ajoute la classe pour déclencher l'animation CSS
                        targetElement.classList.add('highlight-target');

                        // Retire la classe après la fin de l'animation CSS (2s)
                        setTimeout(() => {
                            targetElement.classList.remove('highlight-target');
                        }, 2000); 
                    }, 500); // Déclenche l'animation 0.5s après le clic
                }
            }
        });
    });

    // Gestion du bouton de retour en haut
    const scrollToTopButton = document.getElementById('scroll-to-top');

    if (scrollToTopButton) {
        // Afficher le bouton lorsque l'utilisateur a défilé 300px
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollToTopButton.classList.add('show');
            } else {
                scrollToTopButton.classList.remove('show');
            }
        });

        // Défilement fluide au clic
        scrollToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // NOTE: Le code pour les barres de progression a été retiré.
});		