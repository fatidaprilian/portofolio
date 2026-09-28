# DNS Walkthrough: How the Internet Finds My Portfolio

When a recruiter or visitor types `faridekaaprilian.dev` into their browser, the site loads in less than a second. But beneath that single click lies a global lookup system called **DNS (Domain Name System)**.

To a human, an address like `faridekaaprilian.dev` is easy to remember. To computers, however, it means nothing. Computers navigate the internet using numerical coordinates called **IP addresses** (like `76.76.21.21` or an IPv6 sequence). DNS acts as the global contacts app or phonebook of the internet: translating human-friendly names into machine-readable IP addresses.

Here is the step-by-step journey of what actually happens behind the scenes from the moment someone presses Enter to the moment my server answers.

---

### 1. The Step-by-Step Resolution Journey

```text
[User Browser]
       │
       ▼ (1. "Where is faridekaaprilian.dev?")
[Recursive Resolver] (ISP / Cloudflare 1.1.1.1 / Google 8.8.8.8)
       │
       ├─► (2. Ask Root Nameserver ".") ──────► Returns: "Ask the .dev TLD"
       │
       ├─► (3. Ask .dev TLD Nameserver) ─────► Returns: "Ask the Authoritative Nameserver"
       │
       └─► (4. Ask Authoritative Nameserver) ─► Returns: "IP is 76.76.21.21 (or CNAME target)"
       │
       ▼ (5. Final IP Response)
[User Browser connects directly to Hosting Server via HTTPS]
```

1. **The Request to the Resolver**:
The user types `faridekaaprilian.dev`. The browser first checks its local cache. If it doesn't already know the address, it asks the **Recursive Resolver** (typically provided by their Internet Service Provider, or a public service like Cloudflare `1.1.1.1` or Google `8.8.8.8`). The resolver's entire job is to track down the answer across the globe on the user's behalf.
2. **The Root Nameserver (`.`)**:
If the resolver doesn't have the answer cached, it asks the **Root Nameserver**. The root doesn't know my website's specific IP, but it knows where to direct inquiries for the `.dev` top-level domain. It replies: *"I don't have Farid's IP, but go ask the `.dev` TLD nameserver."*
3. **The TLD Nameserver (`.dev`)**:
The resolver next queries the `.dev` **Top-Level Domain (TLD) Nameserver** (managed by Google Registry). This server knows who handles domain registrations for `faridekaaprilian.dev`. It replies: *"Go ask Farid's Authoritative Nameservers (e.g., Cloudflare/Vercel/Registrar nameservers)."*
4. **The Authoritative Nameserver & The Record**:
This is the final stop. The **Authoritative Nameserver** holds the actual, definitive record book for my domain. It looks up the zone records configured for `faridekaaprilian.dev` and finds the answer (an `A` record pointing to an IP address, or a `CNAME` record).
5. **The Response & Connection**:
The authoritative nameserver hands the IP address back to the resolver, the resolver saves it to cache and delivers it to the user's browser, and the browser directly establishes an encrypted HTTPS handshake with the hosting server. The website renders.

---

### 2. What is a CNAME Record? (Aliasing Domains)

In the DNS record book, there are different types of entries:

* An **A Record** maps a domain directly to a specific physical IP address (e.g., `faridekaaprilian.dev` $\rightarrow$ `76.76.21.21`).
* A **CNAME (Canonical Name) Record** is an **alias**. Instead of pointing a name to a raw IP number, it points a name to *another domain name*.

**Why is CNAME useful?**

Modern cloud hosts (like Vercel, Netlify, or GitHub Pages) balance traffic across thousands of rotating server IP addresses. If they assigned a static IP to every site, a server migration would break millions of domains.

Instead, a host provides a target domain such as `cname.vercel-dns.com` or `yourname.netlify.app`. By setting a `CNAME` record for `www.faridekaaprilian.dev` pointing to that hostname, I instruct DNS: *"Whenever someone looks for `www`, go look up the IP address belonging to my hosting provider's URL."* If the host updates its internal infrastructure or IP addresses, my domain continues working without manual intervention.

---

### 3. Summary for a Non-Technical Colleague

Think of DNS like calling a business:

1. **You** want to call "Farid's Engineering Shop".
2. **The Resolver** is your personal assistant making the inquiry.
3. The **Root & TLD** are the national operator directing the assistant to the correct regional directory.
4. The **Authoritative Nameserver** is the master phone directory listing the actual office phone number (the **IP address**).
5. A **CNAME** is a call-forwarding rule: *"If you call the branch line, forward the call to the main headquarters number."*

Once the assistant gets the number, your phone rings the front desk directly—and the webpage appears.
