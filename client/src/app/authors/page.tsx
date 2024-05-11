'use client'
import { useRouter } from "next/navigation";
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from "react";
import { toast } from "react-toastify";

import { AuthorsResponse } from "@/models/authors-response";
import { BaseResponse } from "@/models/base-response";
import { ContentHeader } from "@ui/content-header/content-header";
import { useGet } from "@hooks/use-get.hook";
import { Column, DataGrid, Row } from "@ui/data-grid";
import { Dropmenu, DropmenuItem } from "@ui/dropmenu";
import { alert } from "@ui/alert";
import { Skeleton } from "@/ui/skeleton";
import { useDelete } from "@/hooks";
import { LoaderBackdrop } from "@ui/loader";


export default function Authors() {
    const router = useRouter();
    const { response, loading, get } = useGet<BaseResponse<AuthorsResponse[]>>(`${process.env.NEXT_PUBLIC_API}authors`, {eager: true, cache: false});
    const { error: onDeleteError, loading: isDeleting, remove, success: onDeleteSuccess } = useDelete<BaseResponse<AuthorsResponse>>(`${process.env.NEXT_PUBLIC_API}authors/`);
    const onRemove = (id: any) => remove(id);

    useEffect(() => {
        if(onDeleteSuccess) {
            toast.success('Autor excluído com sucesso!');
            get();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [onDeleteSuccess]);

    useEffect(() => {
        if(onDeleteError) {
            toast.error(onDeleteError.message || 'Erro ao excluir o autor!');
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [onDeleteError]);

    return <div className="flex flex-col gap-y-14 grow relative">
        {isDeleting ? <LoaderBackdrop text="Excluíndo ..."/> : null}
        <ContentHeader label="Autores" action={<button className="bg-sky-700 text-white py-2 px-8 rounded-full w-fit" onClick={() => router.push('authors/new')}>Adicionar</button>}/>
        <DataGrid template={{
                sm: "'id id' 'name name' 'action action'",
                md: "'id id' 'name name' 'action action'",
                lg: "'id name name name action'",
                xl: "'id name name name action'",
        }}>
            <Row header>
                <Column name="id">Id</Column>
                <Column name="name">Nome</Column>
                <Column name="action">Ações</Column>
            </Row>
            {loading ? <div className="flex flex-col gap-2">
                <Skeleton height="50px" width="100%"></Skeleton>
                <Skeleton height="50px" width="100%"></Skeleton>
                <Skeleton height="50px" width="100%"></Skeleton>
                <Skeleton height="50px" width="100%"></Skeleton>
                <Skeleton height="50px" width="100%"></Skeleton></div> : null
            }
            {(response?.data || []).map(author => (
                <Row key={author.id}>
                    <Column name="id">{author.id}</Column>
                    <Column name="name">{author.name}</Column>
                    <Column name="action">
                        <Dropmenu>
                            <DropmenuItem
                                icon={faPen}
                                label='Editar'
                                onClick={() => router.push(`authors/${author.id}`)}
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
                                    }).subscribe((ok) => ok && onRemove(author.id))
                                  }
                            />
                        </Dropmenu>
                    </Column>
                </Row>
            ))}
        </DataGrid>
  </div>;
}