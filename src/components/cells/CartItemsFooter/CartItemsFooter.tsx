import { convertToLocale } from '@/lib/helpers/money';

export const CartItemsFooter = ({
  currency_code,
  price,
}: {
  currency_code: string;
  price: number;
}) => {
  return (
    <div className='bg-gray-50 px-4 py-3 flex items-center justify-between border-t border-gray-100'>
      <p className='text-xs text-secondary'>Delivery Fee</p>
      <p className='text-xs font-semibold text-primary'>
        {convertToLocale({
          amount: price / 1,
          currency_code,
        })}
      </p>
    </div>
  );
};
