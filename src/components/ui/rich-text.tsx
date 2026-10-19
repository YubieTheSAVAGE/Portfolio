import { Highlight } from '@/components/ui/highlight'

/** Renders a string, turning ==marked== words into <Highlight>. */
export function RichText({ text }: { text: string }) {
  return text
    .split(/==(.+?)==/g)
    .map((part, i) => (i % 2 === 1 ? <Highlight key={i}>{part}</Highlight> : part))
}
