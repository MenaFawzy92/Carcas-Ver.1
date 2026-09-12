import { FormEvent, ReactNode, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Menu, X, ArrowUpRight, Star, MapPin, Phone, Instagram, Facebook, Clock3, Utensils, Wine, Leaf, ChevronDown, Send } from 'lucide-react';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();
const reservationUrl = 'https://wa.me/201017118882';

const menuItems = [
  { name: "Beirut's Bride", description: 'Charred eggplant, tahini, pomegranate, herbs', category: 'Mezze', mark: '01' },
  { name: 'Kunafa Villa Caracas', description: 'Warm knafeh, soft cheese, orange blossom syrup', category: 'Sweet', mark: '02' },
  { name: 'Caracas Mix Grill', description: 'Lamb kofta, shish tawook, garlic and sumac', category: 'From the fire', mark: '03' },
  { name: 'Hummus from Beirut', description: 'Silken chickpea, lemon, tahini, house olive oil', category: 'Mezze', mark: '04' },
  { name: 'Kebbeh Bel Labneh', description: 'Crisp bulgur shell, cool labneh, mint oil', category: 'Mezze', mark: '05' },
  { name: 'Fattouch', description: 'Market greens, toasted pita, sumac dressing', category: 'Vegetarian', mark: '06' },
  { name: 'Chicken Fattah', description: 'Spiced chicken, yoghurt, toasted bread, pine nuts', category: 'From the fire', mark: '07' },
  { name: 'Lentil Soup', description: 'Red lentils, cumin, lemon, crisp shallots', category: 'Vegetarian', mark: '08' },
  { name: 'Mixed Pastries', description: 'A little bit of everything, baked fresh today', category: 'Sweet', mark: '09' },
];

const categories = ['All plates', 'Mezze', 'From the fire', 'Vegetarian', 'Sweet'];

