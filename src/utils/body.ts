export function setBodyClasses(obj: { [key: string]: string }) {
  document.body.className = "";
  Object.values(obj).map((val) => document.body.classList.add(val));
}
