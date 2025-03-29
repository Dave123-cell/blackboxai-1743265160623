// Main application functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    console.log('UENR Agribusiness Portal initialized');
    
    // Sample past questions data (would be fetched from server in real app)
    const pastQuestions = [
        { 
            courseCode: 'AGB 101', 
            courseTitle: 'Introduction to Agribusiness', 
            year: '2022', 
            file: 'AGB101_2022.pdf' 
        },
        { 
            courseCode: 'AGB 203', 
            courseTitle: 'Agricultural Marketing', 
            year: '2021', 
            file: 'AGB203_2021.pdf' 
        },
        { 
            courseCode: 'AGB 305', 
            courseTitle: 'Agribusiness Finance', 
            year: '2020', 
            file: 'AGB305_2020.pdf' 
        }
    ];

    // Render past questions
    renderPastQuestions(pastQuestions);
});

function renderPastQuestions(questions) {
    const container = document.getElementById('pq-container');
    container.innerHTML = '';

    if (questions.length === 0) {
        container.innerHTML = '<p class="text-center text-gray-500">No past questions available</p>';
        return;
    }

    const table = document.createElement('table');
    table.className = 'min-w-full bg-white rounded-lg overflow-hidden';
    
    // Create table header
    const thead = document.createElement('thead');
    thead.className = 'bg-gray-100';
    thead.innerHTML = `
        <tr>
            <th class="py-2 px-4 text-left">Course Code</th>
            <th class="py-2 px-4 text-left">Course Title</th>
            <th class="py-2 px-4 text-left">Year</th>
            <th class="py-2 px-4 text-left">Action</th>
        </tr>
    `;
    table.appendChild(thead);

    // Create table body
    const tbody = document.createElement('tbody');
    questions.forEach((q, index) => {
        const row = document.createElement('tr');
        row.className = index % 2 === 0 ? 'bg-gray-50' : 'bg-white';
        row.innerHTML = `
            <td class="py-2 px-4">${q.courseCode}</td>
            <td class="py-2 px-4">${q.courseTitle}</td>
            <td class="py-2 px-4">${q.year}</td>
            <td class="py-2 px-4">
                <button onclick="downloadFile('${q.file}')" 
                    class="ghana-green text-white px-3 py-1 rounded hover:bg-opacity-90 transition">
                    <i class="fas fa-download mr-1"></i> Download
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
    table.appendChild(tbody);
    container.appendChild(table);
}

function downloadFile(filename) {
    // In a real app, this would trigger a download from the server
    alert(`Downloading ${filename} (simulated in demo)`);
    // window.location.href = `/past-questions/${filename}`;
}