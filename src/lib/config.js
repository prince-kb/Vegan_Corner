export const config = {
  // server : "http://localhost:8010",
  server: import.meta.env.VITE_REACT_APP_API,
  deliveryApi: import.meta.env.VITE_REACT_APP_DELIVERY_API,
  serverSecret: import.meta.env.VITE_REACT_APP_SERVER_SECRET,
};
