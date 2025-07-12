 
<script>
  /* ---------- DATE UTILITIES ---------- */
  document.addEventListener('DOMContentLoaded', () => {
    /* © YEAR */
    document.getElementById('currentYear').textContent = new Date().getFullYear();

    /* LAST-MODIFIED */
    const mod = new Date(document.lastModified);
    document.getElementById('lastModified').textContent = mod.toLocaleString('en-GB', {
      day: '2-digit', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });

    /* FIRST CREDIT TALLY */
    updateCredits();
  });

  /* ---------- COURSE FILTERING + CREDITS ---------- */
  function filterCourses(category) {
    const groups = document.querySelectorAll('.course-group');
    groups.forEach(group =>
      group.classList.toggle('hidden',
        category !== 'all' && !group.classList.contains(category))
    );
    updateCredits();
  }

  function updateCredits() {
    const visibleButtons = document.querySelectorAll('.course-group:not(.hidden) button');
    const total = [...visibleButtons].reduce((sum, btn) =>
      sum + Number(btn.dataset.credits || 0), 0);
    document.getElementById('creditCount').textContent = total;
  }
</script>
