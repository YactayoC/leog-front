import leogAPI from 'api/leogAPI';
import { CursosI } from 'interfaces/cursos';

export const getCursos = async () => {
  const { data } = await leogAPI.get(`/admin/cursos`);
  return data;
};

export const addCurso = async (data: CursosI) => {
  const response = await leogAPI.post(`/admin/cursos`, data);
  return response.data;
};

export const eliminarCurso = async (id: number) => {
  const response = await leogAPI.delete(`/admin/cursos/${id}`);
  return response.data;
};
