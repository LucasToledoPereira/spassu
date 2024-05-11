'use client'
import { usePost } from "@hooks/use-post.hook";
import { ContentHeader } from "@/ui/content-header/content-header";
import { Card } from "@ui/card";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useGet } from "@/hooks";
import { BaseResponse } from "@/models/base-response";
import { AuthorsResponse } from "@/models/authors-response";
import { SubjectsResponse } from "@/models/subject-response";

type BooksInputs = {
  title: string;
  publisher: string;
  edition: number;
  year: string;
  value: number;
  currency: string;
  authors: number[];
  subjects: number[];
}

export default function NewBook() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BooksInputs>()
  const { post, success } = usePost(`${process.env.NEXT_PUBLIC_API}books`);
  const { response: subjects } = useGet<BaseResponse<SubjectsResponse[]>>(`${process.env.NEXT_PUBLIC_API}subjects`, {eager: true, cache: false});
  const { response: authors } = useGet<BaseResponse<AuthorsResponse[]>>(`${process.env.NEXT_PUBLIC_API}authors`, {eager: true, cache: false});

  const route = useRouter();
  const onSubmit: SubmitHandler<BooksInputs> = (data) => post({
    year: data.year,
    value: +data.value,
    currency: data.currency,
    title: data.title,
    publisher: data.publisher,
    edition: +data.edition,
    subjects: (data.subjects || []).map(s => +s),
    authors: (data.authors || []).map(a => +a)
  });

  useEffect(() => {
    if (success) {
        toast.success('Livro adicionado com sucesso!')
        route.push('/books');
    }
  }, [success]);

  return (
    <Card className="bg-white flex flex-col p-8 w-full gap-6">
        <ContentHeader label="Adicionar livro"/>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full">
            <div className="flex flex-col">
                <span className="text-gray-700 pb-2">Título</span>
                <input className={errors.title ? 'border-red-600 rounded-full' : 'rounded-full'} {...register("title", {required: true})} />
                {errors.title && <span className="text-sm text-red-600">Esse campo é obrigatório</span>}
            </div>
            <div className="flex flex-col">
                <span className="text-gray-700 pb-2">Editora</span>
                <input className={errors.publisher ? 'border-red-600 rounded-full' : 'rounded-full'} {...register("publisher", {required: true})} />
                {errors.publisher && <span className="text-sm text-red-600">Esse campo é obrigatório</span>}
            </div>
            <div className="flex flex-col">
                <span className="text-gray-700 pb-2">Edição</span>
                <input type="number" className={errors.edition ? 'border-red-600 rounded-full' : 'rounded-full'} {...register("edition", {required: true})} />
                {errors.edition && <span className="text-sm text-red-600">Esse campo é obrigatório</span>}
            </div>
            <div className="flex flex-col">
                <span className="text-gray-700 pb-2">Ano</span>
                <input type="number" min={0} max={(new Date()).getFullYear()} className={errors.year ? 'border-red-600 rounded-full' : 'rounded-full'} {...register("year", {required: true})} />
                {errors.year && <span className="text-sm text-red-600">Esse campo é obrigatório</span>}
            </div>
            <div className="flex flex-col">
                <span className="text-gray-700 pb-2">Moeda</span>
                <select className={errors.currency ? 'border-red-600 rounded-full' : 'rounded-full'} {...register("currency")}>
                  <option value='BRL'>Real</option>
                  <option value='EUR'>Euro</option>
                  <option value='DOL'>Dolár</option>
                </select>
            </div>
            <div className="flex flex-col">
                <span className="text-gray-700 pb-2">Valor</span>
                <input min={0} type="number" className={errors.value ? 'border-red-600 rounded-full' : 'rounded-full'} {...register("value")} />
            </div>
            <div className="flex flex-col">
                <span className="text-gray-700 pb-2">Autores</span>
                <select {...register("authors")} multiple>
                  {(authors?.data || []).map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
                </select>
            </div>
            <div className="flex flex-col">
                <span className="text-gray-700 pb-2">Assuntos</span>
                <select {...register("subjects")} multiple>
                  {(subjects?.data || []).map(s => <option key={s.id} value={s.id}>{s.description}</option>)}
                </select>
            </div>
            <div className="flex justify-end gap-6">
                <button className="bg-transparent text-sky-700 py-2 px-8 rounded-full mb-5 w-fit" type="button" onClick={() => route.back()}>Cancelar</button>
                <button className="bg-sky-700 text-white py-2 px-8 rounded-full mb-5 w-fit" type="submit">Adicionar</button>
            </div>
        </form>
    </Card>
  )
}