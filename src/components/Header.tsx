import { Link } from 'react-router-dom';
import { Calculator, Coffee } from 'lucide-react';
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 text-xl font-bold">
            <Calculator className="h-6 w-6" />
            <span>AI Excel Formula Generator</span>
          </Link>
          <div className="flex items-center space-x-6">
            <Link to="/" className="hover:text-primary">Home</Link>
            <Link to="/about" className="hover:text-primary">About</Link>
            <Link to="/contact" className="hover:text-primary">Contact</Link>
            <a
              href="https://roihacks.gumroad.com/coffee"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Coffee className="h-4 w-4" />
                <span>Buy us a Coffee</span>
              </Button>
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}