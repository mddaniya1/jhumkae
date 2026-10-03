import React, { useState } from 'react';
import { MailCheck, Mail, Check } from 'lucide-react';

interface NewsletterStripProps {
  onSubscribed: (email: string) => void;
}

export const NewsletterStrip: React.FC<NewsletterStripProps> = ({ onSubscribed }) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubmitted(true);
    onSubscribed(email);
  };

  return (
    <section className="bg-white py-12 sm:py-14 border-t border-b border-[#F0EFEB]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10">
          
          {/* Left Zone: Envelope-with-check Icon + Bold Text */}
          <div className="flex items-center gap-3.5 text-center md:text-left">
            <div className="p-2.5 rounded-full bg-[#FEF8F5] text-[#232323]">
              <MailCheck className="w-7 h-7 stroke-[1.5]" />
            </div>
            <h3 className="text-[18px] sm:text-[21px] font-bold text-[#232323] tracking-tight">
              Subscribe and get 20% discount.
            </h3>
          </div>

          {/* Right Zone: Underlined Email Input + Envelope Icon + Submit */}
          <div className="w-full md:w-auto md:min-w-[420px]">
            {submitted ? (
              <div className="flex items-center gap-2 text-sm font-medium text-emerald-800 bg-emerald-50 px-4 py-3 rounded-xs border border-emerald-200">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Thank you! Use promo code <strong className="tracking-wider">JHUMKY20</strong> for 20% off your order.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="relative flex items-center border-b border-[#232323] pb-2">
                <div className="text-[#888888] pr-2.5">
                  <Mail className="w-4 h-4 stroke-[1.5]" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="w-full bg-transparent text-[13.5px] text-[#232323] placeholder-[#888888] focus:outline-hidden py-1"
                />
                <button
                  type="submit"
                  className="ml-3 text-[12px] sm:text-[13px] font-bold uppercase tracking-[0.15em] text-[#232323] hover:text-[#777] transition-colors cursor-pointer shrink-0"
                >
                  Submit
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
