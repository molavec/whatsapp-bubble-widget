/*jslint browser: true, esversion: 6 */

/**
* Cookie Manager Functions
*/
export default {
  /**
   * @param {String} name
   * @param {String} value
   * @param {int} days
   * @param {String} sessionOnly
   */
  create: function(name, value, days, sessionOnly) {
    let expires = "";

    if(sessionOnly)
      expires = "; expires=0";
    else if(days) {
      let date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      //date.setTime(date.getTime() + (days * 100));
      expires = "; expires=" + date.toGMTString();
    }

    document.cookie = name + "=" + value + expires + "; path=/";
  },
  
  /**
   * @param {String} name
   */
  get: function(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(";");

    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }

    return null;
  },

  /**
   * Delete a cookie
   *
   * @param {String} name
   */
  erase: function(name) {
    this.create(name, "", -1);
  },

  /**
   * Handle the cookie name
   * If present and true, return true
   * If not present or false, create and return false
   *
   * @param {String} name
   * @return {bool}
   */
  check: function(name) {
    // If cookie is set to true
    return (this.get(name) == "true");
  },
};
