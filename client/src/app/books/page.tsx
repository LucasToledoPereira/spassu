'use client'
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';

import { BaseResponse } from "@/models/base-response";
import { BooksResponse } from "@/models/book-response";
import { ContentHeader } from "@ui/content-header/content-header";
import { useGet } from "@hooks/use-get.hook";
import { Column, DataGrid, Row } from "@ui/data-grid";
import { Skeleton } from "@ui/skeleton";
import { useDelete } from "@/hooks";
import { LoaderBackdrop } from "@/ui/loader";
import { Dropmenu, DropmenuItem } from "@/ui/dropmenu";
import { alert } from "@ui/alert";

export default function Subjects() {
    const router = useRouter();
    const { response, get, loading } = useGet<BaseResponse<BooksResponse[]>>(`${process.env.NEXT_PUBLIC_API}books`, {eager: true, cache: false});
    const { error: onDeleteError, loading: isDeleting, remove, success: onDeleteSuccess } = useDelete<BaseResponse<BooksResponse>>(`${process.env.NEXT_PUBLIC_API}books/`);
    const onRemove = (id: any) => remove(id);

    useEffect(() => {
        if(onDeleteSuccess) {
            toast.success('Livro excluído com sucesso!');
            get();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [onDeleteSuccess]);

    useEffect(() => {
        if(onDeleteError) {
            toast.error(onDeleteError.message || 'Erro ao excluir o livro!');
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [onDeleteError]);
    
    return <div className="flex flex-col gap-y-14 grow relative">
        {isDeleting ? <LoaderBackdrop text="Excluíndo ..."/> : null}
        <ContentHeader label="Livros" action={<button className="bg-sky-700 text-white py-2 px-8 rounded-full w-fit" onClick={() => router.push('books/new')}>Adicionar</button>}/>
        <DataGrid template={{
                sm: "'id id' 'title title' 'publisher publisher' 'authors authors' 'action action'",
                md: "'id id' 'title title' 'publisher publisher' 'authors authors' 'action action'",
                lg: "'id title title publisher authors authors action'",
                xl: "'id title title publisher authors authors action'",
        }}>
            <Row header>
                <Column name="id">Id</Column>
                <Column name="title">Título</Column>
                <Column name="publisher">Editora</Column>
                <Column name="authors">Autores</Column>
                <Column name="action">Ações</Column>
            </Row>
            {loading ? <div className="flex flex-col gap-2">
                <Skeleton height="50px" width="100%"></Skeleton>
                <Skeleton height="50px" width="100%"></Skeleton>
                <Skeleton height="50px" width="100%"></Skeleton>
                <Skeleton height="50px" width="100%"></Skeleton>
                <Skeleton height="50px" width="100%"></Skeleton></div> : null
            }
            {(response?.data || []).map(book => (
                <Row key={book.id}>
                    <Column name="id">{book.id}</Column>
                    <Column name="title">{book.title}</Column>
                    <Column name="publisher">{book.publisher}</Column>
                    <Column name="authors">{(book.authors || []).map(a => a.name).join(', ')}</Column>
                    <Column name="action">
                        <Dropmenu>
                            <DropmenuItem
                                icon={faPen}
                                label='Editar'
                                onClick={() => router.push(`books/${book.id}`)}
                            />
                            <DropmenuItem
                                icon={faTrash}
                                label='Excluir'
                                color="#be123c"
                                onClick={() =>
                                    alert({
                                      title: 'Tem certeza que deseja excluir o autor?',
                                      cancelButtonText: 'Cancelar',
                                      confirmButtonText: 'Excluir',
                                      type: 'warning',
                                    }).subscribe((ok) => ok && onRemove(book.id))
                                  }
                            />
                        </Dropmenu>
                    </Column>
                </Row>
            ))}
        </DataGrid>
  </div>;
}