import { Link } from 'react-router-dom';
import { Coffee } from 'lucide-react';
import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer className="border-t mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold mb-3">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/" className="block hover:text-primary">Home</Link>
              <Link to="/about" className="block hover:text-primary">About</Link>
              <Link to="/contact" className="block hover:text-primary">Contact</Link>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Connect</h3>
            <p className="text-sm text-gray-600">
              Stay updated with our latest AI tools and features.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Support Us</h3>
            <p className="text-sm text-gray-600 mb-3">
              Help us keep our AI tools free and accessible.
            </p>
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
          <div>
            <h3 className="font-semibold mb-3">About</h3>
            <p className="text-sm text-gray-600">
              AI-powered Excel formula generation for everyone.
            </p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-sm text-gray-600">
          © {new Date().getFullYear()} AI Excel Formula Generator. All rights reserved.
        </div>
      </div>
    </footer>
  );
}