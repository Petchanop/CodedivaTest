'use client'

import Swensenlogo from "@/images/desktop-header-logo.svg";
import SwensenButtomlogo from "@/images/desktop-bottom-logo .svg";
import Mobilecart from "@/images/mobile-cart.svg"
import LanguageIcon from "@/images/change-language.svg"
import Image from "next/image";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/navbar";
import {Link} from '@/i18n/routing';
import { Button } from "@nextui-org/button";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown";
import { createElement, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Noto_Sans_Thai } from 'next/font/google';
import { Eye, EyeOff, Menu } from 'lucide-react';
import FacebookIcon from '@/images/social_media_icon/facebook-icon.svg';
import InstagramIcon from '@/images/social_media_icon/instagram-icon.svg';
import LineIcon from '@/images/social_media_icon/line-icon.svg';
import TiktokIcon from '@/images/social_media_icon/tiktok-icon.svg';
import AppleStoreIcon from '@/images/social_media_icon/app-store.webp';
import GooglePlayIcon from '@/images/social_media_icon/google-play.webp';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/modal";
import { Input } from "@nextui-org/input";
import { SubmitHandler, useForm } from "react-hook-form";

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
                <Link color="foreground" href="/">
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
                    <SignInModal buttonLabel={buttonLabel} />
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
            <div className="flex flex-col flex-wrap w-full bg-transparent bg-gray-800
            max-md:p-5 max-[650px]:justify-start ">
                <div className="xl:flex xl:flex-row flex-col flex-wrap space-y-2 justify-center md:pt-8 text-[1.1rem] font-bold max-md:space-y-4">
                    <div className="flex flex-shrink-0 sm:justify-center">
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
                    <div className="flex flex-row flex-wrap sm:px-8 xl:space-x-10 max-sm:gap-4 text-[1.125rem] justify-center items-center text-center leading-4
                    max-sm:justify-start max-sm:text-[0.875rem]">
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
                    <div className="flex flex-row flex-wrap gap-2 justify-center items-center max-sm:justify-start">
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
                <div className="flex flex-row text-lg mb-4 justify-center items-center max-xl:pt-4 max-sm:justify-start">
                    This site is use for Educational only.
                </div>
            </div>
        </>
    );
}

function SignInModal(props: { buttonLabel: string }) {
    const t = useTranslations("SignInModal");
    const { buttonLabel } = props;
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
            <Button radius="full" onPress={onOpen} className="h-[2.9rem] bg-[#d1001f] text-[1.15rem] text-white font-weight-900 tracking-normal p-3">
                <p className={`${NotoFont.className} m-1`}>{buttonLabel}</p>
            </Button>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                isDismissable={false} radius="sm"
                className="w-[25.5rem] h-[32.5rem]"
            >
                <ModalContent>
                    <ModalHeader className="flex flex-col px-8 pt-8 text-black text-[1.8rem] leading-9">
                        {t('Header').split('\n').map((line) => {
                            return <>
                                <p>{line}</p>
                            </>
                        })}
                    </ModalHeader>
                    <ModalBody>
                        <LoginForm
                            Email={t('Email')}
                            Password={t('Password')}
                            ForgetPassword={t('ForgetPassword')}
                            Signin={t('Signin')}
                            Footer={t('Footer')}
                            Signup={t('Signup')}
                            onOpenChange={onOpenChange}
                        />
                    </ModalBody>
                    <ModalFooter>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

type TLoginFormWord = {
    Email: string;
    Password: string;
    ForgetPassword: string;
    Signin: string;
    Signup: string;
    Footer: string;
    onOpenChange: () => void;
}

type TLoginForm = {
    email: string;
    password: string;
}

import {routing} from '@/i18n/routing';
function LoginForm(props: TLoginFormWord) {
    const { Email, Password, ForgetPassword, Signin, Signup, Footer, onOpenChange } = props;
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const { register, handleSubmit } = useForm<TLoginForm>();

    const onSubmit: SubmitHandler<TLoginForm> = (data: TLoginForm) => {
        console.log("Form Data: ", data);
        // Handle login logic here, e.g., API request
    };
    console.log(routing.locales);

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col px-2 text-black space-y-8"
        >
            <div key={Email} className="flex-col space-y-2">
                <p className="text-[0.9rem] font-semibold">{Email}  <span className="text-red-500">*</span></p>
                <Input
                    placeholder="Email"
                    variant="bordered"
                    size="lg" radius="sm"
                    className="h-[2.2rem]"
                    type="email"
                    {...register('email', { required: true })}
                />
            </div>
            <div key={Password} className="flex-col space-y-2">
                <p className="text-[0.9rem] font-semibold">{Password}  <span className="text-red-500">*</span></p>
                <Input
                    placeholder="Password"
                    variant="bordered"
                    size="lg" radius="sm"
                    type={showPassword ? "text" : "password"}
                    className="h-[2.2rem]"
                    {...register('password', { required: true })}
                />
                {createElement(showPassword ? Eye : EyeOff, {
                    className: "absolute top-1/2 translate-y-8 right-12",
                    onClick: () => setShowPassword(prev => !prev)
                })}

            </div>
            <div key={Footer} className="flex-col space-y-4">
                <Link href="#" className="font-semibold text-blue-500">
                    {ForgetPassword}
                </Link>
                <Button type="submit" radius="full" className="w-full h-[3rem] font-semibold text-[1.2rem] text-gray-400 bg-gray-200">
                    {Signin}
                </Button>
                <p className="text-center items-center">{Footer} <Link href="/register" onClick={() => onOpenChange()} className="font-semibold text-blue-500">{Signup}</Link></p>
            </div>

        </form>
    )
}

