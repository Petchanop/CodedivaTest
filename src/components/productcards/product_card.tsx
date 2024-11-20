'use client'

import { LoadingPage } from "@/lib/utils";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { motion } from "framer-motion";
import { PlusIcon } from "lucide-react";
import { StaticImageData } from "next/image";
import { Fragment, useEffect, useState } from "react";

export interface IProductCard {
    src: StaticImageData;
    id: number;
    name: string;
    price: number;
    description: string;
}

type TProductProp = {
    product: IProductCard;
    isLoading?: boolean;
    delay?: number;
}

export default function ProductCard(props: TProductProp) {
    const { product, delay, isLoading } = props;
    const { src, price, description, id } = product;
    const [loading, setLoading] = useState<boolean>(isLoading!);
    const variants = {
        hidden: () => ({
            opacity: 0,
            y: 50, // Element starts 40px lower
            transition: {
                delay: delay
            }
        }),
        visible: (delay: number) => ({
            opacity: 1,
            y: 0, // Moves to the original position
            transition: {
                duration: 0.2, // Duration of the animation
                ease: "linear", // Easing effect
                delay: delay
            },
        })
    }

    useEffect(() => {
        LoadingPage(setLoading, 1500);
    }, [loading, isLoading])
    return (
        <Fragment key={`card_${product.name}`}>
            {
                !loading ?
                    <motion.div key={product.name}
                        initial="hidden"
                        animate="visible"
                        custom={delay}
                        variants={variants}
                        className="mb-4"
                    >
                        <Card shadow="none" key={`card${id}`} classNames={{
                            base: "border-1 h-[17rem] max-w-[16.5rem] max-sm:max-w-[9rem] max-sm:h-[13rem] group cursor-pointer",
                        }}>
                            <CardBody key={`body${id}`} className="flex flex-none p-0">

                                <Image
                                    key={`image${id}`}
                                    alt="product card"
                                    className="z-0 h-[11rem] w-[16.5rem] max-sm:h-[7rem]"
                                    radius="none"
                                    src={src.src}
                                />
                                <div className="z-10 absolute right-5 md:top-32 max-md:top-24 max-sm:top-12 w-8 h-8 bg-red-600 rounded-full content-center lg:hidden">
                                    <PlusIcon color="white" size={14} className="justify-self-center"/>
                                </div>
                            </CardBody>
                            <CardFooter key={`footer${id}`} className="flex-col flex-nowrap w-full">
                                <p key={`price${id}`} className="lg:text-[1.2rem]  text-rose-600 font-semibold w-full">฿ {price}</p>
                                <p key={`description${id}`} className="lg:text-[1.2rem] text-gray-700 font-semibold w-full leading-tight max-md:line-clamp-2">{description}</p>
                                <div className="
                            absolute w-full h-full translate-y-20 opacity-0 xl:bg-white transform transition duration-400 
                            lg:group-hover:opacity-100 lg:group-hover:translate-y-8 lg:group-hover:after:opacity-0 lg:group-hover:after:translate-y-20
                            ">
                                    <Button radius="full" className="w-full h-[3rem] text-white text-[1.2rem] fond-semibold bg-red-600 shadow-[0px_-30px_25px_rgba(254,254,254,0.6)]">
                                        View detail
                                    </Button>
                                </div>

                            </CardFooter>
                        </Card>
                    </motion.div >
                    : <MenuCardSkeleton name={product.name} />
            }
        </Fragment >
    )
}

function MenuCardSkeleton(props: { name: string }) {
    const { name } = props;
    return (
        <div key={`skeleton_${name}`} className="animate-pulse border-solid border-1 rounded-lg max-w-[16.5rem] h-[17rem] max-md:max-w-[9rem] max-md:h-[13rem] mb-6 pr-10">
            {/* Skeleton for Image */}
            <div key={`${name}_image`} className="bg-gray-300 rounded-t-lg w-[16.5rem] h-[11rem] max-md:h-[7rem] max-md:max-w-[9rem]"></div>

            {/* Skeleton for Card Body */}
            <div key={`${name}_body`} className="flex flex-col p-4 gap-2">
                <div key={`${name}_price`} className="bg-gray-300 rounded-md h-6 w-2/3 max-md:h-4 max-md:w-[6rem]"></div> {/* Price skeleton */}
                <div key={`${name}_description`} className="bg-gray-300 h-6 w-full max-md:h-4  rounded-md"></div> {/* Description skeleton */}
            </div>
        </div>
    )
}