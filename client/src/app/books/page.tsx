'use client'
import { BaseResponse } from "@/models/base-response";
import { BooksResponse } from "@/models/book-response";
import { ContentHeader } from "@ui/content-header/content-header";
import { useGet } from "@hooks/use-get.hook";
import { Column, DataGrid, Row } from "@ui/data-grid";
import { useRouter } from "next/navigation";

export default function Subjects() {
    const router = useRouter();
    const { response, error } = useGet<BaseResponse<BooksResponse[]>>(`${process.env.NEXT_PUBLIC_API}books`, {eager: true, cache: false});
    return <div className="flex flex-col gap-y-14 grow">
        <ContentHeader label="Livros" action={<button className="bg-sky-700 text-white py-2 px-8 rounded-full w-fit" onClick={() => router.push('books/new')}>Adicionar</button>}/>
        <DataGrid template={{
                sm: "'id id' 'title title' 'publisher publisher' 'authors authors' 'action action'",
                md: "'id id' 'title title' 'publisher publisher' 'authors authors' 'action action'",
                lg: "'id title publisher authors action'",
                xl: "'id title publisher authors action'",
        }}>
            <Row header>
                <Column name="id">Id</Column>
                <Column name="title">Título</Column>
                <Column name="publisher">Editora</Column>
                <Column name="authors">Autores</Column>
                <Column name="action">Ações</Column>
            </Row>
            {(response?.data || []).map(book => (
                <Row key={book.id}>
                    <Column name="id">{book.id}</Column>
                    <Column name="title">{book.title}</Column>
                    <Column name="publisher">{book.publisher}</Column>
                    <Column name="authors">{(book.authors || []).map(a => a.name).join(', ')}</Column>
                    <Column name="action">
                        <button className="bg-sky-700 text-white py-2 px-8 rounded-full w-fit">Editar</button>
                    </Column>
                </Row>
            ))}
        </DataGrid>
  </div>;
}