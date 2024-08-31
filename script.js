// script.js

// Student list
const students = ["Andrea", "Beenu", "Hannibal", "Aslin", "Adeno", "Riswin", "Sreejith", "Sherin", "Sija", "Jose", "Manoj", "Priya"];

document.addEventListener('DOMContentLoaded', function() {
    const modeRadios = document.querySelectorAll('input[name="mode"]');
    const singleModeDiv = document.getElementById('single-mode');
    const teamModeDiv = document.getElementById('team-mode');
    const studentsListDiv = document.getElementById('students-list');
    const selectAllCheckbox = document.getElementById('select-all');
    const singleResult = document.getElementById('single-result');
    const teamResult = document.getElementById('team-result');
    
    // Populate student list with checkboxes
    students.forEach((student, index) => {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `student-${index}`;
        checkbox.value = student;
        
        const label = document.createElement('label');
        label.htmlFor = `student-${index}`;
        label.textContent = student;
        
        studentsListDiv.appendChild(label);
        label.insertBefore(checkbox, label.firstChild);
    });

    // Show/hide sections based on mode selection
    modeRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.value === 'single') {
                singleModeDiv.style.display = 'block';
                teamModeDiv.style.display = 'none';
            } else {
                singleModeDiv.style.display = 'none';
                teamModeDiv.style.display = 'block';
            }
        });
    });

    // Select all students
    selectAllCheckbox.addEventListener('change', function() {
        const checkboxes = studentsListDiv.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => checkbox.checked = this.checked);
    });

    // Randomize single person
    document.getElementById('randomize-single').addEventListener('click', function() {
        const randomIndex = Math.floor(Math.random() * students.length);
        singleResult.textContent = `Selected student: ${students[randomIndex]}`;
    });

    // Randomize teams
    document.getElementById('randomize-team').addEventListener('click', function() {
        const selectedStudents = Array.from(studentsListDiv.querySelectorAll('input[type="checkbox"]:checked'))
            .map(checkbox => checkbox.value);
        const teamSize = parseInt(document.getElementById('team-size').value);
        
        if (selectedStudents.length === 0) {
            teamResult.textContent = 'Please select at least one student.';
            return;
        }

        // Shuffle the selected students
        for (let i = selectedStudents.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [selectedStudents[i], selectedStudents[j]] = [selectedStudents[j], selectedStudents[i]];
        }

        // Split into teams
        let teams = [];
        for (let i = 0; i < selectedStudents.length; i += teamSize) {
            teams.push(selectedStudents.slice(i, i + teamSize));
        }

        // Display teams
        teamResult.innerHTML = '';
        teams.forEach((team, index) => {
            teamResult.innerHTML += `<p>Team ${index + 1}: ${team.join(', ')}</p>`;
        });
    });
});
