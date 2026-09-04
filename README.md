<div align="center">

# 🚨 CyberPehra

### 🛡️ AI-Powered Predictive Cybercrime Intelligence & Cash Withdrawal Hotspot Prediction System

<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&size=20&duration=2500&pause=800&color=00C2FF&center=true&vCenter=true&width=850&lines=Predict+Early+%E2%80%A2+Detect+Risk+%E2%80%A2+Act+Proactively;Forecast+Likely+Cash+Withdrawal+Hotspots;Detect+Suspicious+Financial+Patterns;Generate+Actionable+Cybercrime+Intelligence;Enable+Proactive+Cybercrime+Intervention" />

<br><br>

<img src="https://img.shields.io/badge/AI%2FML-Predictive%20Analytics-00C2FF?style=for-the-badge" />
<img src="https://img.shields.io/badge/GIS-Risk%20Heatmap-00B894?style=for-the-badge" />
<img src="https://img.shields.io/badge/Cybersecurity-Intelligence-6C5CE7?style=for-the-badge" />
<img src="https://img.shields.io/badge/Hackathon-2026-FF7675?style=for-the-badge" />

<br><br>

**Predict Early • Detect Risk • Act Proactively**

</div>

---

# 🎯 Project Overview

**CyberPehra** is an AI/ML-powered predictive cybercrime intelligence system designed to analyze historical cybercrime complaints, financial transaction patterns, ATM/location information, and temporal-spatial features to identify **potential high-risk cash withdrawal hotspots in advance**.

The system transforms historical data into actionable intelligence:

**Data → Prediction → Risk Score → Hotspot → Heatmap → Alert → Actionable Intelligence**

CyberPehra is designed to support **Law Enforcement Agencies (LEAs), Banks/Financial Institutions, and I4C authorities** in proactive cybercrime intervention.

> ⚠️ **Responsible AI:** CyberPehra provides risk-based decision support. Predictions indicate potential risk and are not definitive evidence of criminal activity. Final decisions remain with authorized human authorities.

---

# 🚨 Problem Statement

The National Cybercrime Reporting Portal receives a large and continuously increasing number of cybercrime complaints.

A purely reactive approach can make it difficult to identify emerging patterns before additional fraudulent withdrawals occur.

CyberPehra introduces a **proactive predictive analytics approach**.

Instead of only asking:

> ❌ Where did the fraud happen?

CyberPehra aims to answer:

> 🔮 **Where is suspicious cash-withdrawal activity more likely to occur based on historical and contextual patterns?**

This enables authorities and financial institutions to identify potential hotspots earlier and prioritize monitoring and intervention.

---

# 🧠 How CyberPehra Works

**Cybercrime Complaints + Financial Transactions + ATM/Location Data**

⬇️

**Data Collection**

⬇️

**Data Cleaning & Preprocessing**

⬇️

**Feature Engineering**

⬇️

**Machine Learning**

**XGBoost + Isolation Forest**

⬇️

**Risk Score Generation**

⬇️

**Likely Withdrawal Hotspot Prediction**

⬇️

**GIS Risk Heatmap**

⬇️

**Intelligent Alerts**

⬇️

**Actionable Intelligence for LEAs & Banks**

---

# ⭐ Key Features

| Feature                   | Description                                           |
| ------------------------- | ----------------------------------------------------- |
| 🔮 Predictive Analytics   | Predict potential high-risk cash withdrawal locations |
| 🤖 ML Risk Engine         | XGBoost-based risk prediction                         |
| 🕵️ Anomaly Detection     | Isolation Forest for unusual patterns                 |
| 📍 Hotspot Detection      | Identify geographically concentrated risk             |
| 🗺️ GIS Heatmap           | Visualize risk zones interactively                    |
| ⏰ Time Analysis           | Identify high-risk time windows                       |
| 📊 Risk Scoring           | Generate location risk score from 0–100               |
| 🚨 Intelligent Alerts     | Trigger alerts for high-risk zones                    |
| 🔐 Secure Access          | JWT + RBAC-based access control                       |
| 📈 Intelligence Dashboard | Centralized predictive intelligence                   |

---

# 🤖 AI & Machine Learning

## 🔥 XGBoost

XGBoost is used as the primary predictive model for estimating the risk associated with locations based on historical patterns and engineered features.

## 🕵️ Isolation Forest

Isolation Forest is used to detect unusual or anomalous transaction patterns that differ significantly from normal behavior.

