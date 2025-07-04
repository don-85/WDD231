 document.addEventListener('DOMContentLoaded', function() {
    // Course data array (modified with your completed courses)
    const courses = [
        { code: "CSE121B", name: "JavaScript Language", credits: 3, completed: false },
        { code: "CIT260", name: "Object Oriented Programming", credits: 3, completed: false },
        { code: "CSE210", name: "Programming with Classes", credits: 2, completed: false },
        { code: "WDD130", name: "Web Fundamentals", credits: 3, completed: false },
        { code: "WDD230", name: "Web Frontend Development I", credits: 3, completed: false },
        { code: "WDD231", name: "Web Frontend Development II", credits: 3, completed: false },
        { code: "WDD330", name: "Web Frontend Development III", credits: 3, completed: false },
        { code: "WDD430", name: "Web Fullstack Development", credits: 3, completed: false }
    ];
    
    const coursesContainer = document.getElementById('courses-container');
    const allButton = document.getElementById('all');
    const wddButton = document.getElementById('wdd');
    const cseButton = document.getElementById('cse');
    const creditsDisplay = document.getElementById('total-credits');
    
    // Display all courses by default
    displayCourses(courses);
    updateCredits(courses);
    
    // Event listeners for filter buttons
    allButton.addEventListener('click', () => {
        displayCourses(courses);
        updateCredits(courses);
    });
    
    wddButton.addEventListener('click', () => {
        const wddCourses = courses.filter(course => course.code.startsWith('WDD'));
        displayCourses(wddCourses);
        updateCredits(wddCourses);
    });
    
    cseButton.addEventListener('click', () => {
        const cseCourses = courses.filter(course => course.code.startsWith('CSE') || course.code.startsWith('CIT'));
        displayCourses(cseCourses);
        updateCredits(cseCourses);
    });
    
    // Function to display courses
    function displayCourses(coursesToDisplay) {
        coursesContainer.innerHTML = '';
        
        coursesToDisplay.forEach(course => {
            const card = document.createElement('div');
            card.className = `course-card ${course.completed ? 'completed' : ''}`;
            
            card.innerHTML = `
                <h3>${course.code}</h3>
                <p>${course.name}</p>
                <p>Credits: ${course.credits}</p>
                <p>Status: ${course.completed ? 'Completed' : 'Not Completed'}</p>
            `;
            
            coursesContainer.appendChild(card);
        });
    }
    
    // Function to update total credits
    function updateCredits(coursesToCalculate) {
        const totalCredits = coursesToCalculate.reduce((sum, course) => sum + course.credits, 0);
        creditsDisplay.textContent = totalCredits;
    }
});
