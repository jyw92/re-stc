export const fetchData = async (param='') => {
  try {
    const response = await axios.get(`http://localhost:3000/${param}`);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
  }
};
