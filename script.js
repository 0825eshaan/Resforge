document.getElementById('resumeForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  // Get form data
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const location = document.getElementById('location').value.trim();
  const summary = document.getElementById('summary').value.trim();
  const skills = document.getElementById('skills').value.split(',').map(s => s.trim()).filter(s => s);
  const education = document.getElementById('education').value.trim();
  const experience = document.getElementById('experience').value.trim();
  const awards = document.getElementById('awards').value.trim();
  
  const output = document.getElementById('resumeOutput');
  const resumeContent = document.getElementById('resumeContent');
  
  // Show the resume section
  output.classList.remove('hidden');
  
  // Build the resume HTML with proper CSS classes
  let resumeHTML = `
    <div class="resume-header">
      <h2>${name}</h2>
      <div class="contact-info">
        <span>📧 ${email}</span>
        <span>📱 ${phone}</span>
        ${location ? `<span>📍 ${location}</span>` : ''}
      </div>
    </div>
  `;
  
  // Professional Summary
  if (summary) {
    resumeHTML += `
      <div class="resume-section">
        <h3>Professional Summary</h3>
        <p>${summary}</p>
      </div>
    `;
  }
  
  // Skills
  if (skills.length > 0) {
    resumeHTML += `
      <div class="resume-section">
        <h3>Skills</h3>
        <div class="skill-tags">
          ${skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
        </div>
      </div>
    `;
  }
  
  // Education
  if (education) {
    const educationItems = education.split('\n').filter(item => item.trim());
    resumeHTML += `
      <div class="resume-section">
        <h3>Education</h3>
        <ul>
          ${educationItems.map(item => `<li>${item}</li>`).join('')}
        </ul>
      </div>
    `;
  }
  
  // Work Experience
  if (experience) {
    const experienceItems = experience.split('\n').filter(item => item.trim());
    resumeHTML += `
      <div class="resume-section">
        <h3>Work Experience</h3>
        <ul>
          ${experienceItems.map(item => `<li>${item}</li>`).join('')}
        </ul>
      </div>
    `;
  }
  
  // Awards & Achievements
  if (awards) {
    const awardItems = awards.split('\n').filter(item => item.trim());
    resumeHTML += `
      <div class="resume-section">
        <h3>Awards & Achievements</h3>
        <ul>
          ${awardItems.map(item => `<li>${item}</li>`).join('')}
        </ul>
      </div>
    `;
  }
  
  // Generate suggestions
  const suggestions = [];
  if (skills.length < 4) {
    suggestions.push("Add more skills to better showcase your abilities.");
  }
  if (!education.includes('\n') && !education.includes(',')) {
    suggestions.push("Consider adding more educational details like graduation year, GPA, or relevant coursework.");
  }
  if (!experience.includes('\n') && !experience.includes(',')) {
    suggestions.push("Consider adding internships, part-time jobs, or volunteer work for more experience.");
  }
  if (!awards || (!awards.includes('\n') && !awards.includes(','))) {
    suggestions.push("Consider participating in competitions, obtaining certifications, or highlighting academic achievements.");
  }
  if (summary.length < 50) {
    suggestions.push("Expand your professional summary to better highlight your career goals and key strengths.");
  }
  
  // Add suggestions if any
  if (suggestions.length > 0) {
    resumeHTML += `
      <div class="resume-section" style="border-left: 4px solid var(--accent); background: var(--accent-light);">
        <h3 style="color: var(--accent);">💡 Suggestions for Improvement</h3>
        <ul style="color: var(--gray-600);">
          ${suggestions.map(suggestion => `<li>${suggestion}</li>`).join('')}
        </ul>
      </div>
    `;
  }
  
  // Insert the HTML
  resumeContent.innerHTML = resumeHTML;
  
  // Scroll to the resume
  output.scrollIntoView({ behavior: 'smooth' });
});

// PDF Download function
function downloadPDF() {
  const resumeContent = document.getElementById('resumeContent');
  const name = document.getElementById('name').value.trim() || 'Resume';
  
  const opt = {
    margin: 0.5,
    filename: `${name.replace(/\s+/g, '_')}_Resume.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
  };
  
  // Temporarily hide suggestions for PDF
  const suggestions = resumeContent.querySelector('[style*="border-left: 4px solid var(--accent)"]');
  if (suggestions) {
    suggestions.style.display = 'none';
  }
  
  html2pdf().set(opt).from(resumeContent).save().then(() => {
    // Show suggestions again
    if (suggestions) {
      suggestions.style.display = 'block';
    }
  });
}