function Logo({ light = false }: { light?: boolean }) {
  return (
    <a href="#home" data-testid="link-logo" className={`group inline-flex items-center gap-3 ${light ? 'text-[hsl(var(--background))]' : 'text-[hsl(var(--primary))]'}`}>
      <span className="flex h-9 w-9 items-center justify-center border border-current rounded-full font-display text-xl leading-none transition-transform duration-500 group-hover:rotate-12">V</span>
      <span className="leading-none">
        <span className="block font-display text-lg tracking-[0.04em]">Villa Caracas</span>
        <span className={`eyebrow block mt-1 ${light ? 'opacity-70' : 'opacity-55'}`}>Maadi · Cairo</span>
      </span>
    </a>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const links = [['Home', '#home'], ['Menu', '#menu'], ['Story', '#story'], ['Visit', '#visit'], ['Contact', '#contact']];
  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div className="mx-auto mt-3 max-w-[1440px] px-4 sm:px-8">
        <div className="flex items-center justify-between rounded-full border border-white/15 bg-[hsl(207_37%_14%/0.88)] px-4 py-3 text-[hsl(var(--background))] shadow-[0_10px_40px_rgba(18,41,57,0.18)] backdrop-blur-xl sm:px-6">
          <Logo light />
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary navigation">
            {links.map(([label, href]) => (
              <a key={label} href={href} data-testid={`link-nav-${label.toLowerCase()}`} className="eyebrow opacity-75 transition-opacity hover:opacity-100">{label}</a>
            ))}
          </nav>
          <a href={reservationUrl} target="_blank" rel="noreferrer" data-testid="link-header-reservation" className="hidden items-center gap-2 rounded-full bg-[hsl(var(--accent))] px-4 py-2.5 text-xs font-bold text-[hsl(var(--primary))] transition-transform hover:-translate-y-0.5 sm:flex">
            Reserve a table <ArrowUpRight size={14} strokeWidth={2.5} />
          </a>
          <button type="button" data-testid="button-mobile-menu" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen((value) => !value)} className="rounded-full p-2 lg:hidden">
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        {open && (
          <nav className="mt-2 rounded-3xl border border-white/10 bg-[hsl(207_37%_14%/0.97)] p-4 text-[hsl(var(--background))] shadow-2xl lg:hidden" aria-label="Mobile navigation">
            {links.map(([label, href]) => (
              <a key={label} href={href} onClick={() => setOpen(false)} data-testid={`link-mobile-nav-${label.toLowerCase()}`} className="flex items-center justify-between border-b border-white/10 px-3 py-4 font-display text-2xl last:border-0">
                {label}<ArrowUpRight size={17} className="text-[hsl(var(--accent))]" />
              </a>
            ))}
            <a href={reservationUrl} target="_blank" rel="noreferrer" data-testid="link-mobile-reservation" className="mt-3 flex items-center justify-center rounded-full bg-[hsl(var(--accent))] py-3 text-sm font-bold text-[hsl(var(--primary))]">Reserve a table</a>
          </nav>
        )}
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="home" className="relative min-h-[760px] overflow-hidden bg-[hsl(var(--primary))] text-[hsl(var(--background))]">
      <div className="absolute inset-0 overflow-hidden">
        <img src="/villa-interior.jpg" alt="Villa Caracas interior at dusk" className="animate-drift h-full w-full object-cover opacity-45" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,hsl(207_37%_14%/.98)_0%,hsl(207_37%_14%/.76)_37%,hsl(207_37%_14%/.18)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,hsl(207_37%_14%)_0%,transparent_42%)]" />
      </div>
      <div className="relative mx-auto flex min-h-[760px] max-w-[1440px] flex-col justify-end px-6 pb-16 pt-40 sm:px-12 lg:px-20 lg:pb-24">
        <div className="max-w-3xl">
          <p className="eyebrow animate-rise text-[hsl(var(--accent))]">A Beirut state of mind · Since 2014</p>
          <h1 className="font-display animate-rise animate-rise-delay-1 mt-6 max-w-3xl text-[clamp(4rem,11vw,10rem)] leading-[0.86] tracking-[-0.055em] text-balance">An evening<br /><em>by the sea.</em></h1>
          <p className="animate-rise animate-rise-delay-2 mt-8 max-w-md text-base leading-7 text-[hsl(var(--background)/.78)] sm:text-lg">Beirut energy, Lebanese hospitality, and an elevated seaside atmosphere — translated through warm Egyptian elegance in the heart of Maadi.</p>
          <div className="animate-rise animate-rise-delay-3 mt-9 flex flex-col gap-3 sm:flex-row">
            <a href={reservationUrl} target="_blank" rel="noreferrer" data-testid="link-hero-reservation" className="group flex items-center justify-between gap-8 rounded-full bg-[hsl(var(--accent))] px-6 py-4 text-sm font-bold text-[hsl(var(--primary))] transition-all hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(214,171,84,.2)]">
              Book your table <ArrowUpRight size={17} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a href="#menu" data-testid="link-hero-menu" className="flex items-center justify-center gap-3 rounded-full border border-white/30 px-6 py-4 text-sm font-bold transition-colors hover:border-[hsl(var(--accent))] hover:text-[hsl(var(--accent))]">Explore the menu <ChevronDown size={16} /></a>
          </div>
        </div>
        <div className="mt-20 flex items-end justify-between border-t border-white/20 pt-5 text-xs text-[hsl(var(--background)/.65)]">
          <span className="eyebrow">X746+8MR · St. 9 · Maadi</span>
          <span className="hidden items-center gap-2 sm:flex"><span className="h-2 w-2 rounded-full bg-[hsl(var(--accent))]" /> Open daily · 8:00 AM–12:00 AM</span>
          <span className="eyebrow">01 / 05</span>
        </div>
      </div>
    </section>
  );
}

