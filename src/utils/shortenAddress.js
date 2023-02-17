//slice是切片函数,取前六个字符和最后四个字符
export const shortenAddress = (address) =>
  `${address.slice(0, 5)}...${address.slice(address.length - 4)}`;
