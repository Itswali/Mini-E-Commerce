// src/App.tsx
import { Button } from "@/components/ui/button"
import { useCounterStore } from "@/store/useCounterStore"

export default function App() {
  // Grab what you need from the store
  const { count, increment, reset } = useCounterStore()

  return (
    <div className="p-8 flex flex-col items-center gap-4">
      <h1 className="text-2xl font-bold">Count: {count}</h1>

      <div className="flex gap-2">
        <Button onClick={increment}>Add One</Button>

        <Button variant="outline" onClick={reset}>
          Reset
        </Button>
      </div>
    </div>
  )
}
