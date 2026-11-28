
const API_BASE_URL = "http://127.0.0.1:8000";

export async function getItems(filters = {}) {
  const queryParams = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== "" && value !== null && value !== undefined) {
      queryParams.append(key, value);
    }
  });

  const queryString = queryParams.toString();

  const url = queryString
    ? `${API_BASE_URL}/api/items/?${queryString}`
    : `${API_BASE_URL}/api/items/`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to load items");
  }

  return await response.json();
}
