'use client'

import Swensenlogo from "@/images/desktop-header-logo.svg";
import SwensenButtomlogo from "@/images/desktop-bottom-logo .svg";
import Mobilecart from "@/images/mobile-cart.svg"
import LanguageIcon from "@/images/change-language.svg"
import Image from "next/image";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/navbar";
import Link from "next/link";
import { Button } from "@nextui-org/button";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Noto_Sans_Thai } from 'next/font/google';
import { Menu } from 'lucide-react';
import FacebookIcon from '@/images/social_media_icon/facebook-icon.svg';
import InstagramIcon from '@/images/social_media_icon/instagram-icon.svg';
import LineIcon from '@/images/social_media_icon/line-icon.svg';
import TiktokIcon from '@/images/social_media_icon/tiktok-icon.svg';
import AppleStoreIcon from '@/images/social_media_icon/app-store.webp';
import GooglePlayIcon from '@/images/social_media_icon/google-play.webp';

const NotoFont = Noto_Sans_Thai
    ({
        weight: '500',
        subsets: ['latin'],
    })

export default function SwensenNavbar({
    children,
    lang
}: Readonly<{
    children: React.ReactNode;
    lang: string
}>) {
    return (
        <>
            <Topbar lang={lang} />
            {children}
            <Bottombar />
        </>
    );
}

function LanguageSwitcher(props: { lang: string }) {
    const { lang } = props;
    const [Language, setLanguage] = useState<string>(lang);
    const router = useRouter();
    const pathname = usePathname();

    const baseSelectFontsize = "text-xl"
    const selectLanguageRender = `bg-red-200 ${baseSelectFontsize}`

    function changeLanguage(lang: string) {
        setLanguage(lang);
        console.log(pathname)
        router.push(`/${lang}`)
    }
    return (
        <>
            <Dropdown className="w-1">
                <DropdownTrigger>
                    <Button
                        variant="light"
                        size="md"
                        data-hover="false"
                        className="text-[1.3rem] text-center font-semibold text-gray-700"
                    >
                        <Image
                            src={LanguageIcon}
                            width={16}
                            height={17}
                            alt="world icon"
                            className="w-auto h-auto"
                        />
                        <p className="text-[1.1rem]">{Language.toLocaleUpperCase()}</p>
                    </Button>
                </DropdownTrigger>
                <DropdownMenu
                    aria-label="Static Actions"
                    onAction={(key) => changeLanguage(key as string)}
                    className="text-center text-black"
                >
                    <DropdownItem key="en" className={Language == "en" ? selectLanguageRender : baseSelectFontsize} >EN</DropdownItem>
                    <DropdownItem key="th" className={Language == "th" ? selectLanguageRender : baseSelectFontsize} >TH</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </>
    )
}

function HamburgerMenu() {
    const menuItems = [
        "Profile",
        "Settings",
        "Help & Feedback",
        "Log Out",
    ];
    return (
        <>
            <Dropdown className="w-1">
                <DropdownTrigger>
                    <Button
                        variant="light"
                        size="sm"
                        data-hover="false"
                        className="text-[1.2rem] text-center"
                    >
                        <Menu />
                    </Button>
                </DropdownTrigger>
                <DropdownMenu>
                    {menuItems.map((item, index) => (
                        <DropdownItem key={`${item}-${index}`} className="text-[#d1001f]">
                            <Link
                                className="w-full"
                                color="black"
                                href="#"
                            >
                                {item}
                            </Link>
                        </DropdownItem>
                    ))}
                </DropdownMenu>
            </Dropdown>
        </>
    )
}

