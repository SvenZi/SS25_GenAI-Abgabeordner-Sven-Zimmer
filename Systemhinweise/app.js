// AdventureBikes Analytics Platform JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupTabNavigation();
    setupArchitectureLayers();
    setupQuickLinks();
    setupInteractiveElements();
}

// Tab Navigation System
function setupTabNavigation() {
    const navTabs = document.querySelectorAll('.nav-tab');
    const tabContents = document.querySelectorAll('.tab-content');

    navTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            switchTab(targetTab);
        });
    });

    function switchTab(targetTab) {
        // Remove active class from all tabs and contents
        navTabs.forEach(tab => tab.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));

        // Add active class to clicked tab and corresponding content
        const activeNavTab = document.querySelector(`[data-tab="${targetTab}"]`);
        const activeContent = document.getElementById(targetTab);

        if (activeNavTab && activeContent) {
            activeNavTab.classList.add('active');
            activeContent.classList.add('active');

            // Smooth scroll to top of content
            activeContent.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
        }
    }

    // Expose switchTab function globally for quick links
    window.switchTab = switchTab;
}

// Architecture Layer Accordion
function setupArchitectureLayers() {
    const architectureLayers = document.querySelectorAll('.architecture-layer');

    architectureLayers.forEach(layer => {
        const header = layer.querySelector('.layer-header');
        const content = layer.querySelector('.layer-content');
        const toggle = layer.querySelector('.layer-toggle');

        if (header && content && toggle) {
            header.addEventListener('click', function() {
                const isCollapsed = layer.classList.contains('collapsed');
                
                if (isCollapsed) {
                    // Expand
                    layer.classList.remove('collapsed');
                    content.classList.remove('hidden');
                    toggle.style.transform = 'rotate(0deg)';
                } else {
                    // Collapse
                    layer.classList.add('collapsed');
                    content.classList.add('hidden');
                    toggle.style.transform = 'rotate(-90deg)';
                }
            });
        }
    });
}

// Quick Links Navigation
function setupQuickLinks() {
    const quickLinkBtns = document.querySelectorAll('.quick-link-btn');

    quickLinkBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const target = this.getAttribute('data-target');
            if (target && window.switchTab) {
                window.switchTab(target);
            }
        });
    });
}

// Interactive Elements and Animations
function setupInteractiveElements() {
    // Add hover effects to metric cards
    const metricCards = document.querySelectorAll('.metric-card');
    metricCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add click effects to timeline steps
    const timelineSteps = document.querySelectorAll('.timeline-step');
    timelineSteps.forEach((step, index) => {
        step.addEventListener('click', function() {
            // Add pulse effect
            this.style.transform = 'translateX(8px) scale(1.02)';
            setTimeout(() => {
                this.style.transform = 'translateX(4px) scale(1)';
            }, 200);

            // Show additional details (could be expanded later)
            showStepDetails(index + 1);
        });
    });

    // Add interactive effects to file cards
    const fileCards = document.querySelectorAll('.file-card');
    fileCards.forEach(card => {
        card.addEventListener('click', function() {
            // Add selection effect
            fileCards.forEach(c => c.classList.remove('selected'));
            this.classList.add('selected');
            
            // Could expand to show more file details
            const fileName = this.querySelector('h3').textContent;
            showFileDetails(fileName);
        });
    });

    // Add interactive effects to tech categories
    const techCategories = document.querySelectorAll('.tech-category');
    techCategories.forEach(category => {
        category.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = 'var(--shadow-md)';
        });

        category.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'var(--shadow-sm)';
        });
    });

    // Add interactive effects to security features
    const securityFeatures = document.querySelectorAll('.security-feature');
    securityFeatures.forEach(feature => {
        const header = feature.querySelector('.feature-header');
        const content = feature.querySelector('.feature-content');

        header.addEventListener('click', function() {
            const isExpanded = content.style.display === 'block';
            
            if (isExpanded) {
                content.style.display = 'none';
                feature.classList.remove('expanded');
            } else {
                content.style.display = 'block';
                feature.classList.add('expanded');
            }
        });
    });

    // Add interactive effects to database tables
    const tableCards = document.querySelectorAll('.table-card');
    tableCards.forEach(card => {
        card.addEventListener('click', function() {
            // Add selection effect
            tableCards.forEach(c => c.classList.remove('selected'));
            this.classList.add('selected');
            
            const tableName = this.querySelector('h4').textContent;
            showTableDetails(tableName);
        });
    });
}

// Helper Functions
function showStepDetails(stepNumber) {
    const stepInfo = {
        1: "Eingabe über Gradio Interface mit Whisper API für Audio-Transkription",
        2: "GPT-4o-mini Agent konvertiert natürliche Sprache zu optimiertem T-SQL",
        3: "SQLAlchemy führt sichere SELECT-Abfrage auf MS SQL Server aus",
        4: "Interpreter Agent formatiert CSV-Daten zu natürlicher deutscher Sprache",
        5: "Gradio rendert Ergebnis mit Copy-Funktion für Benutzer"
    };

    const info = stepInfo[stepNumber];
    if (info) {
        showTooltip(`Schritt ${stepNumber}: ${info}`);
    }
}

