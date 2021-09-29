const auth = () => {
  if (!localStorage.getItem("auth._token.local")) {
    return false;
  }

  return true;
};
export default auth;