export function Topbar(props: { lang: string }) {
    const { lang } = props;

    const ChangeTranslation = () => {
        const t = useTranslations('Topbar');
        return t('loginbutton');
    }
    const buttonLabel = ChangeTranslation()

    return (
        <Navbar position="sticky" isBlurred={false}
            classNames={{
                base: "pt-2 pb-2 drop-shadow",
                wrapper: "max-w-[93.5rem] mx-auto max-lg:w-[95rem]"
            }}>
            <NavbarContent className="lg:hidden">
                <HamburgerMenu />
            </NavbarContent>
            <NavbarBrand className="pl-5 max-sm:justify-center">
                <Link color="foreground" href="#">
                    <Image src={Swensenlogo}
                        width={142}
                        height={34}
                        alt="Swensen logo top bar"
                        priority={true}
                        className="w-auto h-auto"
                    />
                </Link>
            </NavbarBrand>
            <NavbarContent justify="end" className="sm:gap-1 pr-0">
                <NavbarItem isActive className="pr-5">
                    <Image
                        src={Mobilecart}
                        width={33}
                        height={35}
                        alt="Swensen mobile cart"
                        className="w-auto h-auto"
                    />
                </NavbarItem>
                <NavbarItem className="max-lg:hidden">
                    <Button radius="full" className="h-[2.9rem] bg-[#d1001f] text-[1.15rem] text-white font-weight-900 tracking-normal p-3">
                        <p className={`${NotoFont.className} m-1`}>{buttonLabel}</p>
                    </Button>
                </NavbarItem>
                <NavbarItem className="max-lg:hidden gap-0">
                    <LanguageSwitcher lang={lang} />
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
}

export function Bottombar() {
    return (
        <>
            <div className="flex flex-col flex-wrap w-full mx-auto bg-transparent bg-gray-800
            max-md:p-4 max-md:justify-start ">
                <div className="xl:flex xl:flex-row flex-col flex-wrap justify-center gap-16 md:pt-8 text-[1.1rem] font-bold max-md:space-y-4">
                    <div className="flex flex-shrink-0 md:justify-center">
                        <Link color="foreground" href="#">
                            <Image src={SwensenButtomlogo}
                                width={142}
                                height={34}
                                alt="Swensen logo buttom bar"
                                priority={true}
                                className="w-auto h-auto"
                            />
                        </Link>
                    </div>
                    <div className="flex flex-row flex-wrap gap-8 max-md:gap-6 max-md:text-[1rem] justify-center items-center text-center max-md:justify-start" >
                        <div className="flex-shrink-0">
                            <Link href="#">
                                About us
                            </Link>
                        </div>
                        <div className="flex-shrink-0">
                            <Link href="#">
                                Our Product
                            </Link>
                        </div>
                        <div className="flex-shrink-0">
                            <Link href="#">
                                Gift Voucher
                            </Link>
                        </div>
                        <div className="flex-shrink-0">
                            <Link href="#">
                                FAQ
                            </Link>
                        </div>
                        <div className="flex-shrink-0">
                            <Link href="#">
                                Terms and Conditions
                            </Link>
                        </div>
                        <div className="flex-shrink-0">
                            <Link href="#">
                                Privacy Policy
                            </Link>
                        </div>
                    </div>
                    <div className="flex flex-row flex-wrap gap-2 justify-center items-center max-md:justify-start">
                        <div className="flex-shrink-0">
                            <Link href="#">
                                <Image
                                    src={FacebookIcon}
                                    alt="Facebook Icon"
                                    width={34}
                                    height={34}
                                />
                            </Link>
                        </div>
                        <div className="flex-shrink-0">
                            <Link href="#">
                                <Image
                                    src={InstagramIcon}
                                    alt="Instagram Icon"
                                    width={34}
                                    height={34}
                                />
                            </Link>
                        </div>
                        <div className="flex-shrink-0">
                            <Link href="#">
                                <Image
                                    src={LineIcon}
                                    alt="Line Icon"
                                    width={34}
                                    height={34}
                                />
                            </Link>
                        </div>
                        <div className="flex-shrink-0">
                            <Link href="#">
                                <Image
                                    src={TiktokIcon}
                                    alt="Tiktok Icon"
                                    width={34}
                                    height={34}
                                />
                            </Link>
                        </div>
                        <div className="flex-shrink-0">
                            <Link href="#">
                                <Image
                                    src={AppleStoreIcon}
                                    alt="Apple Store Icon"
                                    width={96}
                                    height={31}
                                    className="w-auto h-auto"
                                />
                            </Link>
                        </div>
                        <div className="flex-shrink-0">
                            <Link href="#">
                                <Image
                                    src={GooglePlayIcon}
                                    alt="Google Play Store Icon"
                                    width={96}
                                    height={31}
                                    className="w-auto h-auto"
                                />
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row text-lg mb-4 justify-center items-center max-xl:pt-4 max-md:justify-start">
                    This site is use for Educational only.
                </div>
            </div>
        </>
    );
}

