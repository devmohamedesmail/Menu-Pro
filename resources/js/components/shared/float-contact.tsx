import { useState } from "react";
import { Link } from "@inertiajs/react";
import { Phone, MessageCircle, X, Headset } from "lucide-react";

export default function FloatContact() {
  const [open, setOpen] = useState(false);

  const phone = "+971501234567"; // Change to your phone number
  const whatsapp = "971501234567"; // Change to your WhatsApp number (no +)

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Contact Buttons */}
      <div
        className={`flex flex-col items-end gap-3 transition-all duration-300 ${
          open
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        {/* WhatsApp */}
        <Link
          href={`https://wa.me/${whatsapp}`}
          target="_blank"
          className="flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-2xl"
          aria-label="WhatsApp"
        >
          <MessageCircle size={24} />
        </Link>

        {/* Phone */}
        <Link
          href={`tel:${phone}`}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-2xl"
          aria-label="Call Us"
        >
          <Phone size={24} />
        </Link>
      </div>

      {/* Main Floating Button */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95"
        aria-label="Open Contact Menu"
      >
        {open ? <X size={28} /> : <Headset size={28} />}
      </button>
    </div>
  );
}