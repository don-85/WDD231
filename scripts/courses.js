const courses = [
  // WDD Courses
  { code: "WDD130", name: "Web Fundamentals", credits: 3, completed: true, category: "WDD" },
  { code: "WDD131", name: "Dynamic Web Fundamentals", credits: 3, completed: true, category: "WDD" },
  { code: "WDD231", name: "Frontend Development I", credits: 3, completed: false, category: "WDD" },
  { code: "WDD232", name: "Frontend Development II", credits: 3, completed: false, category: "WDD" },
  { code: "WDD330", name: "Advanced Web Design", credits: 3, completed: false, category: "WDD" },

  // CSE Courses
  { code: "CSE110", name: "Intro to Programming", credits: 2, completed: true, category: "CSE" },
  { code: "CSE111", name: "Programming with Functions", credits: 2, completed: false, category: "CSE" },
  { code: "CSE210", name: "Programming with Classes", credits: 3, completed: false, category: "CSE" },
  { code: "CSE212", name: "Data Structures", credits: 3, completed: false, category: "CSE" },
  { code: "CSE310", name: "Algorithms and Complexity", credits: 3, completed: false, category: "CSE" }
];

const courseContainer = document.getElementById("courses");
const totalCredits = document.getElementById("total-credits");

function displayCourses(list) {
  courseContainer.innerHTML = "";
  let total = 0;

  list.forEach(course => {
    total += course.credits;
    const div = document.createElement("div");
    div.className = `course-card ${course.completed ? "completed" : ""}`;
    div.innerHTML = `
      <h3>${course.code}</h3>
      <p>${course.name}</p>
      <p><strong>${course.credits} credits</strong></p>
      <p>Status: ${course.completed ? "✅ Completed" : "⏳ In Progress"}</p>
    `;
    courseContainer.appendChild(div);
  });

  totalCredits.textContent = `Total Credits: ${total}`;
}

// Filter Buttons
document.getElementById("all").addEventListener("click", () => displayCourses(courses));
document.getElementById("cse").addEventListener("click", () => displayCourses(courses.filter(c => c.category === "CSE")));
document.getElementById("wdd").addEventListener("click", () => displayCourses(courses.filter(c => c.category === "WDD")));

// Initial Display
displayCourses(courses);
