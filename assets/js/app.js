document.addEventListener('DOMContentLoaded', async () => {
    // DOM Elements
    const promptContainer = document.getElementById('promptContainer');
    const searchInput = document.getElementById('searchInput');
    const modal = document.getElementById('promptModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalPromptText = document.getElementById('modalPromptText');
    const modalContributor = document.getElementById('modalContributor');
    const modalClose = document.getElementById('modalClose');
    const modalOverlay = document.querySelector('.modal-overlay');

    // State
    let promptsData = [];
    let filteredPrompts = [];
    let currentPlatform = 'all';
    let currentCategory = 'all';
    let currentSearchQuery = '';

    // Initialize the application
    async function init() {
        try {
            await loadPrompts();
            setupEventListeners();
            renderPrompts();
        } catch (error) {
            console.error('Failed to initialize app:', error);
            showError('Failed to load prompts. Please try again later.');
        }
    }

    // Load prompts data
    async function loadPrompts() {
        try {
            const response = await fetch('assets/data/prompts.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            promptsData = await response.json();
            filteredPrompts = [...promptsData];
        } catch (error) {
            console.error('Error loading prompts:', error);
            throw error;
        }
    }

    // Setup event listeners
    function setupEventListeners() {
        // Search functionality
        if (searchInput) {
            searchInput.addEventListener('input', debounce(handleSearch, 300));
        }

        // Platform filter buttons
        document.querySelectorAll('.platform-btn').forEach(btn => {
            btn.addEventListener('click', handlePlatformFilter);
        });

        // Category filter buttons
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.addEventListener('click', handleCategoryFilter);
        });

        // Modal event listeners
        if (modalClose) {
            modalClose.addEventListener('click', closeModal);
        }
        if (modalOverlay) {
            modalOverlay.addEventListener('click', closeModal);
        }
        
        // Close modal on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal && !modal.classList.contains('hidden')) {
                closeModal();
            }
        });
    }

    // Handle search input
    function handleSearch(e) {
        currentSearchQuery = e.target.value.toLowerCase().trim();
        applyFilters();
    }

    // Handle platform filter
    function handlePlatformFilter(e) {
        // Remove active class from all platform buttons
        document.querySelectorAll('.platform-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Add active class to clicked button
        e.target.classList.add('active');
        
        currentPlatform = e.target.dataset.platform || 'all';
        applyFilters();
    }

    // Handle category filter
    function handleCategoryFilter(e) {
        // Remove active class from all category buttons
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Add active class to clicked button
        e.target.classList.add('active');
        
        currentCategory = e.target.dataset.category || 'all';
        applyFilters();
    }

    // Apply all filters
    function applyFilters() {
        filteredPrompts = promptsData.filter(prompt => {
            // Platform filter
            const platformMatch = currentPlatform === 'all' || 
                (prompt.platforms && prompt.platforms.includes(currentPlatform));

            // Category filter
            const categoryMatch = currentCategory === 'all' || 
                prompt.category === currentCategory;

            // Search filter
            const searchMatch = !currentSearchQuery || 
                prompt.title.toLowerCase().includes(currentSearchQuery) ||
                prompt.description.toLowerCase().includes(currentSearchQuery) ||
                prompt.prompt.toLowerCase().includes(currentSearchQuery);

            return platformMatch && categoryMatch && searchMatch;
        });

        renderPrompts();
    }

    // Render prompts
    function renderPrompts() {
        if (!promptContainer) return;

        // Start with the "Add Your Prompt" card
        let promptsHTML = `
            <div class="add-prompt-card">
                <div class="add-prompt-icon">+</div>
                <h3>Add Your Prompt</h3>
                <p>Share your creative prompts with the community! Submit a pull request to add your prompts to the collection.</p>
                <button class="contribute-btn">Contribute Now</button>
            </div>
        `;

        if (filteredPrompts.length === 0) {
            promptsHTML += `
                <div class="empty-state">
                    <h3>No prompts found</h3>
                    <p>Try adjusting your search or filter criteria.</p>
                </div>
            `;
        } else {
            promptsHTML += filteredPrompts.map(prompt => `
                <div class="prompt-card" data-id="${prompt.id}">
                    <h3>${escapeHtml(prompt.title)}</h3>
                    <p>${escapeHtml(prompt.description)}</p>
                    <div class="prompt-card-footer">
                        <div class="prompt-actions">
                            <div class="action-icon" title="Copy">📋</div>
                            <div class="action-icon" title="Share">📤</div>
                            <div class="action-icon" title="Bookmark">🔖</div>
                        </div>
                        <p class="contributor">@${escapeHtml(prompt.contributor)}</p>
                    </div>
                </div>
            `).join('');
        }

        promptContainer.innerHTML = promptsHTML;

        // Add click event listeners to prompt cards
        document.querySelectorAll('.prompt-card').forEach(card => {
            card.addEventListener('click', handlePromptClick);
        });

        // Add click event listener to contribute button
        document.querySelector('.contribute-btn')?.addEventListener('click', () => {
            window.open('https://github.com/f/awesome-chatgpt-prompts', '_blank');
        });
    }

    // Handle prompt card click
    function handlePromptClick(e) {
        const promptId = parseInt(e.currentTarget.dataset.id);
        const prompt = promptsData.find(p => p.id === promptId);
        
        if (prompt) {
            openModal(prompt);
        }
    }

    // Open modal with prompt details
    function openModal(prompt) {
        if (!modal) return;
        
        if (modalTitle) modalTitle.textContent = prompt.title;
        if (modalPromptText) modalPromptText.textContent = prompt.prompt;
        if (modalContributor) modalContributor.textContent = `@${prompt.contributor}`;
        
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    // Close modal
    function closeModal() {
        if (!modal) return;
        
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }

    // Show error message
    function showError(message) {
        if (!promptContainer) return;
        
        promptContainer.innerHTML = `
            <div class="add-prompt-card">
                <div class="add-prompt-icon">+</div>
                <h3>Add Your Prompt</h3>
                <p>Share your creative prompts with the community! Submit a pull request to add your prompts to the collection.</p>
                <button class="contribute-btn">Contribute Now</button>
            </div>
            <div class="empty-state">
                <h3>Error</h3>
                <p>${escapeHtml(message)}</p>
            </div>
        `;
    }

    // Utility functions
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    function escapeHtml(text) {
        if (!text) return '';
        const map = {
            '&': '&amp;',
            '<': '<',
            '>': '>',
            '"': '"',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, m => map[m]);
    }

    // Initialize the app
    init();
});
