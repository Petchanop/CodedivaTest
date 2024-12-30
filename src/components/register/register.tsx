'use client'

import { Button } from "@nextui-org/button";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ChevronLeftIcon from "@/images/icons/chevron_left.svg";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { createElement, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
// import { routig } from '@/i18n/routing';
import { Input } from "@nextui-org/input";
import { Eye, EyeOff } from "lucide-react";
import { CalendarDate } from "@internationalized/date";
import { DatePicker } from "@nextui-org/date-picker";
import { Radio, RadioGroup } from "@nextui-org/radio";
import { Divider } from "@nextui-org/react";
import { SwensenCheckbox } from "@/components/swensencheckbox/swensen_checkbox";

type TGender = {
  Gender: string,
  Male: string,
  Female: string,
  NotSpecific: string
}

export default function RegisterComponent() {
  const t = useTranslations("RegisterPage");
  const router = useRouter()
  return (
    <>
      <div className="flex flex-row justify-between items-center max-md:hidden">
        <Button onPress={() => router.back()} variant="light" className="p-0">
          <Image
            src={ChevronLeftIcon}
            alt="Chevron left"
          />
          <p className="text-[1.2rem] font-semibold">{t('Back')}</p>
        </Button>
        <div className="flex flex-row items-center gap-2">
          <p className="text-[1.2rem] font-semibold">{t('Signin')}</p>
          <Button radius="full" variant="bordered" className="w-[6rem] h-[3rem] border-red-500 text-red-500 text-[1.1rem] font-semibold bg-white">{t('SigninButton')}</Button>
        </div>
      </div>
      <Card className="md:pt-12 pt-4 md:px-8 px-2 xl:w-[35.5rem] w-full xl:h-[77.5vh] shadow-sm"> 
        <CardHeader className="max-md:flex max-md:flex-col max-md:items-start text-[1.7rem] font-semibold xl:whitespace-pre-line leading-tight pt-0 px-0">
        <Button onPress={() => router.back()} variant="light" className="md:hidden py-8">
          <Image
            src={ChevronLeftIcon}
            alt="Chevron left"
          />
          <p className="text-[1.2rem] text-gray-600 font-semibold text-sm">{t('Back')}</p>
        </Button>
          <p className="pl-4">{t('Header')}</p>
        </CardHeader>
        <CardBody className="relative inset-x-0 -top-1">
          <RegisterForm
            FirstName={t('Firstname')}
            LastName={t('Lastname')}
            Email={t('Email')}
            Password={t('Password')}
            DateOfBirth={t('DateOfBirth')}
            PhoneNumber={t('PhoneNumber')}
            Gender={{
              Gender: t('Gender'),
              Male: t('Male'),
              Female: t('Female'),
              NotSpecific: t('NotSpecific')
            } as TGender}
            Term={t('TermAndConditions')}
            Inform={t('ReceiveInformation')}
            CreateButton={t('CreateAccount')}
          />
        </CardBody>
      </Card>
    </>
  )
}

enum Gender {
  Male,
  Female,
  NotSpecified
}

type TRegisterLabel = {
  FirstName: string;
  LastName: string;
  Email: string;
  Password: string;
  DateOfBirth: string;
  PhoneNumber: string;
  Gender: TGender;
  Term: string;
  Inform: string;
  CreateButton: string;
}

export type TRegisterForm = {
  FirstName: string;
  LastName: string;
  Email: string;
  Password: string;
  DateOfBirth: Date;
  PhoneNumber: number;
  Gender: Gender,
  AcceptPolicy: boolean;
  AcceptData: boolean;
}

function RegisterForm(props: TRegisterLabel) {
  const { FirstName, LastName, Email, Password, DateOfBirth, PhoneNumber, Gender, Term, Inform, CreateButton } = props;
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { register, handleSubmit, control } = useForm<TRegisterForm>();

  const onSubmit: SubmitHandler<TRegisterForm> = (data: TRegisterForm) => {
    console.log("Form Data: ", data);
  };

  const AcceptPolicy = register('AcceptPolicy', { required: true });
  const AcceptData = register('AcceptData', { required: true });
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col text-black overflow-y-hidden overflow-x-hidden"
    >
      <div className="space-y-6 text-[0.85rem]">
        <div className="flex lg:flex-row flex-col gap-4 max-md:space-y-2">
          <div key={FirstName} className="space-y-2">
            <p className="font-semibold">{FirstName}  <span className="text-red-500">*</span></p>
            <Input
              placeholder={FirstName}
              variant="bordered"
              size="lg" radius="sm"
              className="xl:w-[14.5rem] h-[2.2rem]"
              type="text"
              {...register('FirstName', { required: true })}
            />
          </div>
          <div key={LastName} className="space-y-2">
            <p className="text-[0.9rem] font-semibold">{LastName}  <span className="text-red-500">*</span></p>
            <Input
              placeholder={LastName}
              variant="bordered"
              size="lg" radius="sm"
              className="xl:w-[14.5rem] h-[2.2rem]"
              type="text"
              {...register('LastName', { required: true })}
            />
          </div>
        </div>
        <div className="flex lg:flex-row flex-col gap-4 max-md:space-y-2">
          <div key={Email} className="space-y-2">
            <p className="text-[0.9rem] font-semibold">{Email}  <span className="text-red-500">*</span></p>
            <Input
              placeholder={Email}
              variant="bordered"
              size="lg" radius="sm"
              className="xl:w-[14.5rem] h-[2.2rem]"
              type="email"
              {...register('Email', { required: true })}
            />
          </div>
          <div key={Password} className="space-y-2">
            <p className="text-[0.9rem] font-semibold">{Password}  <span className="text-red-500">*</span></p>
            <Input
              placeholder={Password}
              variant="bordered"
              size="lg" radius="sm"
              type={showPassword ? "text" : "password"}
              className="xl:w-[14.5rem] h-[2.2rem]"
              endContent={
                createElement(showPassword ? Eye : EyeOff, {
                  onClick: () => setShowPassword(prev => !prev)
                })
              }
              {...register('Password', { required: true })}
            />
          </div>
        </div>
        <div className="flex lg:flex-row flex-col gap-4">
          <div key={DateOfBirth} className="space-y-2">
            <p className="text-[0.9rem] font-semibold">{DateOfBirth}  <span className="text-red-500">*</span></p>
            <Controller
              name="DateOfBirth"
              control={control}
              render={({ field }) => (
                <DatePicker variant="bordered" radius="sm"
                  isRequired placeholderValue={new CalendarDate(1995, 11, 6)}
                  showMonthAndYearPickers
                  className=" [&>[data-slot='input-wrapper']]:h-[3rem] xl:w-[14.5rem]"
                  aria-label="Date of Birth"
                  onChange={field.onChange}
                />
              )
              } />
          </div>
          <div key={PhoneNumber} className="space-y-2">
            <p className="text-[0.9rem] font-semibold">{PhoneNumber}  <span className="text-red-500">*</span></p>
            <Input
              placeholder={PhoneNumber}
              variant="bordered"
              size="lg" radius="sm"
              className="h-[2.2rem] xl:w-[14.5rem]"
              type="text"
              {...register('PhoneNumber', { required: true })}
            />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <p className="text-[0.9rem] font-semibold">{Gender.Gender} <span className="text-red-500">*</span></p>
          <RadioGroup
            // orientation="horizontal"
            classNames={{
              wrapper: "md:gap-10 font-semibold flex md:flex-row flex-col"
            }}
          >
            <Radio size="sm" value="Male">{Gender.Male}</Radio>
            <Radio size="sm" value="Female">{Gender.Female}</Radio>
            <Radio size="sm" value="Not specific">{Gender.NotSpecific}</Radio>
          </RadioGroup>
          <Divider className="my-0" />
        </div>
      </div>
      <div className="flex flex-col pt-4 space-y-3 xl:items-center pb-6">
        <SwensenCheckbox name={AcceptPolicy.name} onChange={AcceptPolicy.onChange} inputRef={AcceptPolicy.ref}>{Term}</SwensenCheckbox>
        <SwensenCheckbox name={AcceptData.name} onChange={AcceptData.onChange} inputRef={AcceptData.ref}>{Inform}</SwensenCheckbox>
        <Button type="submit" radius="full" className="w-full h-[4.20rem] text-[1.45rem] font-semibold text-[#98A2B3] bg-[#D9DDE4]">{CreateButton}</Button>
      </div>
    </form>
  )
}