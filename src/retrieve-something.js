import fetch from 'node-fetch';

export default async function retrieveSomething(url = 'https://httpbin.org/get', options) {
  const response = await fetch(url, options)

  if (!response.ok) {
    const message = await response.text()
    throw new Error(message)
  }

  return response
}