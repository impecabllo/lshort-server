export const formatCodeToUrl = (code: string): string => {
  return process.env.NODE_ENV === "development" ? `localhost:3000/${code}` : `lshort.ru/${code}`
}

export const generateRandomShortUrl = (): string => {
  const charsList = "ABCDEFGHIJKLMNPQRSTUVWXYZabcdefghijklmnpqrstuvwxyz123456789"

  let result: string = ""

  for (let i = 0; i < 5; i++) {
    const rnd = Math.floor(Math.random() * charsList.length)

    result = result + charsList.charAt(rnd)
  }

  return result
}
