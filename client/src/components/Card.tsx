import { forwardRef, useEffect, useRef } from "react";
import { download } from "../assets";
import { downloadImage } from "../utils";
import { useObserver } from "../hooks/useObserver";

interface CardProps {
  _id: string;
  name: string;
  prompt: string;
  photoUrl: string;
  isLast: boolean;
  nextPage: () => void;
}

export const Card = forwardRef(
  ({ _id, name, prompt, photoUrl, isLast, nextPage }: CardProps, ref: any) => {
    if (isLast) {
      console.log(_id, "is last");
    }
    const imageRef = useRef();
    useEffect(() => {
      if (!imageRef?.current) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (isLast && entry.isIntersecting) {
            console.log("visible");
            nextPage();
            observer.unobserve(entry.target);
          }
        },
        { rootMargin: "100px" }
      );
      observer.observe(imageRef.current);
    }, [imageRef, isLast]);
    return (
      <div className="rounded-xl group relative shadow-card hover:shadow-cardhover card min-h-5">
        <img
          className="w-full h-auto object-cover rounded-xl"
          src={photoUrl}
          alt={prompt}
          ref={imageRef}
        />
        <div className="group-hover:flex flex-col max-h-[94.5%] hidden absolute bottom-0 left-0 right-0 bg-[#10131f] bg-opacity-50 m-2 p-4 rounded-md">
          <p className="text-white text-md overflow-y-auto">{prompt}</p>
          <div className="mt-5 flex justify-between items-center gap-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full object-cover bg-indigo-400 flex justify-center items-center text-white text-xs font-bold">
                {name[0]}
              </div>
              <p className="text-white text-sm">{name}</p>
            </div>
            <button
              type="button"
              className="outline-none bg-transparent border-none"
              onClick={() => {
                downloadImage(_id, photoUrl);
              }}
            >
              <img
                src={download}
                alt="download"
                className="w-6 h-6 object-contain invert"
              />
            </button>
          </div>
        </div>
      </div>
    );
  }
);
