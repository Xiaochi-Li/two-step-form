class FormValidator {
  constructor () {
    this.stepOneValidationResults = {
      firstName: { isValid: true, errorMessage: undefined },
      lastName: { isValid: true, errorMessage: undefined },
      email: { isValid: true, errorMessage: undefined },
      phone: { isValid: true, errorMessage: undefined }
    }
    this.formStepTwoValidationResults = {}
    this.formValues = {}
    this.isFormValid = true
  }

  validateReqiredInput = inputValue => {
    if (inputValue === '') {
      return { isValid: false, errorMessage: "this field can't be empty" }
    } else {
      return { isValid: true, errorMessage: undefined }
    }
  }

  validateEmail = email => {
    const isEmailInputEmpty = this.validateReqiredInput(email)
    if (!isEmailInputEmpty.isValid) {
      return isEmailInputEmpty
    }

    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return { isValid: true, errorMessage: undefined }
    }

    return { isValid: false, errorMessage: 'this email is invalid' }
  }

  validatePhoneNumber = phone => {
    if (
      !phone == '' &&
      !/^\+?([0-9]{4})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{3})$/.test(phone)
    ) {
      return {
        isValid: false,
        errorMessage: 'this is not a valid austrilian phone number'
      }
    }
    return { isValid: true, errorMessage: undefined }
  }

  validateFormOne = (firstName, lastName, email, phone) => {
    let isFormOneValid = true
    this.stepOneValidationResults = {
      ...this.stepOneValidationResults,
      firstName: this.validateReqiredInput(firstName),
      lastName: this.validateReqiredInput(lastName),
      email: this.validateEmail(email),
      phone: this.validatePhoneNumber(phone)
    }

    isFormOneValid = this.isAllFieldValid()
    this.formValues = { firstName, lastName, email, phone }
    this.isFormValid = isFormOneValid
  }

  isAllFieldValid = () => {
    for (var key in this.stepOneValidationResults) {
      if (!this.stepOneValidationResults[key].isValid) {
        return false
      }
    }
    return true
  }
}

const FormValidate = new FormValidator()

const validateStepOne = () => {
  const firstName = document.getElementById('firstName').value
  const lastName = document.getElementById('lastName').value
  const email = document.getElementById('email').value
  const phone = document.getElementById('phone').value
  FormValidate.validateFormOne(firstName, lastName, email, phone)
}

const handleClickOnNext = () => {
  validateStepOne()
  if (FormValidate.isFormValid) {
    displayFormStepTwo()
  } else {
    displayErrorMessages()
  }
}

const displayErrorMessages = () => {
  for (var key in FormValidate.stepOneValidationResults) {
    const validationResult = FormValidate.stepOneValidationResults[key]
    if (!validationResult.isValid) {
      document.getElementById(key).nextElementSibling.textContent =
        validationResult.errorMessage
    } else {
      document.getElementById(key).nextElementSibling.textContent = ''
    }
  }
}

const displayFormStepTwo = () => {
  document.getElementById('form-step-one').style.display = 'none'
  document.getElementById('form-step-two').style.display = 'block'
  document.getElementById('progress-bar-step').style.width = '100%'
}
