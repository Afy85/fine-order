This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Development Guidelines

### Image Handling

This project enforces strict image handling safety. **Do not use `next/image` directly.**

Instead, use the `SafeImage` component located at `src/components/ui/SafeImage.tsx`.

```tsx
// ❌ Incorrect
import Image from 'next/image';
<Image src={maybeNullSrc} ... />

// ✅ Correct
import SafeImage from '@/components/ui/SafeImage';
<SafeImage src={maybeNullSrc} ... />
```

The `SafeImage` component:
1. Uses a native `<img>` tag to avoid `next/image` runtime errors with null sources.
2. Automatically falls back to a placeholder image (`https://placehold.co/600x400`) if the `src` is null, undefined, or an empty string.
3. Supports standard `img` attributes and `className`.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
