export const capitalize = (str: string): string => str.charAt(0).toUpperCase().concat(str.substring(1));

export const hslToHex = (h: number, s: number, l: number): string => {
  const hDecimal = l / 100;
  const a = (s * Math.min(hDecimal, 1 - hDecimal)) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = hDecimal - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);

    // Convert to Hex and prefix with "0" if required
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
};

export const hslToHexS = (hsl: string): string => {
  const hslArray = hsl.match(/\d+(\.\d+)?/g);
  if (!hslArray || hslArray.length !== 3) {
    throw new Error('Invalid HSL format');
  }

  const [h, s, l] = hslArray.map(Number);

  return hslToHex(h, s, l);
};
