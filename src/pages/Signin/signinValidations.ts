const signinValidations: TFieldValidations[] = [
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
      },
      minLength: {
        condition: 5,
        message: "field must be at least 5 characters"
      },
      maxLength: {
        condition: 20,
        message: "field must be at most 20 characters"
      },
      ValidPassWord: {
        condition: true,
        message: "field must contain at least one number, one uppercase and one lowercase letter"
      }
    }
  },
  {
    key: "repeatPassword",
    validations: {
      equalTo: {
        condition: "password",
        message: "field must be equal to password"
      },
      required: {
        condition: true,
        message: "field is required"
      }
    }
  },
  {
    key: "username",
    validations: {
      minLength: {
        condition: 2,
        message: "field must be at least 2 characters"
      },
      maxLength: {
        condition: 20,
        message: "field must be at most 20 characters"
      },
      validName: {
        condition: true,
        message: "field must contain only letters"
      },
      required: {
        condition: true,
        message: "field is required"
      }
    }
  }
];

export default signinValidations;
