import { Card } from "@ui/card";

export default function Dashboard() {
  return <div className="flex flex-col gap-y-14">
    <div className="text-4xl font-bold">Dashboard</div>
    <div className="flex gap-8">
      <Card className="bg-white">
        <div className="flex flex-col">
          <div className="text-center text-4xl font-extrabold pb-2">2</div>
          <div className="text-center text-base font-normal">Autores</div>
        </div>
      </Card>
      <Card className="bg-white">
        <div className="flex flex-col">
          <div className="text-center text-4xl font-extrabold pb-2">2</div>
          <div className="text-center text-base font-normal">Assuntos</div>
        </div>
      </Card>
      <Card className="bg-white">
        <div className="flex flex-col">
          <div className="text-center text-4xl font-extrabold pb-2">2</div>
          <div className="text-center text-base font-normal">Livros</div>
        </div>
      </Card>
    </div>
  </div>;
}
