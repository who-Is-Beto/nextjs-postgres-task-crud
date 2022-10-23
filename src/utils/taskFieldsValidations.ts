const taskFieldValidations: TFieldValidations[] = [
  {
    key: "title",
    validations: {
      required: {
        condition: true,
        message: "Required field"
      },
      minLength: {
        condition: 3,
        message: "Minimum length is 3 characters"
      },
      maxLength: {
        condition: 30,
        message: "Maximum length is 30 characters"
      }
    }
  },
  {
    key: "description",
    validations: {
      required: {
        condition: true,
        message: "Required field"
      },
      minLength: {
        condition: 3,
        message: "Minimum length is 3 characters"
      },
      maxLength: {
        condition: 600,
        message: "Maximum length is 200 characters"
      }
    }
  }
];

export default taskFieldValidations;
