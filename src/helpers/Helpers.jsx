// /**
// * @description : Converts english numbers to persian
// *
// * @author Ali Aryani
// *
// * @param enString (String) : An string containing english numbers
// *
// * @return string containing persian numbers
// */
// export function convertEnDigits(enString = '') {
//   var newValue = '';

//   if (typeof enString !== 'string') {
//     enString = enString.toString();
//   }

//   for (var i = 0; i < enString.length; i++) {
//     var ch = enString.charCodeAt(i);
//     if (ch >= 48 && ch <= 57) {
//       // european digit range
//       var newChar = ch + 1584;
//       var char = String.fromCharCode(newChar);
//       char = char === '٥' ? '۵' : char;
//       newValue = newValue + char;
//     } else {
//       newValue = newValue + String.fromCharCode(ch);
//     }
//   }
//   return newValue;
// }

// /**
// * @description : Converts persian numbers to english
// *
// * @author Ali Aryani
// *
// * @param faString (String) : An string containing persian numbers
// *
// * @return string containing english numbers
// */
// export function convertFaDigits(faString) {
//   return faString
//     .replace(/[٠١٢٣٤٥۵٦٧٨٩]/g, function(d) {
//       return d.charCodeAt(0) - 1632;
//     })
//     .replace(/[۰۱۲۳۴٥۵۶۷۸۹]/g, function(d) {
//       return d.charCodeAt(0) - 1776;
//     });
// }

/**
* @description :  Checks an email address against some regex to ensure its a valid one

* @author Ali Aryani
*
* @param email (string) : An email address to check it
*
* @return true if its valid || false if its not valid
*/
export function validateEmail(email) {
  var regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email);
}

/**
 * @description : Gets numeric string and checks whether all characters are number or not
 *
 * @author ali aryani
 *
 * @param digits(string)
 *
 * @return true if all character of digits are number
 */

export function isNumber(digits) {
  var engDigit = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
  var faDigit = ["۱", "۲", "۳", "۴", "۵", "٥", "۶", "۷", "۸", "۹", "۰"];
  for (var i = 0; i < digits.length; i++) {
    if (
      engDigit.indexOf(digits[i]) === -1 &&
      faDigit.indexOf(digits[i]) === -1
    ) {
      return false;
    }
  }
  return true;
}

/**
 * @description : Checks string that only contains alphabet both english or persian
 *
 * @author Ali Aryani
 *
 * @param _text(string)
 *
 * @return  true if _text only contain alphabet
 */

export function isAlphabet(_text) {
  var text = _text.toLowerCase();
  var isValid = false;
  var i = undefined;

  var validFaCharacters = [
    "ض",
    "ص",
    "ث",
    "ق",
    "ف",
    "غ",
    "ع",
    "ه",
    "خ",
    "ح",
    "ج",
    "چ",
    "ش",
    "س",
    "ی",
    "ب",
    "ل",
    "ا",
    "آ",
    "ت",
    "ن",
    "م",
    "ک",
    "گ",
    "ظ",
    "ط",
    "ز",
    "ر",
    "ذ",
    "د",
    "پ",
    "ژ",
    "و",
    "ء",
    "ئ",
    " "
  ];

  var validEngCharacters = [
    "q",
    "w",
    "e",
    "r",
    "t",
    "y",
    "u",
    "i",
    "o",
    "p",
    "a",
    "s",
    "d",
    "f",
    "m",
    "n",
    "b",
    "v",
    "c",
    "x",
    "z",
    "l",
    "k",
    "j",
    "h",
    "g",
    " "
  ];

  for (i = 0; i < text.length; i++) {
    if (
      validFaCharacters.indexOf(text[i]) === -1 &&
      validEngCharacters.indexOf(text[i]) === -1
    ) {
      return isValid;
    }
  }

  for (i = 0; i < text.length; i++) {
    if (validFaCharacters.indexOf(text[i]) === -1) {
      isValid = false;
      break;
    } else {
      isValid = true;
    }
  }

  if (isValid) {
    return isValid;
  }

  for (i = 0; i < text.length; i++) {
    if (validEngCharacters.indexOf(text[i]) === -1) {
      isValid = false;
      break;
    } else {
      isValid = true;
    }
  }

  return isValid;
}

/**
 * @description : validate mobile, this function doesnt check empty string
 *
 * @author Ali Aryani
 *
 * @param phoneNumber(string)
 *
 * @return true if phoneNumber is correct
 */
