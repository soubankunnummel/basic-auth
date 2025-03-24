import Nave from "./components/nave-bar";

export default function Home() {
  return (
    <div className="flex relative flex-col items-center justify-center h-screen">
     <Nave/>
      <h1 className="text-xl animate-pulse">Welcome to my app</h1>
    </div>
  );
}
