document.getElementById('setVolumeBtn').addEventListener('click', async () => {
    const volumeValue = parseInt(document.getElementById('volumeInput').value);
    if (isNaN(volumeValue) || volumeValue < 0 || volumeValue > 100) {
      alert("Please enter a number between 0 and 100.");
      return;
    }
  
    const volume = volumeValue / 100;
  
    // Inject a script to set volume on the current YouTube tab
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: (vol) => {
        const video = document.querySelector('video');
        if (video) {
          video.volume = vol;
        } else {
          alert("No video element found on this page.");
        }
      },
      args: [volume],
    });
  });
  