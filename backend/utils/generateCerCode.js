export const generateCerificateCode = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const stringLength = Math.floor(Math.random() * 5) + 20;
    let result = 'UC';
    let remainingLength = stringLength - 2;
    while (remainingLength > 0) {
      const phraseLength = Math.min(Math.floor(Math.random() * 3) + 3, remainingLength);
      const phrase = Array.from({ length: phraseLength }, () => characters.charAt(Math.floor(Math.random() * characters.length))).join('');
      result += '-' + phrase;
      remainingLength -= phraseLength + 1;
    }
    return result; 
}