import copy from "copy-to-clipboard";
import Papa from "papaparse";

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


/**
 * Utility function used to implement
 * copy to clipboard functionality
 * @param {array} data
 * @param {array} columns
 * @param {function} callback
 */
export const copyToClipboard = (data, columns, callback) => {
  const columnOrder = columns.map((d) => d.field);
  copy(
    Papa.unparse(data, {
      delimiter: "\t",
      columns: columnOrder,
    }),
    {
      format: "text/plain",
    }
  );
  callback();
};