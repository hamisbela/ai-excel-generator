import { Card } from "@/components/ui/card";
import { BarChart2, Star, LineChart, Users } from 'lucide-react';

export default function About() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-500 to-blue-600 text-transparent bg-clip-text">
            About Us ✨
          </h1>
          <p className="text-xl text-gray-600">
            Empowering businesses with AI-crafted marketing plans
          </p>
        </div>
        
        <div className="gradient-border mb-16">
          <div className="p-8 text-center">
            <p className="text-xl leading-relaxed text-gray-700">
              Welcome to AI Marketing Plan Generator, where technology meets strategy to help
              businesses create effective marketing plans. Our platform leverages cutting-edge
              AI technology to generate comprehensive, data-driven marketing strategies that
              deliver results. ✨
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card className="p-8 hover:shadow-lg transition-all duration-300 border-2 hover:border-purple-200">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-purple-100 rounded-full flex items-center justify-center">
                <BarChart2 className="h-8 w-8 text-purple-500" />
              </div>
              <h2 className="text-2xl font-semibold">Our Mission 📈</h2>
              <p className="text-gray-600">
                Helping businesses create effective marketing strategies that
                drive growth and achieve objectives efficiently.
              </p>
            </div>
          </Card>

          <Card className="p-8 hover:shadow-lg transition-all duration-300 border-2 hover:border-purple-200">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-purple-100 rounded-full flex items-center justify-center">
                <LineChart className="h-8 w-8 text-purple-500" />
              </div>
              <h2 className="text-2xl font-semibold">Our Values 🌟</h2>
              <p className="text-gray-600">
                We believe in data-driven strategies, effective planning, and making
                professional marketing tools accessible to all businesses.
              </p>
            </div>
          </Card>
        </div>

        <div className="space-y-12 mb-16">
          <section className="text-center">
            <div className="w-16 h-16 mx-auto bg-purple-100 rounded-full flex items-center justify-center mb-6">
              <Star className="h-8 w-8 text-purple-500" />
            </div>
            <h2 className="text-3xl font-semibold mb-4">How It Works ⚡</h2>
            <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto">
              Our AI-powered platform uses advanced natural language processing to understand your
              business objectives and target audience, generating comprehensive marketing plans
              that align with your goals and industry best practices.
            </p>
          </section>

          <section className="text-center">
            <div className="w-16 h-16 mx-auto bg-purple-100 rounded-full flex items-center justify-center mb-6">
              <Users className="h-8 w-8 text-purple-500" />
            </div>
            <h2 className="text-3xl font-semibold mb-4">Our Commitment 🤝</h2>
            <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto">
              We're committed to providing a reliable, user-friendly tool that helps businesses
              create effective marketing strategies. We continuously improve our AI models
              and user experience based on feedback from our community.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}