'use client'
import { AuthorsResponse } from "@/models/authors-response";
import { BaseResponse } from "@/models/base-response";
import { ContentHeader } from "@ui/content-header/content-header";
import { useGet } from "@hooks/use-get.hook";
import { Column, DataGrid, Row } from "@ui/data-grid";
import { useRouter } from "next/navigation";

export default function Authors() {
    const router = useRouter();
    const { response, error } = useGet<BaseResponse<AuthorsResponse[]>>(`${process.env.NEXT_PUBLIC_API}authors`, {eager: true, cache: false});
    return <div className="flex flex-col gap-y-14 grow">
        <ContentHeader label="Autores" action={<button className="bg-sky-700 text-white py-2 px-8 rounded-full w-fit" onClick={() => router.push('authors/new')}>Adicionar</button>}/>
        <DataGrid template={{
                sm: "'id id' 'name name' 'action action'",
                md: "'id id' 'name name' 'action action'",
                lg: "'id name action'",
                xl: "'id name action'",
        }}>
            <Row header>
                <Column name="id">Id</Column>
                <Column name="name">Nome</Column>
                <Column name="action">Ações</Column>
            </Row>
            {(response?.data || []).map(author => (
                <Row key={author.id}>
                    <Column name="id">{author.id}</Column>
                    <Column name="name">{author.name}</Column>
                    <Column name="action">
                        <button className="bg-sky-700 text-white py-2 px-8 rounded-full w-fit" onClick={() => router.push(`authors/${author.id}`)}>Editar</button>
                    </Column>
                </Row>
            ))}
        </DataGrid>
  </div>;
}