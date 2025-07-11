
        // Dark/Light Theme Toggle
        const themeToggle = document.getElementById('theme-toggle');
        const themeIcon = themeToggle.querySelector('i');
        
        // Check for saved theme preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            document.body.classList.add('light-theme');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
        
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            
            if (document.body.classList.contains('light-theme')) {
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
                localStorage.setItem('theme', 'light');
            } else {
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
                localStorage.setItem('theme', 'dark');
            }
        });
        
        // Language Toggle
        const langToggle = document.getElementById('lang-toggle');
        let currentLang = 'en';
        
        // Check for saved language preference
        const savedLang = localStorage.getItem('lang');
        if (savedLang === 'am') {
            currentLang = 'am';
            translatePage('am');
        }
        
        langToggle.addEventListener('click', () => {
            currentLang = currentLang === 'en' ? 'am' : 'en';
            localStorage.setItem('lang', currentLang);
            translatePage(currentLang);
        });
        
        // Translation function
        function translatePage(lang) {
            // Translate elements with 'translate' class
            document.querySelectorAll('.translate').forEach(element => {
                if (element.dataset[lang]) {
                    element.textContent = element.dataset[lang];
                }
            });
            
            // Translate buttons
            document.querySelectorAll('.filter-btn').forEach(button => {
                if (button.dataset[lang]) {
                    button.textContent = button.dataset[lang];
                }
            });
            
            // Translate nav links
            document.querySelectorAll('.nav-link').forEach(link => {
                if (link.dataset[lang]) {
                    link.textContent = link.dataset[lang];
                }
            });
        }
        
        // Mobile Menu Toggle
        const mobileMenu = document.querySelector('.mobile-menu');
        const navMenu = document.querySelector('nav ul');
        
        mobileMenu.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            mobileMenu.querySelector('i').classList.toggle('fa-bars');
            mobileMenu.querySelector('i').classList.toggle('fa-times');
        });
        
        // Smooth Scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Close mobile menu when a link is clicked
                navMenu.classList.remove('active');
                mobileMenu.querySelector('i').classList.add('fa-bars');
                mobileMenu.querySelector('i').classList.remove('fa-times');
                
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });
        
        // Portfolio Filter
        const filterButtons = document.querySelectorAll('.filter-btn');
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                button.classList.add('active');
                
                const filter = button.getAttribute('data-filter');
                
                portfolioItems.forEach(item => {
                    if (filter === 'all' || item.getAttribute('data-category') === filter) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
        
        // Simple Form Validation
        const contactForm = document.querySelector('.contact-form form');
        
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Simple validation - check if required fields are filled
            const nameInput = contactForm.querySelector('input[type="text"]');
            const emailInput = contactForm.querySelector('input[type="email"]');
            const messageInput = contactForm.querySelector('textarea');
            
            if (nameInput.value.trim() === '') {
                alert(currentLang === 'en' ? 'Please enter your name' : 'እባኮትን ስምዎን ያስገቡ');
                return;
            }
            
            if (emailInput.value.trim() === '') {
                alert(currentLang === 'en' ? 'Please enter your email' : 'እባኮትን ኢሜይልዎን ያስገቡ');
                return;
            }
            
            if (messageInput.value.trim() === '') {
                alert(currentLang === 'en' ? 'Please enter your message' : 'እባኮትን መልእክትዎን ያስገቡ');
                return;
            }
            
            // Form is valid - show success message
            alert(currentLang === 'en' ? 'Thank you for your message! We will get back to you soon.' : 'መልእክትዎን ላኩልን እናመሰግናለን! በቅርብ ጊዜ ከእርስዎ ጋር እንገናኛለን።');
            contactForm.reset();
        });
