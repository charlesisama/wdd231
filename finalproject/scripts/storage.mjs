const KEY = "ecoblendFavorites";

export function getFavorites() {
  return JSON.parse(localStorage.getItem(KEY) || "[]");
}

export function addFavorite(id) {
  const favs = getFavorites();

  if (!favs.includes(id)) {
    favs.push(id);
    localStorage.setItem(KEY, JSON.stringify(favs));
  }
}

export function isFavorite(id) {
  return getFavorites().includes(id);
}

export function saveContactMessage(data) {
  const messages = JSON.parse(localStorage.getItem("ecoMessages")) || [];
  messages.push(data);
  localStorage.setItem("ecoMessages", JSON.stringify(messages));
}