## 🧮 Feature Engineering

Important predictive features include:

* Transaction Frequency
* Withdrawal Amount
* Previous Fraud Count
* Complaint Density
* Hour of Day
* Day of Week
* Historical Suspicious Activity
* Location Risk
* Geospatial Features
* ATM Activity

---

# 📊 Risk Scoring

CyberPehra converts machine learning predictions into a simple risk score.

🟢 **LOW RISK — 0–40**

🟡 **MEDIUM RISK — 41–70**

🔴 **HIGH RISK — 71–100**

### Example Prediction

| Parameter              | Result        |
| ---------------------- | ------------- |
| 📍 Location            | Zone 4        |
| 📊 Risk Score          | 87 / 100      |
| 🚨 Risk Level          | HIGH          |
| 🎯 Predicted Hotspot   | YES           |
| ⏰ Peak Risk Window     | 18:00 – 21:00 |
| 🧾 Complaint Density   | HIGH          |
| 💳 Suspicious Activity | HIGH          |

---

# 🗺️ GIS Risk Intelligence

CyberPehra provides interactive geographical visualization of predicted risk zones.

### GIS Technologies

* Leaflet.js
* OpenStreetMap
* H3 Geospatial Indexing

### Risk Visualization

🟢 **LOW RISK**

🟡 **MEDIUM RISK**

🔴 **HIGH RISK**

The GIS dashboard can display:

* High-risk areas
* ATM locations
* Risk scores
* Complaint density
* Transaction activity
* Time-based risk
* Crime-category filters
* Predicted hotspots

---

# 🚨 Intelligent Alert System

When a location crosses a configured risk threshold, CyberPehra can generate an actionable alert.

### Example

🚨 **HIGH-RISK ALERT**

📍 **Location:** Zone 4

📊 **Risk Score:** 87/100

⚠️ **Risk Level:** HIGH

⏰ **Peak Risk:** 18:00 – 21:00

🎯 **Predicted Hotspot:** YES

### Recommended Action

Increase monitoring and notify authorized stakeholders.

### Notification Channels

* Dashboard Notifications
* Email
* SMS
* REST API
* WebSocket / Real-Time Events

---

# 📊 Intelligence Dashboard

The dashboard provides a centralized view of predictive cybercrime intelligence.

### Dashboard Components

📊 Total Complaints

🚨 High-Risk Areas

🏧 High-Risk ATMs

📈 Risk Distribution

🗺️ GIS Risk Heatmap

⏰ Time-Based Risk

🧾 Crime Category

🔔 Active Alerts

📍 Location Intelligence

---

# 🏗️ System Architecture

<div align="center">

### 📥 DATA SOURCES

Cybercrime Complaints
Financial Transactions
ATM & Location Data

⬇️

### ⚙️ DATA PROCESSING

Python • Pandas • NumPy

⬇️

### 🧮 FEATURE ENGINEERING

Time • Transaction • Fraud • Location Features

⬇️

### 🤖 AI / ML ENGINE

XGBoost • Isolation Forest

⬇️

### 📊 RISK ENGINE

Risk Score: **0–100**

⬇️

### 📍 HOTSPOT PREDICTION

Likely Cash Withdrawal Locations

⬇️

### ⚡ FASTAPI BACKEND

Prediction & Intelligence APIs

⬇️

### 🎨 NEXT.JS DASHBOARD

Analytics • Alerts • Visualization

⬇️

### 🗺️ GIS ENGINE

Leaflet • OpenStreetMap • H3

⬇️

### 🛡️ ACTIONABLE INTELLIGENCE

LEAs • Banks/FIs • I4C

</div>

---

# 🛠️ Technology Stack

| Layer                | Technologies                    |
| -------------------- | ------------------------------- |
| 🎨 Frontend          | Next.js, React, Tailwind CSS    |
| 🗺️ Mapping          | Leaflet.js, OpenStreetMap, H3   |
| ⚙️ Backend           | Python, FastAPI, Pydantic       |
| 🧠 Machine Learning  | Scikit-learn, XGBoost           |
| 🔍 Anomaly Detection | Isolation Forest                |
| 📊 Data Processing   | Pandas, NumPy                   |
| 🤖 AI/LLM            | LangChain, Groq API             |
| 🗄️ Database         | MongoDB                         |
| 🚨 Alerts            | Email API, SMS API, WebSocket   |
| 🔐 Security          | JWT, RBAC, HTTPS, Audit Logging |
| 🚀 DevOps            | Git, GitHub, Docker, Cloud      |

