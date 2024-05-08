"use client"

import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import Image from 'next/image'
import React, { useState } from 'react'
import { PhotoIcon } from '@heroicons/react/24/outline'
import { Button } from '@/components/ui/button'

const CarDetails = () => {
    const [imageSrc, setImageSrc] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleImageUpload = (event) => {
        const files = event.target.files;
        if (files.length + imageSrc.length > 4) {
            setErrorMessage('You can upload up to 4 images.');
            return;
        }
        setErrorMessage('');

        const updatedImages = [...imageSrc];
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const reader = new FileReader();
            reader.onloadend = () => {
                updatedImages.push(reader.result);
                setImageSrc(updatedImages);
            };
            reader.readAsDataURL(file);
        }
    };
    return (
        <div className="relative flex h-[100dvh] w-full items-center justify-center  bg-white">
            <div className="top-0 left-0 -translate-y-1/2 -translate-x-1/2 absolute h-[400px] w-[400px] bg-gradient-to-r from-violet-600 to-aqua-700 rounded-full z-10"></div>
            <div className="absolute h-[100dvh] w-full bg-gradient-to-br from-white/30 to-violet-400/50 z-20 backdrop-blur-3xl"></div>
            <div className="relative z-30 max-w-[700px] w-full flex flex-col items-center gap-2 text-center">
                <h1 className="text-4xl font-normal text-slate-900"><span className="font-bold text-violet-700">Enter Car Details</span></h1>
                <p className="text-lg font-normal text-zinc-600 mb-10">Fill the form</p>
                <div className="grid grid-cols-12 w-full gap-4 text-left">
                    <div className="col-span-6">
                        <Label htmlFor="model" className="font-bold text-base mb-1 block">Enter Car Model</Label>
                        <Input id="model" className="w-full min-h-12 !ring-0 !ring-offset-0 shadow-[0_2px_3px_0_rgba(0,0,0,0.1)] !mt-1 !mb-6" type="text" />
                    </div>
                    <div className="col-span-6">
                        <Label htmlFor="price" className="font-bold text-base mb-1 block">Enter Price</Label>
                        <Input id="price" className="w-full min-h-12 !ring-0 !ring-offset-0 shadow-[0_2px_3px_0_rgba(0,0,0,0.1)] !mt-1 !mb-6" type="number" />
                    </div>
                    <div className="col-span-6">
                        <Label htmlFor="phone" className="font-bold text-base mb-1 block">Enter Phone Number</Label>
                        <Input id="phone" className="w-full min-h-12 !ring-0 !ring-offset-0 shadow-[0_2px_3px_0_rgba(0,0,0,0.1)] !mt-1 !mb-6" type="number" />
                    </div>
                    <div className="col-span-6">
                        <Label className="font-bold text-base mb-1 block" htmlFor="city">Choose City</Label>
                        <Select id="city" className="w-full">
                            <SelectTrigger className="w-full min-h-12 !ring-0 !ring-offset-0 shadow-[0_2px_3px_0_rgba(0,0,0,0.1)] !mt-1 !mb-6">
                                <SelectValue placeholder="Select your City" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>City</SelectLabel>
                                    <SelectItem value="apple">Lahore</SelectItem>
                                    <SelectItem value="banana">Karachi</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="col-span-6">
                        <Label htmlFor="phone" className="font-bold text-base mb-2 block">Upload Pictures</Label>
                        <div className="gap-3 inline-flex">
                            <div className="group relative h-24 min-w-24 inline-flex items-center justify-center rounded-md border border-dashed border-slate-500 bg-white/50 transition-colors duration-200 ease-out hover:bg-violet-700/10 hover:border-violet-800 ">
                                <Input id="pictures" className="absolute h-full w-full inset-0 opacity-0 z-10 cursor-pointer" type="file" accept="image/*"
                                    onChange={handleImageUpload} />
                                <PhotoIcon className='h-8 w-8 group-hover:text-violet-700' />
                            </div>
                            <AspectRatio ratio={16 / 9}>
                                <Image
                                    src={imageSrc}
                                    alt="Image"
                                    className="rounded-md object-cover max-w-24 aspect-square"
                                    width={100}
                                    height={100}
                                />
                            </AspectRatio>
                        </div>
                    </div>
                    <div className="col-span-12">
                        <Button className="mt-2 text-lg font-bold min-w-40 min-h-14 rounded-full" type="submit">Add Car</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CarDetails