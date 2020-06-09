class PhoneNumberService {
  getRegExp(): RegExp {
    return /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  }

  appendCountryCode(phoneNumber: string): string {
    return '+358' + phoneNumber;
  }

  removeCountryCode(phoneNumber: string): string {
    if (phoneNumber !== null) {
      return phoneNumber.substr(4);
    } else {
      return '';
    }
  }
}

const phoneNumberService = new PhoneNumberService();
export default phoneNumberService;
