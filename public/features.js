const getStarted=document.querySelector('.get-started');

getStarted.addEventListener("click", function() {
    window.location.href = "http://localhost:4000";
  });

const currentPath = window.location.pathname;
const navLinks = document.querySelectorAll('.left-container a');

navLinks.forEach(link => {
  const href = link.getAttribute('href');
  console.log(`Comparing: ${href} with ${currentPath}`);
  if (
    href === currentPath ||
    (currentPath === '/' && href === 'features.html') ||
    (currentPath.endsWith('/features.html') && href === 'features.html')
  ) {
    link.classList.add('active');
    console.log(`Added active to ${href}`);
  }
});