const PHONENUMBER_LENGTH = 11;
export function validateMobile(phoneNumber) {
  if (phoneNumber.charAt(0) !== "0" && phoneNumber.charAt(1) !== "9") {
    if (phoneNumber.charAt(0) !== "۰" && phoneNumber.charAt(1) !== "۹") {
      return false;
    }
  }

  if (phoneNumber.length !== PHONENUMBER_LENGTH) {
    return false;
  }

  if (!isNumber(phoneNumber)) {
    return false;
  }

  return true;
}

/**
 * @description : validate mobile, this function doesnt check empty string
 *
 * @author ALI aryani
 *
 * @param meliCode(string)
 *
 * @return true if phoneNumber is correct
 */
export function checkCodeMeli(code) {
  var L = code.length;

  if (L < 8 || parseInt(code, 10) === 0) return false;
  code = ("0000" + code).substr(L + 4 - 10);
  if (parseInt(code.substr(3, 6), 10) === 0) return false;
  var c = parseInt(code.substr(9, 1), 10);
  var s = 0;
  for (var i = 0; i < 9; i++) s += parseInt(code.substr(i, 1), 10) * (10 - i);
  s = s % 11;
  return (s < 2 && c === s) || (s >= 2 && c === 11 - s);
  // return true;
}

/**
 * @description : Creates a clone of given object and returns it
 * NOTE: if a key's value is a fucntion, this method wont be good
 * and will remove those keys. For this kind of object maybe cloneDeep function
 * of lodash would be much better
 *
 * @author Ali Aryani
 *
 * @param obj (object) : An object to be cloned
 *
 * @return cloned object
 */
export function cloneObject(obj) {
  if (null == obj || "object" !== typeof obj) return obj;
  return JSON.parse(JSON.stringify(obj));
}

/**
 * @description : to short FileName for show on webpage
 *
 * @author Ali Aryani
 *
 * @param string(string)
 *
 * @return string contain short file name
 */

export function createShortFileName(string) {
  if (!string) {
    return string;
  }
  var fileName = "";
  if (string.length > 24) {
    var extend = string.split(".").pop();
    for (var i = 0; i < 10; i++) {
      fileName += string[i];
    }
    if (extend.length <= 5) {
      fileName =
        fileName +
        "..." +
        string[string.length - extend.length - 1 - 6] +
        string[string.length - extend.length - 1 - 5] +
        string[string.length - extend.length - 1 - 4] +
        string[string.length - extend.length - 1 - 3] +
        string[string.length - extend.length - 1 - 2] +
        string[string.length - extend.length - 1 - 1] +
        "." +
        extend;
    } else {
      fileName =
        fileName +
        "..." +
        string[string.length - 6] +
        string[string.length - 5] +
        string[string.length - 4] +
        string[string.length - 3] +
        string[string.length - 2] +
        string[string.length - 1];
    }
  } else {
    fileName = string;
  }

  return fileName;
}

/**
* @description : compare two object for equivalent
*
* @author Ali Aryani
*
* @param firstObj(object)
*
* @param secondObj(object)

* @return if two object are equal return true otherwise false
*/
export function compareObject(firstObj, secondObj) {
  if (typeof firstObj !== "object" || typeof secondObj !== "object") {
    return false;
  } else {
    if (Object.keys(firstObj).length !== Object.keys(secondObj).length) {
      return false;
    } else {
      var different = false;

      for (var i = 0; i < Object.keys(firstObj).length; i++) {
        if (secondObj[Object.keys(firstObj)[i]] === undefined) {
          different = true;
          break;
        } else if (
          typeof firstObj[Object.keys(firstObj)[i]] === "object" &&
          firstObj[Object.keys(firstObj)[i]] !== null
        ) {
          different = !compareObject(
            firstObj[Object.keys(firstObj)[i]],
            secondObj[Object.keys(firstObj)[i]]
          );
          if (different) {
            break;
          }
        } else if (
          firstObj[Object.keys(firstObj)[i]] !==
          secondObj[Object.keys(firstObj)[i]]
        ) {
          different = true;
          break;
        }
      }

      if (different) {
        return false;
      } else {
        return true;
      }
    }
  }
}

/**
 * @description : Takes a string and turn it to camelcase form.
 * Given string's words must be separated with whitespace.
 *
 * @author Ali Aryani
 *
 * @param str (string) : A string that needs to be camelcase.
 *
 * @return camelized string.
 */
export function camelize(str) {
  if (typeof str !== "string") {
    return str;
  }
  return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match, index) {
    if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
    return index === 0 ? match.toLowerCase() : match.toUpperCase();
  });
}
