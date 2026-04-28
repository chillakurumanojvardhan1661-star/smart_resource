# Smart Resource Platform 🚀
### Enterprise-Grade B2B Trade Intelligence & Execution Ecosystem

Smart Resource is a next-generation B2B platform designed to transform global trade from a manual, data-sparse process into a high-precision, automated intelligence operation. It combines 18+ microservices to provide end-to-end visibility, strategic optimization, and secure execution.

---

## 🧠 Core Intelligence Modules

### 1. Smart Product Search Engine
*   **Tech**: Node.js, Prisma, Elasticsearch (fallback to SQLite).
*   **Feature**: High-speed indexed product lookup with intelligent supplier ranking based on price, rating, and MOQs.

### 2. True Cost Calculator
*   **Feature**: Calculates absolute final "Landed Cost" including Shipping, Duties, Taxes (GST/VAT), and Handling.
*   **Killer Feature**: Multi-country benchmarking (compare profitability across India, UAE, USA, etc., in one click).

### 3. Demand-Supply Heatmap
*   **Feature**: Geographic visualization of trade imbalances.
*   **Insight**: Automatically identifies "🔥 Sell Zones" (high demand) and "📦 Buy Zones" (oversupply).

### 4. Profit vs Stability Analyzer
*   **Feature**: Strategic decision engine that scores sourcing options on two axes: ROI (Profit) and Reliability (Stability).
*   **Insight**: Guides users toward "Aggressive Growth" or "Stable Sourcing" based on their risk appetite.

### 5. Supplier Reliability Engine
*   **Feature**: Data-driven trust scoring based on Delivery Performance, Review Analysis, Price Volatility, and Order Fulfillment Consistency.
*   **Labeling**: Real-time risk status (🟢 Reliable, 🟡 Moderate, 🔴 Risky).

### 6. Procurement Optimization Engine
*   **Feature**: Solves constrained optimization problems to determine *exactly* how much to buy from which suppliers to meet demand while staying within budget and minimizing risk.

### 7. Import/Export Intelligence (Policy Engine)
*   **Feature**: Dynamic tracking of global tariffs, trade restrictions (bans/licenses), and seasonal trends (identifying the best months to trade).

### 8. B2B Networking & Negotiation
*   **Tech**: WebSockets, JWT.
*   **Feature**: Real-time negotiation chat, verified business profiles, and deal lifecycle tracking.

### 9. Business Dashboard (The Cockpit)
*   **Feature**: Aggregates all microservices into a personalized view with prioritized alerts, product recommendations, and market shift notifications.

### 10. Logistics & Risk Engines
*   **Logistics**: Graph-based shipping route optimization (NetworkX).
*   **Risk**: ML-driven loss prevention engine that warns against "buying now" during price drops or demand declines.

---

## 🛠️ Technology Stack

*   **Backend (Intelligence)**: Python (FastAPI), Pandas, Scikit-learn, NetworkX.
*   **Backend (Performance)**: Node.js (Express), Prisma ORM.
*   **Database**: PostgreSQL (Production), SQLite (Local Dev), Redis (Caching).
*   **Search**: Elasticsearch.
*   **Real-time**: WebSockets (Socket.io).
*   **DevOps**: Docker, Docker-Compose.

---

## 🚀 Getting Started

### Prerequisites
*   Docker & Docker Desktop
*   Node.js (v18+)
*   Python (3.9+)

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repo-url>
   cd smart_resource
   ```

2. **Launch Infrastructure**:
   ```bash
   ./run_platform.sh  # or run_enterprise.ps1 on Windows
   ```

3. **Install Dependencies (Search Engine)**:
   ```bash
   cd smart-product-search
   npm install
   npx prisma db push
   node seed.js
   npm run dev
   ```

---

## 🧪 Testing the Intelligence
Run the smoke tests to verify the core engines:
*   `node test_cost.js` - Landed Cost & Benchmarking
*   `node test_heatmap.js` - Geo-Market Analysis
*   `node test_analysis.js` - Strategic Profit/Risk analysis
*   `node test_reliability.js` - Supplier Trust metrics
*   `node test_optimization.js` - Bulk Order Planning
*   `node test_trade.js` - Policy & Tariff check

---

## 🛡️ License
Enterprise Proprietary - Smart Resource Intel Group.
