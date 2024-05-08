"use client";
// importing necessary functions
import axios from "axios"
import { useSession, signIn, signOut } from "next-auth/react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import React, { useState } from "react";
import { PhotoIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import toast, { Toaster } from 'react-hot-toast';


// Define your Zod schema
const schema = z.object({
  model: z.string().min(1),
  price: z.string(),
  phone: z.string().regex(/^\+?\d{1,15}$/, { message: "Invalid Phone number" }),
  city: z.string().min(1),
  no_of_copies: z.string().min(1).max(1),
  files: z.any()
});

const CarDetails = () => {
  // extracting data from usesession as session
  const [fileLimit, setFileLimit] = useState(1);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedFileUrls, setSelectedFileUrls] = useState([]);
  const [imageSrc, setImageSrc] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleImageUpload = (event) => {
    const files = event.target.files;
    if (files.length + imageSrc.length > 4) {
      setErrorMessage("You can upload up to 4 images.");
      return;
    }
    setErrorMessage("");

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

  const handleFileChange = (e, field) => {
    const files = Array.from(e.target.files).slice(0, fileLimit);
    const fileUrls = [];

    // Asynchronously read each file and generate a URL
    for (const file of files) {
      const fileUrl = URL.createObjectURL(file);
      // Remove the "blob:" prefix from the URL
      const cleanFileUrl = new URL(fileUrl).toString();
      fileUrls.push(cleanFileUrl);
    }
    setSelectedFileUrls(fileUrls)
    setSelectedFiles(files)
    field.onChange(files)
  };

  const removeImage = (index) => {
    // Remove the item at the given index from both arrays
    setSelectedFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
    setSelectedFileUrls(prevUrls => prevUrls.filter((_, i) => i !== index));
  }
  const handleLimitChange = (e) => {
    setFileLimit(parseInt(e, 10));
  };

  const form = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    data.files = selectedFiles
    setSubmitting(true);
    try {
      // Validate form data against the schema
      const response = await axios.post('/api/vehicle', data);
      console.log(response.data)
      if (response.status === 200) {
        toast.success("Car Added Successfully")
      } else {
        toast.error("Faild to Submit")
      }

      form.reset()
    } catch (error) {
      // If validation fails, log the validation errors
      console.error("Validation error:", error);
    }
    // setSubmitting(false);
  };

  return (
    <div className="relative flex min-h-[100vh] w-full items-center justify-center  bg-white py-5">
      <Toaster />
      <div className="top-0 left-0 -translate-y-1/2 -translate-x-1/2 absolute h-[400px] w-[400px] bg-gradient-to-r from-violet-600 to-aqua-700 rounded-full z-10"></div>
      <div className="absolute h-full w-full bg-gradient-to-br from-white/30 to-violet-400/50 z-20 backdrop-blur-3xl"></div>
      <div className="relative z-30 max-w-[700px] w-full flex flex-col items-center gap-2 text-center px-5">
        <h1 className="text-4xl font-normal text-slate-900">
          <span className="font-bold text-violet-700">Enter Car Details</span>
        </h1>
        <p className="text-lg font-normal text-zinc-600 mb-10">Fill the form</p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-12 w-full lg:gap-4 gap-0 text-left"
          >
            <div className="lg:col-span-6 col-span-12">
              <FormField
                name="model"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-base mb-1 block">
                      Enter Car Model
                    </FormLabel>
                    <Input
                      id="model"
                      className="w-full min-h-12 !ring-0 !ring-offset-0 shadow-[0_2px_3px_0_rgba(0,0,0,0.1)] !mt-1 !mb-0"
                      type="text"
                      onChange={field.onChange}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="lg:col-span-6 col-span-12">
              <FormField
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-base mb-1 block">
                      Enter Price
                    </FormLabel>
                    <Input
                      id="price"
                      className="w-full min-h-12 !ring-0 !ring-offset-0 shadow-[0_2px_3px_0_rgba(0,0,0,0.1)] !mt-1 !mb-0"
                      type="number"
                      min={1}
                      onChange={field.onChange}
                      {...field}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="lg:col-span-6 col-span-12">
              <FormField
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-base mb-1 block">
                      Enter Phone Number
                    </FormLabel>
                    <Input
                      id="phone"
                      name="phone"
                      onChange={field.onChange}
                      className="w-full min-h-12 !ring-0 !ring-offset-0 shadow-[0_2px_3px_0_rgba(0,0,0,0.1)] !mt-1 !mb-0"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="lg:col-span-6 col-span-12">
              <FormField
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      className="font-bold text-base mb-1 block"
                      htmlFor="city"
                    >
                      Choose City
                    </FormLabel>
                    <Select
                      id="city"
                      onValueChange={field.onChange}
                      name="city"
                      className="w-full"
                    >
                      <SelectTrigger className="w-full min-h-12 !ring-0 !ring-offset-0 shadow-[0_2px_3px_0_rgba(0,0,0,0.1)] !mt-1 !mb-0">
                        <SelectValue placeholder="Select your City" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>City</SelectLabel>
                          <SelectItem value="lahore">Lahore</SelectItem>
                          <SelectItem value="karachi">Karachi</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="lg:col-span-6 col-span-12">
              <FormField
                name="no_of_copies"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-base mb-1 block">
                      No of Copies
                    </FormLabel>
                    <Select
                      onValueChange={(e) => {
                        console.log(e);
                        field.onChange(e);
                        handleLimitChange(e);
                      }}
                      defaultValue={field}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full min-h-12 !ring-0 !ring-offset-0 shadow-[0_2px_3px_0_rgba(0,0,0,0.1)] !mt-1 !mb-0">
                          <SelectValue placeholder="Select no. of copies" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="3">3</SelectItem>
                        <SelectItem value="4">4</SelectItem>
                        <SelectItem value="5">5</SelectItem>
                        <SelectItem value="6">6</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

            </div>
            <div className="col-span-12">
              <Label htmlFor="phone" className="font-bold text-base mb-2 block mt-3">
                Upload Pictures
              </Label>
              <div className="gap-3 flex flex-wrap">
                <div className="group relative h-24 min-w-24 inline-flex items-center justify-center rounded-md border border-dashed border-slate-500 bg-white/50 transition-colors duration-200 ease-out hover:bg-violet-700/10 hover:border-violet-800 ">
                  <FormField
                    name="files"
                    render={({ field }) => (
                      <FormItem>
                        <Input
                          id="pictures"
                          className="absolute h-full w-full inset-0 opacity-0 z-10 cursor-pointer"
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={(e) => {
                            handleFileChange(e, field)
                          }}
                        />
                        <PhotoIcon className="h-8 w-8 group-hover:text-violet-700" />
                      </FormItem>
                    )}
                  />
                </div>
                {selectedFileUrls.map((file, index) => (
                  <div key={index} className="relative inline-flex">
                    <span key={index} onClick={() => removeImage(index)} className="h-5 w-5 inline-flex items-center justify-center bg-red-700 rounded-full absolute right-0 top-0 translate-x-1/2 -translate-y-1/2 cursor-pointer">
                      <XMarkIcon className="text-white h-3 w-3" />
                    </span>
                    <Image
                      src={file}
                      alt="Image"
                      className="rounded-md object-cover max-w-24 aspect-square"
                      width={100}
                      height={100}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="col-span-12">
              <Button
                className="lg:mt-2 mt-6 text-lg font-bold min-w-40 min-h-14 rounded-full"
                type="submit"
              >
                Add Car
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CarDetails;
