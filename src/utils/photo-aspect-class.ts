export const photoAspectClass = (index: number): string => {
  const mod = index % 6;

  switch (mod) {
    case 0:
      return "aspect-[3/4]";
    case 1:
      return "aspect-[4/3]";
    case 2:
      return "aspect-[1/1]";
    case 3:
      return "aspect-[2/3]";
    case 4:
      return "aspect-[3/2]";
    default:
      return "aspect-[5/4]";
  }
};
