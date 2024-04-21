export const formatError = (errors: any) => {
  return errors.map((error: any) => {
    return { name: error.path[0], message: error.message };
  });
};
