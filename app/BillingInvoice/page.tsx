"use client";

import React, { useState, useEffect } from 'react';
import { CheckCircle, MapPin, Phone, Mail, FileText, ShoppingBag, ShoppingCart } from 'lucide-react';
import Link from 'next/link';

// --- Interfaces ---
interface Product {
    id: string; 
    name: string;
    price: number; 
    quantity?: number;
    // Include these fields to ensure calculations are based on the PaymentPage logic
    seller?: string;
    category?: string;
}
interface FinalInvoiceData {
    items: Product[];
    subtotal: number;
    totalDiscount: number;
    totalTax: number;
    grandTotal: number;
    paymentMode: string;
}

// Global GST Rates for detailed item breakdown (MUST be consistent with PaymentPage)
const GST_RATES: Record<string, number> = {
    'iPhone 12': 0.18,
    'Fire-Boltt Brillia Smart Watch': 0.18, 
    'MAGGI 2-Minute Instant Noodles': 0.05,
    'Multi-Grain Bread': 0.05,
    'CookieMan Choco Chunk Cookies': 0.05,
    'Alpenliebe Butter Toffee (40 pieces)': 0.12, 
    'Amul School Pack Butter Chips (100 pcs)': 0.12, 
    'Cadbury Dairy Milk Silk 60g': 0.18, 
    'default': 0.18,
};

// Define DISCOUNT_RATE here, consistent with PaymentPage
const DISCOUNT_RATE = 0.05; 

// -------------------------------------------------------------
// --- BILLING INVOICE COMPONENT (Uses FINAL Invoice Data) -----
// -------------------------------------------------------------

