const currentPath = window.location.pathname;
const navLinks = document.querySelectorAll('.left-container a');

navLinks.forEach(link => {
  const href = link.getAttribute('href');
  console.log(`Comparing: ${href} with ${currentPath}`);
  if (
    href === currentPath ||
    (currentPath === '/' && href === 'contact.html') ||
    (currentPath.endsWith('/contact.html') && href === 'contact.html')
  ) {
    link.classList.add('active');
    console.log(`Added active to ${href}`);
  }
});