import React from 'react'
import { features } from '../../data/feature';
import { Card, CardContent} from '@/components/ui/card';
import Accordian from './Accordian';


function Features() {
  return (
    <div>
      <h1 className="mt-10 font-bold text-3xl">
        Powerful Features For Your Career Growth
      </h1>
      <div className="w-full py-8 md:py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 px-4 gap-4 text-center">
          {features.map((feature, index) => {
            return (
              <Card
                key={feature.id ?? index}
                className="border-2 border-grey-200 rounded-lg p-6 hover:bg-gradient-to-l  from-green-100 to-blue-100 transition-shadow duration-300"
              >
                <CardContent>
                  <div className="flex flex-col items-center mt-2">
                    {feature.icon}
                    <p className="text-xl ">
                      {feature.title ?? "Card Content"}
                    </p>
                    <h3 className="text-muted-foreground mt-1">
                      {feature.description ?? "Card Description"}
                    </h3>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
        <Accordian />
      </div>
    </div>
  );
}

export default Features