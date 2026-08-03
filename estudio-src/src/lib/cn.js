// Une clases condicionales de forma simple (sin dependencias).
export function cn(...args) {
  return args.flat(Infinity).filter(Boolean).join(' ')
}
