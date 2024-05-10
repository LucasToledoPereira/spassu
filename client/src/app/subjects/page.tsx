'use client'
import { BaseResponse } from "@/models/base-response";
import { SubjectsResponse } from "@/models/subject-response";
import { ContentHeader } from "@ui/content-header/content-header";
import { useGet } from "@hooks/use-get.hook";
import { Column, DataGrid, Row } from "@ui/data-grid";
import { useRouter } from "next/navigation";

export default function Subjects() {
    const router = useRouter();
    const { response, error } = useGet<BaseResponse<SubjectsResponse[]>>(`${process.env.NEXT_PUBLIC_API}subjects`, {eager: true, cache: false});
    return <div className="flex flex-col gap-y-14 grow">
        <ContentHeader label="Assuntos" action={<button className="bg-sky-700 text-white py-2 px-8 rounded-full w-fit" onClick={() => router.push('subjects/new')}>Adicionar</button>}/>
        <DataGrid template={{
                sm: "'id id' 'subject subject' 'action action'",
                md: "'id id' 'subject subject' 'action action'",
                lg: "'id subject action'",
                xl: "'id subject action'",
        }}>
            <Row header>
                <Column name="id">Id</Column>
                <Column name="subject">Assunto</Column>
                <Column name="action">Ações</Column>
            </Row>
            {(response?.data || []).map(subject => (
                <Row key={subject.id}>
                    <Column name="id">{subject.id}</Column>
                    <Column name="subject">{subject.description}</Column>
                    <Column name="action">
                        <button className="bg-sky-700 text-white py-2 px-8 rounded-full w-fit">Editar</button>
                    </Column>
                </Row>
            ))}
        </DataGrid>
  </div>;
}