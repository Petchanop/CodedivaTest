'use client'

import { Fragment, useEffect, useState } from "react";
import { StaticImageData } from 'next/image';
import { Image } from '@nextui-org/image';
import { LoadingPage } from "@/lib/utils";

interface ImageCarousel {
  src: StaticImageData;
  id: number;
}

interface hightlightCarousel {
  src: ImageCarousel[];
}

export function HightlightCarousel(props: hightlightCarousel) {
  const { src } = props;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState<boolean>(true);

  function clickSlide(index: number) {
    console.log("press carousel", index);
    // setLoading(true);
    setCurrentIndex(index)
  };

  useEffect(() => {
    LoadingPage(setLoading, 1000);
  }, [loading])

  const selectBannerCss = "rounded-full bg-red-600 w-3 h-3";
  const BannerCss = "rounded-full bg-gray-400 w-3 h-3";

  return (
    <>
      {
        !loading ?
          src.map((item, index) => {
            return (
              <Fragment key={`fragment_${index}`}>
                {
                  index == currentIndex ?
                    (
                      <>
                        <Image
                          key={`image${index}`}
                          src={item.src.src}
                          width={1155}
                          height={287}
                          alt="Hightlight of the day."
                          className="w-auto h-auto rounded-3xl max-lg:w-[90vw] max-lg:max-h-[150px]"
                        />

                      </>
                    )
                    : <></>
                }
               
              </Fragment>
            )
          })
          : <HightlightSkeleton />
      }
      <div className="flex flex-row justify-center items-center mt-4 mb-4 space-x-2">
      {
        !loading ?
        src.map((_, index) => {
          return (
            <Fragment key={`fragment_button_${index}`}>
                  <div key={`div${index}`} className={index == currentIndex ? selectBannerCss : BannerCss } onClick={() => clickSlide(index)}></div>
            </Fragment>
          )
        })
        : <HightlightButtonSkeleton />
      }
      </div>
    </>
  )
}

function HightlightSkeleton() {
  return (
    <>
      <div className="animate-pulse">
          {/* Skeleton for Image */}
          <div className="bg-gray-300 w-[1155px] h-[287px] rounded-3xl max-lg:pb-4 max-lg:max-w-[90vw] max-lg:max-h-[150px]"></div>
      </div>
    </>
  )
}

function HightlightButtonSkeleton() {
  return (
    <>
      <div className="animate-pulse">
          {/* Skeleton for Button */}
          <div className="rounded-full bg-gray-300 w-3 h-3"></div>
      </div>
    </>
  )
}