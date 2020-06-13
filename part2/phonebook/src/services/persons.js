import axios from "axios";

const baseUrl = "http://localhost:3001/api/persons";

const getAll = () => {
  return axios.get(baseUrl).then(({ data }) => data);
};

const create = (newObject) => {
  return axios.post(baseUrl, newObject).then(({ data }) => data);
};

const remove = (id) => {
  //console.log(`Deleting ${id}`);
  return axios.delete(`${baseUrl}/${id}`);
};
const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject).then(({ data }) => data);
};
export default { getAll, create, remove, update };
