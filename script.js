document.addEventListener('DOMContentLoaded', () => {
    const checkboxes = document.querySelectorAll('.task-checkbox');
    const totalTasks = checkboxes.length;
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');

    function updateProgress() {
        const checkedTasks = document.querySelectorAll('.task-checkbox:checked').length;
        const percentage = totalTasks > 0 ? (checkedTasks / totalTasks) * 100 : 0;
        
        progressBar.style.width = `${percentage}%`;
        progressText.textContent = `${Math.round(percentage)}% Complete`;

        checkboxes.forEach(cb => {
            const row = cb.closest('tr');
            if (cb.checked) {
                row.classList.add('completed');
            } else {
                row.classList.remove('completed');
            }
        });
    }

    function saveProgress() {
        const completedTasks = [];
        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                completedTasks.push(checkbox.closest('tr').dataset.day);
            }
        });
        localStorage.setItem('powerBiPlanProgress', JSON.stringify(completedTasks));
    }

    function loadProgress() {
        const completedTasks = JSON.parse(localStorage.getItem('powerBiPlanProgress')) || [];
        completedTasks.forEach(day => {
            const row = document.querySelector(`tr[data-day="${day}"]`);
            if (row) {
                const checkbox = row.querySelector('.task-checkbox');
                if (checkbox) {
                    checkbox.checked = true;
                }
            }
        });
    }

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            updateProgress();
            saveProgress();
        });
    });

    // Initial load
    loadProgress();
    updateProgress();
});