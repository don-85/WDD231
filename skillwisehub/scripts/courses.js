const courseList = document.getElementById('course-list');

async function fetchCourses() {
  try {
    const response = await fetch('data/courses.json');
    if (!response.ok) throw new Error('Failed to load courses');
    const courses = await response.json();

    courseList.innerHTML = courses.map(course => `
      <div class="feature">
        <h2>${course.title}</h2>
        <p><strong>Category:</strong> ${course.category}</p>
        <p><strong>Level:</strong> ${course.level}</p>
        <p><strong>Duration:</strong> ${course.duration}</p>
        <p>${course.description}</p>
      </div>
    `).join('');
  } catch (error) {
    courseList.innerHTML = '<p>Error loading courses. Please try again later.</p>';
    console.error(error);
  }
}

fetchCourses();
