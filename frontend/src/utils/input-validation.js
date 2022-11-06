export function validateEmail(emailAddress) {
  const re = /^[a-z0-9_.-]+@[a-z0-9-]+\.[a-z]{2,}$/;

  const emailValid = re.test(emailAddress.toLowerCase());

  return emailValid;
};

export function validatePassword(password) {
  if (password.length < 6) {
    return false;
  }

  return true;
};