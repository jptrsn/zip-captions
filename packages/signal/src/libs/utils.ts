import { v4 } from 'uuid';

export const generateRoomId = (): string => {
  let outString = '';
  const outParts: string[] = [];
  const inOptions = 'acdefghjkmnpqrstuvwxyz2345679';

  for (let i = 0; i < 2; i++) {
    outString = '';
    for (let j = 0; j < 4; j++) {
      outString += inOptions.charAt(Math.floor(Math.random() * inOptions.length));
    }
    outParts.push(outString);
  }
  return outParts.join('-');
}

export const generateUserId = v4;