function showFileDetails(fileName) {
    const fileInfo = {
        'app.py': 'Hauptanwendung mit Gradio Interface für Benutzerinteraktion und Workflow-Orchestrierung',
        'database_request.py': 'Sichere Datenbankverbindung mit SQLAlchemy und Schutz vor SQL-Injection',
        'audio_transcriber.py': 'OpenAI Whisper Integration für Audio-zu-Text Konvertierung',
        'sql_agent.py': 'KI-Agent für natürlichsprachliche SQL-Generierung mit GPT-4o-mini',
        'interpreter_agent.py': 'KI-Agent für Ergebnis-Interpretation und deutsche Antwortgenerierung'
    };

    const info = fileInfo[fileName];
    if (info) {
        showTooltip(`${fileName}: ${info}`);
    }
}

function showTableDetails(tableName) {
    const tableInfo = {
        'DataSet_Monthly_Sales': 'Aggregierte monatliche Verkaufsdaten für Business Intelligence und Trend-Analyse',
        'Facts_Daily_Sales': 'Detaillierte tägliche Transaktionsdaten für granulare Verkaufsanalysen',
        'Dim_Product': 'Produktstammdaten mit Kategorien und Beschreibungen für Produkt-Analytics'
    };

    const info = tableInfo[tableName];
    if (info) {
        showTooltip(`${tableName}: ${info}`);
    }
}

function showTooltip(message) {
    // Remove existing tooltip
    const existingTooltip = document.querySelector('.app-tooltip');
    if (existingTooltip) {
        existingTooltip.remove();
    }

    // Create new tooltip
    const tooltip = document.createElement('div');
    tooltip.className = 'app-tooltip';
    tooltip.textContent = message;
    
    // Style the tooltip
    tooltip.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--color-primary);
        color: var(--color-btn-primary-text);
        padding: var(--space-12) var(--space-16);
        border-radius: var(--radius-base);
        box-shadow: var(--shadow-lg);
        z-index: 1000;
        max-width: 300px;
        font-size: var(--font-size-sm);
        animation: slideInRight 0.3s ease-out;
    `;

    document.body.appendChild(tooltip);

    // Auto-remove after 4 seconds
    setTimeout(() => {
        if (tooltip.parentNode) {
            tooltip.style.animation = 'slideOutRight 0.3s ease-in';
            setTimeout(() => {
                tooltip.remove();
            }, 300);
        }
    }, 4000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }

    .file-card.selected {
        border-color: var(--color-primary);
        box-shadow: 0 0 0 2px var(--color-focus-ring);
    }

    .table-card.selected {
        border-color: var(--color-primary);
        box-shadow: 0 0 0 2px var(--color-focus-ring);
    }

    .security-feature.expanded .feature-header {
        background: var(--color-primary);
        color: var(--color-btn-primary-text);
    }

    .security-feature.expanded .feature-header h3 {
        color: var(--color-btn-primary-text);
    }

    .metric-card {
        transition: transform var(--duration-fast) var(--ease-standard);
    }

    .timeline-step {
        cursor: pointer;
    }

    .file-card {
        cursor: pointer;
    }

    .table-card {
        cursor: pointer;
    }

    .tech-category {
        transition: transform var(--duration-fast) var(--ease-standard), box-shadow var(--duration-fast) var(--ease-standard);
    }

    .security-feature .feature-header {
        cursor: pointer;
        transition: all var(--duration-fast) var(--ease-standard);
    }

    .architecture-layer .layer-header {
        transition: background-color var(--duration-fast) var(--ease-standard);
    }

    .layer-toggle {
        transition: transform var(--duration-normal) var(--ease-standard);
    }
`;

document.head.appendChild(style);

// Keyboard Navigation Support
document.addEventListener('keydown', function(e) {
    // Tab navigation with arrow keys
    if (e.altKey) {
        const tabs = document.querySelectorAll('.nav-tab');
        const activeTab = document.querySelector('.nav-tab.active');
        const currentIndex = Array.from(tabs).indexOf(activeTab);

        if (e.key === 'ArrowRight' && currentIndex < tabs.length - 1) {
            e.preventDefault();
            tabs[currentIndex + 1].click();
        } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
            e.preventDefault();
            tabs[currentIndex - 1].click();
        }
    }
});

// Initialize analytics tracking (could be expanded)
function trackInteraction(action, element) {
    console.log(`User interaction: ${action} on ${element}`);
    // Could integrate with analytics service
}

// Add interaction tracking to key elements
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('nav-tab')) {
        trackInteraction('tab_switch', e.target.getAttribute('data-tab'));
    } else if (e.target.classList.contains('quick-link-btn')) {
        trackInteraction('quick_link', e.target.getAttribute('data-target'));
    } else if (e.target.closest('.architecture-layer')) {
        trackInteraction('layer_toggle', e.target.closest('.architecture-layer').getAttribute('data-layer'));
    }
});

// Responsive behavior for mobile
function handleMobileNavigation() {
    const nav = document.querySelector('.app-nav');
    const tabs = document.querySelector('.nav-tabs');
    
    if (window.innerWidth <= 768) {
        // Add mobile-specific behavior
        tabs.style.overflowX = 'auto';
        tabs.style.scrollBehavior = 'smooth';
    }
}

window.addEventListener('resize', handleMobileNavigation);
handleMobileNavigation(); // Initial call