---

# 📁 Project Structure

CyberPehra/

├── data/

│   ├── raw/

│   └── processed/

├── ml/

│   ├── preprocessing.py

│   ├── feature_engineering.py

│   ├── train_model.py

│   ├── predict.py

│   └── anomaly_detection.py

├── models/

│   └── trained_models/

├── backend/

│   ├── main.py

│   ├── routes/

│   ├── services/

│   └── schemas/

├── frontend/

│   ├── app/

│   ├── components/

│   └── services/

├── notebooks/

├── requirements.txt

├── Dockerfile

└── README.md

---

# 🔐 Security & Responsible AI

CyberPehra is designed for sensitive cybercrime and financial intelligence workflows.

### Security Measures

🔐 JWT Authentication

👤 Role-Based Access Control

🛡️ Secure REST APIs

✅ Input Validation

🔒 HTTPS / SSL

📜 Audit Logging

🚫 Controlled Data Access

🔑 Secure Environment Variables

### Human-in-the-Loop

**AI Prediction**

⬇️

**Risk Intelligence**

⬇️

**Human Verification**

⬇️

**Authorized Decision**

⬇️

**Action**

AI predictions should support investigators rather than automatically make operational decisions.

---

# 🎯 Expected Impact

⚡ **Faster Detection**

Identify potential risk areas earlier.

🎯 **Better Risk Targeting**

Prioritize locations with elevated risk.

🗺️ **Location Intelligence**

Understand geographical crime patterns.

🚨 **Proactive Alerts**

Notify authorized stakeholders before risks escalate.

🤝 **LEA–Bank Coordination**

Improve coordination between enforcement agencies and financial institutions.

📊 **Data-Driven Decisions**

Support investigation and resource allocation using predictive intelligence.

---

# 🔮 Future Scope

* Real-Time Transaction Stream Analysis
* Advanced Spatiotemporal Forecasting
* Graph-Based Fraud Detection
* Federated Learning
* Advanced GIS Analytics
* Automated Intelligence Reports
* Real-Time Institutional Integration
* Advanced Alert Orchestration
* Blockchain-Based Audit Trail
* Explainable AI
* Continuous Model Monitoring

---

# 🏆 Hackathon Information

| Category        | Details                                      |
| --------------- | -------------------------------------------- |
| 🏢 Organization | Ministry of Home Affairs                     |
| 🛡️ Department  | Indian Cyber Crime Coordination Centre (I4C) |
| 💻 Category     | Software                                     |
| 🔐 Theme        | Blockchain & Cybersecurity                   |
| 🧠 Domain       | Cybersecurity & Predictive Analytics         |

---

# 👥 Team

| Member             | Responsibility               |
| ------------------ | ---------------------------- |
| **Kedar Deshmukh** | AI/ML & Predictive Analytics |
| **Team Member 2**  | Backend Development          |
| **Team Member 3**  | Frontend & Dashboard         |
| **Team Member 4**  | GIS & Integration            |

> ✏️ Replace the placeholder names with your actual team members.

---

# 🌟 Why CyberPehra?

Traditional cybercrime response is often **reactive**.

CyberPehra introduces a **predictive and proactive intelligence layer**.

### 🔴 Traditional Approach

**Fraud Happens**

⬇️

**Complaint Registered**

⬇️

**Investigation Starts**

### 🟢 CyberPehra Approach

**Historical Data**

⬇️

**AI/ML Analysis**

⬇️

**Risk Prediction**

⬇️

**Hotspot Identification**

⬇️

**Early Alert**

⬇️

**Proactive Intervention**

---

# 🚀 Project Vision

<div align="center">

## 🛡️ CyberPehra

### **Predict Early • Detect Risk • Act Proactively**

<br>

<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&size=18&duration=2800&pause=900&color=00C2FF&center=true&vCenter=true&width=850&lines=Turning+Cybercrime+Data+into+Predictive+Intelligence;Forecasting+Potential+Withdrawal+Hotspots;Detecting+Suspicious+Financial+Patterns;Enabling+Proactive+Cybercrime+Intervention;Building+a+Safer+Digital+India" />

<br><br>

**AI • Machine Learning • GIS • Cybersecurity • Predictive Analytics**

</div>

---

<div align="center">

### 🚨 CYBERPEHRA

**From Reactive Cybercrime Response to Proactive Cybercrime Intelligence**

</div>
