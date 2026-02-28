import { ProductCard } from '@/entities/product';
import type { ProductCatalogProps } from '@/widgets/product-catalog/model';

export function ProductCatalog({ products, onDelete, onEdit, onBuy }: ProductCatalogProps) {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-white/50 font-mono">Catalog</p>
          <h3 className="text-xl font-semibold mt-1">Products available</h3>
        </div>
        <span className="text-[11px] font-mono px-3 py-1 rounded-full border border-white/10 bg-white/5 text-white/60">
          {products.length} items
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onDelete={onDelete}
            onEdit={onEdit}
            onBuy={onBuy}
          />
        ))}
      </div>
    </section>
  );
}
