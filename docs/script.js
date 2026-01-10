const getStarted=document.querySelector('.get-started');
const learnMore=document.querySelector(".learn-more");
const currentPath = window.location.pathname;
const navLinks = document.querySelectorAll('.right-container a');

getStarted.addEventListener("click", function() {
    window.location.href = "http://localhost:4000";
  });

learnMore.addEventListener("click", function() {
    window.location.href = "./info.txt";
  });

navLinks.forEach(link => {
  const href = link.getAttribute('href');
  console.log(`Comparing: ${href} with ${currentPath}`);
  if (
    href === currentPath ||
    (currentPath === '/' && href === 'index.html') ||
    (currentPath.endsWith('/index.html') && href === 'index.html')
  ) {
    link.classList.add('active');
    console.log(`Added active to ${href}`);
  }
});