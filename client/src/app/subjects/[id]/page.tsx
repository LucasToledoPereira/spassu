'use client'
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import { ContentHeader } from "@/ui/content-header/content-header";
import { Card } from "@ui/card";
import { SubmitHandler, useForm } from "react-hook-form";
import { LoaderBackdrop } from "@ui/loader";
import { useGet, usePut } from "@/hooks";
import { SubjectsResponse } from "@/models/subject-response";
import { BaseResponse } from "@/models/base-response";

type SubjectInputs = {
  description: string;
}

export default function EditSubject({ params: { id } }: any) {
  const { put, success, loading, error } = usePut(`${process.env.NEXT_PUBLIC_API}subjects/${id}`);
  const route = useRouter();
  const onSubmit: SubmitHandler<SubjectInputs> = (data) => put(data);
  const {response} = useGet<BaseResponse<SubjectsResponse>>(`${process.env.NEXT_PUBLIC_API}subjects/${id}`, {eager: true, cache: false})

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SubjectInputs>(
    {
      values: {
        description: response?.data?.description || ''
      }
    }
  )

  useEffect(() => {
    if (success) {
        toast.success('Assunto atualizado com sucesso!')
        route.push('/subjects');
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
        <ContentHeader label="Editar assunto"/>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full">
            <div className="flex flex-col">
                <span className="text-gray-700 pb-2">Descrição</span>
                <input className={errors.description ? 'border-red-600 rounded-full' : 'rounded-full'} {...register("description", {required: true})} />
                {errors.description && <span className="text-sm text-red-600">Esse campo é obrigatório</span>}
            </div>
            <div className="flex justify-end gap-6">
                <button className="bg-transparent text-sky-700 py-2 px-8 rounded-full mb-5 w-fit" type="button" onClick={() => route.back()}>Cancelar</button>
                <button className="bg-sky-700 text-white py-2 px-8 rounded-full mb-5 w-fit" type="submit">Salvar</button>
            </div>
        </form>
    </Card>
  )
}