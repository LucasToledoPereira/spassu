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
import { usePut } from "@/hooks/use-put.hook";
import { LoaderBackdrop } from "@ui/loader";

type AuthorInputs = {
  name: string;
}

export default function EditAuthor({ params: { id } }: any) {
  const { put, success, loading, error } = usePut(`${process.env.NEXT_PUBLIC_API}authors/${id}`);
  const route = useRouter();
  const onSubmit: SubmitHandler<AuthorInputs> = (data) => put(data);
  const {response} = useGet<BaseResponse<AuthorsResponse>>(`${process.env.NEXT_PUBLIC_API}authors/${id}`, {eager: true, cache: false})

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<AuthorInputs>({
    values: {
      name: response?.data?.name || ''
    }
  });
  
  useEffect(() => {
    if (success) {
        toast.success('Autor atualizado com sucesso!')
        route.push('/authors');
    }
  }, [success]);

  useEffect(() => {
    if (error) {
        toast.error(error.message || 'Houve um erro ao salvar as alteracões');
    }
  }, [error]);

  return (
    <Card className="bg-white flex flex-col p-8 w-full gap-6 relative">
        {loading ? <LoaderBackdrop text="Salvando ..."/> : null}
        <ContentHeader label="Editar autor"/>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full">
            <div className="flex flex-col">
                <span className="text-gray-700 pb-2">Nome do autor</span>
                <input className={errors.name ? 'border-red-600 rounded-full' : 'rounded-full'} {...register("name", {required: true})} />
                {errors.name && <span className="text-sm text-red-600">Esse campo é obrigatório</span>}
            </div>
            <div className="flex justify-end gap-6">
                <button className="bg-transparent text-sky-700 py-2 px-8 rounded-full mb-5 w-fit" type="button" onClick={() => route.back()}>Cancelar</button>
                <button className="bg-sky-700 text-white py-2 px-8 rounded-full mb-5 w-fit" type="submit">Salvar</button>
            </div>
        </form>
    </Card>
  )
}