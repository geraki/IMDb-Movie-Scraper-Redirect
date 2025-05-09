document.addEventListener('DOMContentLoaded', () => {
  const urlDiv = document.getElementById('url');
  const copyButton = document.getElementById('copyButton');
  const messageDiv = document.getElementById('message');

  chrome.storage.local.get('scraperUrl', (data) => {
    if (data.scraperUrl) {
      urlDiv.textContent = data.scraperUrl;
      copyButton.disabled = false;

      copyButton.addEventListener('click', () => {
        navigator.clipboard.writeText(data.scraperUrl)
          .then(() => {
            messageDiv.textContent = 'Copied to clipboard!';
          })
          .catch((err) => {
            messageDiv.textContent = 'Failed to copy.';
            console.error(err);
          });
      });
    }
  });
});
