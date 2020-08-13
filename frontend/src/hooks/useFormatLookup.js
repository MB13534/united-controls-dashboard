import { useMemo } from "react";

/**
 * Custom hook used to format data properly for a
 * Material Table dropdown field aka lookup field
 * @param {array} data
 * @param {string} ndxField name of the table index field
 * @param {string} displayField name of the table display field
 */
const useFormatLookup = (data, ndxField, displayField) => {
  const formattedLookup = useMemo(() => {
    let converted = {};
    if (data.length > 0) {
      data.forEach((d) => {
        converted[d[ndxField]] = d[displayField];
      });
    }
    return converted;
  }, [data, ndxField, displayField]);
  return formattedLookup;
};

export default useFormatLookup;
