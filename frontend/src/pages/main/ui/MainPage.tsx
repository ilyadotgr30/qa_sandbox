import { ProductForm } from '@/features/product';
import type { MainPageProps } from '@/pages/main/model';
import { ProductCatalog } from '@/widgets/product-catalog';

export function MainPage({ form, catalog }: MainPageProps) {
  return (
    <main className="space-y-10">
      <ProductForm
        editingProduct={form.editingProduct}
        isPending={form.isPending}
        onSubmit={form.onSubmit}
        onCancelEdit={form.onCancelEdit}
      />
      <ProductCatalog
        products={catalog.products}
        onDelete={catalog.onDelete}
        onEdit={catalog.onEdit}
        onBuy={catalog.onBuy}
      />
    </main>
  );
}
