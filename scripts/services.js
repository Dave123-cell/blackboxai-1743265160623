document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('services-container');
    
    // Initialize services form
    container.innerHTML = `
        <form id="service-request-form" class="space-y-4">
            <div>
                <label for="service-type" class="block text-sm font-medium text-gray-700 mb-1">Service Type</label>
                <select id="service-type" required
                    class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-ghana-green">
                    <option value="">Select a service</option>
                    <option value="transcript">Transcript Request</option>
                    <option value="advising">Academic Advising</option>
                    <option value="registration">Course Registration Help</option>
                    <option value="other">Other Request</option>
                </select>
            </div>
            
            <div>
                <label for="student-id" class="block text-sm font-medium text-gray-700 mb-1">Student ID</label>
                <input type="text" id="student-id" required
                    class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-ghana-green"
                    pattern="[A-Za-z0-9]{8}" title="8-character alphanumeric ID">
            </div>
            
            <div>
                <label for="student-name" class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input type="text" id="student-name" required
                    class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-ghana-green">
            </div>
            
            <div>
                <label for="student-email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" id="student-email" required
                    class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-ghana-green">
            </div>
            
            <div id="details-container" class="hidden">
                <label for="request-details" class="block text-sm font-medium text-gray-700 mb-1">Additional Details</label>
                <textarea id="request-details" rows="3"
                    class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-ghana-green"></textarea>
            </div>
            
            <button type="submit" 
                class="ghana-green text-white px-6 py-2 rounded hover:bg-opacity-90 transition w-full">
                Submit Request
            </button>
        </form>
        
        <div id="confirmation-message" class="hidden mt-6 p-4 bg-green-50 text-green-800 rounded">
            <i class="fas fa-check-circle mr-2"></i>
            <span id="confirmation-text"></span>
        </div>
    `;

    // Form elements
    const form = document.getElementById('service-request-form');
    const serviceType = document.getElementById('service-type');
    const detailsContainer = document.getElementById('details-container');
    const confirmationMessage = document.getElementById('confirmation-message');

    // Show/hide details field based on service type
    serviceType.addEventListener('change', function() {
        detailsContainer.classList.toggle('hidden', this.value !== 'other');
    });

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            submitRequest();
        }
    });

    function validateForm() {
        // Simple validation - in a real app would be more comprehensive
        if (!serviceType.value) {
            alert('Please select a service type');
            return false;
        }
        
        const studentId = document.getElementById('student-id').value;
        if (!studentId || !/^[A-Za-z0-9]{8}$/.test(studentId)) {
            alert('Please enter a valid 8-character student ID');
            return false;
        }
        
        const email = document.getElementById('student-email').value;
        if (!email || !email.includes('@')) {
            alert('Please enter a valid email address');
            return false;
        }
        
        return true;
    }

    function submitRequest() {
        // In a real app, this would send to a server
        const formData = {
            serviceType: serviceType.options[serviceType.selectedIndex].text,
            studentId: document.getElementById('student-id').value,
            studentName: document.getElementById('student-name').value,
            studentEmail: document.getElementById('student-email').value,
            details: document.getElementById('request-details').value || 'N/A'
        };
        
        // Store in localStorage for demo purposes
        const requests = JSON.parse(localStorage.getItem('serviceRequests') || '[]');
        requests.push(formData);
        localStorage.setItem('serviceRequests', JSON.stringify(requests));
        
        // Show confirmation
        document.getElementById('confirmation-text').textContent = 
            `Your ${formData.serviceType} request has been submitted. We'll contact you at ${formData.studentEmail}.`;
        
        confirmationMessage.classList.remove('hidden');
        form.reset();
        detailsContainer.classList.add('hidden');
        
        // Hide confirmation after 5 seconds
        setTimeout(() => {
            confirmationMessage.classList.add('hidden');
        }, 5000);
    }
});