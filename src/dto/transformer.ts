export const LIST_DELIMITER = ',';

export const toNumberList = (value: string): Array<number> => {
  return value.split(LIST_DELIMITER).map((str) => Number(str));
};

export const toStringList = (value: string): Array<string> => {
  return value.split(LIST_DELIMITER);
};

export const toBooleanOrAny = (value: string): true | false | unknown => {
  if (value === 'true') return true;
  else if (value === 'false') return false;
  else return value;
};
