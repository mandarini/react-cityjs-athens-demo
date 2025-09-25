import React from 'react';
import { Cat } from 'lucide-react';

// Interface for cat breed information
interface CatBreed {
  name: string;
  description: string;
  origin: string;
  characteristics: string[];
}

const CAT_BREEDS: CatBreed[] = [
  {
    name: 'Persian',
    description: 'Fluffy and regal, known for their round faces and luxurious coats.',
    origin: 'Iran (Persia)',
    characteristics: ['Long-haired', 'Calm temperament', 'Gentle nature']
  },
  {
    name: 'Siamese',
    description: 'Vocal and intelligent cats with distinctive color points.',
    origin: 'Thailand',
    characteristics: ['Vocal', 'Social', 'Blue eyes', 'Color point coat']
  },
  {
    name: 'Maine Coon',
    description: 'Large, friendly cats often called the gentle giants of the cat world.',
    origin: 'United States',
    characteristics: ['Very large', 'Fluffy coat', 'Sociable', 'Dog-like personality']
  },
  {
    name: 'British Shorthair',
    description: 'Chunky, round-faced cats with a teddy bear-like appearance.',
    origin: 'United Kingdom',
    characteristics: ['Sturdy build', 'Calm', 'Round face', 'Plush coat']
  },
  {
    name: 'Russian Blue',
    description: 'Sleek, silvery-blue cats with a mysterious and elegant demeanor.',
    origin: 'Russia',
    characteristics: ['Short, dense coat', 'Green eyes', 'Quiet', 'Intelligent']
  },
  {
    name: 'Bengal',
    description: 'Wild-looking cats with distinctive leopard-like spots and high energy.',
    origin: 'United States',
    characteristics: ['Spotted coat', 'Athletic', 'Intelligent', 'Loves water']
  }
];

const RandomFacts: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-center mb-6">
        <Cat className="w-10 h-10 mr-3 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-800">Fascinating Cat Breeds</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CAT_BREEDS.map((breed) => (
          <div 
            key={breed.name} 
            className="bg-white shadow-md rounded-lg p-6 border border-gray-100 hover:shadow-lg transition-shadow duration-300"
          >
            <h3 className="text-xl font-semibold text-blue-700 mb-3">{breed.name}</h3>
            <p className="text-gray-600 mb-4">{breed.description}</p>
            <div className="space-y-2">
              <p className="text-sm">
                <span className="font-medium text-gray-700">Origin:</span> {breed.origin}
              </p>
              <div>
                <span className="font-medium text-gray-700 text-sm">Characteristics:</span>
                <ul className="list-disc list-inside text-gray-600 text-sm pl-2">
                  {breed.characteristics.map((char) => (
                    <li key={char}>{char}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RandomFacts;