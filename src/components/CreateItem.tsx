import { useState } from "react";
import { Form } from "./ui/form";




interface Item {
  name: string;
  type: string;
  image: string;
  price: number;
  details: string;
}

export default function CreateItem() {
const [item, setItem] = useState<Item>({
    name: '',
    type: '',
    image: '',
    price: 0,
    details: ''
  });

  return (
    <div>
      <Form>
        <Labe
      </Form>
    </div>
  )
}
