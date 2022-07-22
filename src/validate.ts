export const isProgramPortValidated = (programName: string) => {
  try {
    const [name, port] = programName.split(':');
    if (5000 <= Number(port) && 5300 > Number(port)) return true;
    return false;
  } catch (error) {
    return false;
  }
};
