const markAsNotViewed = () => {
  [...document.getElementsByTagName("input")].
  filter((input) =>
    input.type === "checkbox" &&
    input.value === "viewed" &&
    input.getAttribute('data-ga-click').includes('true')
  ).
  forEach((input) => input.click());
};

const markAsNotViewedAction = () => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    let tab = tabs[0];
    chrome.scripting.executeScript({
      target: {tabId: tab.id},
      function: markAsNotViewed,
    });
  });
};

const bindButtonActions = () => {
  document.getElementById('notViewedBtn').onclick = markAsNotViewedAction;
}

document.addEventListener("DOMContentLoaded", bindButtonActions);
