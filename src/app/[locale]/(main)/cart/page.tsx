import { Cart } from '@/components/sections';
import { Metadata } from 'next';
import { Suspense } from 'react';
import { translations } from '@/lib/translations';

export const metadata: Metadata = {
  title: 'Cart',
  description: 'My cart page',
};

export default function CartPage({}) {
  return (
    <main className='min-h-screen bg-gray-50 pb-20'>
      {/* App-Style Header */}
      <div className="px-4 pt-4 pb-3 bg-white border-b border-gray-100 sticky top-0 z-10 shadow-sm">
        <h1 className="text-lg font-bold text-primary">{translations.cart.myCart}</h1>
        <p className="text-xs text-secondary mt-0.5">{translations.cart.cartSummary}</p>
      </div>

      <Suspense fallback={
        <div className="flex items-center justify-center py-12">
          <p className="text-sm text-secondary">{translations.common.loading}</p>
        </div>
      }>
        <Cart />
      </Suspense>
    </main>
  );
}
