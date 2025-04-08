export function stringCapitalize(str: string): string {
  return (str?.length || 0) > 0 ? str[0].toUpperCase() + str.slice(1) : str;
}

export function stringUnCapitalize(str: string): string {
  return (str?.length || 0) > 0 ? str[0].toLowerCase() + str.slice(1) : str;
}
