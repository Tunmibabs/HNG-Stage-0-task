function updateTime() {
  const now = Date.now();
  // Find the element by its data-testid attribute for easy targeting
  const timeElement = document.querySelector('[data-testid="test-user-time"]');
  if (timeElement) {
    timeElement.textContent = now;
  }
}
updateTime();
setInterval(updateTime, 100);
