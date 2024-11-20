'use client'

import { Button } from "@nextui-org/button";
import ProductCard, { IProductCard } from "../../productcards/product_card";
import { Fragment, useEffect, useState } from "react";
import { delayValue, LoadingPage } from "@/lib/utils";

interface IMenuProductList {
  id: number;
  name: string;
  products: IProductCard[];
}

export default function MenuButton(props: { menu: IMenuProductList[] }) {
  const { menu } = props;
  const defaultMenu = menu ? menu[0].products : []
  const [menuSelected, setMenuSelect] = useState<IMenuProductList>(menu[0])
  const [product, setProducts] = useState<IProductCard[]>(defaultMenu);
  const [delayComponent, setDelayComponent] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const selectedMenuCSS = "w-fit h-[32px] border-red-500 text-[0.9rem] text-red-500 font-bold tracking-wide";
  const notSelectMenuCss = "w-fit h-[32px] text-[0.9rem] text-gray-500 font-bold tracking-wide hover:bg-gray-500 hover:text-white"

  useEffect(() => {
    LoadingPage(setLoading, 1500);
  }, [loading])

  useEffect(() => {
    const changeMenu = () => {
      setProducts(menuSelected.products);
      console.log(menuSelected.name);
      setDelayComponent(delayValue(menuSelected.products));
    }
    changeMenu()
  }, [menuSelected]);

  return (
    <>
      {
        !loading ?
          <div className="flex flex-row space-x-4">
            {
              menu ?
                menu.map((menuData) => {
                  return (
                    <Fragment key={`fragment_${menuData.id}`}>
                      <Button key={menuData.id} onPress={() => setMenuSelect(menuData)} variant="bordered"
                        className={menuSelected.name == menuData.name ? selectedMenuCSS : notSelectMenuCss}>
                        {menuData.name}
                      </Button>
                    </Fragment>
                  )
                })
                : <></>
            }
          </div>
          : <ButtonSkeleton />

      }
      <div className="grid lg:grid-cols-4 max-lg:grid-cols-3 max-sm:grid-cols-2 gap-1">
        {
          product ?
            product.map((item, index) => {
              return (
                <div key={`skeleton_${item.id}`} className="mb-4">
                  <ProductCard key={`skeleton_${item.id}`} product={item} delay={delayComponent[index]} isLoading={loading} />
                </div>
              )
            })
            : <></>
        }
      </div>
    </>
  )
}

function ButtonSkeleton() {
  return (
    <div className="flex flex-col space-y-3 mb-4">
      {/* Skeleton Buttons */}
      <div key={'firstbutton'} className="bg-gray-300 rounded-full h-5 w-[62vw] animate-pulse"></div>
      <div key={'secondbutton'} className="bg-gray-300 rounded-md h-5 w-28 animate-pulse"></div>
    </div>
  )
}