export default (birthDate: string): string => {
  const s = birthDate.split('/');
  return `${s[2]}-${s[1]}-${s[0]}T18:25:43.511Z`;
};
