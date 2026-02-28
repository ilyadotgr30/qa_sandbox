import { Edit2, ShoppingCart, Trash2, Zap } from 'lucide-react';
import type { Product } from '@/entities/product/model';
import { Button } from '@/shared/ui/button';

interface ProductCardProps {
  product: Product;
  onDelete: (id: number) => void | Promise<void>;
  onEdit: (product: Product) => void;
  onBuy: (product: Product) => void;
}

export function ProductCard({ product, onDelete, onEdit, onBuy }: ProductCardProps) {
  return (
    <div className="relative bg-[#0d111a]/80 border border-white/10 p-6 rounded-xl backdrop-blur-lg hover:border-cyber-blue/50 transition-all shadow-[0_18px_60px_rgba(0,0,0,0.35)] flex flex-col h-full overflow-hidden group">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-50" />
      <div className="mb-4 rounded-lg overflow-hidden border border-white/5 bg-white/5">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-40 object-cover"
            onError={(event) => {
              event.currentTarget.src = 'https://via.placeholder.com/600x300?text=Image+not+found';
            }}
          />
        ) : (
          <div className="w-full h-40 bg-gradient-to-r from-cyber-blue/20 via-white/5 to-cyber-pink/20 flex items-center justify-center text-xs text-white/50 font-mono">
            No image provided
          </div>
        )}
      </div>

      <div className="flex items-start justify-between gap-4">
        <h3 className="text-lg font-semibold tracking-tight text-white">{product.name}</h3>
        <span className="text-[11px] font-mono px-2 py-1 rounded-full border border-cyber-blue/40 text-cyber-blue bg-cyber-blue/10">
          ID {product.id}
        </span>
      </div>

      <p className="text-white/60 text-sm mt-3 mb-6 leading-relaxed min-h-[48px]">
        {product.description || 'No description'}
      </p>

      <div className="mt-auto space-y-4">
        <div className="flex items-center justify-between border border-white/5 rounded-lg px-4 py-3 bg-white/5">
          <div className="flex items-center gap-2 text-sm font-mono text-white/70">
            <Zap size={14} className="text-cyber-blue" />
            Price
          </div>
          <div className="text-2xl font-black text-cyber-blue">
            {product.price}
            <span className="text-xs ml-1 opacity-60">$</span>
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={() => onDelete(product.id)} variant="icon" tone="danger" size="icon" title="Delete product">
            <Trash2 size={16} />
          </Button>
          <Button onClick={() => onEdit(product)} variant="icon" tone="blue" size="icon" title="Edit">
            <Edit2 size={16} />
          </Button>
          <Button
            onClick={() => onBuy(product)}
            variant="buy"
            className="flex-1 text-[11px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2"
          >
            <ShoppingCart size={14} /> Buy
          </Button>
        </div>
      </div>
    </div>
  );
}
