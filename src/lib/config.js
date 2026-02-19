export const config = {
  // server : "http://localhost:8010",
  // In development, use empty string so requests go through the Vite proxy (/api/...)
  // In production, use the full server URL
  server: import.meta.env.DEV ? "" : import.meta.env.VITE_REACT_APP_API,
  deliveryApi: import.meta.env.VITE_REACT_APP_DELIVERY_API,
  serverSecret: import.meta.env.VITE_REACT_APP_SERVER_SECRET,
};
