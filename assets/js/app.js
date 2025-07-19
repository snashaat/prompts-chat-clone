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
    const promptCount = document.getElementById('promptCount');
    const totalCount = document.getElementById('totalCount');

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
            updateCounts();
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
        searchInput.addEventListener('input', debounce(handleSearch, 300));

        // Platform filter buttons
        document.querySelectorAll('.platform-btn').forEach(btn => {
            btn.addEventListener('click', handlePlatformFilter);
        });

        // Category filter buttons
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.addEventListener('click', handleCategoryFilter);
        });

        // Modal event listeners
        modalClose.addEventListener('click', closeModal);
        modalOverlay.addEventListener('click', closeModal);
        
        // Close modal on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
                closeModal();
            }
        });

        // Contribute button
        document.querySelector('.contribute-btn')?.addEventListener('click', () => {
            window.open('https://github.com/f/awesome-chatgpt-prompts', '_blank');
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
        
        currentPlatform = e.target.dataset.platform;
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
        
        currentCategory = e.target.dataset.category;
        applyFilters();
    }

    // Apply all filters
    function applyFilters() {
        filteredPrompts = promptsData.filter(prompt => {
            // Platform filter
            const platformMatch = currentPlatform === 'all' || 
                prompt.platforms.includes(currentPlatform);

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
        updateCounts();
    }

    // Render prompts
    function renderPrompts() {
        if (filteredPrompts.length === 0) {
            showEmptyState();
            return;
        }

        const promptsHTML = filteredPrompts.map(prompt => `
            <div class="prompt-card" data-id="${prompt.id}">
                <h3>${escapeHtml(prompt.title)}</h3>
                <p>${escapeHtml(prompt.description)}</p>
                <div class="actions">
                    <div class="action-icon" title="Copy"></div>
                    <div class="action-icon" title="Share"></div>
                    <div class="action-icon" title="Bookmark"></div>
                </div>
                <p class="contributor">@${escapeHtml(prompt.contributor)}</p>
            </div>
        `).join('');

        promptContainer.innerHTML = promptsHTML;

        // Add click event listeners to prompt cards
        document.querySelectorAll('.prompt-card').forEach(card => {
            card.addEventListener('click', handlePromptClick);
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
        modalTitle.textContent = prompt.title;
        modalPromptText.textContent = prompt.prompt;
        modalContributor.textContent = `@${prompt.contributor}`;
        
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    // Close modal
    function closeModal() {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }

    // Update counts
    function updateCounts() {
        const count = filteredPrompts.length;
        totalCount.textContent = count;
        
        if (currentSearchQuery) {
            promptCount.textContent = `Search Results`;
        } else if (currentCategory !== 'all') {
            const categoryName = document.querySelector(`[data-category="${currentCategory}"]`)
                ?.querySelector('.category-name')?.textContent || currentCategory;
            promptCount.textContent = categoryName;
        } else {
            promptCount.textContent = 'All Prompts';
        }

        // Update category counts
        document.querySelectorAll('.category-btn').forEach(btn => {
            const category = btn.dataset.category;
            const countElement = btn.querySelector('.category-count');
            
            if (countElement && category !== 'all') {
                const categoryCount = promptsData.filter(p => p.category === category).length;
                countElement.textContent = categoryCount;
            }
        });
    }

    // Show empty state
    function showEmptyState() {
        promptContainer.innerHTML = `
            <div class="empty-state">
                <h3>No prompts found</h3>
                <p>Try adjusting your search or filter criteria.</p>
            </div>
        `;
    }

    // Show error message
    function showError(message) {
        promptContainer.innerHTML = `
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
