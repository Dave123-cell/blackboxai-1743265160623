document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('gpa-calc-container');
    
    // Initialize GPA calculator
    container.innerHTML = `
        <div class="mb-6">
            <h3 class="text-xl font-semibold text-ghana-green mb-3">Add Courses</h3>
            <div class="flex flex-wrap gap-4 mb-4">
                <input type="text" id="course-code" placeholder="Course Code" 
                    class="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-ghana-green">
                <input type="number" id="credit-hours" placeholder="Credit Hours" min="1" max="6" 
                    class="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-ghana-green">
                <select id="grade" class="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-ghana-green">
                    <option value="">Select Grade</option>
                    <option value="4.0">A</option>
                    <option value="3.5">B+</option>
                    <option value="3.0">B</option>
                    <option value="2.5">C+</option>
                    <option value="2.0">C</option>
                    <option value="1.5">D+</option>
                    <option value="1.0">D</option>
                    <option value="0.0">F</option>
                </select>
                <button id="add-course" class="ghana-green text-white px-4 py-2 rounded hover:bg-opacity-90 transition">
                    Add Course
                </button>
            </div>
        </div>
        
        <div class="mb-6">
            <h3 class="text-xl font-semibold text-ghana-green mb-3">Your Courses</h3>
            <div id="courses-list" class="mb-4">
                <p class="text-gray-500">No courses added yet</p>
            </div>
        </div>
        
        <div class="flex justify-between items-center">
            <button id="calculate-gpa" class="ghana-yellow text-gray-800 px-6 py-2 rounded hover:bg-opacity-90 transition">
                Calculate GPA
            </button>
            <div id="gpa-result" class="text-xl font-bold text-ghana-green hidden">
                Your GPA: <span id="gpa-value">0.00</span>
            </div>
        </div>
    `;

    // Initialize variables
    let courses = [];
    const addCourseBtn = document.getElementById('add-course');
    const calculateBtn = document.getElementById('calculate-gpa');

    // Event listeners
    addCourseBtn.addEventListener('click', addCourse);
    calculateBtn.addEventListener('click', calculateGPA);

    function addCourse() {
        const code = document.getElementById('course-code').value;
        const credits = parseFloat(document.getElementById('credit-hours').value);
        const grade = parseFloat(document.getElementById('grade').value);

        if (!code || isNaN(credits) || isNaN(grade)) {
            alert('Please fill all fields correctly');
            return;
        }

        courses.push({ code, credits, grade });
        updateCoursesList();
        
        // Clear inputs
        document.getElementById('course-code').value = '';
        document.getElementById('credit-hours').value = '';
        document.getElementById('grade').value = '';
    }

    function updateCoursesList() {
        const list = document.getElementById('courses-list');
        
        if (courses.length === 0) {
            list.innerHTML = '<p class="text-gray-500">No courses added yet</p>';
            return;
        }

        let html = '<table class="min-w-full border"><thead><tr class="bg-gray-100">';
        html += '<th class="py-2 px-4 text-left border">Course</th>';
        html += '<th class="py-2 px-4 text-left border">Credits</th>';
        html += '<th class="py-2 px-4 text-left border">Grade</th>';
        html += '<th class="py-2 px-4 text-left border">Action</th></tr></thead><tbody>';

        courses.forEach((course, index) => {
            const gradeLetter = getGradeLetter(course.grade);
            html += `<tr class="${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}">`;
            html += `<td class="py-2 px-4 border">${course.code}</td>`;
            html += `<td class="py-2 px-4 border">${course.credits}</td>`;
            html += `<td class="py-2 px-4 border">${gradeLetter}</td>`;
            html += `<td class="py-2 px-4 border">
                <button onclick="removeCourse(${index})" class="text-red-500 hover:text-red-700">
                    <i class="fas fa-trash"></i>
                </button>
            </td>`;
            html += '</tr>';
        });

        html += '</tbody></table>';
        list.innerHTML = html;
    }

    function calculateGPA() {
        if (courses.length === 0) {
            alert('Please add at least one course');
            return;
        }

        let totalPoints = 0;
        let totalCredits = 0;

        courses.forEach(course => {
            totalPoints += course.grade * course.credits;
            totalCredits += course.credits;
        });

        const gpa = totalPoints / totalCredits;
        document.getElementById('gpa-value').textContent = gpa.toFixed(2);
        document.getElementById('gpa-result').classList.remove('hidden');
    }

    function getGradeLetter(gradeValue) {
        const gradeMap = {
            4.0: 'A',
            3.5: 'B+',
            3.0: 'B',
            2.5: 'C+',
            2.0: 'C',
            1.5: 'D+',
            1.0: 'D',
            0.0: 'F'
        };
        return gradeMap[gradeValue] || '';
    }
});

// Global function for course removal
function removeCourse(index) {
    const container = document.getElementById('gpa-calc-container');
    let courses = JSON.parse(container.dataset.courses || '[]');
    courses.splice(index, 1);
    container.dataset.courses = JSON.stringify(courses);
    document.dispatchEvent(new Event('DOMContentLoaded'));
}