import { z } from 'zod';

const allowedProjectTypes = [
  'Software Engineering',
  'App Solutions',
  'Product Design',
  'Product Management',
  'Platform Engineering',
  'System Integration',
  'Proof of Concept (PoC) Systems',
  'Artificial Intelligence (AI)',
  'Custom WordPress Development',
  'Other',
] as const;

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Name must contain at least 2 characters.')
    .max(80, 'Name must not exceed 80 characters.'),

  company: z
    .string()
    .trim()
    .max(100, 'Company must not exceed 100 characters.')
    .optional()
    .default(''),

  email: z
    .string()
    .trim()
    .email('Enter a valid email address.')
    .max(254, 'Email address is too long.')
    .transform((email) => email.toLowerCase()),

  projectType: z.enum(allowedProjectTypes, {
    error: 'Select a valid project type.',
  }),

  message: z
    .string()
    .trim()
    .min(20, 'Message must contain at least 20 characters.')
    .max(3000, 'Message must not exceed 3000 characters.'),

  // Hidden field used to catch simple spambots.
  website: z.string().max(0, 'Spam submission detected.').optional().default(''),
});

export type ContactInput = z.infer<typeof contactSchema>;