import { useAuth } from '@/features/auth';
import { useProductManagement } from '@/features/product';
import { LoginPage } from '@/pages/login';
import { MainPage } from '@/pages/main';
import { AppHeader } from '@/widgets/app-header';

export default function App() {
  const auth = useAuth();
  const product = useProductManagement();

  const handleLogout = () => {
    auth.logout();
    product.cancelEditProduct();
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden text-white">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute -left-24 top-10 w-80 h-80 bg-cyber-blue/30 blur-3xl rounded-full" />
        <div className="absolute right-0 top-20 w-96 h-96 bg-cyber-pink/20 blur-[120px] rounded-full" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.06),transparent_55%)]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8 py-10 space-y-12">
        <AppHeader isLoggedIn={auth.isLoggedIn} onLogout={handleLogout} />

        {auth.isLoggedIn ? (
          <MainPage
            form={{
              editingProduct: product.editingProduct,
              isPending: product.isPending,
              onSubmit: product.submitProduct,
              onCancelEdit: product.cancelEditProduct,
            }}
            catalog={{
              products: product.products,
              onDelete: product.deleteProduct,
              onEdit: product.startEditProduct,
              onBuy: product.buyProduct,
            }}
          />
        ) : (
          <LoginPage onLogin={auth.login} isPending={auth.isPending} />
        )}
      </div>
    </div>
  );
}
