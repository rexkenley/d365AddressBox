/** @module address */

/**
 * @module address/composeAddress
 * @function
 * @param {string} line1
 * @param {string} line2
 * @param {string} line3
 * @param {string} city
 * @param {string} stateOrProvince
 * @param {string} postalCode
 * @param {string} country
 * @link https://docs.microsoft.com/en-us/powerapps/developer/model-driven-apps/clientapi/reference/composite-attributes
 */
export function composeAddress(
  line1,
  line2,
  line3,
  city,
  stateOrProvince,
  postalCode,
  country
) {
  try {
    const lines = `${line1 || ""} ${line2 || ""} ${line3 || ""}`.trim(),
      address = `${lines} ${city || ""}, ${stateOrProvince ||
        ""} ${postalCode || ""} ${country || ""}`.trim();

    if (address === ",") return "";
    if (address.startsWith(",")) return address.substring(1);
    if (address.endsWith(",")) return address.slice(0, -1);

    return address;
  } catch (ex) {
    console.error(ex);
  }
}
