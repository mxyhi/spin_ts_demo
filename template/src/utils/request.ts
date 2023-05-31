export async function request(...args: Parameters<typeof fetch>) {
  const response = await fetch(...args);
  const data = await response.json();
  return data;
}
