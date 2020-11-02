import {
  IsInt,
  IsNotEmpty,
  IsString,
  ValidationOptions,
  IsPositive,
  IsBoolean,
  IsIn,
} from 'class-validator';

export type CValidateOption = {
  propertyName: string;
  errorMessage?: string;
  validationOptions?: ValidationOptions;
};

const buildValidationOptions = (
  option: CValidateOption,
  defaultMessage: string,
): ValidationOptions => {
  let validationOptions: ValidationOptions = {};
  let prefixMessage = '';

  if (option.validationOptions) validationOptions = option.validationOptions;
  if (validationOptions.each) prefixMessage = 'それぞれの';

  validationOptions.message = option.errorMessage
    ? option.errorMessage
    : `${prefixMessage}${defaultMessage}`;
  return validationOptions;
};

export const CIsInt = (option: CValidateOption): PropertyDecorator => {
  return IsInt(
    buildValidationOptions(
      option,
      `${option.propertyName}は数値を指定してください`,
    ),
  );
};

export const CIsNotEmpty = (option: CValidateOption): PropertyDecorator => {
  return IsNotEmpty(
    buildValidationOptions(
      option,
      `${option.propertyName}は必ず指定してください`,
    ),
  );
};

export const CIsString = (option: CValidateOption): PropertyDecorator => {
  return IsString(
    buildValidationOptions(
      option,
      `${option.propertyName}は文字列を指定してください`,
    ),
  );
};

export const CIsPositive = (option: CValidateOption): PropertyDecorator => {
  return IsPositive(
    buildValidationOptions(
      option,
      `${option.propertyName}は0以上の数字を指定してください`,
    ),
  );
};

export const CIsIn = (
  values: unknown[],
  option: CValidateOption,
): PropertyDecorator => {
  return IsIn(
    values,
    buildValidationOptions(
      option,
      `${option.propertyName}は${values.join(
        ',',
      )}のいずれかの値を指定してください`,
    ),
  );
};

export const CIsBoolean = (option: CValidateOption): PropertyDecorator => {
  return IsBoolean(
    buildValidationOptions(
      option,
      `${option.propertyName}はtrue,もしくはfalseを指定してください`,
    ),
  );
};
