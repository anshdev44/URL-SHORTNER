import React from 'react'
import { Link2, Zap, Shield, BarChart3, Globe, Users, Clock } from 'lucide-react'

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-transparent">
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-2xl shadow-lg">
              <Link2 className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-6">
            About <span className='text-yellow-300 font-extrabold'>BitLinks</span>
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
            Transform long, unwieldy URLs into clean, memorable BitLinks that are perfect for sharing across all platforms. 
            Our mission is to make the web more accessible, one shortened link at a time.
          </p>
        </div>

        {/* Mission Statement */}
        <div className="bg-white/10 backdrop-blur-sm rounded-3xl shadow-xl p-12 mb-16 border border-white/20">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">Our Mission</h2>
          <p className="text-lg text-gray-200 text-center max-w-4xl mx-auto leading-relaxed">
            We believe that sharing content online should be simple, secure, and efficient. BitLinks was built to eliminate 
            the friction of long URLs while providing powerful analytics and customization options for individuals, businesses, 
            and developers who want more control over their links.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20 hover:bg-white/15 transition-all duration-300 hover:-translate-y-1">
            <div className="bg-blue-500/20 p-3 rounded-xl w-fit mb-4">
              <Zap className="h-8 w-8 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Lightning Fast</h3>
            <p className="text-gray-200 leading-relaxed">
              Generate shortened BitLinks instantly with our optimized infrastructure. No waiting, no delays - just immediate results.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20 hover:bg-white/15 transition-all duration-300 hover:-translate-y-1">
            <div className="bg-green-500/20 p-3 rounded-xl w-fit mb-4">
              <Shield className="h-8 w-8 text-green-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Secure & Reliable</h3>
            <p className="text-gray-200 leading-relaxed">
              All BitLinks are protected with enterprise-grade security. We scan for malicious content and ensure safe redirects.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20 hover:bg-white/15 transition-all duration-300 hover:-translate-y-1">
            <div className="bg-purple-500/20 p-3 rounded-xl w-fit mb-4">
              <BarChart3 className="h-8 w-8 text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Detailed Analytics</h3>
            <p className="text-gray-200 leading-relaxed">
              Track clicks, geographic data, referrers, and device information with comprehensive real-time analytics for your BitLinks.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20 hover:bg-white/15 transition-all duration-300 hover:-translate-y-1">
            <div className="bg-orange-500/20 p-3 rounded-xl w-fit mb-4">
              <Globe className="h-8 w-8 text-orange-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Global Reach</h3>
            <p className="text-gray-200 leading-relaxed">
              Our worldwide CDN ensures your BitLinks redirect quickly from anywhere on the globe, providing optimal user experience.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20 hover:bg-white/15 transition-all duration-300 hover:-translate-y-1">
            <div className="bg-indigo-500/20 p-3 rounded-xl w-fit mb-4">
              <Users className="h-8 w-8 text-indigo-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Team Collaboration</h3>
            <p className="text-gray-200 leading-relaxed">
              Share BitLinks across your team with collaborative workspaces, shared analytics, and centralized link management.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20 hover:bg-white/15 transition-all duration-300 hover:-translate-y-1">
            <div className="bg-pink-500/20 p-3 rounded-xl w-fit mb-4">
              <Clock className="h-8 w-8 text-pink-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Custom Domains</h3>
            <p className="text-gray-200 leading-relaxed">
              Use your own branded domain for BitLinks to maintain consistent branding and build trust with your audience.
            </p>
          </div>
        </div>

        {/* Why Choose BitLinks */}
        <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm rounded-3xl p-12 text-white mb-16 border border-white/20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6">Why Choose BitLinks?</h2>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Whether you're a marketer, developer, content creator, or business owner, BitLinks provides the tools and insights you need.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-semibold mb-3">For Marketers</h3>
              <p className="text-gray-200">
                Track campaign performance, A/B test different links, and measure engagement across all your marketing channels with detailed analytics.
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-semibold mb-3">For Developers</h3>
              <p className="text-gray-200">
                Integrate with our powerful API, bulk shorten URLs, and programmatically manage your links with comprehensive developer tools.
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-semibold mb-3">For Content Creators</h3>
              <p className="text-gray-200">
                Share clean links on social media, track which platforms drive the most traffic, and optimize your content distribution strategy.
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-semibold mb-3">For Businesses</h3>
              <p className="text-gray-200">
                Maintain brand consistency, protect against link rot, and gain valuable insights into customer behavior and preferences.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
            <div className="text-4xl font-bold text-blue-400 mb-2">10M+</div>
            <div className="text-gray-200">BitLinks Created</div>
          </div>
          <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
            <div className="text-4xl font-bold text-purple-400 mb-2">500M+</div>
            <div className="text-gray-200">Clicks Tracked</div>
          </div>
          <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
            <div className="text-4xl font-bold text-green-400 mb-2">99.9%</div>
            <div className="text-gray-200">Uptime</div>
          </div>
        </div>

        {/* Get Started CTA */}
        <div className="text-center bg-white/10 backdrop-blur-sm rounded-3xl shadow-xl p-12 border border-white/20">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Get Started?</h2>
          <p className="text-lg text-gray-200 mb-8 max-w-2xl mx-auto">
            Join thousands of users who trust BitLinks for their URL shortening needs. Create your first BitLink today and see the difference.
          </p>
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:-translate-y-1">
            Start Shortening Now
          </button>
        </div>
      </div>
    </div>
  )
}

export default AboutPage