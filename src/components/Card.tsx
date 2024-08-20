export interface ICard {
  title: string;
  description: string;
  imageUrl: string;
}

export function Card(props: ICard) {
  return (
    <div className="bg-php-300 flex cursor-pointer select-none flex-col transition-all hover:-translate-y-2 hover:shadow-lg">
      <img src={props.imageUrl} />

      <div className="flex flex-col gap-2 p-4">
        <h3 className="font-medium">{props.title}</h3>
        <p className="text-gray-300">{props.description}</p>
      </div>
    </div>
  );
}
