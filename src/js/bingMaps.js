import greenlet from "greenlet";

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
  postalCode,
  country
) => {
  let url = `${bingMapsUrl}Locations?key=${bingMapsKey}&maxResults=${maxResults}`;

  if (addressLine) url += `&addressLine=${addressLine}`;
  if (city) url += `&locality=${city}`;
  if (stateOrProvince) url += `&adminDistrict=${stateOrProvince}`;
  if (postalCode) url += `&postalCode=${postalCode}`;
  if (country) url += `&countryRegion=${country}`;

  const res = await fetch(url);
  return res.json();
};

/**
 * @module bing/getSuggestions
 * @function
 * @param {string} bingMapsUrl
 * @param {string} bingMapsKey
 * @param {int} maxResults
 * @param {number} latitude
 * @param {number} longtitude
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
  latitude,
  longtitude,
  query,
  country = "US",
  culture = "en-US"
) => {
  let url = `${bingMapsUrl}Autosuggest?key=${bingMapsKey}&maxResults=${maxResults}&userLocation=${latitude},${longtitude},5000}`;

  if (query) url += `&query=${query}`;
  if (culture) url += `&culture=${culture}`;
  if (country) url += `&userRegion=${country}&countryFilter=${country}`;

  const res = await fetch(url);
  return res.json();
};
