export const maskEmail = (email: string): string => {
  const parts: string[] = email.split("@");
  const username: string = parts[0];
  const domain: string = parts[1];

  const maskedUsername = `${username.charAt(0)}${"*".repeat(
    username.length - 2
  )}${username.charAt(username.length - 1)}`;
  const maskedDomain = `*${"*".repeat(domain.length - 2)}${domain.charAt(
    domain.length - 1
  )}`;

  return `${maskedUsername}@${maskedDomain}`;
};
