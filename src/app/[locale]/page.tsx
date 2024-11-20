import DeliveryBar from "@/components/deliverybar/deliverybar";
import DeliveryMenu from "@/components/deliverymenu/delivery_menu";
import Hightlight from "@/components/highlight/highlight";
import HighlightOftheDay from '@/images/banner_sw-banner.webp'
import { HightlightCarousel } from '@/components/highlight/carousel';
import HightlightWed from "@/images/hightlight/banner_sw-banner_wed.webp"
// import { getTranslations } from "next-intl/server";
const slides = [
  {
      id: 18955374,
      src: HighlightOftheDay,
  },
  {
    id: 18955374,
    src: HightlightWed,
  }
]

export default async function Home() {
  // const t = await getTranslations('Home');
  return (
    <>
      <div className="container flex flex-col pt-12 pl-6 m-auto max-md:justify-start max-w-[1200px] overflow-x-hidden overflow-y-hidden">
        <div className="pb-6">
          <DeliveryBar />
        </div>
        <div className="flex flex-col gap-2">
          <HightlightCarousel src={slides} />
        </div>
          <Hightlight />
          <DeliveryMenu />
      </div>
    </>
  );
}