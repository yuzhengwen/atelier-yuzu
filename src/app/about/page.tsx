import Link from "next/link";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
          About Atelier Yuzu
        </h1>
        
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-gray-700 mb-6">
              Welcome to Atelier Yuzu, a digital art gallery where creativity meets technology. 
              Our platform provides artists with a modern, intuitive way to showcase their 
              digital artwork and connect with art enthusiasts worldwide.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              Our Mission
            </h2>
            <p className="text-gray-700 mb-6">
              We believe that every artist deserves a beautiful platform to share their work. 
              Whether you&apos;re a digital painter, illustrator, photographer, or mixed media artist, 
              Atelier Yuzu provides the tools and space you need to present your art professionally.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              Features
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
              <li>High-quality image uploads with multiple format support</li>
              <li>Comprehensive artwork metadata and tagging system</li>
              <li>Responsive, mobile-friendly gallery views</li>
              <li>Artist profiles and portfolio management</li>
              <li>Community features and artwork discovery</li>
            </ul>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              Get Started
            </h2>
            <p className="text-gray-700">
              Ready to share your art with the world? Visit our{" "}
              <Link href="/upload" className="text-blue-600 hover:text-blue-800 underline">
                Upload page
              </Link>{" "}
              to submit your first artwork, or explore the{" "}
              <Link href="/" className="text-blue-600 hover:text-blue-800 underline">
                gallery
              </Link>{" "}
              to discover amazing art from our community.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
