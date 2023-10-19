export function generateRandomPart(length:number) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  
  // Generate a unique ID combining the random part and a timestamp
  export function generateUniqueId() {
    const randomPart = generateRandomPart(6); // You can adjust the length as needed
    const timestampPart = Date.now().toString();
    return randomPart + timestampPart;
  }