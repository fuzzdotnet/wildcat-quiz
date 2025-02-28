import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white py-4 mt-auto">
      <div className="container mx-auto px-4 flex justify-center items-center gap-4 text-sm text-primary-500">
        <span>© {new Date().getFullYear()} FUZZ. All rights reserved.</span>
        <span>•</span>
        <Link 
          href="/privacy"
          target="_blank"
          className="hover:text-primary-600 underline"
        >
          Privacy Policy
        </Link>
      </div>
    </footer>
  );
} 