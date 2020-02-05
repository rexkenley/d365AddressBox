/** @module address */

/**
 * @module address/composeAddress
 * @function
 * @param {string} line1
 * @param {string} line2
 * @param {string} line3
 * @param {string} postOfficeBox
 * @param {string} city
 * @param {string} stateOrProvince
 * @param {string} postalCode
 * @param {string} county
 * @param {string} country
 */
export function composeAddress(
  line1,
  line2,
  line3,
  postOfficeBox,
  city,
  stateOrProvince,
  postalCode,
  county,
  country
) {
  const lines = `${line1 || ""} ${line2 || ""} ${line3 || ""}`.trim(),
    address = `${lines} ${city || ""}, ${stateOrProvince || ""} ${postalCode ||
      ""}`.trim();

  if (address === ",") return "";

  return address;
}

/**
 * @module address/getAddresses
 * @param {string} address
 * @return {[]} results
 */
export function getAddresses(address) {}
