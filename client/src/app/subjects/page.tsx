'use client'
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';

import { BaseResponse } from "@/models/base-response";
import { SubjectsResponse } from "@/models/subject-response";
import { ContentHeader } from "@ui/content-header/content-header";
import { useGet } from "@hooks/use-get.hook";
import { Column, DataGrid, Row } from "@ui/data-grid";
import { Skeleton } from "@ui/skeleton";
import { useDelete } from "@/hooks";
import { LoaderBackdrop } from "@ui/loader";
import { Dropmenu, DropmenuItem } from "@ui/dropmenu";
import { alert } from "@ui/alert";

export default function Subjects() {
    const router = useRouter();
    const { response, error, loading, get } = useGet<BaseResponse<SubjectsResponse[]>>(`${process.env.NEXT_PUBLIC_API}subjects`, {eager: true, cache: false});
    const { error: onDeleteError, loading: isDeleting, remove, success: onDeleteSuccess } = useDelete<BaseResponse<SubjectsResponse>>(`${process.env.NEXT_PUBLIC_API}subjects/`);
    const onRemove = (id: any) => remove(id);
    
    useEffect(() => {
        if(onDeleteSuccess) {
            toast.success('Assunto excluído com sucesso!');
            get();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [onDeleteSuccess]);

    useEffect(() => {
        if(onDeleteError) {
            toast.error(onDeleteError.message || 'Erro ao excluir o assunto!');
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [onDeleteError]);

    return <div className="flex flex-col gap-y-14 grow relative">
        {isDeleting ? <LoaderBackdrop text="Excluíndo ..."/> : null}
        <ContentHeader label="Assuntos" action={<button className="bg-sky-700 text-white py-2 px-8 rounded-full w-fit" onClick={() => router.push('subjects/new')}>Adicionar</button>}/>
        <DataGrid template={{
                sm: "'id id' 'subject subject' 'action action'",
                md: "'id id' 'subject subject' 'action action'",
                lg: "'id subject subject subject action'",
                xl: "'id subject subject subject action'",
        }}>
            <Row header>
                <Column name="id">Id</Column>
                <Column name="subject">Assunto</Column>
                <Column name="action">Ações</Column>
            </Row>
            {loading ? <div className="flex flex-col gap-2">
                <Skeleton height="50px" width="100%"></Skeleton>
                <Skeleton height="50px" width="100%"></Skeleton>
                <Skeleton height="50px" width="100%"></Skeleton>
                <Skeleton height="50px" width="100%"></Skeleton>
                <Skeleton height="50px" width="100%"></Skeleton></div> : null
            }
            {(response?.data || []).map(subject => (
                <Row key={subject.id}>
                    <Column name="id">{subject.id}</Column>
                    <Column name="subject">{subject.description}</Column>
                    <Column name="action">
                        <Dropmenu>
                            <DropmenuItem
                                icon={faPen}
                                label='Editar'
                                onClick={() => router.push(`subjects/${subject.id}`)}
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
                                    }).subscribe((ok) => ok && onRemove(subject.id))
                                  }
                            />
                        </Dropmenu>
                    </Column>
                </Row>
            ))}
        </DataGrid>
  </div>;
}