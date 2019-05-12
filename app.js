class FormValidator {
  constructor () {
    this.formValidationResults = {
      firstName: { isValid: true, errorMessage: undefined },
      lastName: { isValid: true, errorMessage: undefined },
      email: { isValid: true, errorMessage: undefined },
      phone: { isValid: true, errorMessage: undefined },
      streetNumber: { isValid: true, errorMessage: undefined },
      streetName: { isValid: true, errorMessage: undefined },
      streetType: { isValid: true, errorMessage: undefined },
      suburb: { isValid: true, errorMessage: undefined },
      postcode: { isValid: true, errorMessage: undefined }
    }
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

  validateStreetNumber = streetNumber => {
    const isStreetNumberEmpty = this.validateReqiredInput(streetNumber)
    if (!isStreetNumberEmpty.isValid) {
      return isStreetNumberEmpty
    }

    // assume in some country, street number do start from 0
    if (/^([0-9]\d*)$/.test(streetNumber)) {
      return { isValid: true, errorMessage: undefined }
    }
    return {
      isValid: false,
      errorMessage: 'this is not a valid street number'
    }
  }

  validatepostcode = postcode => {
    const ispostcodeEmpty = this.validateReqiredInput(postcode)
    if (!ispostcodeEmpty.isValid) {
      return ispostcodeEmpty
    }

    if (/^[0-7][8-9][0-9][0-9]/.test(postcode)) {
      return { isValid: true, errorMessage: undefined }
    }
    return {
      isValid: false,
      errorMessage:
        'this is not a valid postcode, postcode must in the range of 0800-7999'
    }
  }

  validateFormOne = (firstName, lastName, email, phone) => {
    let isFormOneValid = true
    this.formValidationResults = {
      ...this.formValidationResults,
      firstName: this.validateReqiredInput(firstName),
      lastName: this.validateReqiredInput(lastName),
      email: this.validateEmail(email),
      phone: this.validatePhoneNumber(phone)
    }

    isFormOneValid = this.isAllFieldValid(this.formValidationResults)
    this.formValues = { ...this.formValues, firstName, lastName, email, phone }
    this.isFormValid = isFormOneValid
  }

  validateFormTwo = (
    streetNumber,
    streetName,
    streetType,
    suburb,
    postcode
  ) => {
    let isFormTwoValid = true
    this.formValidationResults = {
      ...this.formValidationResults,
      streetNumber: this.validateStreetNumber(streetNumber),
      streetName: this.validateReqiredInput(streetName),
      streetType: this.validateReqiredInput(streetType),
      suburb: this.validateReqiredInput(suburb),
      postcode: this.validatepostcode(postcode)
    }

    isFormTwoValid = this.isAllFieldValid(this.formValidationResults)
    this.formValues = {
      ...this.formValues,
      streetNumber,
      streetName,
      streetType,
      suburb,
      postcode
    }
    this.isFormValid = isFormTwoValid
  }

  isAllFieldValid = formResults => {
    for (var key in formResults) {
      if (!formResults[key].isValid) {
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

const validateStepTwo = () => {
  const streetNumber = document.getElementById('streetNumber').value
  const streetName = document.getElementById('streetName').value
  const streetType = document.getElementById('streetType').value
  const suburb = document.getElementById('suburb').value
  const postcode = document.getElementById('postcode').value

  FormValidate.validateFormTwo(
    streetNumber,
    streetName,
    streetType,
    suburb,
    postcode
  )
}

const handleClickOnNext = () => {
  validateStepOne()
  if (FormValidate.isFormValid) {
    displayFormStepTwo()
  } else {
    displayErrorMessages()
  }
}

const handleSubmit = () => {
  event.preventDefault()
  validateStepTwo()
  if (FormValidate.isFormValid) {
    alert(FormValidate.formValues)
  } else {
    displayErrorMessages()
  }
}

const displayErrorMessages = () => {
  for (var key in FormValidate.formValidationResults) {
    const validationResult = FormValidate.formValidationResults[key]
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
