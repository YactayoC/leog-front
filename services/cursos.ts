import leogAPI from 'api/leogAPI';
import { FormData } from 'interfaces/cursos';
import { CursosI } from 'interfaces/cursos';

export const getCursos = async () => {
  const { data } = await leogAPI.get(`/admin/cursos`);
  return data;
};

export const addCurso = async (data: FormData) => {
  try {
    const response = await leogAPI.post(`/admin/cursos`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('No se pudo agregar el curso');
  }
};

export const eliminarCurso = async (id: number) => {
  const response = await leogAPI.delete(`/admin/cursos/${id}`);
  return response.data;
};
