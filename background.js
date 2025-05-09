chrome.runtime.onInstalled.addListener(() => {
    chrome.action.disable();
    chrome.action.setTitle({ title: 'No IMDb movie ID detected' });
  });
  
  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url) {
      updateAction(tabId, tab.url);
    }
  });
  
  chrome.tabs.onActivated.addListener(activeInfo => {
    chrome.tabs.get(activeInfo.tabId, (tab) => {
      if (tab.url) {
        updateAction(activeInfo.tabId, tab.url);
      }
    });
  });
  
  chrome.action.onClicked.addListener((tab) => {
    const imdbMatch = tab.url.match(/\/title\/(tt\d{7,})/);
    if (imdbMatch) {
      const identifier = imdbMatch[1];
      const scraperUrl = `https://rdm.ayush.gg/app/scraper/movie/${identifier}`;
  
      // Copy to clipboard using the `tabs.executeScript` API
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: copyTextToClipboard,
        args: [scraperUrl]
      });
  
      // Optional: Show a short tooltip message
      chrome.action.setTitle({ tabId: tab.id, title: `Copied to clipboard: ${scraperUrl}` });
  
      // Optional: Reset tooltip after 2 seconds
      setTimeout(() => {
        chrome.action.setTitle({ tabId: tab.id, title: scraperUrl });
      }, 2000);
    }
  });
  
  function updateAction(tabId, url) {
    const imdbMatch = url.match(/\/title\/(tt\d{7,})/);
    if (imdbMatch) {
      const identifier = imdbMatch[1];
      const scraperUrl = `https://rdm.ayush.gg/app/scraper/movie/${identifier}`;
      chrome.action.enable(tabId);
      chrome.action.setTitle({ tabId, title: scraperUrl });
    } else {
      chrome.action.disable(tabId);
      chrome.action.setTitle({ tabId, title: 'No IMDb movie ID detected' });
    }
  }
  
  // This function runs in the tab context to copy text
  function copyTextToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
      console.log('Copied to clipboard:', text);
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  }
  