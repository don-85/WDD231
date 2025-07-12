const membersContainer = document.getElementById('members');
const gridBtn = document.getElementById('grid-view');
const listBtn = document.getElementById('list-view');

async function fetchMembers() {
  const response = await fetch('data/members.json');
  const data = await response.json();
  displayMembers(data);
}

function displayMembers(members) {
  membersContainer.innerHTML = '';
  members.forEach(member => {
    const card = document.createElement('section');
    card.classList.add('member-card');
    card.innerHTML = `
      <img src="images/${member.image}" alt="${member.name}">
      <h3>${member.name}</h3>
      <p>${member.address}</p>
      <p>${member.phone}</p>
      <a href="${member.website}" target="_blank">Visit Website</a>
    `;
    membersContainer.appendChild(card);
  });
}

gridBtn.addEventListener('click', () => {
  membersContainer.classList.add('grid');
  membersContainer.classList.remove('list');
});
listBtn.addEventListener('click', () => {
  membersContainer.classList.add('list');
  membersContainer.classList.remove('grid');
});

document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("last-modified").textContent = document.lastModified;

fetchMembers();
