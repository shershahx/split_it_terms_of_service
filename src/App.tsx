import { useState, useEffect } from "react";
import { 
  BookOpen, 
  Search, 
  Printer, 
  Minus, 
  Plus, 
  ChevronRight, 
  Mail, 
  MapPin, 
  User, 
  Calendar, 
  Info, 
  AlertTriangle,
  ExternalLink,
  ChevronDown
} from "lucide-react";
import { termsSections, TERMS_METADATA } from "./data/termsData";

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [fontSize, setFontSize] = useState<"sm" | "base" | "lg" | "xl">("base");
  const [lineHeight, setLineHeight] = useState<"normal" | "relaxed" | "loose">("relaxed");
  const [activeSectionId, setActiveSectionId] = useState<string>("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Intersection Observer for tracking scroll active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSectionId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-10% 0px -70% 0px",
        threshold: 0,
      }
    );

    termsSections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => {
      termsSections.forEach((section) => {
        const el = document.getElementById(section.id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  // Update read progress scroll indicator
  useEffect(() => {
    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        const progress = (window.scrollY / docHeight) * 100;
        setScrollProgress(progress);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Safe manual scrolling function for offset matching the sticky header
  const scrollToId = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 140; // Height of sticky top panel
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      
      // Update browser URL hash cleanly without jumping
      window.history.pushState(null, "", `#${id}`);
      setActiveSectionId(id);
      setMobileMenuOpen(false);
    }
  };

  // Safe text highlighting helper for search keywords
  const highlightText = (text: string, query: string) => {
    if (!query) return text;
    const cleanQuery = query.trim().replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
    if (!cleanQuery) return text;

    const parts = text.split(new RegExp(`(${cleanQuery})`, "gi"));
    return (
      <>
        {parts.map((part, i) => 
          part.toLowerCase() === cleanQuery.toLowerCase() ? (
            <mark key={i} className="bg-amber-100 dark:bg-amber-950 text-amber-950 dark:text-amber-100 font-semibold border-b-2 border-amber-400 px-0.5 rounded-sm">
              {part}
            </mark>
          ) : (
            part
          )
        )}
      </>
    );
  };

  // Print support action
  const handlePrint = () => {
    window.print();
  };

  // Font size classes resolver
  const getFontSizeClass = () => {
    switch (fontSize) {
      case "sm": return "text-sm sm:text-base";
      case "base": return "text-base sm:text-lg";
      case "lg": return "text-lg sm:text-xl";
      case "xl": return "text-xl sm:text-2xl";
      default: return "text-base";
    }
  };

  const getLineHeightClass = () => {
    switch (lineHeight) {
      case "normal": return "leading-normal";
      case "relaxed": return "leading-relaxed";
      case "loose": return "leading-loose";
      default: return "leading-relaxed";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 antialiased font-sans text-slate-800 transition-colors duration-200">
      
      {/* Decorative Top Mesh Grid Shape */}
      <div className="no-print absolute top-0 left-0 right-0 h-[480px] bg-gradient-to-b from-sky-50 to-transparent pointer-events-none -z-10 opacity-70">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-100/45 via-slate-50/20 to-transparent"></div>
        <div style={{ backgroundImage: "radial-gradient(#38bdf8 0.5px, transparent 0.5px)", backgroundSize: "24px 24px" }} className="absolute inset-0 opacity-15"></div>
      </div>

      {/* Main Top Header and Command Center (Sticky) */}
      <header className="no-print sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-100 w-full shadow-sm">
        {/* Scroll Progress Bar Indicator */}
        <div 
          style={{ width: `${scrollProgress}%` }} 
          className="h-1 bg-gradient-to-r from-sky-500 to-indigo-500 transition-all duration-100 ease-out"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            
            {/* Logo and Status Badge */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-sky-600 flex items-center justify-center text-white shadow-md shadow-sky-600/20">
                  <BookOpen className="w-5.5 h-5.5" />
                </div>
                <div>
                  <h1 className="font-display font-bold text-xl text-slate-900 tracking-tight flex items-center gap-2">
                    {TERMS_METADATA.appName}
                    <span className="text-xs font-sans font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full border border-slate-200">
                      Terms
                    </span>
                  </h1>
                  <p className="text-xs text-slate-500 mt-0.5">Operated by {TERMS_METADATA.operator}</p>
                </div>
              </div>

              {/* Mobile Table of Contents button */}
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden flex items-center gap-1 text-slate-600 hover:text-slate-950 font-medium text-sm py-1 px-3 bg-slate-100 rounded-lg border border-slate-200 transition-colors"
                aria-label="Table of contents"
              >
                TOC <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileMenuOpen ? "rotate-180" : ""}`} />
              </button>
            </div>

            {/* Accessibility and Utility Row */}
            <div className="flex flex-wrap items-center gap-3">
              
              {/* Search Bar Input */}
              <div className="relative flex-1 min-w-[200px] max-w-sm">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search className="h-4 py-0 w-4 text-slate-400" />
                </span>
                <input
                  type="text"
                  placeholder="Search in terms..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full text-sm pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 focus:bg-white transition-all"
                  aria-label="Search within agreement text"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery("")}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-xs text-slate-400 hover:text-slate-600"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Reader Controls Panel (Font Size / Line Height) */}
              <div className="flex items-center bg-slate-100/80 p-1 rounded-xl border border-slate-200/50">
                <span className="text-xs font-semibold text-slate-500 px-2 lg:inline hidden">Accessibility</span>
                
                {/* Font decrease */}
                <button
                  onClick={() => {
                    if (fontSize === "xl") setFontSize("lg");
                    else if (fontSize === "lg") setFontSize("base");
                    else if (fontSize === "base") setFontSize("sm");
                  }}
                  disabled={fontSize === "sm"}
                  className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 disabled:opacity-40 hover:bg-white/80 transition-colors"
                  title="Decrease text size"
                >
                  <Minus className="w-4 h-4" />
                </button>
                
                {/* Core font zoom rate display */}
                <span className="text-xs font-mono font-medium px-2 bg-white text-slate-700 py-0.5 rounded shadow-xs min-w-10 text-center">
                  {fontSize.toUpperCase()}
                </span>

                {/* Font increase */}
                <button
                  onClick={() => {
                    if (fontSize === "sm") setFontSize("base");
                    else if (fontSize === "base") setFontSize("lg");
                    else if (fontSize === "lg") setFontSize("xl");
                  }}
                  disabled={fontSize === "xl"}
                  className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 disabled:opacity-40 hover:bg-white/80 transition-colors"
                  title="Increase text size"
                >
                  <Plus className="w-4 h-4" />
                </button>

                <div className="w-px h-5 bg-slate-200 mx-1" />

                {/* Line Height Control */}
                <button
                  onClick={() => {
                    if (lineHeight === "normal") setLineHeight("relaxed");
                    else if (lineHeight === "relaxed") setLineHeight("loose");
                    else setLineHeight("normal");
                  }}
                  className="px-2 py-1 text-xs font-semibold rounded-lg text-slate-700 hover:bg-white/80 transition-colors"
                  title="Adjust spacing between paragraphs"
                >
                  Height: {lineHeight === "normal" ? "Normal" : lineHeight === "relaxed" ? "Relaxed" : "Loose"}
                </button>
              </div>

              {/* Print Document Button */}
              <button
                onClick={handlePrint}
                className="flex items-center gap-1.5 px-3 py-2 bg-slate-900 text-white rounded-xl text-sm font-medium hover:bg-slate-800 active:scale-95 transition-all cursor-pointer shadow-sm shadow-slate-900/10"
                title="Print copy or Save to PDF"
              >
                <Printer className="w-4 h-4" />
                <span className="sm:inline hidden">Print</span>
              </button>

            </div>
          </div>
        </div>

        {/* Mobile Expandable Table of Contents Selector Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-slate-100 max-h-[350px] overflow-y-auto px-4 py-3 divide-y divide-slate-100 animate-in fade-in slide-in-from-top-4 duration-200">
            <h3 className="text-xs font-semibold text-slate-400 pb-2 uppercase tracking-wider">Sections Navigation</h3>
            {termsSections.map((sec) => (
              <button
                key={sec.id}
                onClick={() => scrollToId(sec.id)}
                className={`flex items-center gap-2 w-full text-left py-2.5 text-sm transition-colors ${
                  activeSectionId === sec.id 
                    ? "text-sky-600 font-semibold pl-1 border-l-2 border-sky-600" 
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <span className="w-5 font-mono text-xs text-slate-400 text-right">{sec.num}</span>
                <span className="truncate">{sec.title}</span>
              </button>
            ))}
          </div>
        )}
      </header>

      {/* Main Dual Structure */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* LEFT COLUMN: Sidebar (Desktop only) with Sticky Anchor Navigation */}
          <aside className="no-print hidden lg:block lg:col-span-1 sticky top-40 self-start max-h-[calc(100vh-180px)] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-200">
            <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
              <div className="flex items-center gap-2 text-slate-400 mb-4 pb-2 border-b border-slate-100">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Chapters ({termsSections.length})</span>
              </div>
              
              <nav className="space-y-1" aria-label="Table of contents table list">
                {termsSections.map((sec) => {
                  const isActive = activeSectionId === sec.id;
                  return (
                    <button
                      key={sec.id}
                      onClick={() => scrollToId(sec.id)}
                      className={`group flex items-start gap-2.5 w-full text-left py-2 px-2.5 rounded-lg text-xs leading-5 transition-all duration-150 cursor-pointer ${
                        isActive 
                          ? "bg-slate-100 text-sky-600 font-semibold border-l-4 border-sky-600" 
                          : "text-slate-600 hover:text-slate-900 hover:bg-slate-50/70"
                      }`}
                    >
                      <span className={`font-mono text-xs ${isActive ? "text-sky-600 font-bold" : "text-slate-400 group-hover:text-slate-700"}`}>
                        {sec.num.toString().padStart(2, '0')}.
                      </span>
                      <span className="line-clamp-2">{sec.title}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* RIGHT COLUMN: Actual terms copy body layout */}
          <section className="lg:col-span-3">
            
            {/* Visual Header Banner card */}
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-sm print-break mb-8 relative overflow-hidden print-shadow-none">
              <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/5 rounded-full blur-3xl pointer-events-none"></div>
              
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="bg-sky-50 text-sky-700 border border-sky-100 text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" /> Effective: {TERMS_METADATA.effectiveDate}
                </span>
                <span className="bg-slate-100 text-slate-600 text-xs font-medium px-2.5 py-1 rounded-full">
                  Last Updated: {TERMS_METADATA.lastUpdated}
                </span>
              </div>

              <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight">
                {TERMS_METADATA.appName} <span className="font-light text-slate-500">Terms of Service</span>
              </h2>

              <p className="mt-4 text-slate-500 max-w-2xl text-sm sm:text-base leading-relaxed">
                These Terms of Service (&quot;<strong>Terms</strong>&quot;) govern your access to and use of the {TERMS_METADATA.appName} mobile application and any related services we provide (collectively, the &quot;<strong>Service</strong>&quot;). The Service is operated by <strong>{TERMS_METADATA.operator}</strong> (&quot;<strong>we</strong>,&quot; &quot;<strong>us</strong>,&quot; or &quot;<strong>our</strong>&quot;).
              </p>

              <div className="mt-6 p-4 bg-sky-50/50 rounded-xl border border-sky-100/60 text-slate-600 text-xs sm:text-sm leading-relaxed flex items-start gap-3">
                <Info className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                <span>
                  Please read these Terms carefully before utilizing the application. By downloading, accessing, or using our Service, you irrevocably agree to comply with and be bound by these Terms. If you do not agree, do not use the Service.
                </span>
              </div>
            </div>

            {/* Render each of the nineteen paragraphs */}
            <div className="space-y-6">
              {termsSections.map((sec) => {
                const isWarning = sec.warningCallout;
                const hasSearchHits = searchQuery && (
                  sec.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  sec.paragraphs.some(p => p.toLowerCase().includes(searchQuery.toLowerCase())) ||
                  (sec.bullets && sec.bullets.some(b => b.toLowerCase().includes(searchQuery.toLowerCase())))
                );

                return (
                  <article
                    id={sec.id}
                    key={sec.id}
                    className={`scroll-mt-36 p-6 sm:p-8 bg-white rounded-2xl border transition-all duration-200 print-shadow-none ${
                      activeSectionId === sec.id 
                        ? "border-sky-300 ring-2 ring-sky-500/10 shadow-md" 
                        : "border-slate-100 shadow-xs"
                    } ${isWarning ? "border-amber-100 bg-amber-50/20" : ""} ${
                      searchQuery && !hasSearchHits ? "opacity-45" : "opacity-100"
                    }`}
                  >
                    
                    {/* Header line */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4 pb-3 border-b border-slate-100/80">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-sm font-bold text-sky-600 bg-sky-50 px-2.5 py-1 rounded-lg">
                          {sec.num}
                        </span>
                        <h3 className="font-display font-bold text-lg sm:text-xl text-slate-900 tracking-tight">
                          {highlightText(sec.title, searchQuery)}
                        </h3>
                      </div>

                      {isWarning && (
                        <span className="self-start sm:self-auto bg-amber-50 text-amber-800 border border-amber-200/60 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md flex items-center gap-1">
                          <AlertTriangle className="w-3.5 h-3.5 text-amber-600" /> Crucial Provision
                        </span>
                      )}
                    </div>

                    {/* Standard paragraph lists */}
                    <div className={`${getFontSizeClass()} ${getLineHeightClass()} text-slate-700 space-y-3.5`}>
                      {sec.paragraphs.map((p, index) => {
                        // Apply contact indicators to Paragraphs
                        const isEmailP = p.includes("splitit.support@gmail.com");
                        return (
                          <p key={index} className="text-justify font-sans">
                            {highlightText(p, searchQuery)}
                          </p>
                        );
                      })}

                      {/* Regular lists */}
                      {sec.bullets && sec.bullets.length > 0 && (
                        <ul className="list-none space-y-2 mt-3 pl-1">
                          {sec.bullets.map((bullet, idx) => (
                            <li key={idx} className="flex items-start gap-2.5 text-slate-600 text-sm sm:text-base">
                              <span className="text-sky-500 mt-1.5 shrink-0">
                                <ChevronRight className="w-4 h-4" />
                              </span>
                              <span className="flex-1 text-slate-700">
                                {highlightText(bullet, searchQuery)}
                              </span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    {/* Customized layout cards for Contact Section */}
                    {sec.id === "contact" && (
                      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                        <a 
                          href="mailto:splitit.support@gmail.com" 
                          className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-100 hover:border-sky-200 hover:bg-sky-50/40 rounded-xl transition-all duration-200 group group-hover:shadow-xs"
                        >
                          <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center text-green-600">
                            <Mail className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Email support</p>
                            <p className="text-sm font-semibold text-slate-800 group-hover:text-sky-700 flex items-center gap-1">
                              {TERMS_METADATA.contactEmail} <ExternalLink className="w-3.5  h-3.5 opacity-40 group-hover:opacity-100" />
                            </p>
                          </div>
                        </a>
                        
                        <div className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-100 rounded-xl">
                          <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center text-red-600">
                            <MapPin className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Location</p>
                            <p className="text-sm font-semibold text-slate-800">{TERMS_METADATA.contactAddress}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {sec.versions && sec.versions.length > 0 && (
                      <div className="mt-6 space-y-3 pt-4 border-t border-slate-100">
                        {sec.versions.map((ver, idx) => (
                          <div 
                            key={idx} 
                            className={`p-4 rounded-xl border flex flex-col sm:flex-row gap-4 sm:items-center transition-all ${
                              ver.current 
                                ? 'bg-sky-50 border-sky-200 shadow-sm ring-1 ring-sky-500/10' 
                                : 'bg-slate-50 border-slate-100'
                            }`}
                          >
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1.5">
                                <span className="font-bold text-slate-900 border border-slate-200 bg-white px-2 py-0.5 rounded text-sm shadow-xs">
                                  v{ver.version}
                                </span>
                                {ver.current && (
                                  <span className="bg-sky-500 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md flex items-center gap-1 shadow-sm">
                                    Current Version
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-slate-600 leading-relaxed">{ver.description}</p>
                            </div>
                            <div className={`text-sm font-medium shrink-0 flex flex-col sm:items-end ${ver.current ? 'text-sky-700' : 'text-slate-500'}`}>
                              <span className="text-xs uppercase tracking-wider opacity-60 mb-0.5">Effective Date</span>
                              {ver.date}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                  </article>
                );
              })}
            </div>

            {/* Back to Top and Quick Acceptance Confirmation Bar */}
            <footer className="mt-12 text-center py-8 border-t border-slate-100">
              <p className="text-xs text-slate-400">
                You are viewing the official Split It terms of service agreement.
              </p>
              <p className="text-xs text-slate-400 mt-1">
                © {new Date().getFullYear()} {TERMS_METADATA.operator}. All rights reserved.
              </p>
              
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="no-print mt-4 text-xs font-semibold text-sky-600 hover:text-sky-800 flex items-center justify-center gap-1 mx-auto py-1.5 px-3 rounded-lg hover:bg-slate-100 transition-colors"
              >
                Back to Top ↑
              </button>
            </footer>

          </section>
        </div>
      </main>

    </div>
  );
}
