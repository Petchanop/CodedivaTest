'use client'

import { Input, useDisclosure } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@nextui-org/modal';
import { Button } from '@nextui-org/button';
import { MapPin, ChevronDownIcon, ChevronLeftIcon } from "lucide-react";
import Choosefromaddress from "@/images/choose_from_address.svg";
import Emptyaddress from "@/images/empty-address-list.webp";
import { AdvancedMarker, APIProvider, Map, MapCameraChangedEvent, MapEvent, useMapsLibrary } from "@vis.gl/react-google-maps";
import { useState } from "react";

const GOOGLE_MAPS_API_KEY = "AIzaSyCjziWTugM60Sc5zK6W7LF6C7gwFr1VZN8";

export default function DeliveryBar() {
	const t = useTranslations('Deliverybar')
	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	return (
		<>
			<div className="flex flex-row items-center lg:space-x-6 w-full max-lg:flex-col max-lg:items-start max-lg:space-y-4">
				<p className="min-w-[108px] text-[1.2rem] font-semibold">{t('deliveryto')}</p>
				<Button radius="sm" onPress={onOpen} className="w-[1020px] py-6 text-[1.2rem] justify-start max-md:text-[0.8rem] max-md:w-[90vw] font-semibold bg-gray-100 ">
					<MapPin size={18} />
					{t('Selectaddress')}
					<ChevronDownIcon className="absolute right-5" size={16} />
				</Button>
			</div>
			<Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} radius="sm" size="2xl" className="p-4">
				<ModalContent>
					<ModalHeader className="flex flex-col gap-1 py-8">
						<p className="text-[1.5rem] text-black">{t('Selectdeliveryaddress')}</p>
						<div className="flex flex-row pt-8 items-center space-x-24">
							<p className="text-[1.25rem] text-gray-500 font-semibold">{t('Saveaddress')}</p>
							<SelectAddress />
						</div>
					</ModalHeader>
					<ModalBody className="mb-16 h-50vh items-center">
						<Image
							src={Emptyaddress}
							width={130}
							height={200}
							alt="no address"
						/>
						<p className="text-[1.25rem] text-gray-500 font-semibold pt-6">{t('Nosaveaddress')}</p>
					</ModalBody>
					<ModalFooter />
				</ModalContent>
			</Modal>
		</>
	)
}

function SelectAddress() {
	const t = useTranslations('Deliverybar');
	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	return (
		<>
			<Button radius="sm" onPress={onOpen} variant="light" className="absolute right-5">
				<Image
					src={Choosefromaddress}
					width={18}
					height={18}
					alt="Choose from address"
				/>
				<p className="text-[1.25rem] text-blue-400 font-semibold">{t('Choosefrommap')}</p>
			</Button>
			<Modal
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				isDismissable={false} radius="sm" size="2xl"
				className="h-[46rem]"
			>
				<ModalContent>
					<ModalHeader className="flex flex-col gap-4 py-9">
						<div className="flex flex-row">
							<ChevronLeftIcon size={32} color="black" />
							<p className="pl-2 text-[1.5rem] text-black">{t('Selectdeliveryaddress')}</p>
						</div>
						<Input
							type="text"
							placeholder="Search Location"
							variant="flat"
							className="max-w-[74vw] max-h-[20rem]"
						/>

					</ModalHeader>
					<ModalBody>
						<APIProvider apiKey={GOOGLE_MAPS_API_KEY} onLoad={() => console.log('Maps API has loaded.')}>
							<CustomMap />
						</APIProvider>
					</ModalBody>
					<ModalFooter>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	)
}

type Poi = { key: string, location: google.maps.LatLngLiteral }

function CustomMap() {
	// shows marker on London by default
	//13.7563° N, 100.5018° E
	const t = useTranslations('Deliverybar');
	const [markerLocation, setMarkerLocation] = useState({
		lat: 13.7563,
		lng: 100.5018,
	});

	const [address, setAddress] = useState<string>("");
	const [addressHeader, setAddressHeader] = useState<string>("");
	const [saveAddress, setSaveAddress] = useState<string>("");;
	const geocodelib = useMapsLibrary('geocoding');
	let geocoder: google.maps.Geocoder
	if (geocodelib) {
		geocoder = new geocodelib.Geocoder();
	}

	const location: Poi = { key: "Bangkok", location: { lat: 13.7563, lng: 100.5018, } }
	return (
		<>
			<div className="h-[20rem] w-[38.5rem] border-1 rounded-lg">
				<Map
					style={{ borderRadius: "20px" }}
					defaultZoom={13}
					defaultCenter={markerLocation}
					gestureHandling={"greedy"}
					mapId="55546d948dbeb7e3"
					onCameraChanged={(ev: MapCameraChangedEvent) => {
						setMarkerLocation(ev.detail.center);
					}}
					onDragend={async (ev: MapEvent) => {
						const pos: Poi = {
							key: "",
							location: {
								lat: ev.map.getCenter()?.lat() as number,
								lng: ev.map.getCenter()?.lng() as number
							}
						}
						setMarkerLocation(pos.location);
						if (geocoder) {
							const address = await geocoder.geocode({ location: markerLocation });
							const addressHeader = address.results[0].address_components.length > 2
								? address.results[0].address_components.slice(0, 2).map(obj => obj.short_name).join(' ') : "";
							const formatAddress = address.results[0].address_components.length > 2
								? address.results[0].address_components.slice(2, address.results[0].address_components.length).map(obj => obj.short_name).join(' ')
								: "";
							setAddressHeader(addressHeader);
							setAddress(formatAddress);
						}
					}}
				>
					<AdvancedMarker key={location.key} position={markerLocation} />
				</Map>
			</div>
			{
				address ?
					<div className="flex flex-col p-4 space-y-2">
						<p className="text-[1.5rem] text-black font-semibold">{t('SelectAddressHeader')}</p>
						<div className="flex flex-row space-x-4">
							<div className="flex flex-col">
								<MapPin size={38} fill="red" />
							</div>
							<div className="flex flex-col pt-2 text-black text-[1.2rem] font-semibold col-span-2 content-center space-y-2">
								{addressHeader}
								<div className="text-gray-500 text-[1rem] font-normal">
									{address}
								</div>
							</div>
						</div>
						<Button radius="full" className="w-full bg-red-600 text-[1rem] text-white font-semibold" onPress={() => {
							setSaveAddress(`${addressHeader} ${address}`);
							console.log(saveAddress);
						}}>Choose this location</Button>
					</div >
					: <></>
			}

		</>
	);
}
