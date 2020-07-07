/**
 * utility function used to check
 * if a menu item is active or not
 * @param {*} url
 */
export const checkActive = (history, url) => {
  if (history.location.pathname.includes(url)) {
    return true;
  }
  return false;
};
