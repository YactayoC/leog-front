/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import AdminLayout from 'components/layouts/AdminLayout';

import styles from '../Courses.module.css';
import { useEffect, useState } from 'react';
import { GetStaticProps } from 'next';
import { addCategoria, eliminarCategoria, getCategorias } from 'services/categorias';
import Loader from 'components/loader/loader';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import { CategoryI } from 'interfaces/categorias';
import { Modal } from 'react-responsive-modal';

interface Props {
  responseCategorias: any;
  isLoadingFetch: boolean;
}

const CategoriesPage = ({ responseCategorias, isLoadingFetch }: Props) => {
  const [categories, setCategories] = useState<CategoryI[]>([{}] as CategoryI[]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<CategoryI>();
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<CategoryI>();

  const handleAddCategoria = async (data: CategoryI) => {
    try {
      const response = await addCategoria(data);
      toast.success(response.message);
      reset();
      fetchCategorias();
      setShowModalAdd(false);
    } catch (error) {
      toast.error('No se pudo agregar la categoria');
    }
  };

  const fetchCategorias = async () => {
    try {
      const response = await getCategorias();
      setCategories(response.categorias);
    } catch (error) {
      toast.error('No se pudo cargar la lista de categorías');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchDeleteCategorias = async (id: number) => {
    try {
      setCategoriaSeleccionada({} as CategoryI);
      const response = await eliminarCategoria(id);
      toast.success(response.message);
      fetchCategorias();
      setShowModalDelete(false);
    } catch (error) {
      toast.error('No se pudo eliminar la categoria');
    }
  };

  useEffect(() => {
    if (responseCategorias) {
      setCategories(responseCategorias);
      setIsLoading(isLoadingFetch);
    }
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <AdminLayout>
      <div
        className="content-wrapper"
        style={{
          overflow: 'hidden',
        }}
      >
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0">Categorias</h1>
              </div>
            </div>
          </div>
        </div>

        <section className="col-lg-12 p-4">
          <button type="button" className="btn btn-primary" onClick={() => setShowModalAdd(true)}>
            Agregar categoria
          </button>
          <div className={styles['table-container']}>
            <table className="table mt-3">
              <thead className="table-dark">
                <tr>
                  <th>Nombre</th>
                  <th>Descripcion</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category: any) => (
                  <tr key={category.id}>
                    <td>{category.nombre}</td>
                    <td>{category.descripcion}</td>
                    <td>
                      <div className="d-flex gap-3">
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={() => {
                            setCategoriaSeleccionada(category);
                            setShowModalEdit(true);
                          }}
                        >
                          Editar
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => {
                            setCategoriaSeleccionada(category);
                            setShowModalDelete(true);
                          }}
                        >
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <Modal open={showModalAdd} onClose={() => setShowModalAdd(false)} center>
          <div className="modal-header">
            <h1 className="modal-title fs-5">Agregar Categoria</h1>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit(handleAddCategoria)}>
              <div className="mb-3">
                <label htmlFor="nombre" className="form-label">
                  Nombre
                </label>
                <input type="text" className="form-control" id="nombre" {...register('nombre', { required: true })} />
              </div>

              <div className="mb-3">
                <label htmlFor="comments" className="form-label">
                  Descripcion
                </label>
                <textarea
                  className="form-control"
                  id="comments"
                  placeholder="Escribe la descripcion aquí"
                  {...register('descripcion', { required: true })}
                ></textarea>
              </div>
              <div className="d-flex justify-content-center">
                <button type="submit" className="btn btn-primary w-50">
                  Agregar
                </button>
              </div>
            </form>
          </div>
        </Modal>

        <Modal open={showModalEdit} onClose={() => setShowModalEdit(false)} center>
          <div className="modal-header">
            <h1 className="modal-title fs-5">Editar Curso</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>M
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label htmlFor="nombre" className="form-label">
                  Nombre
                </label>
                <input type="text" className="form-control" id="nombre" />
              </div>

              <div className="mb-3">
                <label htmlFor="comments" className="form-label">
                  Descripcion
                </label>
                <textarea className="form-control" id="comments" placeholder="Escribe la descripcion aquí"></textarea>
              </div>
              <div className="d-flex justify-content-center">
                <button type="submit" className="btn btn-primary w-50">
                  Editar
                </button>
              </div>
            </form>
          </div>
        </Modal>

        <Modal open={showModalDelete} onClose={() => setShowModalDelete(false)} center>
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              Estas seguro de eliminar el curso?
            </h1>
          </div>
          <div className="modal-body">
            <div className="d-flex justify-content-center gap-3">
              <button
                type="submit"
                className="btn btn-danger w-50"
                onClick={() => {
                  fetchDeleteCategorias(categoriaSeleccionada?.id!);
                }}
              >
                Si
              </button>
              <button type="submit" className="btn btn-primary w-50">
                No
              </button>
            </div>
          </div>
        </Modal>
      </div>
      <ToastContainer />
    </AdminLayout>
  );
};

export default CategoriesPage;

export const getStaticProps: GetStaticProps = async () => {
  const responseCategorias = await getCategorias();

  return {
    props: {
      responseCategorias: responseCategorias.categorias,
      isLoadingFetch: false,
    },
    revalidate: 86400,
  };
};
