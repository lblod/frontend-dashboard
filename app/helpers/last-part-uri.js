import { helper } from '@ember/component/helper';

export function lastPartUri([uri]) {
  const lastPart = uri.split('/').at(-1);
  const formattedLastPart = lastPart.split('-').join(' ');
  return formattedLastPart.charAt(0).toUpperCase() + formattedLastPart.slice(1);
}

export default helper(lastPartUri);
