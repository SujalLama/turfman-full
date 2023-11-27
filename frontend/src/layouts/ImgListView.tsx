import ImgListCard, { IImgListCardProps } from '@/components/ImgListCard';
import { findMinMaxInArray, formatImage } from '@/utils/dataFormatter';

export interface IImgListViewProps {
    title: string;
    path: 'posts' | 'products';
}

async function getOtherOptions(path: string) {

    const postUrl = 'http://localhost:1337/api/posts?populate[0]=post_category&fields[0]=title&fields[1]=slug&populate[1]=cover&pagination[pageSize]=4';
    const productUrl = 'http://localhost:1337/api/products?populate[0]=product_category&fields[0]=name&fields[1]=slug&populate[1]=product_images&pagination[pageSize]=4&fields[3]=unit&populate[2]=product_variants';

    const url = path == "products" ? productUrl : postUrl;

    const {data} = await fetch(url, { next: { revalidate: 3600 } }).then(res => res.json());

    if(!data) {
        return [];
    }

    return formatOtherOption(data, path);
}

function formatOtherOption (data: any[], path: string) {

    const newData = data.map(item => {
        const {name, slug, title, cover, product_images, product_variants, unit} = item?.attributes;

        const prodDesc = `$${
                product_variants?.data.length 
                ? (
                    (product_variants.data.length == 1) 
                    ? product_variants.data[0]?.attributes?.price 
                    : findMinMaxInArray(product_variants.data)
                    ) 
                : 0 } ${unit}`

        return {
            title: name ?? title,
            link: `${path == 'products' ? '/product/' : '/blogs/'}` + slug,
            img: cover ? formatImage('thumbnail', cover?.data) : formatImage('thumbnail', product_images?.data?.[0]),
            alignImg: path == 'products' ? 'right' : 'left',
            desc: path == 'products' ? prodDesc : '',
        }
    });

    return newData;
}

async function ImgListView({title, path}: IImgListViewProps) {
    const lists = await getOtherOptions(path);

    
  return (
    <div className="pt-[35px] text-gray-darker pb-5 md:flex-shrink-0 md:flex-grow-0">
        <h2 
            className="text-[22px] leading-tight font-bold pb-3.5 mb-[35px] border-b 
            border-black/10 relative after:content-[''] after:absolute after:left-0 
            after:bottom-0 after:w-7.5 after:h-[3px] after:-mb-[2px] after:bg-primary">
                {title}
        </h2>
        <div className="text-sm font-bold">
            {
               lists.length > 0 && lists.map(listItem => {
                    return <ImgListCard key={listItem.title} {...listItem} />
                })
            }
        </div>    							
    </div>
  )
}

export default ImgListView