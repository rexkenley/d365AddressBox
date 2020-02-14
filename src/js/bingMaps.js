/** @module bingMaps */

/**
 * @module bing/getAddress
 * @function
 * @param {string} bingMapsUrl
 * @param {string} bingMapsKey
 * @param {int} maxResults
 * @param {string} addressLine
 * @param {string} city
 * @param {string} stateOrProvince
 * @param {string} postalCode
 * @param {string} country
 * @return {[]}
 * @link https://docs.microsoft.com/en-us/bingmaps/rest-services/locations/find-a-location-by-address
 */
export const getAddresses = async (
  bingMapsUrl,
  bingMapsKey,
  maxResults,
  addressLine,
  city,
  stateOrProvince,
  postalCode,
  country
) => {
  try {
    if (!bingMapsUrl.endsWith("/")) bingMapsUrl += "/";
    let url = `${bingMapsUrl}Locations?key=${bingMapsKey}&maxResults=${maxResults}`;

    if (addressLine) url += `&addressLine=${addressLine}`;
    if (city) url += `&locality=${city}`;
    if (stateOrProvince) url += `&adminDistrict=${stateOrProvince}`;
    if (postalCode) url += `&postalCode=${postalCode}`;
    if (country) url += `&countryRegion=${country}`;

    const res = await fetch(url);
    return res.json();
  } catch (ex) {
    console.error(ex);
  }
};

/**
 * @module bing/getSuggestions
 * @function
 * @param {string} bingMapsUrl
 * @param {string} bingMapsKey
 * @param {int} maxResults
 * @param {string} query
 * @param {string} country
 * @param {string} culture
 * @return {[]}
 * @link https://docs.microsoft.com/en-us/bingmaps/rest-services/autosuggest
 */
export const getSuggestions = async (
  bingMapsUrl,
  bingMapsKey,
  maxResults,
  query,
  country = "US",
  culture = "en-US"
) => {
  try {
    if (!bingMapsUrl.endsWith("/")) bingMapsUrl += "/";
    let url = `${bingMapsUrl}Autosuggest?key=${bingMapsKey}&maxResults=${maxResults}`;

    if (query) url += `&query=${query}`;
    if (culture) url += `&culture=${culture}`;
    if (country) url += `&userRegion=${country}&countryFilter=${country}`;

    const res = await fetch(url);
    return res.json();
  } catch (ex) {
    console.error(ex);
  }
};
