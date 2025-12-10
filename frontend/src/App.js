import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import { loadStripe } from '@stripe/stripe-js';
import { CheckCircle, ArrowRight, Sparkles, Shield, Zap, TrendingUp, Users, Package, Store } from 'lucide-react';
import TermsOfService from './pages/TermsOfService';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Support from './pages/Support';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Stripe configuration
let stripePromise = null;

const Home = () => {
  const handleCheckout = (paymentLink) => {
    // Direct redirect to Stripe Payment Link - No backend needed!
    window.location.href = paymentLink;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-slate-900/80 backdrop-blur-md z-50 border-b border-blue-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">DLS</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#about" className="text-gray-300 hover:text-white transition">About</a>
              <a href="#how-it-works" className="text-gray-300 hover:text-white transition">How it Works</a>
              <a href="#pricing" className="text-gray-300 hover:text-white transition">Pricing</a>
              <a href="#founder" className="text-gray-300 hover:text-white transition">Founder</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-block px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full">
                <span className="text-blue-400 text-sm font-semibold">Product story · From manufacturer to consumer</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
                Digital Labeling System <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">(DLS)</span>
              </h1>
              <p className="text-xl text-gray-300">The Operating System for Physical Retail</p>
              <p className="text-gray-400 text-lg">
                Retail is still managed with 20th-century infrastructure. But margins, regulation, competition, and consumer behavior are already <strong className="text-white">21st-century</strong>.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a href="#pricing" className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-cyan-700 transition flex items-center justify-center space-x-2 shadow-lg shadow-blue-500/50">
                  <span>Get Started</span>
                  <ArrowRight className="w-5 h-5" />
                </a>
                <a href="#how-it-works" className="px-8 py-4 bg-slate-800 text-white font-semibold rounded-lg hover:bg-slate-700 transition flex items-center justify-center space-x-2 border border-slate-700">
                  <span>Learn More</span>
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl blur-3xl opacity-20"></div>
              <img 
                src="https://customer-assets.emergentagent.com/job_e2c00def-dbd2-40df-b724-f86321b7af5c/artifacts/2et4zivv_WhatsApp%20Image%202025-11-21%20at%2005.58.17.jpeg" 
                alt="Mikhail Shliachkov - Founder" 
                className="relative rounded-2xl shadow-2xl w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section id="about" className="py-20 px-4 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">The Problem with Current Retail</h2>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto">Today, most retail still runs on outdated infrastructure</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "📊", title: "Static prices", desc: "No dynamic optimization" },
              { icon: "📦", title: "Blind inventory", desc: "Limited real-time visibility" },
              { icon: "✂️", title: "Manual markdowns", desc: "Time-consuming processes" },
              { icon: "🧾", title: "Paper receipts", desc: "Outdated documentation" },
              { icon: "💰", title: "Cashier dependency", desc: "Bottleneck at checkout" },
              { icon: "📉", title: "Fragmented compliance", desc: "Regulatory challenges" },
              { icon: "🌱", title: "No real-time ESG", desc: "Limited sustainability tracking" },
              { icon: "⚠️", title: "Financial leakage", desc: "Shrinkage & pricing errors" }
            ].map((item, index) => (
              <div key={index} className="p-6 bg-slate-800/50 rounded-xl border border-slate-700 hover:border-blue-500/50 transition">
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 p-8 bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/20 rounded-2xl">
            <p className="text-white text-xl text-center">
              This creates systemic financial leakage: <strong className="text-red-400">Shrinkage. Expiration. Out-of-stocks. Pricing errors. Compliance risks.</strong>
            </p>
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">What is DLS in Simple Terms?</h2>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto">We turn <strong className="text-white">every physical product into a live digital asset.</strong></p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: <CheckCircle className="w-8 h-8 text-green-400" />, title: "Permanent digital identity", desc: "Unique ID for every product" },
              { icon: <Zap className="w-8 h-8 text-yellow-400" />, title: "Real-time digital twin", desc: "Live product status" },
              { icon: <TrendingUp className="w-8 h-8 text-blue-400" />, title: "AI-driven pricing", desc: "Algorithmic price optimization" },
              { icon: <Shield className="w-8 h-8 text-purple-400" />, title: "Built-in fiscal record", desc: "Automatic compliance" },
              { icon: <Users className="w-8 h-8 text-cyan-400" />, title: "Cashierless checkout", desc: "Mobile self-service" },
              { icon: <Package className="w-8 h-8 text-orange-400" />, title: "Inventory logic", desc: "Predictive management" }
            ].map((item, index) => (
              <div key={index} className="p-6 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl border border-slate-700 hover:border-blue-500/50 transition group">
                <div className="mb-4 transform group-hover:scale-110 transition">{item.icon}</div>
                <h3 className="text-white font-semibold mb-2 text-lg">{item.title}</h3>
                <p className="text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">How the System Works End-to-End</h2>
            <p className="text-gray-400 text-lg">From Manufacturer to Retailer to Consumer</p>
          </div>

          {/* Manufacturer */}
          <div className="mb-16">
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <span className="text-2xl">1️⃣</span>
              </div>
              <h3 className="text-3xl font-bold text-white">Manufacturer enters the system</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 bg-slate-800/50 rounded-xl border border-slate-700">
                <h4 className="text-xl font-semibold text-blue-400 mb-3">Step 1 — Product creation</h4>
                <p className="text-gray-300">The manufacturer creates a product inside the system: name, formulation, certificates, expiration rules, manufacturing details, ESG parameters.</p>
                <p className="text-gray-400 mt-3">Each product instantly receives a <strong className="text-white">unique permanent digital identity</strong>, a blockchain-ready lifecycle record, and a scannable QR / barcode.</p>
              </div>
              <div className="p-6 bg-slate-800/50 rounded-xl border border-slate-700">
                <h4 className="text-xl font-semibold text-blue-400 mb-3">Step 2 — Production update</h4>
                <p className="text-gray-300">Example: today the manufacturer produces 1,000 units and simply enters &ldquo;Produced today: +1,000&rdquo;.</p>
                <p className="text-gray-400 mt-3">Inventory becomes 1,000 units available, every unit is digitally registered and trackable individually. No spreadsheets. No manual reconciliation.</p>
              </div>
              <div className="p-6 bg-slate-800/50 rounded-xl border border-slate-700">
                <h4 className="text-xl font-semibold text-blue-400 mb-3">Step 3 — Sales & shipments</h4>
                <p className="text-gray-300">Every shipment is handled in one interface: retailer requests, approvals, digital shipping documents, invoices, acceptance forms.</p>
                <p className="text-gray-400 mt-3 italic">Expert insight: blind logistics, shipment fraud, and post-factum disputes disappear.</p>
              </div>
            </div>
          </div>

          {/* Retailer */}
          <div className="mb-16">
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                <span className="text-2xl">2️⃣</span>
              </div>
              <h3 className="text-3xl font-bold text-white">Retailer enters the system</h3>
            </div>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="p-6 bg-slate-800/50 rounded-xl border border-slate-700">
                <h4 className="text-xl font-semibold text-green-400 mb-3">Step 1 — Store setup</h4>
                <p className="text-gray-300">The retailer can register one store or a full chain, add all locations, assign staff access, and map logistics routes.</p>
              </div>
              <div className="p-6 bg-slate-800/50 rounded-xl border border-slate-700">
                <h4 className="text-xl font-semibold text-green-400 mb-3">Step 2 — Procurement</h4>
                <p className="text-gray-300">Retailers create direct digital purchase requests to manufacturers, seeing live inventory, delivery windows, and pricing conditions.</p>
              </div>
              <div className="p-6 bg-slate-800/50 rounded-xl border border-slate-700">
                <h4 className="text-xl font-semibold text-green-400 mb-3">Step 3 — AI pricing</h4>
                <p className="text-gray-300">Retailers input costs. AI instantly calculates optimal retail prices, promotions, bulk discounts. <em className="text-white">Price becomes a calculated strategy.</em></p>
              </div>
              <div className="p-6 bg-slate-800/50 rounded-xl border border-slate-700">
                <h4 className="text-xl font-semibold text-green-400 mb-3">Step 4 — No price tags</h4>
                <p className="text-gray-300">In the physical store there are no paper price tags. Every shelf only needs the product with its QR / barcode.</p>
              </div>
            </div>
          </div>

          {/* Consumer */}
          <div className="mb-16">
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-2xl">3️⃣</span>
              </div>
              <h3 className="text-3xl font-bold text-white">The consumer experience</h3>
            </div>
            <div className="grid md:grid-cols-3 lg:grid-cols-7 gap-4">
              {[
                { title: "Enter store", desc: "Open app, scan store QR, register in two clicks" },
                { title: "Scan products", desc: "See price, discounts, expiration, composition, certificates" },
                { title: "Build cart", desc: "Scan, add, adjust quantity, see totals instantly" },
                { title: "Pay online", desc: "Pay in app with card or crypto" },
                { title: "Exit verification", desc: "Show cabinet number, staff verifies" },
                { title: "Purchase history", desc: "See all past orders, re-order in one click" },
                { title: "AI lifestyle orders", desc: "Upload nutrition plan, AI builds shopping list" }
              ].map((step, index) => (
                <div key={index} className="p-4 bg-gradient-to-br from-purple-900/30 to-slate-800/50 rounded-lg border border-purple-500/30">
                  <div className="text-purple-400 font-bold mb-2">{step.title}</div>
                  <p className="text-gray-400 text-sm">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Results */}
          <div className="grid md:grid-cols-3 gap-6 mt-16">
            <div className="p-6 bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-500/30 rounded-xl">
              <h4 className="text-xl font-bold text-blue-400 mb-3">For manufacturers</h4>
              <p className="text-gray-300">Total production visibility, live inventory, zero document chaos, digital compliance, direct retailer access.</p>
            </div>
            <div className="p-6 bg-gradient-to-br from-green-500/10 to-green-600/10 border border-green-500/30 rounded-xl">
              <h4 className="text-xl font-bold text-green-400 mb-3">For retailers</h4>
              <p className="text-gray-300">Dynamic AI pricing, real-time stock, no price-tag errors, cashierless flow, lower shrinkage, higher margin control.</p>
            </div>
            <div className="p-6 bg-gradient-to-br from-purple-500/10 to-purple-600/10 border border-purple-500/30 rounded-xl">
              <h4 className="text-xl font-bold text-purple-400 mb-3">For consumers</h4>
              <p className="text-gray-300">Full product transparency, faster shopping, no lines, digital receipts, smart reorders, health-driven orders.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why We're Building This */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Why we are building this</h2>
          <p className="text-xl text-gray-300 mb-8">
            We come from real retail and production, not slides: <strong className="text-white">retail business ownership, printing & labeling production, store operations, supplier and manufacturer workflows</strong>. We lived inside these problems.
          </p>
          <p className="text-lg text-gray-400">
            DLS turns that pain into permanent digital infrastructure.
          </p>
        </div>
      </section>

      {/* Vision */}
      <section className="py-20 px-4 bg-slate-900/50">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Result for humanity</h2>
          <p className="text-xl text-gray-300 mb-8">
            If systems like DLS become global standard: <strong className="text-white">less food waste, less fraud, less bureaucracy, lower prices, more transparent production, automated ESG, faster access to medicine, smarter cities, and smarter supply chains.</strong>
          </p>
          <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
            This is not just retail evolution. It is the digital nervous system of physical commerce.
          </p>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Three direct user plans · one shared platform</h2>
            <p className="text-gray-400 text-lg">Choose your role, see your future subscription, and decide if supporting DLS today is worth the savings.</p>
          </div>

          <div className="mb-12 p-6 bg-blue-500/10 border border-blue-500/30 rounded-xl">
            <h3 className="text-2xl font-bold text-white mb-4">How the early-support model works</h3>
            <p className="text-gray-300 mb-4">
              We do not treat your payment as a classic &ldquo;investment&rdquo;. There is no promise of equity, no profit share, no securities. Instead, your payment is a <strong className="text-blue-400">donation-like early supporter contribution</strong> that is directly linked to a <strong className="text-blue-400">future subscription</strong> to the DLS platform after launch.
            </p>
            <p className="text-gray-300">
              You pay a <strong className="text-white">small, fixed amount today</strong> to help us develop infrastructure, and in return you lock in a <strong className="text-white">discounted 2-year subscription</strong> once the product goes live. The idea is simple: <strong className="text-cyan-400">spend a little today so that tomorrow your operations are cheaper and more convenient</strong>.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Consumer Plan */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700 hover:border-blue-500/50 transition p-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition"></div>
              <div className="relative">
                <Users className="w-12 h-12 text-blue-400 mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">👤 Consumer Plan</h3>
                <p className="text-gray-400 mb-6">For individual users who want to scan, verify, and pay for products with their phone, and keep digital receipts and history.</p>
                
                <div className="mb-6 p-4 bg-slate-900/50 rounded-lg">
                  <div className="text-sm text-gray-400 mb-1">Future subscription</div>
                  <div className="text-3xl font-bold text-white mb-2">$9.99<span className="text-lg text-gray-400">/month</span></div>
                  <div className="text-sm text-gray-400">2-year value: 24 × $9.99 ≈ <strong className="text-white">$239.76</strong></div>
                </div>

                <div className="mb-6 p-4 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-lg border border-blue-500/30">
                  <div className="text-sm text-blue-400 font-semibold mb-1">Early supporter contribution</div>
                  <div className="text-4xl font-bold text-white mb-2">$100</div>
                  <div className="text-sm text-gray-300">Pay once today for 2 years of access from launch</div>
                  <div className="mt-3 text-green-400 font-semibold">You save ≈ $139.76 (about 58%)</div>
                </div>

                <button
                  onClick={() => handleCheckout('https://donate.stripe.com/14AaEX7LY8xV4qU8ht7ss02', 'Consumer')}
                  data-testid="consumer-plan-button"
                  className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold rounded-lg hover:from-blue-700 hover:to-cyan-700 transition flex items-center justify-center space-x-2 shadow-lg shadow-blue-500/30"
                >
                  <span>📲 Pre-order as Consumer – $100</span>
                </button>
              </div>
            </div>

            {/* Maker Plan */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border-2 border-green-500/50 hover:border-green-400 transition p-8 relative overflow-hidden group">
              <div className="absolute -top-4 right-4 px-4 py-1 bg-green-500 text-white text-xs font-bold rounded-full">BEST VALUE</div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-3xl group-hover:bg-green-500/20 transition"></div>
              <div className="relative">
                <Package className="w-12 h-12 text-green-400 mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">🏭 Maker Plan (1 Product)</h3>
                <p className="text-gray-400 mb-6">For small manufacturers with one key product that they want to be fully visible, traceable, and connected to smart pricing and ESG data.</p>
                
                <div className="mb-6 p-4 bg-slate-900/50 rounded-lg">
                  <div className="text-sm text-gray-400 mb-1">Future subscription</div>
                  <div className="text-3xl font-bold text-white mb-2">$29<span className="text-lg text-gray-400">/month</span></div>
                  <div className="text-sm text-gray-400">2-year value: 24 × $29 = <strong className="text-white">$696</strong></div>
                </div>

                <div className="mb-6 p-4 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-lg border border-green-500/30">
                  <div className="text-sm text-green-400 font-semibold mb-1">Early supporter contribution</div>
                  <div className="text-4xl font-bold text-white mb-2">$300</div>
                  <div className="text-sm text-gray-300">Pay once today for 2 years of Maker access (1 product) from launch</div>
                  <div className="mt-3 text-green-400 font-semibold">You save ≈ $396 (about 57%)</div>
                </div>

                <button
                  onClick={() => handleCheckout('https://donate.stripe.com/cNidR91nA6pN9LecxJ7ss01', 'Maker')}
                  data-testid="maker-plan-button"
                  className="w-full px-6 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-lg hover:from-green-700 hover:to-emerald-700 transition flex items-center justify-center space-x-2 shadow-lg shadow-green-500/30"
                >
                  <span>🧮 Pre-order as Maker – $300</span>
                </button>
              </div>
            </div>

            {/* Store Plan */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700 hover:border-purple-500/50 transition p-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl group-hover:bg-purple-500/20 transition"></div>
              <div className="relative">
                <Store className="w-12 h-12 text-purple-400 mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">🏬 Store Plan (50–200 Products)</h3>
                <p className="text-gray-400 mb-6">For retail stores that want to manage 50–200 products with dynamic pricing, live inventory, scan-to-pay checkout, and better shrinkage control.</p>
                
                <div className="mb-6 p-4 bg-slate-900/50 rounded-lg">
                  <div className="text-sm text-gray-400 mb-1">Future subscription</div>
                  <div className="text-3xl font-bold text-white mb-2">$99<span className="text-lg text-gray-400">/month</span></div>
                  <div className="text-sm text-gray-400">2-year value: 24 × $99 = <strong className="text-white">$2,376</strong></div>
                </div>

                <div className="mb-6 p-4 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-500/30">
                  <div className="text-sm text-purple-400 font-semibold mb-1">Early supporter contribution</div>
                  <div className="text-4xl font-bold text-white mb-2">$1,000</div>
                  <div className="text-sm text-gray-300">Pay once today for 2 years of Store-level access from launch</div>
                  <div className="mt-3 text-green-400 font-semibold">You save ≈ $1,376 (about 58%)</div>
                </div>

                <button
                  onClick={() => handleCheckout('https://donate.stripe.com/28E9AT1nAaG3bTmeFR7ss00', 'Store')}
                  data-testid="store-plan-button"
                  className="w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-lg hover:from-purple-700 hover:to-pink-700 transition flex items-center justify-center space-x-2 shadow-lg shadow-purple-500/30"
                >
                  <span>🛒 Pre-order as Store – $1,000</span>
                </button>
              </div>
            </div>
          </div>

          {/* Legal Note */}
          <div className="mt-12 p-6 bg-slate-800/50 border border-slate-700 rounded-xl">
            <h4 className="text-white font-bold mb-3">Important legal note:</h4>
            <ul className="text-gray-400 space-y-2 text-sm">
              <li>• Each payment above is treated as a <strong className="text-white">pre-order / early-support contribution linked to a future subscription</strong> for the corresponding user role (Consumer, Maker, Store).</li>
              <li>• This is <strong className="text-white">not an investment</strong> and <strong className="text-white">not an offer to sell securities</strong>. No equity, profit sharing, or guaranteed financial return is offered.</li>
              <li>• Exact access terms (2 years from launch, role-specific feature set) will be documented in user-facing terms of service before launch.</li>
              <li>• Payments are processed securely via Stripe. If the product is not launched within a reasonable timeframe, we will communicate options, including refunds or alternative arrangements, to early supporters.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Founder */}
      <section id="founder" className="py-20 px-4 bg-slate-900/50">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://customer-assets.emergentagent.com/job_e2c00def-dbd2-40df-b724-f86321b7af5c/artifacts/2et4zivv_WhatsApp%20Image%202025-11-21%20at%2005.58.17.jpeg" 
                alt="Mikhail Shliachkov" 
                className="rounded-2xl shadow-2xl w-full"
              />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-white mb-4">Mikhail Shliachkov</h2>
              <p className="text-xl text-blue-400 mb-6">Founder & CEO</p>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-3">Founder: Operational Expertise, Not Theory</h3>
                  <p className="text-gray-300">
                    Mikhail Shliachkov isn&rsquo;t a theorist building retail technology from the outside. He&rsquo;s an operational founder who has lived the problems DLS solves every day for over a decade.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                    <h4 className="text-blue-400 font-semibold mb-2">Retail Business Owner</h4>
                    <p className="text-gray-400 text-sm">Direct experience owning and operating retail businesses</p>
                  </div>
                  <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                    <h4 className="text-green-400 font-semibold mb-2">Printing & Labeling</h4>
                    <p className="text-gray-400 text-sm">Deep expertise in label manufacturing and printing technology</p>
                  </div>
                  <div className="p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                    <h4 className="text-purple-400 font-semibold mb-2">Store Operations</h4>
                    <p className="text-gray-400 text-sm">Hands-on experience with POS systems and in-store technology</p>
                  </div>
                  <div className="p-4 bg-orange-500/10 border border-orange-500/30 rounded-lg">
                    <h4 className="text-orange-400 font-semibold mb-2">Supply Chain</h4>
                    <p className="text-gray-400 text-sm">Understanding of manufacturer workflows and product lifecycle</p>
                  </div>
                </div>

                <div className="p-6 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-xl">
                  <p className="text-white text-lg font-semibold mb-2">This is not a theorist. This is an operational founder.</p>
                  <p className="text-gray-300">
                    Mikhail has managed a family business since 2012, experiencing every pain point DLS addresses. He knows what works, what doesn&rsquo;t, and what retailers actually need — not what Silicon Valley thinks they need.
                  </p>
                </div>

                <a 
                  href="https://linkedin.com/in/mikhail-shliachkov-413921391" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                  <span>Connect on LinkedIn</span>
                </a>
              </div>
            </div>
          </div>

          <div className="mt-12 p-6 bg-slate-800/50 border border-slate-700 rounded-xl">
            <h3 className="text-xl font-bold text-white mb-3">Team (in build):</h3>
            <p className="text-gray-300">
              DLS is assembling a compact, execution-focused team across: product, AI/ML, retail integrations, and compliance. We actively welcome senior talent from retail, payments, logistics, and govtech who want to build shared infrastructure — not another short-term feature.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-slate-950 border-t border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-white">DLS</span>
              </div>
              <p className="text-gray-400">
                The Operating System for Physical Retail
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <a href="#about" className="block text-gray-400 hover:text-white transition">About</a>
                <a href="#how-it-works" className="block text-gray-400 hover:text-white transition">How it Works</a>
                <a href="#pricing" className="block text-gray-400 hover:text-white transition">Pricing</a>
                <a href="#founder" className="block text-gray-400 hover:text-white transition">Founder</a>
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal & Support</h4>
              <div className="space-y-2">
                <a href="/terms-of-service" className="block text-gray-400 hover:text-white transition">Terms of Service</a>
                <a href="/privacy-policy" className="block text-gray-400 hover:text-white transition">Privacy Policy</a>
                <a href="/support" className="block text-gray-400 hover:text-white transition">Support</a>
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Connect</h4>
              <div className="space-y-2">
                <a 
                  href="https://linkedin.com/in/mikhail-shliachkov-413921391" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-gray-400 hover:text-white transition"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-800 text-center text-gray-400">
            <p>© 2025 Digital Labeling System (DLS). All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/support" element={<Support />} />
          <Route path="/success" element={
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-slate-900 flex items-center justify-center px-4">
              <div className="max-w-md w-full bg-slate-800 rounded-2xl p-8 text-center border border-green-500/50">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-10 h-10 text-white" />
                </div>
                <h1 className="text-3xl font-bold text-white mb-4">Payment Successful!</h1>
                <p className="text-gray-300 mb-6">
                  Thank you for supporting DLS. You will receive confirmation details via email.
                </p>
                <a href="/" className="inline-block px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition">
                  Return to Home
                </a>
              </div>
            </div>
          } />
          <Route path="/cancel" element={
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900 to-slate-900 flex items-center justify-center px-4">
              <div className="max-w-md w-full bg-slate-800 rounded-2xl p-8 text-center border border-red-500/50">
                <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl">✕</span>
                </div>
                <h1 className="text-3xl font-bold text-white mb-4">Payment Cancelled</h1>
                <p className="text-gray-300 mb-6">
                  Your payment was cancelled. Feel free to try again when you&rsquo;re ready.
                </p>
                <a href="/" className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition">
                  Return to Home
                </a>
              </div>
            </div>
          } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;