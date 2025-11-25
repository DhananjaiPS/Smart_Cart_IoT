"use client";

import React, { useState, useEffect } from 'react';
import { CreditCard, Banknote, QrCode, ArrowLeft, ShoppingBag, Truck, CheckCircle } from 'lucide-react';
import Link from 'next/link';
// Optional: import { useSearchParams } from 'next/navigation';

// --- Interface reused from SmartRetailStore.tsx ---
interface Product {
    id: string; 
    name: string;
    price: number; 
    quantity?: number;
    seller?: string;
    category?: string;
}

const GST_RATES: Record<string, number> = {
    'iPhone 12': 0.18, // 18% GST for electronics
    'Fire-Boltt Brillia Smart Watch': 0.18, 
    'MAGGI 2-Minute Instant Noodles': 0.05, // 5% GST for packaged food
    'Multi-Grain Bread': 0.05,
    'CookieMan Choco Chunk Cookies': 0.05,
    'Alpenliebe Butter Toffee (40 pieces)': 0.12, // Assuming 12% for confectionery
    'Amul School Pack Butter Chips (100 pcs)': 0.12, // Assuming 12% for packaged dairy
    'Cadbury Dairy Milk Silk 60g': 0.18, // 18% for chocolate/luxury snacks
    // Default rate for items not explicitly listed
    'default': 0.18, 
};

const DISCOUNT_RATE = 0.05; // 5% Discount

// --- Helper component for rendering payment logos (kept structure) ---
interface LogoGroupProps {
    type: 'upi' | 'card';
}

const UPILogos = [
    { src: '/gpay_logo.png', alt: 'Google Pay' },
    { src: '/phonepe_logo.png', alt: 'PhonePe' },
    { src: '/paytm_logo.png', alt: 'Paytm' },
    { src: '/amazonpay_logo.png', alt: 'Amazon Pay' },
];

const CardLogos = [
    { src: '/visa_logo.png', alt: 'Visa' },
    { src: '/mastercard_logo.png', alt: 'Mastercard' },
    { src: '/amex_logo.png', alt: 'American Express' },
    { src: '/rupay_logo.png', alt: 'Rupay' },
];

const PaymentLogos: React.FC<LogoGroupProps> = ({ type }) => {
    const logos = type === 'upi' ? UPILogos : CardLogos;
    return (
        <div className="flex flex-wrap gap-2 mt-3 justify-center md:justify-start">
            {logos.map((logo, index) => (
                <div key={index} className="h-6 md:h-8 w-auto">
                    <img
                        src={logo.src} 
                        alt={logo.alt} 
                        className="h-full w-auto object-contain"
                    />
                </div>
            ))}
        </div>
    );
};


// -------------------------------------------------------------
// --- PAYMENT PAGE COMPONENT (Uses REAL Cart Items) -----------
// -------------------------------------------------------------

