import { Button, Html } from "@react-email/components";

interface Props {
  name: string;
  email: string;
  url: string;
}
export function RegisterEmail({ name, email, url }: Props) {
  return (
    <Html lang="en">
      <p>{`Hello ${name}. Your email: ${email} was just registered at punchcodestudios.com`}</p>
      <Button href={url}>Click here, but don't really. its not safe.</Button>
      <p>Instead, just go back to the site and put this code in to validate.</p>
      <p>123-GGD-455</p>
    </Html>
  );
}
