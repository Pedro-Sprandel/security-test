const fetchWithCSRF = async (url, options = {}) => {
    const response = await fetch("http://localhost:3001/csrf-token", {
        method: "GET",
        credentials: "include",
    });
    const { csrfToken } = await response.json();
  
    return fetch(url, {
      ...options,
      credentials: "include",
      headers: {
        ...options.headers,
        "CSRF-Token": csrfToken,
      },
    });
  };

export default fetchWithCSRF;