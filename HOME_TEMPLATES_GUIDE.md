# Home Page Templates Guide

This guide provides an overview of all available home page templates in `src/pages/homes/` and guidance on when to use each template based on your business type, target audience, and specific needs.

## 📋 Template Overview

The project includes **9 specialized home page templates**, each designed for different industries and use cases:

| Template | Best For | Key Features |
|----------|----------|--------------|
| [`saas.astro`](#saas-template) | SaaS Companies | Login/signup actions, pricing tiers, feature showcase |
| [`startup.astro`](#startup-template) | Tech Startups | YouTube integration, investor focus, growth metrics |
| [`mobile-app.astro`](#mobile-app-template) | Mobile Apps | App store downloads, feature demos, user testimonials |
| [`personal.astro`](#personal-template) | Personal Portfolios | Resume sections, project showcases, skills display |
| [`counseling.astro`](#counseling-template) | Mental Health Services | Therapeutic approaches, confidential contact forms |
| [`beach.astro`](#beach-club-template) | Leisure/Hospitality | Membership tiers, luxury amenities, booking systems |
| [`physio-home-1.astro`](#physio-home-1-template) | General Physical Therapy | Insurance focus, comprehensive services, medical approach |
| [`physio-home-2.astro`](#physio-home-2-template) | Community-Focused PT | Trust building, local community emphasis |
| [`physio-home-3.astro`](#physio-home-3-template) | Boutique Physical Therapy | One-on-one care, personalized service, therapist profiles |

---

## 🔧 Template Details

### SaaS Template

**File:** `src/pages/homes/saas.astro`  
**Title:** "SaaS Landing Page"

**Best suited for:**

- Software as a Service companies
- B2B technology platforms
- Subscription-based services
- Cloud-based solutions

**Key components:**

- Login/signup header actions
- Feature comparison sections
- Pricing tiers with subscription models
- Integration showcases
- Customer testimonials focused on ROI
- Free trial CTAs

**Target audience:** Business decision-makers, IT professionals, SaaS buyers

---

### Startup Template

**File:** `src/pages/homes/startup.astro`  
**Title:** "Startup Landing Page"

**Best suited for:**

- Early-stage technology companies
- Venture-backed startups
- Product launches
- Investment pitch support

**Key components:**

- Embedded YouTube video integration
- Startup metrics and stats
- About us/team sections
- Growth story narrative
- Investor-focused messaging
- Template download CTAs

**Target audience:** Investors, early adopters, potential customers, partners

---

### Mobile App Template

**File:** `src/pages/homes/mobile-app.astro`  
**Title:** "Mobile App Homepage"

**Best suited for:**

- iOS/Android mobile applications
- App store optimization
- Mobile-first products
- Consumer apps

**Key components:**

- App Store and Google Play download buttons
- Step-by-step app usage guide
- Feature demonstrations
- Mobile-optimized design
- User testimonials from app users
- Screenshots and previews

**Target audience:** Mobile users, app store browsers, consumer market

---

### Personal Template

**File:** `src/pages/homes/personal.astro`  
**Title:** "Personal Homepage Demo"

**Best suited for:**

- Graphic designers
- Creative professionals
- Freelancers
- Portfolio websites
- Personal branding

**Key components:**

- Resume/experience timeline
- Education history
- Skills showcase
- Project portfolio with case studies
- Personal branding elements
- Contact/hire me CTAs

**Target audience:** Potential clients, employers, professional network

---

### Counseling Template

**File:** `src/pages/homes/counseling.astro`  
**Title:** "Professional Counseling Services - Mental Health Support"

**Best suited for:**

- Mental health professionals
- Therapy practices
- Counseling services
- Wellness centers
- Psychology practices

**Key components:**

- Therapeutic approaches explanation
- Service types (individual, couples, family, group)
- Professional credentials emphasis
- Confidentiality assurances
- Crisis hotline disclaimer
- Secure contact forms

**Target audience:** Individuals seeking therapy, families, couples

---

### Beach Club Template

**File:** `src/pages/homes/beach.astro`  
**Title:** "Paradise Cove Beach Club - Exclusive Membership"

**Best suited for:**

- Private clubs
- Membership organizations
- Luxury hospitality
- Exclusive venues
- Resort communities

**Key components:**

- Membership tier pricing
- Luxury amenities showcase
- Exclusive event calendar
- Member testimonials
- Application process steps
- Premium lifestyle imagery

**Target audience:** Affluent individuals, families seeking exclusive experiences

---

### Physio Home 1 Template

**File:** `src/pages/homes/physio-home-1.astro`  
**Title:** "Physical Therapy - Outcome-Driven Care | Get Moving Again"

**Best suited for:**

- General physical therapy clinics
- Medical rehabilitation centers
- Insurance-based practices
- Traditional PT services

**Key components:**

- Sticky contact bar with phone number
- Comprehensive service offerings
- Insurance acceptance emphasis
- Medical terminology and credentials
- 3-step treatment process
- Professional, clinical approach

**Target audience:** Patients with insurance, medical referrals, general population

**Focus:** Broad appeal, medical credibility, insurance acceptance

---

### Physio Home 2 Template

**File:** `src/pages/homes/physio-home-2.astro`  
**Title:** "Physical Therapy - Community & Trust | Your Local Healing Partners"

**Best suited for:**

- Community-based PT practices
- Local rehabilitation centers
- Family-oriented practices
- Neighborhood clinics

**Key components:**

- Community trust emphasis
- "Trusted by thousands" messaging
- Local partnership approach
- Background video integration
- Relationship-focused testimonials
- Community involvement showcase

**Target audience:** Local community members, families, word-of-mouth referrals

**Focus:** Community connection, local trust, established relationships

---

### Physio Home 3 Template

**File:** `src/pages/homes/physio-home-3.astro`  
**Title:** "Physical Therapy - Boutique 1-on-1 Care | Personalized Treatment"

**Best suited for:**

- Boutique physical therapy practices
- Premium one-on-one services
- Concierge PT services
- High-end rehabilitation

**Key components:**

- Individual therapist profiles with hover details
- One-on-one care emphasis
- Boutique service positioning
- Inline appointment booking form
- Conditions carousel with specialized treatments
- Premium, personalized approach

**Target audience:** Clients seeking personalized attention, premium service seekers

**Focus:** Personalized care, individual attention, boutique experience

---

## 🎯 Choosing the Right Template

### By Business Type

**Technology Companies:**

- SaaS companies → `saas.astro`
- Early-stage startups → `startup.astro`
- Mobile app developers → `mobile-app.astro`

**Professional Services:**

- Mental health professionals → `counseling.astro`
- Physical therapy (general) → `physio-home-1.astro`
- Physical therapy (community-focused) → `physio-home-2.astro`
- Physical therapy (boutique) → `physio-home-3.astro`

**Personal/Creative:**

- Designers, artists, freelancers → `personal.astro`

**Hospitality/Leisure:**

- Private clubs, luxury venues → `beach.astro`

### By Target Audience

**B2B Customers:**

- `saas.astro` - Business decision makers
- `startup.astro` - Investors and partners

**B2C Customers:**

- `mobile-app.astro` - Consumer mobile users
- `counseling.astro` - Individuals seeking therapy
- `beach.astro` - Affluent lifestyle customers

**Professional Services:**

- `physio-home-1.astro` - General patients with insurance
- `physio-home-2.astro` - Local community members
- `physio-home-3.astro` - Premium service seekers
- `personal.astro` - Potential clients/employers

### By Key Features Needed

**E-commerce/Subscription:**

- Pricing tiers → `saas.astro`, `beach.astro`
- Download/purchase → `mobile-app.astro`

**Portfolio/Showcase:**

- Work samples → `personal.astro`
- Service explanations → `counseling.astro`, `physio-*`

**Lead Generation:**

- Contact forms → All templates include contact sections
- Appointment booking → `physio-home-3.astro`, `counseling.astro`

**Trust Building:**

- Testimonials → All templates include testimonials
- Credentials → `counseling.astro`, `physio-*`
- Community focus → `physio-home-2.astro`

---

## 🚀 Implementation Notes

### SEO & Meta Data

Each template includes optimized:

- Page titles and descriptions
- Open Graph meta tags
- Twitter Card meta tags
- Robots meta tags
- Canonical links

### Responsive Design

All templates are:

- Mobile-first responsive
- Accessible (WCAG 2.1 compliant)
- Fast loading with optimized images
- Cross-browser compatible

### Animation Features

Templates include:

- Intersection Observer scroll animations
- CSS transitions and transforms
- Reduced motion support
- Progressive enhancement

### Performance

Built with:

- Astro 5.0 for optimal performance
- Tailwind CSS for efficient styling
- Optimized image loading
- Minimal JavaScript footprint

---

## 📝 Customization Tips

1. **Content Strategy:** Each template provides content structure guides through its existing sections
2. **Visual Identity:** Update colors, fonts, and imagery to match your brand
3. **Component Reuse:** Mix and match components between templates as needed
4. **SEO Optimization:** Update metadata, titles, and descriptions for your specific use case
5. **Analytics:** Add your tracking codes to monitor performance

---

## 🤝 Support

For questions about template selection or customization:

- Review the BRD.md for project requirements
- Check individual template files for implementation details
- Consider your target audience and business goals when choosing

---

*Last updated: June 2025*
