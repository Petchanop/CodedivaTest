'use server'

import { getTranslations } from 'next-intl/server';
import Hightlight6360835 from '@/images/products/636083_5.webp';
import Hightlight636153 from '@/images/products/636153.webp';
import ProductCard from '../productcards/product_card';
import { delayValue } from '@/lib/utils';

const products = [
    {
        id: 0,
        src: Hightlight6360835,
        price: 379,
        name: "Mini Quart",
        description: "Ice Cream 2 Mini Quarts 379.-"
    },
    {
        id: 1,
        src: Hightlight636153,
        price: 449,
        name: "Quart",
        description: "Ice Cream 2 Quarts 449.-"
    }
]

export default async function Hightlight() {

    // fetch higtlight picture from admin
    // implement later

    // fetch product data and assign it to product cards

    const delayProductList = delayValue(products);

    const t = await getTranslations('Hightlight');
    return (
        <>
           
            <div className="relative pt-4 pb-4">
                <h1 className="text-[1.8rem] font-semibold">{t('Header')}</h1>
            </div>
            <div className="grid lg:grid-cols-4 max-lg:grid-cols-3 max-sm:grid-cols-2 gap-1">
                {
                    products.map((item, index) => {
                        return (
                            <>
                                <ProductCard product={item} isLoading={true} delay={delayProductList[index]} />
                            </>

                        )
                    })
                }
            </div >
        </>
    )
}