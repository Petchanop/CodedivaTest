import { getTranslations } from "next-intl/server";
import Menu641680 from "@/images/products/Icecream_cake/641680.webp";
import Menu641612 from "@/images/products/Icecream_cake/641612.webp";
import Menu641611 from "@/images/products/Icecream_cake/641611.webp";
import Menu641610 from "@/images/products/Icecream_cake/641610.webp";
import Menu641609 from "@/images/products/Icecream_cake/641609.webp";
import Menu1248 from "@/images/products/Icecream_cake/1248.webp";
import Menu1531 from "@/images/products/Icecream_cake/1531Nov23.webp";
import Menu1530 from "@/images/products/Icecream_cake/1530Nov23.webp";
import Menu1529 from "@/images/products/Icecream_cake/1529Nov23.webp";
import Menu6360835 from "@/images/products/Icecream_quartz/636083_5.webp";
import MenuButton from "./menubutton/menubutton";


const products = [
    {
        id: 0,
        src: Menu641680,
        price: 599,
        name: "Mini Bear",
        description: "Mini Bear Cake 1.5lbs."
    },
    {
        id: 1,
        src: Menu1248,
        price: 599,
        name: "Haloween cake",
        description: "Halloween Cake 1.5lbs."
    },
    {
        id: 2,
        src: Menu641610,
        price: 499,
        name: "Ice cream cake strawberry",
        description: "Ice Cream Cake Strawberry 1.5lbs."
    },
    {
        id: 3,
        src: Menu641609,
        price: 499,
        name: "Ice cream cake choco",
        description: "Ice Cream Cake Choco 1.5lbs."
    },
    {
        id: 4,
        src: Menu641612,
        price: 399,
        name: "Matcha Green Tea Choco Brownies",
        description: "Matcha Green Tea Choco Brownies 1.5lbs."
    },
    {
        id: 5,
        src: Menu641611,
        price: 499,
        name: "Double Thai Tea Brownies",
        description: "Double Thai Tea Brownies 1.5lbs."
    },
    {
        id: 6,
        src: Menu1529,
        price: 499,
        name: "Triple Flavors",
        description: "Triple Flavors Cake 3lbs."
    },
    {
        id: 7,
        src: Menu1530,
        price: 899,
        name: "Ultimate Chocolate",
        description: "Ultimate Chocolate Cake 3lbs."
    },
    {
        id: 8,
        src: Menu1531,
        price: 899,
        name: "Strawberry Delight",
        description: "Strawberry Delight Cake 3lbs."
    }
]

const iceCreamQuart = [
    {
        id: 0,
        src: Menu6360835,
        price: 369,
        name: "Ice Cream Quart",
        description: "Ice Cream Quart"
    }
]

const menuData = [
    {
        id: 1,
        name: "Ice Cream - Cake",
        products: products
    },
    {
        id: 2,
        name: "Ice Cream Quart (450g)",
        products: iceCreamQuart
    },

]

export default async function DeliveryMenu() {
    const t = await getTranslations('Deliverymenu');
    return (
        <>
            <h1 className="text-[1.8rem] font-semibold mb-4">{t('Header')}</h1>
            <div className="space-y-12">
                <MenuButton menu={menuData} />
            </div>
        </>
    )
}