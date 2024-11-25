import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Coffee, Sparkles, Calculator, Star, Copy, Check } from 'lucide-react';
import { genAI } from '@/lib/gemini';

export default function Home() {
  const [description, setDescription] = useState('');
  const [formula, setFormula] = useState('');
  const [explanation, setExplanation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const generateFormula = async () => {
    if (!description.trim()) return;
    
    setLoading(true);
    setError(null);
    try {
      if (!genAI) {
        throw new Error("API key not configured. Please add your Gemini API key to continue.");
      }
      
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = `Generate an Excel formula based on this requirement: ${description}. 
      Format your response exactly like this, including the exact headers:

      FORMULA:
      [The exact Excel formula, nothing else]

      EXPLANATION:
      [A clear, step-by-step explanation of how the formula works, with each step on a new line starting with a number and a dot]`;
      
      const result = await model.generateContent(prompt);
      const response = result.response.text();
      
      // Split response into formula and explanation
      const formulaMatch = response.match(/FORMULA:\s*\n*(.*?)(?=\s*\n*EXPLANATION:)/s);
      const explanationMatch = response.match(/EXPLANATION:\s*\n*(.*)/s);
      
      if (formulaMatch && explanationMatch) {
        // Only remove quotes if they're at the start and end of the formula
        const rawFormula = formulaMatch[1].trim();
        const cleanFormula = rawFormula.replace(/^["'](.+)["']$/, '$1');
        setFormula(cleanFormula);
        setExplanation(explanationMatch[1].trim());
      } else {
        throw new Error('Failed to parse AI response correctly');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while generating the Excel formula');
      setFormula('');
      setExplanation('');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(formula);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12 py-4">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-green-500 to-blue-600 text-transparent bg-clip-text leading-tight">
            AI Excel Formula Generator ✨
          </h1>
          <p className="text-xl text-gray-600">
            Generate complex Excel formulas instantly with AI! 📊
          </p>
        </div>
        
        <div className="gradient-border mb-8">
          <div className="p-8">
            <div className="space-y-6">
              <Textarea
                placeholder="✍️ Describe what you want your Excel formula to do... (e.g., 'Calculate the sum of cells A1 to A10 only if they contain numbers greater than 100')"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="min-h-[120px] text-lg border-2 focus:border-green-400"
              />
              
              <Button 
                onClick={generateFormula}
                disabled={loading || !description.trim()}
                className="w-full text-lg py-6 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700"
              >
                {loading ? (
                  <>
                    <Sparkles className="mr-2 h-5 w-5 animate-spin" />
                    Generating Formula...
                  </>
                ) : (
                  <>
                    <Calculator className="mr-2 h-5 w-5" />
                    Generate Excel Formula ✨
                  </>
                )}
              </Button>

              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
                  {error}
                </div>
              )}
            </div>
          </div>
        </div>

        {formula && (
          <div className="space-y-6">
            <Card className="p-6 hover:shadow-lg transition-all duration-300 border-2 hover:border-green-200">
              <div className="flex justify-between items-start gap-4 mb-4">
                <h3 className="text-xl font-semibold">Excel Formula</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={copyToClipboard}
                  className="flex items-center gap-2 hover:bg-green-50"
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4 text-green-500" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      <span>Copy Formula</span>
                    </>
                  )}
                </Button>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm border-2 border-gray-200">
                {formula}
              </div>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-all duration-300 border-2 hover:border-green-200">
              <h3 className="text-xl font-semibold mb-4">How it works</h3>
              <div className="prose prose-gray max-w-none">
                <div className="text-gray-600 leading-relaxed space-y-2">
                  {explanation.split('\n').map((line, index) => (
                    <p key={index} className="pl-4">{line}</p>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        )}

        <Card className="p-8 bg-gradient-to-br from-green-50 to-blue-50 border-2 border-green-200 my-16">
          <div className="text-center space-y-4">
            <Coffee className="h-12 w-12 mx-auto text-green-500" />
            <h2 className="text-2xl font-bold">Support Our Work 🚀</h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Help us maintain and improve our AI tools by supporting our API & hosting costs. 
              Your contribution helps keep this tool free for everyone! 🙏
            </p>
            <a
              href="https://roihacks.gumroad.com/coffee"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <Button size="lg" className="text-lg px-8 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700">
                <Coffee className="mr-2 h-5 w-5" />
                Buy Us a Coffee ☕
              </Button>
            </a>
          </div>
        </Card>

        <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl shadow-xl p-8 mb-16">
          <article className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-green-500 to-blue-600 text-transparent bg-clip-text">
              Free AI Excel Formula Generator: Your Ultimate Excel Formula Assistant ⚡
            </h2>
            
            <div className="space-y-6">
              <p className="text-gray-600 leading-relaxed">
                Looking for an AI Excel formula generator that actually works? Our advanced AI-powered tool
                helps you create complex Excel formulas without the hassle. Whether you're a beginner or an
                Excel pro, our tool makes formula creation quick, easy, and error-free.
              </p>

              <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                  <Star className="h-6 w-6 text-green-500" />
                  Why Choose Our AI Excel Formula Generator? 📊
                </h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <span className="mr-2">🎯</span>
                    <span>Generate any Excel formula instantly with AI assistance</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">🤖</span>
                    <span>Advanced AI understanding of Excel functions and syntax</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">⚡</span>
                    <span>Save hours of manual formula writing and debugging</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">✨</span>
                    <span>Clear, step-by-step explanations for every formula</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">💎</span>
                    <span>100% free to use with unlimited formula generations</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="text-2xl font-semibold mb-4">Comprehensive Excel Formula Support 📈</h3>
                <ul className="mt-4 space-y-2 text-gray-600">
                  <li>• Advanced lookup formulas (VLOOKUP, XLOOKUP, INDEX-MATCH)</li>
                  <li>• Complex mathematical and statistical functions</li>
                  <li>• Text manipulation and string operations</li>
                  <li>• Date and time calculations</li>
                  <li>• Nested IF statements and logical operations</li>
                  <li>• Array formulas and dynamic arrays</li>
                  <li>• Financial functions and calculations</li>
                  <li>• Data validation formulas</li>
                  <li>• Error handling functions</li>
                  <li>• Custom formula combinations</li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="text-2xl font-semibold mb-4">Perfect For Every Excel User 🎯</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Business analysts needing complex calculations</li>
                  <li>• Financial professionals working with data</li>
                  <li>• Students learning Excel functions</li>
                  <li>• Office workers automating spreadsheets</li>
                  <li>• Data analysts creating reports</li>
                  <li>• Anyone who wants to save time with Excel</li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="text-2xl font-semibold mb-4">How Our AI Formula Generator Works 🔄</h3>
                <ol className="list-decimal pl-5 space-y-2 text-gray-600">
                  <li>Describe what you want your formula to do in plain English</li>
                  <li>Our AI analyzes your requirements and context</li>
                  <li>Generates the exact Excel formula you need</li>
                  <li>Provides clear, step-by-step explanations</li>
                  <li>Copy and paste the formula into Excel</li>
                </ol>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="text-2xl font-semibold mb-4">Benefits of Using Our Tool 🌟</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Save hours of formula research and testing</li>
                  <li>• Eliminate syntax errors and debugging time</li>
                  <li>• Learn Excel functions through clear explanations</li>
                  <li>• Increase productivity and efficiency</li>
                  <li>• Access advanced Excel formulas instantly</li>
                  <li>• No Excel expertise required</li>
                </ul>
              </div>

              <p className="text-gray-600 leading-relaxed">
                Stop struggling with Excel formulas! Our AI Excel Formula Generator is here to help you
                create any formula you need, instantly and accurately. Try it now and experience the
                future of Excel formula creation.
              </p>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}