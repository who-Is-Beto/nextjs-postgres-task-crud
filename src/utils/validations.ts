const loginValidations: TFieldValidations[] = [
  {
    key: "email",
    validations: {
      validEmail: {
        condition: true,
        message: "invalid field"
      },
      required: {
        condition: true,
        message: "field is required"
      }
    }
  },
  {
    key: "password",
    validations: {
      required: {
        condition: true,
        message: "field is required"
      }
    }
  }
];

export default loginValidations;
