'use client'
import { ContentHeader } from "@/ui/content-header/content-header";
import { Card } from "@ui/card";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();

  return <div className="flex flex-col gap-y-14 max-w-full">
    <ContentHeader label="Bem vindo ao CRUD de Livros"/>
    <div className="flex gap-8 flex-wrap justify-center">
      <Card className="bg-white cursor-pointer" onClick={() => router.push('authors')}>
        <div className="flex flex-col">
          <div className="text-center text-base font-normal">Autores</div>
        </div>
      </Card>
      <Card className="bg-white cursor-pointer" onClick={() => router.push('subjects')}>
        <div className="flex flex-col">
          <div className="text-center text-base font-normal">Assuntos</div>
        </div>
      </Card>
      <Card className="bg-white cursor-pointer" onClick={() => router.push('books')}>
        <div className="flex flex-col">
          <div className="text-center text-base font-normal">Livros</div>
        </div>
      </Card>
    </div>
  </div>;
}
