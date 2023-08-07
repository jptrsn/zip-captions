import { v4 } from 'uuid';

export const generateRoomId = (): string => {
  let outString = '';
  const outParts: string[] = [];
  const inOptions = 'abcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < 3; i++) {
    outString = '';
    for (let j = 0; j < 4; j++) {
      outString += inOptions.charAt(Math.floor(Math.random() * inOptions.length));
    }
    outParts.push(outString);
  }
  return outParts.join('-');
}

export const generateUserId = v4;