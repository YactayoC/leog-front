import leogAPI from 'api/leogAPI';

export const getCategorias = async () => {
  const { data } = await leogAPI.get(`/admin/categorias`);
  return data;
};

export const addCategoria = async (data: { nombre: string; descripcion: string }) => {
  const response = await leogAPI.post(`/admin/categorias`, data);
  return response.data;
};

export const eliminarCategoria = async (id: number) => {
  const response = await leogAPI.delete(`/admin/categorias/${id}`);
  return response.data;
};
