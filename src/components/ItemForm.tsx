import * as Form from '@radix-ui/react-form';
import { ChangeEvent, useState } from 'react';

interface Item {
  name: string;
  type: string;
  image: string;
  price: number;
  details: string;
}

export default function ItemForm() {
  const [item, setItem] = useState<Item>({
    name: '',
    type: '',
    image: '',
    price: 0,
    details: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setItem(prev => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) || 0 : value
    }));
  };

  const inputStyles = "w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all";
  const labelStyles = "text-sm font-semibold text-slate-700 mb-1 block";

  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-50 p-6">
      <Form.Root className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 border border-slate-200">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">Create New Item</h2>

        <div className="space-y-5">
          {/* Name Field */}
          <Form.Field name="name">
            <Form.Label className={labelStyles}>Item Name</Form.Label>
            <Form.Control asChild>
              <input
                className={inputStyles}
                type="text"
                name="name"
                placeholder="e.g. Vintage Camera"
                value={item.name}
                onChange={handleChange}
                required
              />
            </Form.Control>
          </Form.Field>

          {/* Type & Price Row */}
          <div className="grid grid-cols-2 gap-4">
            <Form.Field name="type">
              <Form.Label className={labelStyles}>Category</Form.Label>
              <Form.Control asChild>
                <input
                  className={inputStyles}
                  type="text"
                  name="type"
                  placeholder="Electronics"
                  value={item.type}
                  onChange={handleChange}
                />
              </Form.Control>
            </Form.Field>

            <Form.Field name="price">
              <Form.Label className={labelStyles}>Price ($)</Form.Label>
              <Form.Control asChild>
                <input
                  className={inputStyles}
                  type="number"
                  name="price"
                  placeholder="0.00"
                  value={item.price || ''}
                  onChange={handleChange}
                />
              </Form.Control>
            </Form.Field>
          </div>

          {/* Image URL */}
          <Form.Field name="image">
            <Form.Label className={labelStyles}>Image URL</Form.Label>
            <Form.Control asChild>
              <input
                className={inputStyles}
                type="text"
                name="image"
                placeholder="https://..."
                value={item.image}
                onChange={handleChange}
              />
            </Form.Control>
          </Form.Field>

          {/* Details Field */}
          <Form.Field name="details">
            <Form.Label className={labelStyles}>Description</Form.Label>
            <Form.Control asChild>
              <textarea
                className={`${inputStyles} min-h-[100px] resize-none`}
                name="details"
                placeholder="Tell us more about this item..."
                value={item.details}
                onChange={handleChange}
              />
            </Form.Control>
          </Form.Field>

          <Form.Submit asChild>
            <button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md mt-4 transition-colors duration-200 shadow-md active:scale-[0.98]"
              onClick={(e) => {
                e.preventDefault();
                console.log("Submitted Data:", item);
              }}
            >
              Save Item
            </button>
          </Form.Submit>
        </div>
      </Form.Root>
    </div>
  );
}
