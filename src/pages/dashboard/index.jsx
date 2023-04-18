import useFetch from '@hooks/useFetch';
import endPoints from '@services/api';
import { Chart } from '@common/Chart';

const PRODUCT_LIMIT = 5;



export default function Dashboard() {

  const allProducts = useFetch(endPoints.products.getProducts(0, 0));
  const categoryProducts = allProducts?.map((product)=> product.category);
  const categoryNames = categoryProducts?.map((categories)=> categories.name);
  
  const countOccurrences = (arr) => arr.reduce((prev, curr) => ((prev[curr] = ++prev[curr] || 1),prev),{});

  const data = {
    datasets:[{ //
      label: 'Categories', 
      data: countOccurrences(categoryNames), 
      borderWidth: 2,
      backgroundColor: ['#ffbb11', '#c0c0c0', '#50AF95', '#f3ba2f', '#2a71d0'] // paleta de colores para nuestro grafico de barras
    }] //de donde vamos a obtener la data que le pasaremos a chart 
  };

  return (
    <>
      <Chart className="mb-8 mt-2" chartData={data} />
    </>
  );
}

