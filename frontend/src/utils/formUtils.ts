import ITypeCode from 'interfaces/ITypeCode';

/**
 * append the passed name and index to the existing namespace, ideal for nesting forms within formik.
 * @param nameSpace the namespace of the current formik form.
 * @param name the name to append to the namespace, may either be a field name or an object within the form (if passing the namespace to a subform).
 * @param index optional index to append to the namespace and name, used for formik arrays.
 */
export const withNameSpace: Function = (nameSpace?: string, name?: string, index?: number) => {
  return [nameSpace ?? '', `${index ?? ''}`, name].filter(x => x).join('.');
};

/**
 * The phoneFormatter is used to format the specified phone number value
 * @param {string} phoneNumber This is the target phone number to be formatted
 */
export const phoneFormatter = (phoneNumber?: string) => {
  if (!!phoneNumber) {
    let result = phoneNumber;
    const regex =
      phoneNumber.length === 10
        ? /(\d\d\d)[\s-]?(\d\d\d)[\s-]?(\d\d\d\d)/
        : /\d(\d\d\d)[\s-]?(\d\d\d)[\s-]?(\d\d\d\d)/;
    const format = phoneNumber.match(regex);
    if (format !== null && format.length === 4) {
      result = `1 ${format[1]}-${format[2]}-${format[3]}`;
    }
    return result;
  }
  return '';
};

export function stringToNull(value: any) {
  return emptyStringToNull(value, value);
}

export function emptyStringToNull(value: any, originalValue: any) {
  if (typeof originalValue === 'string' && originalValue === '') {
    return undefined;
  }
  return value;
}

export function stringToTypeCode<T = string>(value?: T) {
  return !!value ? { id: value } : undefined;
}

export function typeCodeToString<T = string>(value?: ITypeCode<T>) {
  return value?.id;
}

export function stringToBoolean(value: string | boolean): boolean {
  if (typeof value === 'string') {
    return value === 'true';
  }
  return value;
}

export function booleanToString(value?: boolean): string {
  if (typeof value === 'undefined') {
    return 'false';
  }
  return value.toString();
}
