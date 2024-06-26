"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import messages from "@/messages.json";
import { Mail, StarIcon } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import dayjs from "dayjs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const dummyReviews = [
  {
    id: 1,
    name: "John Doe",
    rating: 5,
    review: "Excellent service! Highly recommend.",
    createdDate: new Date("2023-05-10"),
  },
  {
    id: 2,
    name: "Jane Smith",
    rating: 4,
    review: "Good experience overall.",
    createdDate: new Date("2023-06-15"),
  },
  {
    id: 3,
    name: "Michael Johnson",
    rating: 5,
    review: "Amazing platform for anonymous feedback.",
    createdDate: new Date("2023-07-20"),
  },
];

export default function Page() {
  return (
    <>
      <main className="flex-grow flex flex-col items-center justify-center px-4 md:px-24 py-12 bg-zinc-50 text-zinc-800">
        <section className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-5xl font-bold">
            Dive into the World of Anonymous Feedback
          </h1>
          <p className="mt-3 md:mt-4 text-base md:text-lg">
            Whisperella - Where your identity remains a secret.
          </p>
        </section>

        {/* Carousel for Messages */}
        <Carousel
          plugins={[Autoplay({ delay: 3000 })]}
          className="w-full max-w-lg md:max-w-xl"
        >
          <CarouselContent>
            {messages.map((message, index) => (
              <CarouselItem key={index} className="p-4">
                <Card>
                  <CardHeader className="">
                    <CardTitle>{message.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col md:flex-row items-start space-y-2 md:space-y-0 md:space-x-4">
                    <Mail className="flex-shrink-0" />
                    <div>
                      <p>{message.content}</p>
                      <p className="text-xs text-muted-foreground">
                        {message.received}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <div className="mt-8">
          <a
            href="https://github.com/shahbaz-athwal/next-concepts"
            target="_blank"
          >
            <Button className="text-white">Give a star on GitHub</Button>
          </a>
        </div>

        {/* Checkout my other projects on Portfolio Button */}
        {/* <div className="mt-4">
        Checkout my other projects on{' '}
        <Button className="text-black bg-slate-200" variant={'outline'}>
          Portfolio
        </Button>
      </div> */}

        <h2 className="text-2xl pt-8 font-bold mb-4 text-center">
          User Reviews
        </h2>
        <Carousel
      plugins={[Autoplay({ delay: 5000 })]}
      className="w-full max-w-lg md:max-w-xl"
    >
      <CarouselContent>
        {dummyReviews.map((review) => (
          <CarouselItem key={review.id} className="p-4">
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="flex justify-between items-center p-4">
                <div className="flex items-center">
                  <Avatar className="flex mr-2">
                    {"" ? (
                      <AvatarImage src={""} />
                    ) : (
                      <AvatarFallback className="bg-black text-white">
                        {review.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div className="flex flex-col">
                    <div className="text-sm font-bold">{review.name}</div>
                    <div className="flex items-center">
                      {[...Array(review.rating)].map((_, index) => (
                        <StarIcon
                        color="orange"
                        fill="yellow"
                          key={index}
                          className="w-5 h-5 text-yellow-500"
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  {dayjs(review.createdDate).format("MMM D, YYYY h:mm A")}
                </div>
              </div>
              <div className="p-4">
                <p>{review.review}</p>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
      </main>
      <Footer />
    </>
  );
}
