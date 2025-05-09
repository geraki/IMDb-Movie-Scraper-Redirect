chrome.runtime.onInstalled.addListener(() => {
  chrome.action.disable();
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

function updateAction(tabId, url) {
  const imdbMatch = url.match(/\/title\/(tt\d{7,})/);
  if (imdbMatch) {
    const identifier = imdbMatch[1];
    chrome.storage.sync.get({ baseUrl: 'https://rdm.ayush.gg/app/scraper/movie/' }, (data) => {
      const scraperUrl = `${data.baseUrl.replace(/\/$/, '')}/${identifier}`;
      chrome.action.enable(tabId);
      chrome.storage.local.set({ scraperUrl });
      chrome.action.setTitle({ tabId, title: `Go to scraper` });
    });
  } else {
    chrome.action.disable(tabId);
    chrome.storage.local.remove('scraperUrl');
    chrome.action.setTitle({ tabId, title: 'No IMDb movie ID detected' });
  }
}

chrome.action.onClicked.addListener((tab) => {
  chrome.storage.local.get('scraperUrl', (data) => {
    if (data.scraperUrl) {
      chrome.tabs.create({ url: data.scraperUrl });
    }
  });
});
