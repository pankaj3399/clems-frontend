import { Card, CardContent } from "@/components/ui/card";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import { useState } from "react";
import ContactModal from "./ContactModal";

function CarouselSection() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const openModal = () => {
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};
	return (
		<div className="w-full bg-[#2f3c69] py-4 mt-5">
			{/* <h1 className="text-white ml-4 font-semibold text-3xl">Our Client and Partners</h1> */}
			<div className="flex items-center justify-center">
				<Carousel
					opts={{
						align: "start",
					}}
					className="w-full max-w-sm md:max-w-lg lg:max-w-4xl"
				>
					<CarouselContent>
						{Array.from({ length: 1 }).map((_, index) => (
							// <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/2"></CarouselItem>
							<CarouselItem key={index}>
								<div className="p-1">
									<Card>
										<div className="py-4 px-2 font-bold text-xl text-center cursor-pointer" onClick={openModal}>
											<h1>Advert here. Contact us</h1>
										</div>
									</Card>
								</div>
							</CarouselItem>
						))}
					</CarouselContent>
					<CarouselPrevious />
					<CarouselNext />
					<ContactModal
						isOpen={isModalOpen}
						closeModal={closeModal}
						fromContact={true}
					/>
				</Carousel>
			</div>
		</div>
	);
}

export default CarouselSection;
