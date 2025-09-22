
'use server';
/**
 * @fileOverview A flow for getting route suggestions.
 *
 * - getRoutes - A function that returns route suggestions between two points.
 * - GetRoutesInput - The input type for the getRoutes function.
 * - GetRoutesOutput - The return type for the getRoutes function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const GetRoutesInputSchema = z.object({
  start: z.string().describe('The starting point of the journey.'),
  end: z.string().describe('The destination of the journey.'),
});
export type GetRoutesInput = z.infer<typeof GetRoutesInputSchema>;

const RouteDetailsSchema = z.object({
  summary: z.string().describe('A short summary of the route, like "via NH16".'),
  duration: z.string().describe('The estimated time for the route, e.g., "approx. 45 mins".'),
  details: z.string().describe('A more detailed description of the route, including major turns or roads.'),
  isSafest: z.boolean().describe('Whether this route is considered the safest.'),
  isFastest: z.boolean().describe('Whether this route is considered the fastest.'),
});
export type RouteDetails = z.infer<typeof RouteDetailsSchema>;

const GetRoutesOutputSchema = z.object({
  routes: z.array(RouteDetailsSchema),
});
export type GetRoutesOutput = z.infer<typeof GetRoutesOutputSchema>;

export async function getRoutes(input: GetRoutesInput): Promise<GetRoutesOutput> {
  return getRoutesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'getRoutesPrompt',
  input: { schema: GetRoutesInputSchema },
  output: { schema: GetRoutesOutputSchema },
  prompt: `You are a route planning expert. Given a starting point and a destination, your task is to provide 2-3 different route options. 
  
For each route, provide a summary, the estimated duration, and step-by-step details.
Analyze the routes and determine which one is the safest and which is the fastest.
Consider factors like traffic conditions, road types, and potential hazards when determining the safest route.

Starting Point: {{{start}}}
Destination: {{{end}}}

Provide at least two route options.
`,
});

const getRoutesFlow = ai.defineFlow(
  {
    name: 'getRoutesFlow',
    inputSchema: GetRoutesInputSchema,
    outputSchema: GetRoutesOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) {
      throw new Error('Failed to get route suggestions from the model.');
    }
    return output;
  }
);
