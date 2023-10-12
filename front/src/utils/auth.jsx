export const isUserLoggedIn = () => {
    const token = localStorage.getItem("token");
    return !!token; // Retourne true si le token est présent, sinon false
  };