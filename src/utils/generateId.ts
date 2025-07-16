function generateId(): string {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  const length = 20;

  for (let i = 0; i < length; i++) {
    const randIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randIndex);
  }

  return result;
}

export default generateId;
