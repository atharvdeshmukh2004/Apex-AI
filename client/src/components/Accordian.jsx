import React from 'react'
import { faqs } from "../../data/faqs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { LuArrowRight } from 'react-icons/lu';


function Accordian() {
    return (
      <section>
        <div className="flex flex-col justify-center items-center min-h-screen px-4">
          <h1 className="text-4xl font-bold mb-6 text-center">
            Frequently Asked Questions
          </h1>

          <div className="w-full max-w-4xl">
            <Accordion type="single" collapsible className="w-full mt-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border-b"
                >
                  <AccordionTrigger className="text-lg font-medium">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 mt-2">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
        <section>
          <div >
            <div className="">
              <h2
                className="text-2xl font-bold md:text-38xl lg:text-4xl xl:text-6xl max-w-8xl mt-5 
               bg-gradient-to-r from-blue-600 to-purple-600  
               bg-clip-text text-transparent"
              >
                Ready to Accelearte Your Career
              </h2>
              <p className=" mt-4 md:text-base font-bold text-black mb-8 max-w-8xl">
                Join us today and take the first step towards a brighter
                professional future!
              </p>
              <button class="bg-gradient-to-r from-green-500 to-blue-300  text-black font-semibold py-2 px-4 rounded mt-2">
                Get Started <LuArrowRight className="inline-block ml-2" />
              </button>
            </div>
          </div>
        </section>
      </section>
    );
}

export default Accordian