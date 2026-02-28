import type { ProductFormProps } from '@/features/product';
import type { ProductCatalogProps } from '@/widgets/product-catalog';

export interface MainPageProps {
  form: ProductFormProps;
  catalog: ProductCatalogProps;
}
