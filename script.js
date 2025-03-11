// Navigation toggle for mobile
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a nav link
const navItems = document.querySelectorAll('.nav-links a');
navItems.forEach(item => {
    item.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
        }
    });
});

// Header scroll effect
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.style.padding = '15px 0';
        header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.padding = '20px 0';
        header.style.boxShadow = 'none';
    }
});

// Active link highlighting based on scroll position
const sections = document.querySelectorAll('section');
const navLi = document.querySelectorAll('.nav-links li a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    navLi.forEach(li => {
        li.classList.remove('active');
        if (li.getAttribute('href').substring(1) === current) {
            li.classList.add('active');
        }
    });
});
// Portfolio filtering functionality
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    // Filter items based on category
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Show/hide items based on category
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Initialize portfolio items with animation
    portfolioItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.transition = 'all 0.4s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, 100 + (index * 100));
    });
});

// Portfolio modal functionality
document.addEventListener('DOMContentLoaded', function() {
    const detailButtons = document.querySelectorAll('.portfolio-details-btn');
    
    // Create modal elements
    const modal = document.createElement('div');
    modal.classList.add('portfolio-modal');
    
    const modalContent = document.createElement('div');
    modalContent.classList.add('portfolio-modal-content');
    
    const closeBtn = document.createElement('span');
    closeBtn.classList.add('close-modal');
    closeBtn.innerHTML = '&times;';
    
    const modalBody = document.createElement('div');
    modalBody.classList.add('modal-body');
    
    // Assemble modal
    modalContent.appendChild(closeBtn);
    modalContent.appendChild(modalBody);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    
    // Open modal with project details
    detailButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get project info
            const portfolioItem = this.closest('.portfolio-item');
            const title = portfolioItem.querySelector('h3').textContent;
            const category = portfolioItem.querySelector('p').textContent;
            const imgSrc = portfolioItem.querySelector('img').src;
            
            // Populate modal
            modalBody.innerHTML = `
                <h2>${title}</h2>
                <div class="project-details">
                    <div class="project-image">
                        <img src="${imgSrc}" alt="${title}">
                    </div>
                    <div class="project-info">
                        <p class="project-category">${category}</p>
                        <div class="project-description">
                            <p>This is a detailed description of the ${title} project. Here you would include information about the project goals, technologies used, challenges overcome, and results achieved.</p>
                            <p>Technologies used:</p>
                            <ul class="tech-stack">
                                <li>HTML5/CSS3</li>
                                <li>JavaScript</li>
                                <li>React.js</li>
                                <li>Node.js</li>
                                <li>MongoDB</li>
                            </ul>
                        </div>
                        <a href="#" class="btn primary-btn">View Live</a>
                    </div>
                </div>
            `;
            
            // Show modal
            modal.style.display = 'flex';
            setTimeout(() => {
                modal.classList.add('show');
                modalContent.classList.add('show');
            }, 10);
            
            // Prevent scrolling on body
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close modal
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    function closeModal() {
        modal.classList.remove('show');
        modalContent.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 300);
    }
});