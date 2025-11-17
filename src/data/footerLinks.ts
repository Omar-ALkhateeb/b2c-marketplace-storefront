import { translations } from "@/lib/translations"

const links = {
  customerServices: [
    { label: translations.footer.faqs, path: '#' },
    { label: translations.footer.trackOrder, path: '#' },
    { label: translations.footer.returns, path: '#' },
    { label: translations.footer.delivery, path: '#' },
    { label: translations.footer.payment, path: '#' },
  ],
  about: [
    { label: translations.footer.aboutUs, path: '#' },
    { label: translations.footer.blog, path: '#' },
    { label: translations.footer.privacyPolicy, path: '#' },
    { label: translations.footer.termsConditions, path: '#' },
  ],
  connect: [
    { label: translations.footer.facebook, path: 'https://facebook.com' },
    { label: translations.footer.instagram, path: 'https://instagram.com' },
    { label: translations.footer.linkedin, path: 'https://linkedin.com' },
  ],
};

export default links;
