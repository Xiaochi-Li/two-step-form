const FormValidator = require('../app')

describe('test validateReqiredInput()', () => {
  const FormValidatorTest = new FormValidator()
  it('empty input should not be valid', () => {
    const expectResult = {
      isValid: false,
      errorMessage: "this field can't be empty"
    }
    expect(FormValidatorTest.validateReqiredInput('')).toEqual(expectResult)
  })

  it('shoud be valid', () => {
    const expectResult = { isValid: true, errorMessage: undefined }
    expect(FormValidatorTest.validateReqiredInput('ha')).toEqual(expectResult)
  })
})

describe('test validateEmail()', () => {
  const FormValidatorTest = new FormValidator()
  it('empty email should not be valid', () => {
    const expectResult = {
      isValid: false,
      errorMessage: "this field can't be empty"
    }
    expect(FormValidatorTest.validateEmail('')).toEqual(expectResult)
  })

  it('wrong email fomat should not be valid', () => {
    const expectResult = {
      isValid: false,
      errorMessage: 'this email is invalid'
    }
    expect(FormValidatorTest.validateEmail('notAnEmail')).toEqual(expectResult)
  })

  it('right email should be valid', () => {
    const expectResult = { isValid: true, errorMessage: undefined }
    expect(FormValidatorTest.validateEmail('isAnEmail@gmail.com')).toEqual(
      expectResult
    )
  })
})

describe('test validatePhoneNamber()', () => {
  const FormValidatorTest = new FormValidator()
  it('empty phone should be valid', () => {
    const expectResult = { isValid: true, errorMessage: undefined }
    expect(FormValidatorTest.validatePhoneNumber('')).toEqual(expectResult)
  })

  it('should follow XXXX XXX XXX format', () => {
    const expectResult = {
      isValid: false,
      errorMessage: 'this is not a valid austrilian phone number'
    }
    expect(FormValidatorTest.validatePhoneNumber('000 120 321')).toEqual(
      expectResult
    )
  })

  it('should be number only', () => {
    const expectResult = {
      isValid: false,
      errorMessage: 'this is not a valid austrilian phone number'
    }
    expect(FormValidatorTest.validatePhoneNumber('abcd eft oiu')).toEqual(
      expectResult
    )
  })

  it('right number should be valid', () => {
    const expectResult = { isValid: true, errorMessage: undefined }
    expect(FormValidatorTest.validatePhoneNumber('9876 098 664')).toEqual(
      expectResult
    )
  })
})

describe('test validateStreetNumber()', () => {
  const FormValidatorTest = new FormValidator()
  it('street number should not be negitive', () => {
    const expectResult = {
      isValid: false,
      errorMessage: 'this is not a valid street number'
    }
    expect(FormValidatorTest.validateStreetNumber('-8')).toEqual(expectResult)
  })

  it('street number should not be float', () => {
    const expectResult = {
      isValid: false,
      errorMessage: 'this is not a valid street number'
    }
    expect(FormValidatorTest.validateStreetNumber('8.12')).toEqual(expectResult)
  })

  it('street number can start from 0', () => {
    const expectResult = { isValid: true, errorMessage: undefined }
    expect(FormValidatorTest.validateStreetNumber('0')).toEqual(expectResult)
  })

  it('street should be positive int', () => {
    const expectResult = { isValid: true, errorMessage: undefined }
    expect(FormValidatorTest.validateStreetNumber('19')).toEqual(expectResult)
  })
})

describe('test validatePostcode()', () => {
  const FormValidatorTest = new FormValidator()
  it('post code should be 4 digit', () => {
    const expectResult = {
      isValid: false,
      errorMessage: 'this is not a valid postcode, postcode must be 4 digits'
    }
    expect(FormValidatorTest.validatePostcode('77777')).toEqual(expectResult)
  })

  it('post code should in the inclusive range of 0800-7999', () => {
    const expectResult = { isValid: true, errorMessage: undefined }
    expect(FormValidatorTest.validatePostcode('0899')).toEqual(expectResult)
  })

  it('post code should not < 0800', () => {
    const expectResult = {
      isValid: false,
      errorMessage:
        'this is not a valid postcode, postcode must in the range of 0800-7999'
    }
    expect(FormValidatorTest.validatePostcode('0700')).toEqual(expectResult)
  })

  it('post code should not < 8000', () => {
    const expectResult = {
      isValid: false,
      errorMessage:
        'this is not a valid postcode, postcode must in the range of 0800-7999'
    }
    expect(FormValidatorTest.validatePostcode('0700')).toEqual(expectResult)
  })
})
