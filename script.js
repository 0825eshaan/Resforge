document.getElementById('resumeForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const summary = document.getElementById('summary').value.trim();
  const skills = document.getElementById('skills').value.split(',').map(s => s.trim()).filter(s => s);
  const education = document.getElementById('education').value.trim();
  const experience = document.getElementById('experience').value.trim();
  const awards = document.getElementById('awards').value.trim();

  const output = document.getElementById('resumeOutput');
  output.classList.remove('hidden');
  output.innerHTML = `
    <h2>${name}</h2>
    <p><strong>Email:</strong> ${email} | <strong>Phone:</strong> ${phone}</p>
    <h2>Summary</h2>
    <p>${summary}</p>
    <h2>Skills</h2>
    <ul>${skills.map(skill => `<li>${skill}</li>`).join('')}</ul>
    <h2>Education</h2>
    <p>${education}</p>
    <h2>Experience</h2>
    <p>${experience}</p>
    <h2>Awards</h2>
    <p>${awards}</p>
  `;

  // 🔧 Suggestions logic – now inside the form handler
  const suggestions = [];
  if (skills.length < 4) suggestions.push("Add more skills to better showcase your abilities.");
  if (!education.includes(",")) suggestions.push("Consider adding more educational details.");
  if (!experience.includes(",")) suggestions.push("Consider internships/courses for more experience.");
  if (!awards.includes(",")) suggestions.push("Consider participating in more competitions with dedication towards the top spots.");

  if (suggestions.length > 0) {
    output.innerHTML += `
      <h2>Suggestions for Improvement</h2>
      <ul style="color: #d9534f;">
        ${suggestions.map(s => `<li>${s}</li>`).join('')}
      </ul>
    `;
  }
});
