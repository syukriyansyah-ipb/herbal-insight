export function dateFormat() {
  const currentDate = new Date().toUTCString().slice(5, 16);
  return `${currentDate}`;
}

