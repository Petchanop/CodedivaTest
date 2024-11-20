import { IProductCard } from "@/components/productcards/product_card";

export   function delayValue(products: IProductCard[]) {
    const delayNumber = 0.1;
    let delayNumberArray = Array.from({ length: products.length }, (_, index) => index);;
    delayNumberArray = delayNumberArray.map((value) => {
        value = value * delayNumber;
        return value;
    })
    return delayNumberArray
}

export function LoadingPage(setLoading: (value: boolean) => void, loadingtime: number){
    const timer = setTimeout(() => { setLoading(false) }, loadingtime);
    return () => clearTimeout(timer);
}