function Intro() {
  return (
    <section className="bg-[hsl(var(--background))] px-6 py-24 sm:px-12 lg:px-20 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1fr_1.35fr] lg:items-end">
        <div>
          <p className="eyebrow text-[hsl(var(--muted-foreground))]">Welcome to the villa</p>
          <div className="mt-6 h-px w-24 bg-[hsl(var(--accent))]" />
        </div>
        <div>
          <h2 className="font-display max-w-4xl text-4xl leading-[1.05] tracking-[-0.03em] text-[hsl(var(--primary))] sm:text-6xl">A little bit of Beirut, a lot of <em>Caracas.</em></h2>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-[hsl(var(--muted-foreground))]">Come for the mezze. Stay for the second bottle, the long table, and the feeling that the night has just begun. Villa Caracas is a place for stories shared over plates made to pass around.</p>
        </div>
      </div>
      <div className="mx-auto mt-20 grid max-w-7xl grid-cols-1 gap-3 sm:grid-cols-3">
        {[{ icon: Utensils, title: 'Lebanese kitchen', text: 'Family recipes, Cairo ingredients, a generous table.' }, { icon: Wine, title: 'Great cocktails', text: 'Bright citrus, anise, arak and a little theatre.' }, { icon: Leaf, title: 'Vegetarian-friendly', text: 'The best part of the table has always been the mezze.' }].map(({ icon: Icon, title, text }) => (
          <div key={title} data-testid={`card-feature-${title.toLowerCase().replaceAll(' ', '-')}`} className="border-t border-[hsl(var(--border))] py-6">
            <Icon size={20} className="text-[hsl(var(--accent))]" />
            <h3 className="mt-5 font-display text-2xl">{title}</h3>
            <p className="mt-2 max-w-xs text-sm leading-6 text-[hsl(var(--muted-foreground))]">{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function MenuSection() {
  const [category, setCategory] = useState('All plates');
  const visible = category === 'All plates' ? menuItems : menuItems.filter((item) => item.category === category);
  return (
    <section id="menu" className="bg-[hsl(var(--primary))] px-6 py-24 text-[hsl(var(--background))] sm:px-12 lg:px-20 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div>
            <p className="eyebrow text-[hsl(var(--accent))]">From our kitchen</p>
            <h2 className="font-display mt-5 text-5xl leading-none tracking-[-0.04em] sm:text-7xl">The Caracas<br /><em>table.</em></h2>
          </div>
          <p className="max-w-sm text-sm leading-6 text-[hsl(var(--background)/.64)]">The menu moves with the market. These are the signatures that make the room go quiet for the first bite.</p>
        </div>
        <div className="mt-14 flex gap-2 overflow-x-auto border-b border-white/15 pb-3" role="tablist" aria-label="Menu categories">
          {categories.map((item) => (
            <button key={item} type="button" role="tab" aria-selected={category === item} onClick={() => setCategory(item)} data-testid={`button-menu-filter-${item.toLowerCase().replaceAll(' ', '-')}`} className={`whitespace-nowrap rounded-full px-4 py-2 text-xs transition-colors ${category === item ? 'bg-[hsl(var(--accent))] font-bold text-[hsl(var(--primary))]' : 'text-[hsl(var(--background)/.62)] hover:text-[hsl(var(--background))]'}`}>{item}</button>
          ))}
        </div>
        <div className="mt-5">
          {visible.map((item) => (
            <article key={item.name} data-testid={`item-menu-${item.mark}`} className="group grid grid-cols-[38px_1fr_auto] items-start gap-4 border-b border-white/15 py-6 transition-colors hover:border-[hsl(var(--accent)/.7)] sm:grid-cols-[54px_1fr_1.4fr_auto] sm:gap-6">
              <span className="font-mono-ui text-xs text-[hsl(var(--accent))]">{item.mark}</span>
              <div>
                <h3 className="font-display text-2xl leading-tight transition-colors group-hover:text-[hsl(var(--accent))] sm:text-3xl">{item.name}</h3>
                <span className="eyebrow mt-2 block text-[hsl(var(--background)/.46)] sm:hidden">{item.category}</span>
              </div>
              <p className="hidden max-w-sm text-sm leading-6 text-[hsl(var(--background)/.54)] sm:block">{item.description}</p>
              <span className="eyebrow hidden text-[hsl(var(--background)/.46)] sm:block">{item.category}</span>
            </article>
          ))}
        </div>
        <div className="mt-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <p className="font-display text-lg italic text-[hsl(var(--background)/.68)]">The iconic taste of Villa Caracas, reimagined Sur Mer.</p>
          <a href={reservationUrl} target="_blank" rel="noreferrer" data-testid="link-menu-reservation" className="group inline-flex items-center gap-2 text-sm font-bold text-[hsl(var(--accent))]">Ask about tonight's specials <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></a>
        </div>
      </div>
    </section>
  );
}

function StorySection() {
  return (
    <section id="story" className="overflow-hidden bg-[hsl(var(--secondary))] px-6 py-24 sm:px-12 lg:px-20 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-24">
        <div className="relative">
          <div className="absolute -left-5 -top-5 h-28 w-28 rounded-full border border-[hsl(var(--primary)/.25)] sm:-left-10 sm:-top-10" />
          <img src="/signature-mezze.jpg" alt="Lebanese mezze served at Villa Caracas" className="relative aspect-[4/5] w-full object-cover shadow-restaurant sm:aspect-square" />
          <div className="absolute -bottom-5 -right-3 rounded-full bg-[hsl(var(--primary))] px-5 py-4 text-center text-[hsl(var(--background))] shadow-xl sm:-right-6">
            <span className="eyebrow text-[hsl(var(--accent))]">Made to share</span>
            <span className="mt-1 block font-display text-2xl">since 2014</span>
          </div>
        </div>
        <div>
          <p className="eyebrow text-[hsl(var(--primary)/.62)]">Our story</p>
          <h2 className="font-display mt-5 text-5xl leading-[.98] tracking-[-0.04em] text-[hsl(var(--primary))] sm:text-7xl">The long way<br />home.</h2>
          <div className="mt-8 space-y-5 text-base leading-8 text-[hsl(var(--primary)/.72)]">
            <p>Villa Caracas began with a simple instinct: Cairo deserved a room that felt like a holiday. Not a replica of Beirut, but its spirit — the late lunches, the warm welcome, the music that makes another round feel inevitable.</p>
            <p>So we built a villa on St. 9. A little golden, a little blue, always ready for one more at the table.</p>
          </div>
          <a href="#visit" data-testid="link-story-visit" className="group mt-9 inline-flex items-center gap-3 border-b border-[hsl(var(--primary)/.35)] pb-2 text-sm font-bold text-[hsl(var(--primary))]">Come see for yourself <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></a>
        </div>
      </div>
    </section>
  );
}

function TrustSection() {
  return (
    <section className="bg-[hsl(var(--background))] px-6 py-24 sm:px-12 lg:px-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
        <div>
          <p className="eyebrow text-[hsl(var(--muted-foreground))]">A room people return to</p>
          <div className="mt-5 flex items-center gap-3">
            <span className="font-display text-7xl leading-none text-[hsl(var(--primary))]">4.3</span>
            <div className="border-l border-[hsl(var(--border))] pl-4">
              <div className="flex gap-1 text-[hsl(var(--accent))]" aria-label="4.3 out of 5 stars">{[1, 2, 3, 4, 5].map((star) => <Star key={star} size={15} fill="currentColor" />)}</div>
              <p className="mt-2 text-xs text-[hsl(var(--muted-foreground))]">from over 3,200 Google reviews</p>
            </div>
          </div>
        </div>
        <blockquote className="border-l-2 border-[hsl(var(--accent))] pl-7 sm:pl-10">
          <p className="font-display text-3xl leading-tight tracking-[-0.02em] text-[hsl(var(--primary))] sm:text-5xl">“It feels like you have been invited somewhere special — and then the food actually lives up to it.”</p>
          <footer className="eyebrow mt-6 text-[hsl(var(--muted-foreground))]">A guest at the table · Google</footer>
        </blockquote>
      </div>
    </section>
  );
}

function VisitSection() {
  return (
    <section id="visit" className="bg-[hsl(var(--primary))] px-6 py-24 text-[hsl(var(--background))] sm:px-12 lg:px-20 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_1fr] lg:gap-24">
        <div>
          <p className="eyebrow text-[hsl(var(--accent))]">Find the villa</p>
          <h2 className="font-display mt-5 text-5xl leading-[.95] tracking-[-0.04em] sm:text-7xl">Your table<br /><em>is waiting.</em></h2>
          <p className="mt-8 max-w-md text-base leading-7 text-[hsl(var(--background)/.66)]">Bring the whole group. Stay for sunset. We are on St. 9 in Maadi, where the evening starts early and ends when you are ready.</p>
          <div className="mt-10 space-y-5">
            <div className="flex items-start gap-4"><MapPin className="mt-1 shrink-0 text-[hsl(var(--accent))]" size={19} /><p className="text-sm leading-6">X746+8MR, St. 9<br />Maadi, Cairo, Egypt 4212011</p></div>
            <div className="flex items-start gap-4"><Clock3 className="mt-1 shrink-0 text-[hsl(var(--accent))]" size={19} /><p className="text-sm leading-6">Daily<br />8:00 AM–12:00 AM (Midnight)</p></div>
            <div className="flex items-start gap-4"><Phone className="mt-1 shrink-0 text-[hsl(var(--accent))]" size={19} /><a href="tel:01017118882" data-testid="link-visit-phone" className="text-sm leading-6 transition-colors hover:text-[hsl(var(--accent))]">010 17118882</a></div>
          </div>
          <a href={reservationUrl} target="_blank" rel="noreferrer" data-testid="link-visit-reservation" className="mt-10 inline-flex items-center gap-3 rounded-full bg-[hsl(var(--accent))] px-6 py-4 text-sm font-bold text-[hsl(var(--primary))] transition-transform hover:-translate-y-1">WhatsApp the villa <ArrowUpRight size={16} /></a>
        </div>
        <div className="relative min-h-[400px] overflow-hidden rounded-[2rem] border border-white/15 bg-[linear-gradient(135deg,hsl(207_30%_20%),hsl(207_37%_14%))] p-7 sm:min-h-[500px]">
          <div className="absolute inset-0 opacity-40" style={{ backgroundImage: 'radial-gradient(hsl(41 35% 94% / .18) 1px, transparent 1px)', backgroundSize: '22px 22px' }} />
          <div className="relative flex h-full min-h-[350px] flex-col justify-between sm:min-h-[450px]">
            <div className="flex items-start justify-between">
              <span className="eyebrow text-[hsl(var(--accent))]">Maadi, Cairo</span>
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-[hsl(var(--accent)/.5)] text-[hsl(var(--accent))]"><MapPin size={20} /></span>
            </div>
            <div>
              <p className="font-display text-4xl leading-none sm:text-6xl">St. 9<br /><em>after dark.</em></p>
              <div className="mt-7 flex items-center gap-3 text-xs text-[hsl(var(--background)/.58)]"><span className="h-px w-8 bg-[hsl(var(--accent))]" /> Outdoor seating · cocktails · good company</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const [sent, setSent] = useState(false);
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
  };
  return (
    <section id="contact" className="bg-[hsl(var(--secondary))] px-6 py-24 sm:px-12 lg:px-20 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[.9fr_1.1fr] lg:items-start">
        <div>
          <p className="eyebrow text-[hsl(var(--primary)/.62)]">Keep in touch</p>
          <h2 className="font-display mt-5 text-5xl leading-[.95] tracking-[-0.04em] text-[hsl(var(--primary))] sm:text-7xl">Follow the<br /><em>journey.</em></h2>
          <p className="mt-7 max-w-sm text-base leading-7 text-[hsl(var(--primary)/.72)]">Follow the journey. Feel the atmosphere.</p>
          <div className="mt-9 flex gap-3">
            <a href="https://www.instagram.com/caracasegypt" target="_blank" rel="noreferrer" data-testid="link-instagram" aria-label="Instagram @caracasegypt" className="flex items-center gap-2 rounded-full border border-[hsl(var(--primary)/.25)] px-4 py-3 text-sm font-bold text-[hsl(var(--primary))] transition-colors hover:bg-[hsl(var(--primary))] hover:text-[hsl(var(--background))]"><Instagram size={16} /> @caracasegypt</a>
            <a href="https://www.facebook.com/CaracasCairo" target="_blank" rel="noreferrer" data-testid="link-facebook" aria-label="Facebook Caracas Cairo" className="flex h-11 w-11 items-center justify-center rounded-full border border-[hsl(var(--primary)/.25)] text-[hsl(var(--primary))] transition-colors hover:bg-[hsl(var(--primary))] hover:text-[hsl(var(--background))]"><Facebook size={16} /></a>
          </div>
        </div>
        <div className="rounded-[1.75rem] bg-[hsl(var(--background))] p-6 shadow-[0_18px_50px_rgba(18,41,57,.08)] sm:p-9">
          <div className="flex items-center justify-between border-b border-[hsl(var(--border))] pb-5">
            <h3 className="font-display text-3xl text-[hsl(var(--primary))]">Ask the villa</h3>
            <Send size={18} className="text-[hsl(var(--accent))]" />
          </div>
          {sent ? (
            <div data-testid="status-contact-success" className="flex min-h-[270px] flex-col items-center justify-center text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[hsl(var(--secondary))] text-[hsl(var(--primary))]"><Send size={20} /></span>
              <h4 className="mt-5 font-display text-3xl text-[hsl(var(--primary))]">Message received.</h4>
              <p className="mt-2 max-w-xs text-sm leading-6 text-[hsl(var(--muted-foreground))]">We will get back to you soon. For a faster answer, WhatsApp us directly.</p>
              <button type="button" onClick={() => setSent(false)} data-testid="button-contact-another" className="mt-5 text-xs font-bold text-[hsl(var(--primary))] underline underline-offset-4">Send another message</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              <label className="block"><span className="eyebrow text-[hsl(var(--muted-foreground))]">Your name</span><input required name="name" data-testid="input-contact-name" className="mt-2 w-full border-b border-[hsl(var(--border))] bg-transparent py-3 text-[hsl(var(--primary))] outline-none transition-colors placeholder:text-[hsl(var(--muted-foreground))] focus:border-[hsl(var(--accent))]" placeholder="How should we call you?" /></label>
              <label className="block"><span className="eyebrow text-[hsl(var(--muted-foreground))]">Email</span><input required type="email" name="email" data-testid="input-contact-email" className="mt-2 w-full border-b border-[hsl(var(--border))] bg-transparent py-3 text-[hsl(var(--primary))] outline-none transition-colors placeholder:text-[hsl(var(--muted-foreground))] focus:border-[hsl(var(--accent))]" placeholder="you@example.com" /></label>
              <label className="block"><span className="eyebrow text-[hsl(var(--muted-foreground))]">Message</span><textarea required name="message" data-testid="input-contact-message" rows={3} className="mt-2 w-full resize-none border-b border-[hsl(var(--border))] bg-transparent py-3 text-[hsl(var(--primary))] outline-none transition-colors placeholder:text-[hsl(var(--muted-foreground))] focus:border-[hsl(var(--accent))]" placeholder="A question, a celebration, a hello..." /></label>
              <button type="submit" data-testid="button-contact-submit" className="mt-2 flex w-full items-center justify-between rounded-full bg-[hsl(var(--primary))] px-5 py-4 text-sm font-bold text-[hsl(var(--background))] transition-transform hover:-translate-y-0.5">Send to Villa Caracas <ArrowUpRight size={16} /></button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[hsl(var(--primary))] px-6 pb-8 pt-14 text-[hsl(var(--background))] sm:px-12 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-10 border-b border-white/15 pb-12 md:flex-row md:items-end">
          <div><Logo light /><p className="mt-7 max-w-xs text-sm leading-6 text-[hsl(var(--background)/.55)]">A Lebanese restaurant, a Cairo evening, and a seat at the table for you.</p></div>
          <a href={reservationUrl} target="_blank" rel="noreferrer" data-testid="link-footer-reservation" className="group inline-flex items-center gap-3 self-start rounded-full border border-[hsl(var(--accent)/.65)] px-5 py-3 text-sm font-bold text-[hsl(var(--accent))] transition-colors hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--primary))] md:self-auto">Reserve via WhatsApp <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></a>
        </div>
        <div className="flex flex-col justify-between gap-4 pt-6 text-xs text-[hsl(var(--background)/.48)] sm:flex-row">
          <span>© 2024 Villa Caracas. All rights reserved.</span>
          <span>Made for long nights in Maadi.</span>
          <a href="#home" data-testid="link-back-to-top" className="transition-colors hover:text-[hsl(var(--accent))]">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}

function Home() {
  return (
    <div className="min-h-[100dvh] overflow-x-hidden">
      <Header />
      <main>
        <Hero />
        <Intro />
        <MenuSection />
        <StorySection />
        <TrustSection />
        <VisitSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
