document.addEventListener('DOMContentLoaded', () => {
  const baseUrlInput = document.getElementById('baseUrl');
  const statusDiv = document.getElementById('status');

  // Load saved value
  chrome.storage.sync.get({ baseUrl: 'https://rdm.ayush.gg/app/scraper/movie/' }, (data) => {
    baseUrlInput.value = data.baseUrl;
  });

  document.getElementById('save').addEventListener('click', () => {
    const baseUrl = baseUrlInput.value.trim();
    chrome.storage.sync.set({ baseUrl }, () => {
      statusDiv.textContent = 'Settings saved!';
      setTimeout(() => { statusDiv.textContent = ''; }, 2000);
    });
  });
});
