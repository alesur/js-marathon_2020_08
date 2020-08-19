function formattedPhone(phone) {
  let result = phone.charAt(0);

  for (let i = 1; i < phone.length; i++) {
    if (i === 2) {
      result += " (";
    }
    if (i === 5) {
      result += ") ";
    }
    if (i === 8 || i === 10) {
      result += "-";
    }
    result += phone.charAt(i);
  }
  return result;
}

const phoneNumber = prompt("Enter phone number");

alert(formattedPhone(phoneNumber)); // Formated to +x (xxx) xxx-xx-xx