const PaymentPage: React.FC = () => {
    const [cartItems, setCartItems] = useState<Product[]>([]);
    const [selectedMethod, setSelectedMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');

    // Load cart items from Session Storage on mount
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedCart = sessionStorage.getItem('currentCartItems');
            if (storedCart) {
                try {
                    const parsedItems: Product[] = JSON.parse(storedCart);
                    setCartItems(parsedItems);
                } catch (e) {
                    console.error("Error parsing cart items from session storage:", e);
                }
            }
        }
    }, []);

    // --- Dynamic Calculations based on loaded cartItems (IMPROVED) ---
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * (item.quantity || 0)), 0);
    const totalDiscount = subtotal * DISCOUNT_RATE;
    
    // Calculate total tax based on per-item GST rate lookup
    const totalTax = cartItems.reduce((taxSum, item) => {
        const rate = GST_RATES[item.name] || GST_RATES.default;
        const itemPrice = item.price * (item.quantity || 0);
        return taxSum + (itemPrice * rate);
    }, 0);

    const grandTotal = subtotal - totalDiscount + totalTax;
    // ------------------------------------------------------------------

    // Handler to simulate successful payment and navigate to invoice
    const handlePaymentSuccess = () => {
        // 1. Finalize the cart data with all calculated totals
        const finalInvoiceData = {
            items: cartItems,
            subtotal: subtotal,
            totalDiscount: totalDiscount,
            totalTax: totalTax,
            grandTotal: grandTotal,
            paymentMode: selectedMethod.toUpperCase(),
        };

        // 2. Save final data for the Invoice page to read
        sessionStorage.setItem('finalInvoiceData', JSON.stringify(finalInvoiceData));
        
        // 3. Navigate to the Invoice Page
        window.location.href = '/BillingInvoice'; 
    };

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-gray-600 bg-gray-50 p-4">
                <p className="mb-4 text-lg">Cart is empty. Please add items before proceeding to checkout.</p>
                <Link href="/" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">Go to Store</Link>
            </div>
        );
    }
    
    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
            <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-2xl p-6 md:p-10">
                
                {/* Header */}
                <div className="flex items-center justify-between border-b pb-4 mb-6">
                    <Link href="/">
                        <button className="text-blue-600 hover:text-blue-800 flex items-center">
                            <ArrowLeft className="w-5 h-5 mr-2" />
                            <span className='hidden sm:block'>Return to Cart</span>
                        </button>
                    </Link>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 flex items-center">
                        <ShoppingBag className="w-6 h-6 sm:w-7 sm:h-7 mr-2 sm:mr-3 text-green-600" />
                        Secure Checkout
                    </h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Left Column: Payment Options */}
                    <div className="lg:col-span-2">
                        <h2 className="text-xl sm:text-2xl font-semibold mb-6">1. Select Payment Method</h2>

                        {/* Payment Options Grid - Responsive on Mobile */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            
                            {/* UPI/QR Option */}
                            <button 
                                onClick={() => setSelectedMethod('upi')}
                                className={`p-4 sm:p-6 border-2 rounded-xl text-left transition ${selectedMethod === 'upi' ? 'border-green-500 bg-green-50 shadow-md ring-4 ring-green-100' : 'border-gray-200 hover:border-blue-300'}`}
                            >
                                <QrCode className="w-6 h-6 mb-2 text-green-600" />
                                <span className="font-bold block text-base sm:text-lg">UPI / QR Code</span>
                                <span className="text-xs sm:text-sm text-gray-500 block">Instant transfer</span>
                                {/* <PaymentLogos type="upi" /> */}
                            </button>
                            
                            {/* Card Option */}
                            <button 
                                onClick={() => setSelectedMethod('card')}
                                className={`p-4 sm:p-6 border-2 rounded-xl text-left transition ${selectedMethod === 'card' ? 'border-green-500 bg-green-50 shadow-md ring-4 ring-green-100' : 'border-gray-200 hover:border-blue-300'}`}
                            >
                                <CreditCard className="w-6 h-6 mb-2 text-blue-600" />
                                <span className="font-bold block text-base sm:text-lg">Credit / Debit Card</span>
                                <span className="text-xs sm:text-sm text-gray-500 block">Visa, Mastercard, Amex</span>
                                {/* <PaymentLogos type="card" /> */}
                            </button>

                            {/* Net Banking Option */}
                            <button 
                                onClick={() => setSelectedMethod('netbanking')}
                                className={`p-4 sm:p-6 border-2 rounded-xl text-left transition ${selectedMethod === 'netbanking' ? 'border-green-500 bg-green-50 shadow-md ring-4 ring-green-100' : 'border-gray-200 hover:border-blue-300'}`}
                            >
                                <Banknote className="w-6 h-6 mb-2 text-indigo-600" />
                                <span className="font-bold block text-base sm:text-lg">Net Banking</span>
                                <span className="text-xs sm:text-sm text-gray-500 block">All major banks</span>
                            </button>
                        </div>
                        
                        {/* Payment Details Form/View */}
                        <div className="mt-8 p-4 sm:p-6 border rounded-xl bg-gray-50">
                            {selectedMethod === 'upi' && (
                                <div className="text-center">
                                    <h3 className="text-lg sm:text-xl font-semibold mb-4 text-green-700">Scan & Pay (UPI)</h3>
                                    
                                    {/* Responsive QR Code Container */}
                                    <div className="w-40 h-40 sm:w-48 sm:h-48 mx-auto border-4 border-green-500 rounded-lg p-2 flex items-center justify-center bg-white shadow-lg">
                                        <img 
                                            src="/QR.png" // Ensure this image is in your /public directory
                                            alt="UPI QR Code" 
                                            className="w-full h-full object-contain"
                                        />
                                    </div>
                                    
                                    <p className="mt-4 text-lg font-medium">Amount: ₹ {grandTotal.toFixed(2)}</p>
                                    <p className="text-sm text-gray-500 mt-1">Scan this code using any UPI app.</p>
                                </div>
                            )}

                            {selectedMethod === 'card' && (
                                <form>
                                    <h3 className="text-lg sm:text-xl font-semibold mb-4">Enter Card Details</h3>
                                    <input type="text" placeholder="Card Number" className="w-full p-3 border border-gray-300 rounded-lg mb-3 focus:ring-blue-500 focus:border-blue-500" required />
                                    <input type="text" placeholder="Cardholder Name" className="w-full p-3 border border-gray-300 rounded-lg mb-3 focus:ring-blue-500 focus:border-blue-500" required />
                                    <div className='flex gap-3'>
                                        <input type="text" placeholder="Expiry (MM/YY)" className="w-1/2 p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" required />
                                        <input type="password" placeholder="CVV" className="w-1/2 p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" required />
                                    </div>
                                    <div className="mt-4 flex items-center text-sm text-gray-600">
                                        <CheckCircle className="w-4 h-4 mr-2 text-green-500 flex-shrink-0" />
                                        <p>Your card details are secured using 256-bit encryption.</p>
                                    </div>
                                </form>
                            )}

                            {selectedMethod === 'netbanking' && (
                                <div>
                                    <h3 className="text-lg sm:text-xl font-semibold mb-4">Select Bank</h3>
                                    <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-white">
                                        <option>Select Your Bank</option>
                                        <option>HDFC Bank</option>
                                        <option>ICICI Bank</option>
                                        <option>State Bank of India</option>
                                        <option>Axis Bank</option>
                                    </select>
                                    <p className="text-sm text-gray-500 mt-4">You will be securely redirected to your bank's portal for authentication.</p>
                                </div>
                            )}

                             {/* Final Pay Button */}
                            <button
                                onClick={handlePaymentSuccess}
                                className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition text-lg shadow-md hover:shadow-lg"
                            >
                                Pay Now ₹ {grandTotal.toFixed(2)}
                            </button>
                        </div>
                    </div>

                    {/* Right Column: Order Summary (Unchanged but included for completeness) */}
                    <div className="lg:col-span-1 p-6 bg-blue-50 rounded-xl border border-blue-200 h-fit">
                        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-5">2. Order Summary</h2>
                        
                        {cartItems.map(item => (
                            <div key={item.id} className="flex justify-between items-center py-2 border-b border-blue-100">
                                <p className="text-sm text-gray-700 truncate pr-2">{item.name} (x{item.quantity})</p>
                                <p className="font-medium">₹ {(item.price * (item.quantity || 0)).toFixed(2)}</p>
                            </div>
                        ))}

                        <div className="space-y-2 mt-4 text-sm">
                            <div className="flex justify-between pt-2">
                                <p>Subtotal:</p>
                                <p>₹ {subtotal.toFixed(2)}</p>
                            </div>
                            <div className="flex justify-between text-red-600">
                                <p>Discount ({DISCOUNT_RATE * 100}%):</p>
                                <p>- ₹ {totalDiscount.toFixed(2)}</p>
                            </div>
                            {/* Note: Tax display uses the accurate calculated totalTax */}
                            <div className="flex justify-between">
                                <p>Taxes (GST):</p>
                                <p>+ ₹ {totalTax.toFixed(2)}</p>
                            </div>
                        </div>

                        <div className="border-t-2 border-dashed border-blue-300 pt-4 mt-4 flex justify-between items-center">
                            <p className="text-xl font-bold">Total Payable:</p>
                            <p className="text-2xl font-bold text-green-600">₹ {grandTotal.toFixed(2)}</p>
                        </div>

                        <div className='flex items-center space-x-2 mt-6 p-3 bg-white border border-green-300 rounded-lg text-green-700'>
                            <Truck className='w-5 h-5 flex-shrink-0'/>
                            <p className='text-sm font-medium'>Delivery estimated in 3-5 business days.</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default PaymentPage;