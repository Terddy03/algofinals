// Presentation navigation
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

function showSlide(n) {
    slides.forEach(slide => slide.classList.remove('active'));
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    updateNavigationButtons();
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function previousSlide() {
    showSlide(currentSlide - 1);
}

function updateNavigationButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    prevBtn.style.visibility = currentSlide === 0 ? 'hidden' : 'visible';
    nextBtn.style.visibility = currentSlide === slides.length - 1 ? 'hidden' : 'visible';
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'Space') {
        nextSlide();
    } else if (e.key === 'ArrowLeft') {
        previousSlide();
    }
});

// Voting system implementation
class VotingSystem {
    constructor() {
        this.candidates = [
            { id: 'C001', name: 'Alice Johnson', votes: 0 },
            { id: 'C002', name: 'Bob Smith', votes: 0 },
            { id: 'C003', name: 'Charlie Brown', votes: 0 },
            { id: 'C004', name: 'Diana Miller', votes: 0 },
            { id: 'C005', name: 'Edward Davis', votes: 0 }
        ];
        this.initializeVotingSystem();
    }

    initializeVotingSystem() {
        const select = document.getElementById('candidateSelect');
        const searchInput = document.getElementById('searchInput');
        
        if (select) {
            // Clear existing options
            select.innerHTML = '';
            
            // Add candidates to select
            this.candidates.forEach(candidate => {
                const option = document.createElement('option');
                option.value = candidate.id;
                option.textContent = `${candidate.name} (${candidate.id})`;
                select.appendChild(option);
            });
        }

        if (searchInput) {
            searchInput.addEventListener('input', () => this.searchCandidate());
        }

        this.updateResults();
    }

    castVote(candidateId) {
        const candidate = this.candidates.find(c => c.id === candidateId);
        if (candidate) {
            candidate.votes++;
            this.quickSort(this.candidates, 0, this.candidates.length - 1);
            this.updateResults();
        }
    }

    searchCandidate() {
        const searchTerm = document.getElementById('searchInput').value.toLowerCase();
        const filteredCandidates = this.candidates.filter(candidate => 
            candidate.name.toLowerCase().includes(searchTerm) || 
            candidate.id.toLowerCase().includes(searchTerm)
        );
        this.updateResults(filteredCandidates);
    }

    // Quick Sort implementation
    quickSort(arr, low, high) {
        if (low < high) {
            const pi = this.partition(arr, low, high);
            this.quickSort(arr, low, pi - 1);
            this.quickSort(arr, pi + 1, high);
        }
    }

    partition(arr, low, high) {
        const pivot = arr[high].votes;
        let i = low - 1;

        for (let j = low; j < high; j++) {
            if (arr[j].votes >= pivot) {
                i++;
                [arr[i], arr[j]] = [arr[j], arr[i]];
            }
        }
        [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
        return i + 1;
    }

    updateResults(candidatesToShow = this.candidates) {
        const tbody = document.querySelector('table tbody');
        if (!tbody) return;

        tbody.innerHTML = '';
        candidatesToShow.forEach(candidate => {
            const row = tbody.insertRow();
            row.innerHTML = `
                <td>${candidate.name}</td>
                <td>${candidate.id}</td>
                <td>
                    <div class="vote-bar" style="width: ${(candidate.votes / Math.max(...this.candidates.map(c => c.votes)) * 100) || 0}%">
                        ${candidate.votes}
                    </div>
                </td>
            `;
        });
    }
}

// Initialize the presentation and voting system when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    showSlide(0);
    window.votingSystem = new VotingSystem();
});

// Function to handle vote button click
function handleVote() {
    const select = document.getElementById('candidateSelect');
    if (select && window.votingSystem) {
        window.votingSystem.castVote(select.value);
    }
} 