const BillingInvoice: React.FC = () => {
    const [invoiceData, setInvoiceData] = useState<FinalInvoiceData | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedInvoice = sessionStorage.getItem('finalInvoiceData');
            if (storedInvoice) {
                try {
                    setInvoiceData(JSON.parse(storedInvoice));
                } catch (e) {
                    console.error("Error parsing final invoice data:", e);
                }
            }
        }
    }, []);

    if (!invoiceData) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-gray-600 bg-gray-50 p-4">
                <p className="mb-4 text-lg font-medium">Loading invoice data... (Data not found after payment).</p>
                <Link href="/" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-md">
                    Start New Shopping
                </Link>
            </div>
        );
    }
    
    // --- Detailed Calculations for Invoice ---
    const detailedItems = invoiceData.items.map(item => {
        const itemTotal = (item.quantity || 0) * item.price;
        // Lookup the specific GST rate
        const taxRate = GST_RATES[item.name] || GST_RATES.default; 
        
        // Applying the overall discount rate (consistent with PaymentPage)
        const itemDiscount = itemTotal * DISCOUNT_RATE; 
        const itemTaxable = itemTotal - itemDiscount;
        const itemTax = itemTaxable * taxRate;
        const itemFinalPrice = itemTaxable + itemTax;

        return {
            ...item,
            qty: item.quantity || 1,
            unitPrice: item.price,
            itemTotal,
            itemDiscount,
            itemTax,
            itemFinalPrice: itemFinalPrice,
            taxRate,
            // GST Breakdown is based on the itemTaxable value * the rate
            gstBreakdown: {
                CGST: (itemTax / 2).toFixed(2),
                SGST: (itemTax / 2).toFixed(2),
            }
        };
    });

    // Final Summary Calculations (using totals from invoiceData)
    const { subtotal, totalDiscount, totalTax, grandTotal, paymentMode } = invoiceData;
    
    // Round off logic for final payable amount
    const finalPayableRounded = Math.round(grandTotal); // Round to the nearest Rupee
    const roundOff = parseFloat((finalPayableRounded - grandTotal).toFixed(2));
    const finalPayable = finalPayableRounded;

    // Static Bill Data
    const store = {
        name: "SmartCart Retail Solutions",
        address: "IoT Tech Park, 4th Cross Rd, Moradabad, UP, India - 244001",
        phone: "+91-9988-776655",
        email: "support@smartcart.in",
        gst: "09AAACC0000C1Z2",
    };
    const customer = {
        name: "Dhananjai Sharma",
        phone: "9876543210",
        loyaltyId: "SC10082025",
    };
    const invoice = {
        number: "SCINV" + new Date().getTime().toString().slice(-8), 
        date: new Date().toLocaleDateString('en-IN'),
        time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
        paymentMode: paymentMode,
    };

    return (
        <div className="min-h-screen bg-gray-50 p-2 sm:p-4">
            {/* Main container optimized for max-width of a receipt/invoice */}
            <div className="max-w-xl mx-auto p-4 sm:p-6 md:p-8 bg-white shadow-2xl rounded-xl border-t-8 border-blue-700 transform transition-all duration-500 hover:shadow-3xl">
                
                {/* 1. Store Details & Header */}
                <div className="text-center border-b border-gray-300 pb-4 mb-5">
                    <h1 className="text-3xl font-extrabold text-blue-800 flex items-center justify-center animate-fadeIn">
                        <ShoppingBag className="w-7 h-7 mr-2 text-green-600 animate-bounceOnce" />
                        {store.name}
                    </h1>
                    <p className="text-xs text-gray-600 mt-3 flex items-center justify-center">
                        <MapPin className='w-3 h-3 mr-1 text-red-500'/> {store.address}
                    </p>
                    <div className="text-xs text-gray-500 mt-1 flex justify-center space-x-4">
                        <p className='flex items-center'><Phone className='w-3 h-3 mr-1 text-blue-500'/> {store.phone}</p>
                        <p className='flex items-center'><Mail className='w-3 h-3 mr-1 text-blue-500'/> {store.email}</p>
                    </div>
                    <p className="text-xs mt-3 bg-gray-100 inline-block px-3 py-1 rounded-full border border-gray-200">
                        <span className="font-semibold text-gray-700">GSTIN:</span> {store.gst}
                    </p>
                </div>

                {/* 2. Invoice & Customer Details - Improved alignment */}
                <div className="grid grid-cols-2 text-sm gap-y-2 mb-6 p-3 border-b border-gray-200 bg-blue-50 rounded-md">
                    <div>
                        <h2 className="font-bold text-blue-700 uppercase flex items-center mb-1">
                            <FileText className='w-4 h-4 mr-1'/> Invoice Details
                        </h2>
                        <p className="text-xs sm:text-sm">No: <span className='font-bold text-gray-800'>{invoice.number}</span></p>
                        <p className="text-xs sm:text-sm">Date: <span className='font-medium'>{invoice.date}</span></p>
                        <p className="text-xs sm:text-sm">Time: <span className='font-medium'>{invoice.time}</span></p>
                    </div>
                    <div className="text-right">
                        <h2 className="font-bold text-blue-700 uppercase mb-1">Customer Details</h2>
                        <p className="text-xs sm:text-sm">Name: <span className='font-bold text-gray-800'>{customer.name}</span></p>
                        <p className="text-xs sm:text-sm">Phone: {customer.phone}</p>
                        <p className="text-xs sm:text-sm">Loyalty ID: {customer.loyaltyId}</p>
                    </div>
                </div>

                {/* 3. Item Details Table - Smoother, better alignment */}
                <h3 className="text-base font-extrabold mb-3 text-gray-700 uppercase border-l-4 border-green-500 pl-2">Purchase Summary</h3>
                <div className="overflow-x-auto border border-gray-300 rounded-lg shadow-sm">
                    <table className="min-w-full text-xs sm:text-sm table-fixed">
                        <thead>
                            <tr className="bg-blue-100 text-left font-bold text-gray-700">
                                <th className="p-3 w-1/4">Item</th>
                                <th className="p-3 w-1/12 text-center">Qty</th>
                                <th className="p-3 w-1/6 text-right hidden sm:table-cell">Unit Price</th>
                                <th className="p-3 w-1/6 text-right text-red-700 hidden md:table-cell">Disc.</th>
                                <th className="p-3 w-1/6 text-right text-green-700 hidden md:table-cell">GST %</th>
                                <th className="p-3 w-1/4 text-right">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {detailedItems.map((item, index) => (
                                <tr key={index} className="border-t border-gray-200 transition duration-100 hover:bg-gray-50">
                                    <td className="p-3 font-medium text-gray-800">{item.name}</td>
                                    <td className="p-3 text-center text-gray-600">{item.qty}</td>
                                    <td className="p-3 text-right hidden sm:table-cell">₹ {item.unitPrice.toFixed(2)}</td>
                                    <td className="p-3 text-right text-red-600 hidden md:table-cell">- ₹ {item.itemDiscount.toFixed(2)}</td>
                                    <td className="p-3 text-right text-gray-500 hidden md:table-cell">{(item.taxRate * 100)}%</td>
                                    <td className="p-3 text-right font-extrabold text-green-800">₹ {item.itemFinalPrice.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* 4. Billing Summary & Totals - Highly styled for clarity */}
                <div className="flex justify-end mt-6">
                    <div className="w-full sm:w-11/12">
                        <div className="space-y-2 text-sm p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-inner">
                            <div className="flex justify-between font-medium">
                                <p>Subtotal (Gross):</p>
                                <p>₹ {subtotal.toFixed(2)}</p>
                            </div>
                            <div className="flex justify-between text-red-600 font-semibold">
                                <p>Total Discount ({DISCOUNT_RATE * 100}%):</p> 
                                <p>- ₹ {totalDiscount.toFixed(2)}</p>
                            </div>
                            
                            {/* Tax Breakdown Section */}
                            <div className="border-t border-gray-300 pt-2">
                                <div className="flex justify-between font-bold text-gray-700">
                                    <p>Taxable Total:</p>
                                    <p>₹ {(subtotal - totalDiscount).toFixed(2)}</p>
                                </div>
                                <div className="flex justify-between text-xs text-gray-600 ml-2 mt-1">
                                    <p>Total GST Amount:</p>
                                    <p className='font-semibold'>+ ₹ {totalTax.toFixed(2)}</p>
                                </div>
                                <div className="flex justify-between text-xs text-gray-500 ml-4">
                                    <p>CGST (Central Tax):</p>
                                    <p>₹ {(totalTax / 2).toFixed(2)}</p>
                                </div>
                                <div className="flex justify-between text-xs text-gray-500 ml-4">
                                    <p>SGST (State Tax):</p>
                                    <p>₹ {(totalTax / 2).toFixed(2)}</p>
                                </div>
                            </div>
                            
                            <div className="flex justify-between border-t border-dashed pt-2 font-bold text-gray-700">
                                <p>Round Off:</p>
                                <p>₹ {roundOff.toFixed(2)}</p>
                            </div>
                        </div>
                        
                        {/* Grand Total Footer */}
                        <div className="mt-4 p-4 flex justify-between items-center bg-green-50 border-2 border-green-300 rounded-lg shadow-xl">
                            <div className='flex flex-col'>
                                <p className="text-xl sm:text-2xl font-extrabold text-green-800">TOTAL PAID</p>
                                <div className="mt-1 text-sm font-bold text-gray-700">
                                    Payment Mode: <span className='text-blue-600'>{invoice.paymentMode}</span>
                                </div>
                            </div>
                            <p className="text-3xl sm:text-4xl font-extrabold text-green-800">
                                ₹ {finalPayable.toFixed(2)}
                            </p>
                        </div>
                    </div>
                </div>

                {/* 5. Additional Information & Footer */}
                <div className="mt-8 text-center text-gray-600 text-sm border-t pt-4">
                    <p className="font-bold text-base mb-2 flex items-center justify-center text-blue-700">
                        <CheckCircle className='w-5 h-5 mr-2 text-green-500'/> TRANSACTION COMPLETE
                    </p>
                    <p className="text-xs leading-snug p-3 bg-yellow-50 border border-yellow-200 rounded-lg shadow-sm">
                         Return/Exchange Policy: Goods can be exchanged within **7 days** with the original bill. Items must be unused and in original packaging. **No cash refunds.**
                    </p>
                    <Link href="/" className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-semibold transition duration-200 transform hover:scale-105">
                        <ShoppingCart className='w-4 h-4 mr-1'/> Continue Shopping
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default BillingInvoice;