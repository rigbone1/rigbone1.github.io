import { cards } from "./cards";
import { Card } from "./components/Card";

function App() {
  return (
    <div className="mx-auto flex h-dvh max-w-screen-xl flex-col gap-8 py-24">
      <h1 className="text-3xl font-semibold text-white">Projects</h1>

      <div className="grid grid-cols-4 gap-4">
        {cards.map((card, index) => (
          <Card key={index} {...card} />
        ))}
      </div>

      <div className="mt-auto size-7 rounded border-2 border-current text-center font-mono font-semibold leading-5">
        /
      </div>
    </div>
  );
}

export default App;
