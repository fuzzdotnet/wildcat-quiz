import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="w-full bg-white py-4">
      <div className="container mx-auto px-4">
        <Link href="/" className="block w-fit mx-auto">
          <Image
            src="/images/fuzz-wordmark.png"
            alt="FUZZ"
            width={120}
            height={40}
            priority
            className="h-auto"
          />
        </Link>
      </div>
    </header>
  );
} 