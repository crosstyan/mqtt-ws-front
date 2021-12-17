export function getUniqueListBy<T>(arr: T[], key: string): T[] {
  //@ts-ignore using magic here
  return [...new Map(arr.map(item => [item[key], item])).values()]
}