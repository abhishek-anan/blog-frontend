import { defineStore } from "pinia";

export const useCommonStates = defineStore("commonStates", {
  state: () => ({
    navActive: "home",
    popup: false,
    popupType: "",
  }),
  getters: {
  },
  actions: {
    validateFields(form, fields) {
      let isValid = true;
      for (const field in fields) {
        form[field].errMsg = "";
        if (!fields[field].required && !form[field].value) {
          return isValid;
        }
        const validation = fields[field].type;
        if (!form[field].value && validation !== 'otp' && validation !== "boolean") {
          form[field].errMsg = "This field can't be empty";
          isValid = false;
        }

        const email = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;
        if (validation === "email" && !email.test(form[field].value)) {
          form[field].errMsg = "Please enter valid email";
          isValid = false;
        }
        const psw = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
        if (
          form[field].value &&
          validation === "password" &&
          !psw.test(form[field].value)
        ) {
          form[field].errMsg = "Weak Password";
          isValid = false;
        }
        const mobile = /^([6789]{1})([0-9]{1})([0-9]{8})$/;
        if (
          form[field].value &&
          validation === "mobile" &&
          !mobile.test(form[field].value)
        ) {
          form[field].errMsg = "Please enter valid mobile number";
          isValid = false;
        }
        const otp = /^[0-9]{1}$/;
        if (validation === "otp" && !otp.test(form[field].value)
        ) {
          form[field].errMsg = "This field can't be empty";
          isValid = false;
        }
        //boolean
        if (validation === "boolean" && !form[field].value) {
          form[field].errMsg = "Please agree terms & conditions";
          isValid = false;
        }
      }
      return isValid;
    },
    setNavActive(value) {
      this.navActive = value;
    },
    setPopup(data=null) {
      this.popup = !this.popup;
      this.popupType = data;
    },
    formatDate(date) {
      const dayjs = useDayjs();
      if(date) {
        return dayjs(date).format("YYYY MMM, DD");
      }
      return "";
    }
  },
});
