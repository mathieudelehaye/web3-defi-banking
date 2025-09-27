// Onboarding Modal Logic
let currentStep = 1;
const totalSteps = 4;

export function showOnboardingModal() {
    const modal = document.getElementById('onboarding-modal');
    modal.style.display = 'block';
    setTimeout(() => modal.classList.add('show'), 10);
}

function hideOnboardingModal() {
    const modal = document.getElementById('onboarding-modal');
    modal.classList.remove('show');
    setTimeout(() => modal.style.display = 'none', 300);
    localStorage.setItem('dbank_onboarded', 'true');
}

function updateStep(step) {
    // Hide all steps
    document.querySelectorAll('.onboarding-step').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.dot').forEach(d => d.classList.remove('active'));

    // Show current step
    document.querySelector(`[data-step="${step}"]`).classList.add('active');
    document.querySelector(`.dot[data-step="${step}"]`).classList.add('active');

    // Update buttons
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const startBtn = document.getElementById('start-btn');

    prevBtn.style.display = step > 1 ? 'inline-block' : 'none';
    nextBtn.style.display = step < totalSteps ? 'inline-block' : 'none';
    startBtn.style.display = step === totalSteps ? 'inline-block' : 'none';
}

// Event listeners for modal
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('onboarding-modal');
    const closeBtn = document.querySelector('.close');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const startBtn = document.getElementById('start-btn');

    // Close modal
    closeBtn.addEventListener('click', hideOnboardingModal);

    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            hideOnboardingModal();
        }
    });

    // Navigation buttons
    prevBtn.addEventListener('click', function() {
        if (currentStep > 1) {
            currentStep--;
            updateStep(currentStep);
        }
    });

    nextBtn.addEventListener('click', function() {
        if (currentStep < totalSteps) {
            currentStep++;
            updateStep(currentStep);
        }
    });

    startBtn.addEventListener('click', hideOnboardingModal);

    // Dot navigation
    document.querySelectorAll('.dot').forEach(dot => {
        dot.addEventListener('click', function() {
            currentStep = parseInt(this.getAttribute('data-step'));
            updateStep(currentStep);
        });
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (modal.style.display === 'block') {
            if (e.key === 'Escape') {
                hideOnboardingModal();
            } else if (e.key === 'ArrowLeft' && currentStep > 1) {
                currentStep--;
                updateStep(currentStep);
            } else if (e.key === 'ArrowRight' && currentStep < totalSteps) {
                currentStep++;
                updateStep(currentStep);
            }
        }
    });

    // Help link in footer
    const helpLink = document.getElementById('help-link');
    if (helpLink) {
        helpLink.addEventListener('click', function(e) {
            e.preventDefault();
            currentStep = 1;
            updateStep(currentStep);
            showOnboardingModal();
        });
    }
});