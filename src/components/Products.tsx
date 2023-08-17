import { useQuery } from 'react-query';
import axios from 'axios';

import { Product } from '../models/Product';
import ProductListItem from './ProductListItem';

export default function Products() {
  const { data: products, isLoading, isError } = useQuery<Array<Product>>('products', () => axios.get('/products.json').then(res => res.data));

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Uh-oh something ain't right...</p>;
  if (!products?.length) return <p>No products found.</p>

  return (
    <div className="mt-2 px-2">
      {products.map(product => <ProductListItem product={product} key={product.id} />)}
    </div>
  )
}

