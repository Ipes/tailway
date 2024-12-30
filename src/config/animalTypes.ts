// src/config/animalTypes.ts

export type AnimalType = 'dog' | 'cat' | 'bird'

interface AnimalGuideContent {
  title: string;
  description: string;
  steps: {
    id: number;
    title: string;
    description: string;
    checkPoints: string[];
  }[];
  safetyTips: string[];
  flowChart: string;
}

export const SUPPORTED_ANIMALS: Record<AnimalType, boolean> = {
  dog: true,
  cat: true,
  bird: true,
}

export const getAnimalGuideContent = (animalType: string | undefined): AnimalGuideContent | null => {
  console.log('Getting guide content for:', animalType);
  
  if (!animalType) {
    console.log('No animal type provided');
    return null;
  }
  
  const type = animalType.toLowerCase() as AnimalType;
  console.log('Normalized animal type:', type);
  console.log('Is supported:', SUPPORTED_ANIMALS[type]);
  
  if (!SUPPORTED_ANIMALS[type]) {
    console.log('Animal type not supported:', type);
    return null;
  }

  const guides: Record<AnimalType, AnimalGuideContent> = {
    dog: {
      title: 'Helping a Dog in Distress',
      description: 'Step-by-step guide for safely assisting a dog in need',
      steps: [
        {
          id: 1,
          title: 'Assess the Situation',
          description: 'Before approaching, observe the dog\'s behavior from a safe distance:',
          checkPoints: [
            'Check for signs of aggression (growling, bared teeth, raised fur)',
            'Look for visible injuries or signs of distress',
            'Note the surrounding environment and potential hazards'
          ]
        }
      ],
      safetyTips: [
        'Approach slowly and calmly',
        'Avoid direct eye contact',
        'Keep your movements predictable',
        'Let the dog sniff your closed hand before touching'
      ],
      flowChart: `
        flowchart TD
          A[Found a Dog] --> B{Is the dog approachable?}
          B -->|Yes| C[Check for collar/ID]
          B -->|No| D[Keep distance and call professional help]
          C -->|Has ID| E[Contact owner]
          C -->|No ID| F[Check for injury]
          F -->|Injured| G[Contact emergency vet]
          F -->|Not injured| H[Take to check for microchip]
      `
    },
    cat: {
      // Cat specific content would go here
      title: 'Helping a Cat in Distress',
      description: 'Step-by-step guide for safely assisting a cat in need',
      steps: [
        {
          id: 1,
          title: 'Assess the Situation',
          description: 'Before approaching, observe the cat\'s behavior from a safe distance:',
          checkPoints: [
            'Check for signs of fear or aggression',
            'Look for visible injuries',
            'Check if the cat appears to be feral or domesticated'
          ]
        }
      ],
      safetyTips: [
        'Never chase or corner the cat',
        'Approach very slowly and quietly',
        'Use gentle, soft voices',
        'Have a carrier or box ready if needed'
      ],
      flowChart: `
        flowchart TD
          A[Found a Cat] --> B{Is the cat trapped/injured?}
          B -->|Yes| C[Assess injury severity]
          B -->|No| D[Check for collar]
      `
    },
    bird: {
      // Bird specific content would go here
      title: 'Helping a Bird in Distress',
      description: 'Step-by-step guide for safely assisting a bird in need',
      steps: [
        {
          id: 1,
          title: 'Assess the Situation',
          description: 'Before approaching, carefully observe the bird:',
          checkPoints: [
            'Check if the bird is injured or stunned',
            'Look for signs of illness',
            'Determine if it\'s a baby bird or adult'
          ]
        }
      ],
      safetyTips: [
        'Wear gloves if possible',
        'Handle the bird as little as possible',
        'Keep the bird warm and in a quiet place',
        'Do not attempt to feed the bird'
      ],
      flowChart: `
        flowchart TD
          A[Found a Bird] --> B{Is the bird injured?}
          B -->|Yes| C[Contact wildlife rescue]
          B -->|No| D[Is it a baby bird?]
      `
    }
  };

  return guides[type];
}