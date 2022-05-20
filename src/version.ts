function patchZero(el: number): string {
  return el < 10 ? `0${el}` : el.toString();
}

export default function (): string {
  const D = new Date();
  return `${D.getFullYear()}${patchZero(D.getMonth() + 1)}${patchZero(D.getDate())}_${patchZero(D.getHours())}:${patchZero(D.getMinutes())}_${D.getMilliseconds()}`;
}