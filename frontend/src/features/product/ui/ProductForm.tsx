import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';
import { Edit2, PlusCircle } from 'lucide-react';
import { Input } from '@/shared/ui/input';
import { Button } from '@/shared/ui/button';
import type { ProductUpsertPayload } from '@/entities/product';
import type { ProductFormProps } from '@/features/product/model';

interface ProductFormState {
  name: string;
  price: string;
  description: string;
  imageUrl: string;
}

const INITIAL_FORM_STATE: ProductFormState = {
  name: '',
  price: '',
  description: '',
  imageUrl: '',
};

export function ProductForm({ editingProduct, isPending, onSubmit, onCancelEdit }: ProductFormProps) {
  const [formState, setFormState] = useState<ProductFormState>(INITIAL_FORM_STATE);

  useEffect(() => {
    if (!editingProduct) {
      setFormState(INITIAL_FORM_STATE);
      return;
    }

    setFormState({
      name: editingProduct.name,
      price: String(editingProduct.price ?? ''),
      description: editingProduct.description ?? '',
      imageUrl: editingProduct.image_url ?? '',
    });
  }, [editingProduct]);

  const handlePriceChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value === '' || /^\d*$/.test(value)) {
      setFormState((prev) => ({ ...prev, price: value }));
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const numericPrice = parseInt(formState.price, 10);
    if (Number.isNaN(numericPrice) || numericPrice < 0) {
      alert('Price must be a positive integer');
      return;
    }

    const payload: ProductUpsertPayload = {
      name: formState.name,
      price: numericPrice,
      description: formState.description || null,
      image_url: formState.imageUrl || null,
    };

    const isSuccess = await onSubmit(payload);
    if (isSuccess && !editingProduct) {
      setFormState(INITIAL_FORM_STATE);
    }
  };

  return (
    <section className="p-8 border border-white/10 bg-white/5 backdrop-blur-xl rounded-2xl shadow-[0_20px_80px_rgba(0,0,0,0.35)]">
      <div className="flex items-center gap-3 mb-8">
        {editingProduct ? <Edit2 size={18} className="text-cyber-blue" /> : <PlusCircle size={18} className="text-cyber-pink" />}
        <h2 className="text-lg font-semibold">
          {editingProduct ? `Update product #${editingProduct.id}` : 'Add product'}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-[11px] uppercase tracking-[0.2em] text-white/60 font-mono">Name</label>
          <Input
            type="text"
            placeholder="e.g., wireless headphones"
            value={formState.name}
            onChange={(event) => setFormState((prev) => ({ ...prev, name: event.target.value }))}
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[11px] uppercase tracking-[0.2em] text-white/60 font-mono">Price ($)</label>
          <Input
            type="number"
            inputMode="numeric"
            min="0"
            step="1"
            pattern="\\d*"
            placeholder="1200"
            value={formState.price}
            onChange={handlePriceChange}
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[11px] uppercase tracking-[0.2em] text-white/60 font-mono">Description</label>
          <Input
            type="text"
            placeholder="Short features, materials, etc."
            value={formState.description}
            onChange={(event) => setFormState((prev) => ({ ...prev, description: event.target.value }))}
          />
        </div>
        <div className="flex flex-col gap-2 md:col-span-3">
          <label className="text-[11px] uppercase tracking-[0.2em] text-white/60 font-mono">Image URL (from media storage)</label>
          <Input
            type="url"
            placeholder="https://cdn.example.com/products/headphones.jpg"
            value={formState.imageUrl}
            onChange={(event) => setFormState((prev) => ({ ...prev, imageUrl: event.target.value.trim() }))}
          />
          {formState.imageUrl ? (
            <div className="mt-2 rounded-lg border border-white/10 bg-black/40 overflow-hidden flex items-center gap-4 p-3">
              <div className="w-24 h-24 rounded-md overflow-hidden bg-white/5 border border-white/5">
                <img
                  src={formState.imageUrl}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  onError={(event) => {
                    event.currentTarget.src = 'https://via.placeholder.com/200x200?text=No+Image';
                  }}
                />
              </div>
              <p className="text-xs text-white/60">Preview fetched from the provided URL.</p>
            </div>
          ) : (
            <p className="text-xs text-white/40">Leave empty to use a placeholder.</p>
          )}
        </div>

        <div className="md:col-span-3 flex flex-col md:flex-row gap-4">
          <Button
            type="submit"
            disabled={isPending}
            variant="outline"
            tone="light"
            size="lg"
            className="flex-1 font-black tracking-[0.3em] uppercase"
          >
            {isPending ? 'Processing...' : editingProduct ? 'Save changes' : 'Create product'}
          </Button>

          {editingProduct && (
            <Button
              type="button"
              onClick={onCancelEdit}
              variant="danger"
              size="lg"
              className="uppercase text-xs tracking-[0.2em]"
            >
              Cancel
            </Button>
          )}
        </div>
      </form>
    </section>
  );
}
