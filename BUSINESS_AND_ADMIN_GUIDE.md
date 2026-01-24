# JUSOR Business & Admin Panel Guide

## Table of Contents

1. [Business Overview](#business-overview)
2. [Platform Architecture](#platform-architecture)
3. [User Personas & Journeys](#user-personas--journeys)
4. [Campaign Lifecycle](#campaign-lifecycle)
5. [Financial Model](#financial-model)
6. [Admin Panel Overview](#admin-panel-overview)
7. [Admin Panel Modules](#admin-panel-modules)
8. [Admin Workflows](#admin-workflows)
9. [Admin Roles & Permissions](#admin-roles--permissions)
10. [Integration Points](#integration-points)

---

## Business Overview

### What is JUSOR?

JUSOR is a **government-backed influencer marketing marketplace** designed specifically for the Saudi Arabian market. It serves as a trusted intermediary connecting businesses with verified influencers to create authentic marketing campaigns.

**Key Differentiators:**
- Government integration for trust and compliance
- Escrow-based payment system for transaction security
- Verified users (both businesses and influencers)
- Automated contract generation and signing
- Dispute resolution mechanism
- ZATCA-compliant e-invoicing

### Platform Vision

Create a **trusted, transparent, and efficient marketplace** for influencer marketing in Saudi Arabia by:
- Eliminating fraud through government ID verification
- Protecting financial transactions through escrow
- Ensuring content quality through review workflows
- Providing legal compliance through automated contracts
- Enabling fair dispute resolution

### Market Opportunity

**Target Market:** Saudi Arabian SMEs and enterprises + Saudi-based influencers

**Current Scale:**
- **GMV (Gross Merchandise Value):** ~3.2M SAR/month
- **Platform Revenue:** ~96K SAR/month (~$300K USD annually)
- **Active Escrow:** 234.5K SAR
- **Commission Rate:** 3% per transaction

**Growth Potential:**
- GCC expansion could increase revenue by 5x
- Premium services (analytics, promoted listings)
- Influencer financing (advance payments)
- Business credit lines

---

## Platform Architecture

### Three-Sided Marketplace

```
┌─────────────┐          ┌─────────────┐          ┌─────────────┐
│             │          │             │          │             │
│  BUSINESSES │◄────────►│   JUSOR     │◄────────►│ INFLUENCERS │
│             │          │  PLATFORM   │          │             │
└─────────────┘          └─────────────┘          └─────────────┘
      │                        │                        │
      │                        │                        │
      ▼                        ▼                        ▼
Create Campaigns         Verify & Match           Discover Campaigns
Set Requirements         Hold Escrow              Create Content
Review Content          Facilitate Contracts      Receive Payment
Release Payment         Resolve Disputes          Build Portfolio
```

### Core Platform Functions

1. **Trust & Verification**
   - Nafath ID verification for influencers
   - Wathiq CR/FL verification for businesses
   - Social media account verification
   - Portfolio validation

2. **Discovery & Matching**
   - Advanced search filters (platform, followers, price, location)
   - AI-powered recommendations
   - Campaign marketplace
   - Influencer profiles with performance metrics

3. **Campaign Management**
   - Campaign creation wizard
   - Requirement specification
   - Timeline management
   - Content review workflow

4. **Financial Operations**
   - Escrow payment holding
   - Automated commission calculation (3%)
   - Payment release upon approval
   - Refund processing
   - ZATCA e-invoicing

5. **Legal Compliance**
   - SADQ contract generation
   - Digital signatures
   - Agreement storage
   - Compliance tracking

6. **Dispute Resolution**
   - Evidence collection
   - Admin review
   - Decision enforcement
   - Appeal mechanism

---

## User Personas & Journeys

### Persona 1: Business User

**Profile:**
- SMEs to large enterprises in Saudi Arabia
- Marketing managers or business owners
- Need: Authentic influencer marketing
- Pain: Finding reliable influencers, payment security concerns

**Registration Journey:**
1. Sign up with email/phone
2. Verify with Nafath (optional for businesses, but recommended)
3. Register business with Wathiq CR/FL
4. Set up payment method
5. Complete profile → **Verified Business**

**Campaign Journey:**
1. Create campaign (name, budget, requirements, deadline)
2. Choose campaign type (Invite Only / Public / Hybrid)
3. If Invite Only: Send invitations to specific influencers
4. Review applications from influencers
5. Select influencer(s)
6. Pay 100% to escrow (amount + 3% commission + 15% VAT)
7. Digital contract signing via SADQ
8. Wait for content delivery
9. Review content (approve/reject with feedback)
10. Upon approval: Payment released to influencer (97%, 3% to JUSOR)
11. Rate influencer and complete campaign

### Persona 2: Influencer

**Profile:**
- Age: 18-35 years
- Followers: 5,000+ on at least one platform
- Platforms: Instagram, Twitter, TikTok, Snapchat, YouTube
- Need: Legitimate brand partnerships, secure payment

**Registration Journey:**
1. Sign up with email/phone
2. **Mandatory:** Verify Saudi ID via Nafath
3. Link social media accounts (OAuth verification)
4. Follower count verification
5. Create packages (platform, content type, price, duration)
6. Build portfolio with past work
7. Complete profile → **Verified Influencer**

**Campaign Journey:**
1. Browse public campaigns or receive invitations
2. Apply to campaigns matching profile
3. Wait for business selection
4. If selected: Review contract terms
5. Sign contract via SADQ
6. Create content according to requirements
7. Submit content for review
8. If rejected: Revise based on feedback (within reasonable iterations)
9. Upon approval: Receive payment (97% of agreed amount)
10. Build reputation through ratings

### Persona 3: Admin User

**Profile:**
- JUSOR platform operations team
- Roles: Super Admin, Verification Agent, Finance Admin, Dispute Manager, Support
- Responsibility: Platform integrity, user safety, financial operations

**Daily Workflows:**
1. **Morning:**
   - Check dashboard for alerts
   - Review verification queue (1-2 day SLA)
   - Monitor escrow transactions

2. **Throughout Day:**
   - Process new user verifications
   - Review flagged campaigns
   - Handle dispute escalations
   - Process payout requests
   - Monitor platform metrics

3. **End of Day:**
   - Review financial reconciliation
   - Check pending approvals
   - Generate daily reports

---

## Campaign Lifecycle

### Campaign States

```
┌────────┐     ┌────────┐     ┌───────────┐     ┌──────────┐     ┌───────────┐
│ DRAFT  │────►│ ACTIVE │────►│ MATCHED   │────►│ IN_PROGRESS──►│ COMPLETED │
└────────┘     └────────┘     └───────────┘     └──────────┘     └───────────┘
                   │                                   │
                   │                                   │
                   └───────────────┬───────────────────┘
                                   │
                                   ▼
                             ┌───────────┐
                             │ CANCELLED │
                             └───────────┘
```

### Campaign Types

#### 1. Public Campaigns
- Visible to all verified influencers
- Open applications
- Business reviews and selects from applicants
- **Use Case:** Large reach, discover new influencers

#### 2. Invite-Only Campaigns
- Only invited influencers can see and apply
- Business pre-selects potential influencers
- More controlled selection process
- **Use Case:** Working with specific influencer profiles

#### 3. Hybrid Campaigns
- Invite specific influencers + open to public applications
- Best of both approaches
- **Use Case:** Preferred influencers + backup options

### Campaign Workflow

**Phase 1: Creation (Business)**
- Define campaign details (name, description, requirements)
- Set budget and timeline
- Specify content requirements (platforms, format, hashtags, mentions)
- Choose campaign type
- Submit for admin approval (if flagged)

**Phase 2: Discovery & Matching**
- Campaign published to marketplace
- Influencers browse/search campaigns
- Influencers submit applications with proposals
- Business receives notifications

**Phase 3: Selection**
- Business reviews applications
- Can request additional information
- Selects influencer(s)
- System generates contract via SADQ

**Phase 4: Payment & Contract**
- Business pays to escrow (100% amount + 3% commission + 15% VAT)
- Both parties review contract terms
- Digital signatures via SADQ
- Contract stored securely
- ZATCA e-invoice generated

**Phase 5: Content Creation**
- Influencer creates content according to requirements
- Can communicate with business through platform
- Uploads content for review before posting
- Business reviews: Approve / Reject with feedback

**Phase 6: Content Approval & Publishing**
- If approved: Influencer publishes content
- Provides proof of publication (links, screenshots)
- Content tracked for performance metrics

**Phase 7: Payment Release**
- Upon final approval, escrow releases payment
- Influencer receives 97% (original amount - 3% commission)
- JUSOR receives 3% commission
- ZATCA invoice updated
- Both parties rate each other

**Phase 8: Completion**
- Campaign marked as completed
- Ratings affect future matching
- Performance data saved for analytics

---

## Financial Model

### Revenue Structure

**Primary Revenue Stream:** Transaction Commission
- **Rate:** 3% of campaign value
- **Charged To:** Deducted from payment to influencer
- **Collection:** Automatic upon escrow release

### Transaction Flow

```
Business Pays
     │
     ▼
┌─────────────────────────────────────┐
│  ESCROW (100% Campaign Amount)      │
│  + 3% Commission                    │
│  + 15% VAT on Commission            │
└─────────────────────────────────────┘
     │
     │ (After Content Approval)
     │
     ├────► 97% to Influencer
     │
     └────► 3% to JUSOR Platform
```

### Example Transaction

**Campaign Budget:** 10,000 SAR

**Business Pays:**
- Campaign Amount: 10,000 SAR
- Commission (3%): 300 SAR
- VAT on Commission (15%): 45 SAR
- **Total:** 10,345 SAR

**Held in Escrow:** 10,300 SAR (campaign + commission)

**Upon Approval:**
- Influencer Receives: 9,700 SAR
- JUSOR Receives: 300 SAR
- VAT to Government: 45 SAR

### Payment Methods

**Supported:**
- Credit/Debit Cards (Visa, Mastercard, Mada)
- Bank Transfer
- Apple Pay
- STC Pay
- Digital Wallets

### Escrow Rules

1. **Holding Period:** Until content is approved by business
2. **Release Triggers:**
   - Business approves content
   - Auto-release after X days if no response (configurable)
   - Admin forces release (dispute resolution)

3. **Refund Triggers:**
   - Campaign cancelled before influencer selection
   - Mutual agreement to cancel
   - Admin decision in dispute (if business is owed refund)
   - Influencer fails to deliver (after deadline + grace period)

4. **Escrow Security:**
   - Funds held in segregated account
   - Not used for operational expenses
   - Full transparency in admin panel
   - Audit trail for all transactions

### Financial Compliance

**ZATCA E-Invoicing:**
- Auto-generated for every transaction
- Includes all required fields per ZATCA specifications
- Digitally signed and timestamped
- Stored for 7 years (compliance requirement)
- Submitted to ZATCA API in real-time

**Contract Compliance:**
- SADQ digital signatures
- Legally binding contracts
- Terms clearly stated
- Dispute resolution clause included

---

## Admin Panel Overview

### Purpose

The **JUSOR Admin Panel** is the operational hub for platform administrators to:
- Ensure platform integrity through user verification
- Monitor and manage all platform activities
- Handle financial operations and escrow management
- Resolve disputes fairly and efficiently
- Generate reports for business intelligence
- Maintain compliance with regulations
- Provide support to users

### Who Uses It?

**Internal JUSOR Team:**
- Super Admins (full access)
- Verification Agents (user verification)
- Finance Admins (financial operations)
- Dispute Managers (dispute resolution)
- Support Agents (user support)

### Key Principles

1. **Transparency:** All actions are logged and auditable
2. **Efficiency:** Batch operations and quick actions for common tasks
3. **Fairness:** Evidence-based decisions in disputes
4. **Security:** Role-based access control, audit trails
5. **Compliance:** ZATCA, SADQ, data protection regulations

### Admin Panel Structure

```
JUSOR Admin Panel
│
├── 🏠 Dashboard (Overview & Alerts)
│
├── 👥 Users (User Management)
│   ├── All Users List
│   ├── Verification Queue
│   └── User Details (Individual management)
│
├── 📢 Campaigns (Campaign Oversight)
│   ├── All Campaigns List
│   ├── Campaign Details
│   └── Campaign Monitoring
│
├── ⚖️ Disputes (Dispute Resolution)
│   ├── Open Disputes
│   ├── Under Review
│   ├── Resolved Disputes
│   └── Dispute Details (Evidence & Decision)
│
├── 💰 Escrow Monitoring
│   ├── Active Escrow Transactions
│   ├── Escrow Details
│   └── Release/Refund Actions
│
├── 💳 Transactions (Financial History)
│   ├── All Transactions
│   ├── Transaction Details
│   └── Reconciliation
│
├── 💸 Payouts (Payment Processing)
│   ├── Pending Payouts
│   ├── Processed Payouts
│   └── Payout Approvals
│
├── 📊 Financial Management (Business Intelligence)
│   ├── Revenue Reports
│   ├── Escrow Overview
│   ├── Commission Analytics
│   └── Financial Forecasting
│
└── 👛 Wallet Operations (User Wallets)
    ├── User Wallet Balances
    ├── Deposit Requests
    ├── Withdrawal Requests
    └── Wallet Transaction History
```

---

## Admin Panel Modules

### 1. Dashboard Module

**Purpose:** Centralized overview of platform health and urgent items requiring attention.

**Components:**

#### Key Metrics (Top Row)
- **Total Users:** Count of all registered users (businesses + influencers)
- **Active Campaigns:** Currently running campaigns
- **Total Revenue:** Lifetime or monthly commission revenue
- **Pending Disputes:** Disputes awaiting admin review

#### Alerts & Notifications
- 🔴 **Critical:** Failed payments, escalated disputes, system errors
- 🟡 **Warning:** Approaching deadlines, verification backlog (>2 days)
- 🔵 **Info:** Milestone achievements, new registrations

#### Quick Actions
- **Verify User:** Jump to verification queue
- **Review Dispute:** Jump to oldest pending dispute
- **Process Payout:** Jump to payout approval queue
- **Release Escrow:** Jump to pending escrow releases

#### Recent Activity Feed
- Last 20 platform activities (user registrations, campaign launches, disputes opened, payments processed)
- Real-time updates
- Filterable by activity type

#### Charts & Analytics
- **User Growth:** Daily/weekly/monthly new registrations
- **Revenue Trend:** Commission revenue over time
- **Campaign Volume:** Number of campaigns created/completed
- **Escrow Float:** Total amount held in escrow (critical financial metric)

**Admin Actions:**
- Click on any metric to drill down to detailed view
- One-click access to urgent items
- Customizable dashboard widgets (future enhancement)

---

### 2. Users Module

**Purpose:** Manage all platform users (businesses and influencers), verify identities, and handle user lifecycle.

**Components:**

#### 2.1 Users List Page
**Path:** `/users`

**Displays:**
- Searchable/filterable table of all users
- Columns: Name, Email, Type (Business/Influencer), Status, Registration Date, Actions
- Filters: User Type, Status (Pending/Verified/Suspended), Registration Date Range
- Pagination (25/50/100 per page)

**Status Badges:**
- 🟢 **Verified:** Fully verified and active
- 🟡 **Pending:** Awaiting verification
- 🔴 **Suspended:** Account suspended by admin
- ⚫ **Rejected:** Verification rejected

**Bulk Actions:**
- Export user list to CSV
- Bulk verify (for verified social proofs)
- Bulk email notifications

**Individual Actions (Per Row):**
- View Details
- Edit User
- Suspend/Unsuspend
- View Activity Log
- Send Message

#### 2.2 Verification Queue
**Purpose:** Process pending user verifications (1-2 day SLA)

**Verification Types:**

**A. Influencer Verification:**
1. **Nafath ID Verification (Mandatory)**
   - System auto-checks with Nafath API
   - Admin reviews: Name matches registration, ID is valid
   - Saudi national or resident
   - Age 18+

2. **Social Media Verification**
   - OAuth token verified automatically
   - Admin checks: Account is real (not bot), follower count matches
   - Quality check: Engagement rate reasonable
   - Content quality assessment

3. **Portfolio Review**
   - Past work samples uploaded
   - Admin checks authenticity
   - Verifies examples match claimed capabilities

**B. Business Verification:**
1. **Wathiq CR/FL Verification**
   - System auto-checks with Wathiq API
   - Admin reviews: Business is active, authorized signatory matches
   - Business type aligns with platform policy

2. **Business Profile Review**
   - Company information completeness
   - Contact information validity
   - Industry classification

**Verification Actions:**
- ✅ **Approve:** User becomes verified
- ❌ **Reject:** Provide reason, user can re-apply
- ⏸️ **Request More Info:** Send specific requirements to user
- 🚩 **Flag for Review:** Escalate to senior admin

**SLA Tracking:**
- Applications older than 24 hours highlighted in yellow
- Applications older than 48 hours highlighted in red
- Auto-notifications to verification team

#### 2.3 User Details Page
**Path:** `/users/[id]`

**Tabs:**

**Tab 1: User Information**
- Basic info (name, email, phone, registration date)
- Verification status and history
- Account status and actions (suspend/unsuspend, delete)
- Notes section (admin-only internal notes)

**Tab 2: Verification Details**
- For Influencers:
  - Nafath verification details
  - Social media accounts linked
  - Follower counts per platform
  - Portfolio items

- For Businesses:
  - Wathiq CR/FL details
  - Business registration info
  - Authorized signatories

**Tab 3: Campaigns**
- For Influencers: Campaigns participated in
- For Businesses: Campaigns created
- Performance metrics
- Success rate, average ratings

**Tab 4: Financial**
- Transaction history
- Wallet balance
- Pending payouts
- Escrow transactions (current and past)
- Revenue contributed (for influencers) or spent (for businesses)

**Tab 5: Disputes**
- All disputes involving this user
- Win/loss ratio
- Dispute history and patterns

**Tab 6: Activity Log**
- All user actions timestamped
- Login history
- Profile changes
- Campaign activities
- Financial transactions

**Admin Actions on User:**
- **Suspend Account:** Temporarily disable (with reason)
- **Unsuspend Account:** Reactivate
- **Delete Account:** Permanent deletion (GDPR right to deletion)
- **Reset Password:** Send reset link
- **Verify Manually:** Override verification
- **Add Internal Note:** Admin team communication
- **Send Message:** Direct communication with user

---

### 3. Campaigns Module

**Purpose:** Monitor all campaigns, intervene when necessary, and ensure campaign quality.

**Components:**

#### 3.1 Campaigns List Page
**Path:** `/campaigns`

**Displays:**
- Searchable/filterable table of all campaigns
- Columns: Campaign Name, Business, Influencer (if matched), Budget, Status, Created Date, Actions
- Filters: Status, Campaign Type, Budget Range, Date Range
- Sorting: By budget, date, status

**Status Badges:**
- 🔵 **Draft:** Created but not published
- 🟢 **Active:** Published and accepting applications
- 🟡 **In Progress:** Influencer selected, content creation phase
- ✅ **Completed:** Successfully completed
- 🔴 **Cancelled:** Cancelled by business or admin
- ⚠️ **Disputed:** Under dispute

**Campaign Type Badges:**
- 🌍 **Public:** Open to all
- 📩 **Invite Only:** Specific influencers
- 🔀 **Hybrid:** Both

**Quick Filters:**
- Flagged Campaigns (require review)
- High-Value Campaigns (>50K SAR)
- Delayed Campaigns (past deadline)
- Disputed Campaigns

**Bulk Actions:**
- Export to CSV
- Bulk notifications
- Analytics report for selected campaigns

#### 3.2 Campaign Details Page
**Path:** `/campaigns/[id]`

**Sections:**

**A. Campaign Overview**
- Campaign name, description, requirements
- Business information (with link to user profile)
- Budget, timeline, campaign type
- Current status and progress
- Created date, deadline, completion date

**B. Campaign Requirements**
- Platforms required (Instagram, Twitter, etc.)
- Content format (post, story, video, reel)
- Hashtags, mentions, messaging guidelines
- Deliverables checklist
- Exclusivity requirements

**C. Influencer Selection**
- If Public: List of applications received
- If Invite Only: List of invited influencers
- Selected influencer details
- Selection timeline

**D. Content Review**
- Submitted content previews
- Business feedback
- Revision history
- Approval/rejection status

**E. Financial Details**
- Campaign budget
- Escrow status (held/released)
- Commission earned
- ZATCA invoice link
- Payment timeline

**F. Contract**
- SADQ contract link
- Signature status (both parties)
- Contract terms
- Download PDF

**G. Activity Timeline**
- All campaign events chronologically
- User actions, system actions, admin actions
- Comments and communications

**Admin Actions on Campaign:**
- **Flag Campaign:** Mark for review if suspicious
- **Cancel Campaign:** Force cancellation (with reason)
- **Extend Deadline:** Grant extension (requested by business/influencer)
- **Force Content Approval:** Override business decision
- **Initiate Refund:** Start refund process
- **Add Admin Note:** Internal documentation
- **Contact Parties:** Message business and/or influencer

**Intervention Scenarios:**
1. **Delayed Campaigns:** Deadline passed, no content submitted
   - Admin contacts influencer
   - Can grant extension or initiate refund

2. **Flagged Content:** Content reported as inappropriate
   - Admin reviews content
   - Can reject content, require revision, or cancel campaign

3. **Unreasonable Rejections:** Business rejects content multiple times
   - Admin reviews rejection reasons
   - Can force approval if business is unreasonable

4. **Policy Violations:** Campaign requirements violate platform policy
   - Admin reviews and can edit requirements or cancel campaign

---

### 4. Disputes Module

**Purpose:** Fair and efficient resolution of disputes between businesses and influencers.

**Components:**

#### 4.1 Disputes List Page
**Path:** `/disputes`

**Displays:**
- All disputes with filterable statuses
- Columns: Dispute ID, Campaign, Business, Influencer, Type, Status, Opened Date, Actions
- Filters: Status, Dispute Type, Date Range, Priority
- Sorting: By date, priority, amount involved

**Status Badges:**
- 🔵 **New:** Just opened, awaiting assignment
- 🟡 **Evidence Collection:** Parties submitting evidence
- 🟠 **Under Review:** Admin reviewing evidence
- 🟢 **Resolved:** Decision made and enforced
- 🔴 **Appealed:** Party appealed the decision
- ⚫ **Closed:** Final, no further action

**Dispute Types:**
- Content Quality Issue
- Deadline Missed
- Payment Issue
- Contract Violation
- Content Not Posted
- Incorrect Metrics
- Other

**Priority Levels:**
- 🔴 **High:** Large amount, escalated, time-sensitive
- 🟡 **Medium:** Standard disputes
- 🟢 **Low:** Minor issues

**SLA Tracking:**
- Disputes older than 48 hours highlighted
- Target resolution time: 5 business days

#### 4.2 Dispute Details Page
**Path:** `/disputes/[id]`

**Sections:**

**A. Dispute Overview**
- Dispute ID, type, status
- Campaign details (with link)
- Business and influencer information
- Amount in dispute
- Opened date, assigned admin, resolution date

**B. Dispute Claim**
- **Filed By:** Business or Influencer
- **Claim Type:** Dropdown selection
- **Description:** Detailed explanation from claimant
- **Desired Outcome:** What the claimant wants (refund, payment, revision, etc.)

**C. Evidence from Business**
- Text explanation
- Screenshot uploads
- Links to published content (or lack thereof)
- Communication logs
- Contract references

**D. Evidence from Influencer**
- Counter-explanation
- Proof of work (screenshots, analytics)
- Links to published content
- Communication logs
- Timeline of events

**E. Admin Review Section**
- **Assigned Admin:** Dispute manager handling the case
- **Evidence Summary:** Admin's summary of both sides
- **Platform Policy Reference:** Which policies apply
- **Precedent Cases:** Similar past disputes and outcomes
- **Decision Rationale:** Detailed explanation of decision
- **Decision:**
  - Award to Business (full/partial refund)
  - Award to Influencer (release payment)
  - Split Decision (partial to both)
  - Mediated Settlement (parties agree to terms)

**F. Decision Enforcement**
- If Refund: Escrow returned to business
- If Payment: Escrow released to influencer
- If Partial: Split according to decision
- ZATCA invoice adjustment
- Contract marked as disputed

**G. Appeal Section** (if applicable)
- **Appeal Filed By:** The losing party
- **Appeal Reason:** Why they disagree with decision
- **New Evidence:** Any additional evidence
- **Appeal Review:** Senior admin or panel review
- **Final Decision:** Upheld or overturned
- **Appeal Window:** 5 days from decision

**H. Activity Timeline**
- Dispute opened
- Evidence submitted by parties
- Admin review started
- Decision made
- Appeal filed (if any)
- Final resolution

**Admin Actions on Dispute:**
- **Assign to Self:** Take ownership of dispute
- **Request More Evidence:** Ask specific questions to parties
- **Extend Evidence Period:** Give more time for submission
- **Make Decision:** Select outcome and provide rationale
- **Enforce Decision:** Trigger escrow release/refund
- **Handle Appeal:** Review appeal and make final decision
- **Close Dispute:** Mark as final
- **Add Internal Note:** Team communication

**Decision Guidelines for Admins:**
1. **Evidence-Based:** Only decide based on submitted evidence
2. **Policy Adherence:** Follow platform policies strictly
3. **Fairness:** No bias towards business or influencer
4. **Transparency:** Provide clear rationale
5. **Precedent:** Consider past similar cases for consistency

**Common Dispute Scenarios:**

**Scenario 1: Content Not Posted**
- Business claims influencer didn't post content
- Review: Check evidence (should have links/screenshots)
- Decision: If not posted, refund to business
- Edge case: If posted but deleted, check timing and reason

**Scenario 2: Content Quality Below Standard**
- Business claims content doesn't meet requirements
- Review: Compare content to campaign requirements
- Decision: If clearly below standards, can require revision or refund
- Edge case: Subjective quality - refer to contract terms

**Scenario 3: Delayed Posting**
- Content posted after deadline
- Review: Check campaign timeline and communications
- Decision: Minor delay (1-2 days) - still pay influencer
- Decision: Major delay (>1 week) - partial refund or full refund

**Scenario 4: Unreasonable Business**
- Influencer claims business keeps rejecting good content
- Review: Content quality vs requirements, rejection reasons
- Decision: If content meets requirements, force approval

**Scenario 5: Influencer Metrics Misrepresented**
- Business claims follower count or engagement was fake
- Review: Current metrics vs claimed at time of application
- Decision: If significant discrepancy (>20%), refund to business

---

### 5. Escrow Monitoring Module

**Purpose:** Monitor all funds held in escrow, ensure timely releases, and maintain financial security.

**Components:**

#### 5.1 Escrow Transactions List
**Path:** `/escrow`

**Top Metrics:**
- **Total Escrow Balance:** Total SAR held across all transactions
- **Active Transactions:** Number of current escrow holds
- **Pending Releases:** Awaiting business approval
- **Average Hold Time:** Days funds typically held

**Displays:**
- All escrow transactions (active and historical)
- Columns: Transaction ID, Campaign, Business, Influencer, Amount, Commission, Status, Held Since, Actions
- Filters: Status, Date Range, Amount Range, Campaign
- Sorting: By amount, date, hold duration

**Status Badges:**
- 🟡 **Held:** Funds in escrow, awaiting content approval
- 🟢 **Pending Release:** Approved, release in progress
- ✅ **Released:** Paid to influencer
- 🔴 **Refunded:** Returned to business
- ⚪ **Partial:** Split release (dispute resolution)
- ⚠️ **On Hold:** Admin freeze (dispute or investigation)

**Quick Filters:**
- Long Holds (>30 days)
- High Value (>50K SAR)
- Pending Admin Action
- Disputed Transactions

#### 5.2 Escrow Transaction Details
**Path:** `/escrow/[id]`

**Sections:**

**A. Transaction Overview**
- Transaction ID, campaign link
- Business and influencer details
- Amount breakdown:
  - Campaign Budget: X SAR
  - Platform Commission (3%): Y SAR
  - Total Held: X + Y SAR
  - Net to Influencer (upon release): X - Y SAR

**B. Escrow Timeline**
- Funds Received: Date and time
- Days Held: Counter
- Expected Release: Based on campaign deadline
- Actual Release: Date and time (if released)

**C. Status & Actions**
- Current Status
- Last Status Change
- Next Action Required
- Responsible Party (business, influencer, admin)

**D. Campaign Progress**
- Content Submission Status
- Business Review Status
- Approval/Rejection Count
- Current Phase

**E. Release/Refund Controls**
- **Release to Influencer:** Button (requires confirmation)
- **Refund to Business:** Button (requires reason)
- **Partial Release:** Input fields for custom split
- **Hold Transaction:** Freeze (for investigations)

**F. Audit Log**
- All actions on this escrow transaction
- System actions (auto-release triggers)
- Admin actions (manual release, holds)
- User actions (approval, rejection)
- Timestamps and actor for each action

**Admin Actions on Escrow:**
- **Release Payment:** Force release to influencer (if business unresponsive)
- **Process Refund:** Return to business (if campaign cancelled or influencer failed)
- **Split Payment:** Custom split (dispute resolution)
- **Hold Transaction:** Freeze pending investigation
- **Unhold Transaction:** Lift freeze
- **Adjust Amount:** Correct errors (requires senior admin approval)
- **View Related Contract:** Link to SADQ contract
- **View ZATCA Invoice:** Link to e-invoice

**Auto-Release Rules:**
- If business doesn't respond within X days after content submission: Auto-release to influencer
- Configurable per campaign or platform-wide
- Admin can override auto-release

**Escrow Security Measures:**
- All releases require two-factor confirmation
- Large amounts (>50K SAR) require senior admin approval
- All actions logged with IP address and timestamp
- Daily reconciliation reports
- Segregated bank account (not operational funds)

---

### 6. Transactions Module

**Purpose:** Complete financial history and reconciliation of all platform transactions.

**Components:**

#### 6.1 Transactions List Page
**Path:** `/transactions`

**Displays:**
- All financial transactions on the platform
- Columns: Transaction ID, Date, Type, User, Amount, Status, Payment Method, Actions
- Filters: Type, Status, Date Range, User Type, Payment Method
- Sorting: By date, amount
- Export to CSV/Excel

**Transaction Types:**
- 💰 **Escrow Deposit:** Business pays to escrow
- 💸 **Payment Release:** Escrow to influencer
- 🔄 **Refund:** Escrow to business
- 🏦 **Payout:** Influencer withdrawal to bank
- 💳 **Commission:** Platform fee collected
- 👛 **Wallet Deposit:** User adds funds to wallet
- 👛 **Wallet Withdrawal:** User withdraws from wallet

**Status Badges:**
- ✅ **Completed:** Successfully processed
- 🟡 **Pending:** In progress
- 🔴 **Failed:** Payment failed
- ⏸️ **On Hold:** Admin freeze
- 🔄 **Processing:** Being processed by payment gateway

**Payment Methods:**
- Credit Card (Visa, Mastercard)
- Mada (Saudi debit)
- Bank Transfer
- STC Pay
- Apple Pay
- Wallet Balance

**Summary Metrics (Top):**
- Total Transactions (count)
- Total Volume (SAR)
- Total Commission Earned (SAR)
- Failed Transactions (count and %)

#### 6.2 Transaction Details Page
**Path:** `/transactions/[id]`

**Sections:**

**A. Transaction Information**
- Transaction ID (unique)
- Date and time
- Transaction type
- Amount (breakdown if applicable)
- Status
- Payment method
- Gateway reference ID

**B. Parties Involved**
- Payer (user details and link)
- Payee (user details and link)
- Campaign (if applicable)
- Escrow transaction (if linked)

**C. Financial Breakdown**
- Base Amount: X SAR
- Commission (if applicable): Y SAR
- VAT (if applicable): Z SAR
- Gateway Fees: A SAR
- Net Amount: Final amount
- Currency: SAR

**D. Payment Gateway Details**
- Gateway used (Stripe, Hyperpay, etc.)
- Gateway transaction ID
- Authorization code
- Card details (last 4 digits, type)
- Gateway response

**E. Related Documents**
- ZATCA Invoice (link to download)
- SADQ Contract (if campaign-related)
- Receipt (user-facing)
- Payout confirmation (if withdrawal)

**F. Transaction Log**
- Initiated: Date, time, by whom
- Authorized: Payment gateway approval
- Captured: Funds secured
- Completed: Transaction finalized
- Any failures/retries

**Admin Actions on Transaction:**
- **View Full Details:** Complete JSON response from gateway
- **Refund Transaction:** Initiate refund (if eligible)
- **Mark as Reconciled:** Accounting purposes
- **Add Note:** Internal documentation
- **Investigate:** Flag for fraud review
- **Retry:** If failed, retry processing

**Reconciliation Features:**
- Daily reconciliation reports
- Match platform records with bank statements
- Flag discrepancies for investigation
- Export for accounting software

---

### 7. Payouts Module

**Purpose:** Process influencer withdrawals from their wallet to bank accounts.

**Components:**

#### 7.1 Payouts List Page
**Path:** `/payouts`

**Displays:**
- All payout requests from influencers
- Columns: Payout ID, Influencer, Amount, Bank, Status, Requested Date, Actions
- Filters: Status, Date Range, Amount Range, Bank
- Sorting: By date, amount, status

**Status Badges:**
- 🟡 **Pending:** Awaiting admin approval
- 🔄 **Processing:** Approved, being transferred
- ✅ **Completed:** Successfully paid
- 🔴 **Failed:** Transfer failed
- ❌ **Rejected:** Admin rejected (with reason)

**Summary Metrics:**
- Pending Payouts (count and total SAR)
- Processed Today (count and total SAR)
- Failed Payouts (requiring attention)

**Bulk Actions:**
- Approve Selected (for batch processing)
- Reject Selected (with reason)
- Export to CSV

#### 7.2 Payout Details Page
**Path:** `/payouts/[id]`

**Sections:**

**A. Payout Information**
- Payout ID
- Influencer (name, ID, link to profile)
- Amount requested
- Current wallet balance
- Status
- Request date
- Processing date
- Completion date

**B. Bank Details**
- Bank name
- Account holder name (must match verified ID)
- IBAN
- Account number
- Bank branch (if applicable)

**C. Verification Checks**
- ✅ **Name Match:** Account holder = verified Nafath name
- ✅ **Sufficient Balance:** Wallet has enough funds
- ✅ **Minimum Amount:** Meets minimum payout (e.g., 100 SAR)
- ✅ **Account Verified:** Bank account verified previously
- ⚠️ **Any flags:** KYC issues, suspicious activity

**D. Processing Actions**
- **Approve Payout:** Initiate bank transfer
- **Reject Payout:** Provide reason (wrong details, insufficient funds, etc.)
- **Request More Info:** Ask influencer for clarification
- **Hold Payout:** Temporarily freeze pending investigation

**E. Transfer Details** (after processing)
- Transfer method (SARIE, SWIFT, etc.)
- Transfer reference number
- Expected arrival date
- Actual arrival confirmation

**F. Activity Log**
- Payout requested
- Admin review
- Approval/rejection
- Transfer initiated
- Completion confirmation

**Admin Actions on Payout:**
- **Approve:** Process the payout
- **Reject:** Cancel with reason
- **Verify Bank Details:** Manual check against Nafath name
- **Test Transfer:** Send 1 SAR to verify account (first-time accounts)
- **Contact Influencer:** Request information or notify of issues
- **Mark as Complete:** Confirm successful transfer

**Payout Processing Workflow:**
1. Influencer requests payout from wallet
2. System validates: Sufficient balance, minimum amount, verified account
3. Request appears in admin Pending queue
4. Admin reviews: Name match, account details, no flags
5. Admin approves or rejects
6. If approved: Initiate bank transfer via payment gateway
7. Monitor transfer status
8. On success: Deduct from wallet, mark complete, notify influencer
9. On failure: Retry or reject, notify influencer

**Payout Rules:**
- Minimum payout: 100 SAR (configurable)
- Maximum payout: Wallet balance
- Processing time: 1-3 business days
- First payout to new account: Additional verification required
- Bank account must match verified Nafath name

---

### 8. Financial Management Module

**Purpose:** Business intelligence, revenue analytics, financial reporting, and forecasting.

**Components:**

#### 8.1 Financial Dashboard
**Path:** `/financial`

**Key Metrics (Cards):**

**Revenue Metrics:**
- **Total Revenue (Lifetime):** Sum of all commissions earned
- **Revenue This Month:** Current month commission
- **Revenue This Quarter:** Q1/Q2/Q3/Q4
- **Average Commission per Transaction:** Avg commission amount

**Transaction Metrics:**
- **Total Transactions:** All-time count
- **Transactions This Month:** Current month
- **Average Transaction Value:** Mean campaign budget
- **Transaction Success Rate:** % successful vs failed

**Escrow Metrics:**
- **Active Escrow Balance:** Total SAR held
- **Average Escrow Hold Time:** Days
- **Escrow Releases This Month:** Count and amount
- **Escrow Refunds This Month:** Count and amount (indicator of issues)

**User Metrics:**
- **GMV (Gross Merchandise Value):** Total campaign budgets
- **Active Businesses:** With campaigns this month
- **Active Influencers:** Earning this month
- **User Growth Rate:** % increase month-over-month

#### 8.2 Revenue Reports

**Charts:**

**A. Revenue Over Time**
- Line chart: Daily, weekly, monthly, yearly
- Compare periods (this month vs last month)
- Trend analysis and growth rate

**B. Revenue by Source**
- Pie chart: Campaign commissions (breakdown by campaign type)
- Future: Premium features, promoted listings, etc.

**C. Transaction Volume**
- Bar chart: Number of transactions per period
- Split by type (escrow deposits, releases, refunds)

**D. Top Performers**
- Top 10 businesses by total spend
- Top 10 influencers by total earnings
- Top 10 campaigns by budget

#### 8.3 Escrow Analytics

**Visualizations:**

**A. Escrow Flow**
- Sankey diagram: Money flow (businesses → escrow → influencers)
- Shows commission retention

**B. Escrow Status Distribution**
- Pie chart: Held, pending release, released, refunded

**C. Hold Time Analysis**
- Histogram: Distribution of hold times
- Identify outliers (very long holds = potential issues)

**D. Refund Rate**
- Trend over time
- High refund rate = campaign quality issues

#### 8.4 Financial Forecasting

**Projections:**
- **Next Month Revenue:** Based on current active campaigns
- **Next Quarter Revenue:** Based on growth trends
- **Expected Escrow Releases:** Campaigns nearing completion
- **Cash Flow Forecast:** Inflows (deposits) vs outflows (payouts)

**Scenario Planning:**
- If growth continues at current rate...
- If refund rate increases/decreases...
- If commission rate changes...

#### 8.5 Reconciliation

**Daily Reconciliation:**
- Platform records vs bank statements
- Escrow account balance verification
- Commission collected vs expected
- Payout processed vs requested

**Discrepancy Resolution:**
- Flag mismatches
- Investigate and correct
- Audit trail of corrections

#### 8.6 Financial Reports (Export)

**Available Reports:**
- **Monthly Revenue Report:** All commission earned
- **Transaction Report:** All transactions with details
- **Escrow Report:** All escrow activities
- **Payout Report:** All payouts processed
- **Tax Report:** For ZATCA submission
- **Audit Report:** Complete financial audit trail

**Export Formats:**
- CSV
- Excel
- PDF (formatted reports)

**Admin Actions:**
- **Generate Report:** Select date range and type
- **Schedule Reports:** Auto-email weekly/monthly
- **Custom Queries:** Build custom financial queries
- **Export Data:** For external accounting software

---

### 9. Wallet Operations Module

**Purpose:** Manage user wallet balances, deposits, withdrawals, and wallet transaction history.

**Components:**

#### 9.1 Wallet Overview Page
**Path:** `/wallet-operations`

**Summary Metrics:**
- **Total Wallet Balance (All Users):** Sum of all user wallets
- **Business Wallets:** Total balance
- **Influencer Wallets:** Total balance
- **Pending Deposits:** Awaiting confirmation
- **Pending Withdrawals:** Awaiting processing

**User Wallets List:**
- Searchable table of all users with wallets
- Columns: User, Type, Wallet Balance, Last Activity, Actions
- Filters: User Type, Balance Range, Activity Date
- Sorting: By balance, last activity

**Bulk Actions:**
- Export wallet balances
- Reconcile all wallets

#### 9.2 User Wallet Details
**Path:** `/wallet-operations/[userId]`

**Sections:**

**A. Wallet Summary**
- User information
- Current balance
- Lifetime deposits
- Lifetime withdrawals
- Net balance (deposits - withdrawals)

**B. Wallet Transactions**
- All transactions affecting this wallet
- Columns: Date, Type, Amount, Description, Balance After
- Filters: Transaction Type, Date Range
- Pagination

**Transaction Types:**
- ➕ **Deposit:** User added funds
- ➖ **Withdrawal:** User withdrew funds (payout)
- 💰 **Credit:** Received payment (influencer earnings)
- 💳 **Debit:** Payment made (business campaign payment)
- 🎁 **Bonus:** Platform credit (promotions)
- 🔄 **Refund:** Refund received

**C. Pending Actions**
- Deposits awaiting confirmation
- Withdrawal requests pending approval
- Any holds or freezes

**D. Wallet Controls (Admin)**
- **Add Credit:** Manually credit wallet (with reason)
- **Deduct Balance:** Manually deduct (with reason, requires approval)
- **Freeze Wallet:** Prevent transactions (investigation)
- **Unfreeze Wallet:** Lift freeze
- **Adjust Balance:** Correct errors (requires senior admin)

**E. Activity Log**
- All wallet-related actions
- User-initiated and admin-initiated
- Timestamps and reasons

**Admin Actions on Wallet:**
- **View Full History:** All transactions
- **Reconcile Wallet:** Match balance to transaction log
- **Issue Refund to Wallet:** Credit wallet (instead of bank refund)
- **Process Withdrawal:** Approve payout request
- **Freeze/Unfreeze:** Security measure
- **Add Note:** Document wallet issues

#### 9.3 Deposit Management

**Deposit Requests:**
- Users request to add funds to wallet
- Payment via supported methods
- Admin monitors for successful confirmation
- Failed deposits flagged for review

**Admin Review Needed:**
- Bank transfers (require manual confirmation)
- Large deposits (>10K SAR)
- First-time deposits from new accounts

#### 9.4 Withdrawal Management

**Withdrawal Requests:**
- Influencers request to withdraw earnings
- System validates balance and minimum amount
- Admin approves and processes to bank account
- (Linked to Payouts Module)

---

## Admin Workflows

### Workflow 1: New User Verification

**Trigger:** User completes registration and submits verification

**Steps:**

1. **Admin receives notification** → Verification queue updated
2. **Admin opens verification task**
   - Navigate to Users → Verification Queue
   - Click on pending user

3. **For Influencer:**
   - **Nafath Verification:**
     - Check: Nafath ID verified successfully (green checkmark)
     - Verify: Name on registration matches Nafath name
     - Verify: User is 18+, Saudi national/resident

   - **Social Media Verification:**
     - Check: OAuth tokens valid (green checkmark)
     - Click on social media links to verify accounts are real
     - Check follower counts match claimed numbers
     - Review: Content quality and engagement rate

   - **Portfolio Review:**
     - Review uploaded past work samples
     - Check: Examples are authentic and showcase skills
     - Verify: Quality meets platform standards

   - **Decision:**
     - ✅ **Approve:** User becomes verified influencer
     - ❌ **Reject:** Provide specific reason (fake followers, poor content, etc.)
     - ⏸️ **Request More Info:** Ask for additional verification

4. **For Business:**
   - **Wathiq CR/FL Verification:**
     - Check: Wathiq verification successful (green checkmark)
     - Verify: Business is active and in good standing
     - Check: Authorized signatory matches registration

   - **Profile Review:**
     - Verify: Contact information is complete
     - Check: Business type aligns with platform policy

   - **Decision:**
     - ✅ **Approve:** Business becomes verified
     - ❌ **Reject:** Provide reason
     - ⏸️ **Request More Info:** Need additional documents

5. **Post-Decision:**
   - System sends notification to user
   - If approved: User can start using platform
   - If rejected: User can fix issues and re-apply
   - Admin notes added to user profile

**SLA:** 1-2 business days from submission

---

### Workflow 2: Campaign Monitoring & Intervention

**Trigger:** Campaign deadline approaching or passed, no content submitted

**Steps:**

1. **Dashboard Alert:** "Campaign #12345 deadline passed, no content"
2. **Admin investigates:**
   - Navigate to Campaigns → Click campaign
   - Check timeline: When was influencer selected? Deadline? Current date?
   - Check communications: Has influencer been in contact?

3. **Contact Influencer:**
   - Send message: "We notice the campaign deadline has passed. Please provide an update."
   - Give 24-48 hours for response

4. **Influencer Responds:**
   - **Scenario A:** "Content is ready, submitting now"
     - Grant short extension (1-2 days)
     - Monitor for submission

   - **Scenario B:** "I need more time, can I get an extension?"
     - Check with business (send message)
     - If business agrees: Grant extension (update deadline)
     - If business declines: Explain to influencer, proceed to refund

   - **Scenario C:** "I can't complete this, please cancel"
     - Initiate refund process
     - Release escrow to business
     - Mark campaign as cancelled
     - Note on influencer profile (affects reputation)

5. **Influencer Doesn't Respond:**
   - After 48 hours: Escalate to dispute
   - Contact business: "Influencer not responding, we're processing refund"
   - Initiate refund to business
   - Penalize influencer (reputation score, possible suspension)

6. **Documentation:**
   - Add admin notes to campaign
   - Log all communications
   - Update campaign status

---

### Workflow 3: Dispute Resolution Process

**Trigger:** Business or influencer files a dispute

**Steps:**

1. **Dispute Filed:**
   - System creates dispute record
   - Escrow transaction automatically put on hold
   - Both parties notified

2. **Admin Assignment:**
   - Dispute appears in Disputes → New
   - Dispute Manager assigns to themselves or team member
   - Status: New → Evidence Collection

3. **Evidence Collection Phase:**
   - Both parties have 3 days to submit evidence
   - Admin can request specific evidence
   - Can extend evidence period if needed

4. **Admin Review Phase:**
   - Navigate to Disputes → [Dispute ID]
   - Read initial claim carefully
   - Review all evidence from both sides:
     - Business evidence (screenshots, communications, contract)
     - Influencer evidence (content, analytics, timeline)
   - Check platform policies applicable to this case
   - Review similar past disputes for consistency

5. **Decision Making:**
   - Determine facts based on evidence
   - Apply platform policies
   - Make decision:
     - **Full Refund to Business:** Influencer clearly failed (didn't post, missed deadline significantly)
     - **Full Payment to Influencer:** Business unreasonable (content met requirements, rejections invalid)
     - **Partial Split:** Both parties partially at fault
     - **Mediated Settlement:** Facilitate agreement between parties

6. **Decision Documentation:**
   - Write clear rationale (visible to both parties)
   - Reference specific evidence
   - Cite platform policies
   - Explain why this outcome is fair

7. **Decision Enforcement:**
   - Click "Make Decision" → Select outcome
   - System automatically:
     - Releases/refunds escrow according to decision
     - Updates ZATCA invoices
     - Marks campaign as disputed
     - Notifies both parties

8. **Appeal Window:**
   - Parties have 5 days to appeal
   - If appeal filed:
     - Escalate to senior admin or panel
     - Review appeal and new evidence
     - Make final decision (upheld or overturned)
   - If no appeal: Dispute closed after 5 days

9. **Post-Resolution:**
   - Document lessons learned
   - Update policy if needed
   - Monitor for patterns (same users repeatedly in disputes)

**SLA:** 5 business days from evidence collection end to decision

---

### Workflow 4: Escrow Release (Standard)

**Trigger:** Business approves content

**Steps:**

1. **Business approves content in campaign:**
   - System automatically triggers escrow release process
   - Status: Held → Pending Release

2. **Admin monitors (automated, but can intervene):**
   - Navigate to Escrow → Pending Release
   - Verify: Content was indeed approved
   - Verify: No flags or holds on transaction

3. **Automatic Release:**
   - System calculates:
     - Campaign Budget: 10,000 SAR
     - Influencer Receives: 9,700 SAR (10,000 - 3%)
     - JUSOR Receives: 300 SAR (3% commission)
   - Transfers to influencer wallet: 9,700 SAR
   - Credits JUSOR account: 300 SAR
   - Updates ZATCA invoice
   - Status: Pending Release → Released

4. **Notifications:**
   - Influencer: "Payment received: 9,700 SAR. Available in your wallet."
   - Business: "Payment released to influencer. Campaign complete."

5. **Admin Verification:**
   - Daily reconciliation report
   - Verify: Wallet balance increased correctly
   - Verify: Commission recorded accurately
   - Flag any discrepancies

**Manual Release (if business unresponsive):**
- If business doesn't approve/reject within X days after content submission
- Admin reviews content
- If content meets requirements: Force release to influencer
- Document reason in admin notes

---

### Workflow 5: Payout Processing (Influencer Withdrawal)

**Trigger:** Influencer requests payout from wallet to bank account

**Steps:**

1. **Payout Request Received:**
   - Appears in Payouts → Pending
   - System has already validated:
     - Sufficient wallet balance
     - Minimum amount met (100 SAR)
     - Bank account on file

2. **Admin Review:**
   - Navigate to Payouts → [Payout ID]
   - **Verify Name Match:**
     - Bank account holder name
     - vs Nafath verified name
     - Must match exactly

   - **Check for Flags:**
     - User account in good standing?
     - Any fraud alerts?
     - First-time payout to this bank account?

3. **First-Time Bank Account:**
   - If this is the first payout to this bank account:
     - Send test transfer (1 SAR)
     - Ask influencer to confirm receipt
     - Once confirmed, proceed with full payout

4. **Approve Payout:**
   - Click "Approve Payout"
   - System initiates bank transfer via payment gateway
   - Status: Pending → Processing

5. **Monitor Transfer:**
   - Payment gateway processes (1-3 business days)
   - Check for transfer confirmation
   - If successful:
     - Deduct from wallet balance
     - Status: Processing → Completed
     - Notify influencer: "Your payout of X SAR has been sent to your bank account ending in XXXX. It should arrive within 1-3 business days."

   - If failed:
     - Status: Processing → Failed
     - Check reason (invalid account, insufficient funds in platform account, etc.)
     - Contact influencer: "Your payout failed because [reason]. Please verify your bank details."
     - Funds remain in wallet

6. **Documentation:**
   - Log all actions in payout record
   - Update daily payout report
   - Reconcile against bank statements

**Bulk Payout Processing:**
- Select multiple approved payouts
- Click "Approve Selected"
- System processes batch transfer
- Monitor all transfers for success/failure

---

## Admin Roles & Permissions

### Role-Based Access Control (RBAC)

**Purpose:** Ensure admins only access features relevant to their role, maintain security, and create audit trails.

### Admin Roles

#### 1. Super Admin

**Full Access** - Can do everything

**Responsibilities:**
- Platform configuration and settings
- Admin user management (create, edit, delete admin accounts)
- Financial reconciliation and oversight
- Final decision on escalated disputes
- System maintenance and updates
- Access to all modules and all actions

**Permissions:**
- ✅ All Users module features
- ✅ All Campaigns module features
- ✅ All Disputes module features
- ✅ All Escrow module features
- ✅ All Transactions module features
- ✅ All Payouts module features
- ✅ All Financial Management features
- ✅ All Wallet Operations features
- ✅ Admin user management
- ✅ Platform settings
- ✅ System logs and audit trails

**Restrictions:** None

---

#### 2. Verification Agent

**Focus:** User verification and onboarding

**Responsibilities:**
- Review and process user verification requests
- Verify Nafath ID for influencers
- Verify Wathiq CR/FL for businesses
- Review social media accounts and portfolios
- Approve/reject/request more info
- Maintain 1-2 day SLA

**Permissions:**
- ✅ View Users module
- ✅ Access Verification Queue
- ✅ Approve/Reject/Request Info on verifications
- ✅ View user profiles
- ✅ Add verification notes
- ❌ Suspend/delete users (escalate to Super Admin)
- ❌ Access financial modules
- ❌ Access dispute resolution

**Restrictions:**
- Cannot modify user financial data
- Cannot process payouts
- Cannot make dispute decisions

---

#### 3. Finance Admin

**Focus:** Financial operations and escrow management

**Responsibilities:**
- Monitor escrow transactions
- Process payment releases
- Process refunds
- Approve payouts to influencers
- Wallet operations management
- Daily financial reconciliation
- Generate financial reports

**Permissions:**
- ✅ View Users module (read-only for financial context)
- ✅ View Campaigns module (read-only for financial context)
- ✅ Full access to Escrow Monitoring
- ✅ Full access to Transactions module
- ✅ Full access to Payouts module
- ✅ Full access to Financial Management
- ✅ Full access to Wallet Operations
- ✅ Release escrow, process refunds
- ✅ Approve/reject payouts
- ✅ Adjust wallet balances (with audit trail)
- ❌ User verification
- ❌ Dispute resolution (except financial enforcement of decisions)

**Restrictions:**
- Cannot verify users
- Cannot make dispute decisions (only enforce financial outcomes)
- Cannot modify campaigns

---

#### 4. Dispute Manager

**Focus:** Dispute resolution and mediation

**Responsibilities:**
- Review and manage disputes
- Collect evidence from parties
- Make fair decisions based on evidence and policy
- Enforce decisions (trigger escrow releases/refunds)
- Handle appeals
- Document precedents for consistency

**Permissions:**
- ✅ View Users module (read-only for context)
- ✅ View Campaigns module (read-only for context)
- ✅ Full access to Disputes module
- ✅ View Escrow module (read-only)
- ✅ Trigger escrow releases/refunds (as part of dispute decisions)
- ✅ Assign disputes to self or team
- ✅ Request evidence from parties
- ✅ Make decisions and document rationale
- ✅ Handle appeals
- ❌ User verification
- ❌ General escrow management (only dispute-related)
- ❌ Payout processing

**Restrictions:**
- Cannot directly manage escrow (except via dispute decisions)
- Cannot approve payouts
- Cannot verify users

---

#### 5. Support Agent

**Focus:** User support and issue resolution

**Responsibilities:**
- Respond to user inquiries
- Assist with platform navigation
- Troubleshoot user issues
- Escalate complex issues to appropriate teams
- Document common issues and solutions
- Monitor user feedback

**Permissions:**
- ✅ View Users module (read-only)
- ✅ View Campaigns module (read-only)
- ✅ View Disputes module (read-only, for support context)
- ✅ View Escrow module (read-only)
- ✅ View Transactions module (read-only)
- ✅ Send messages to users
- ✅ Add support notes to user profiles
- ✅ Escalate issues to other admin roles
- ❌ Modify any user data
- ❌ Process financial transactions
- ❌ Verify users
- ❌ Make dispute decisions

**Restrictions:**
- Read-only access to most modules
- Cannot take financial actions
- Cannot make decisions on verifications or disputes
- Can only escalate issues

---

### Permission Matrix

| Feature / Action | Super Admin | Verification Agent | Finance Admin | Dispute Manager | Support Agent |
|------------------|-------------|-------------------|---------------|-----------------|---------------|
| **Users Module** |
| View users | ✅ | ✅ | ✅ (read-only) | ✅ (read-only) | ✅ (read-only) |
| Verify users | ✅ | ✅ | ❌ | ❌ | ❌ |
| Suspend users | ✅ | ❌ (escalate) | ❌ | ❌ | ❌ (escalate) |
| Delete users | ✅ | ❌ | ❌ | ❌ | ❌ |
| **Campaigns Module** |
| View campaigns | ✅ | ✅ (limited) | ✅ (read-only) | ✅ (read-only) | ✅ (read-only) |
| Flag campaigns | ✅ | ✅ | ❌ | ❌ | ✅ (escalate) |
| Cancel campaigns | ✅ | ❌ | ❌ | ✅ (via dispute) | ❌ |
| Extend deadlines | ✅ | ❌ | ❌ | ✅ | ❌ |
| **Disputes Module** |
| View disputes | ✅ | ❌ | ❌ | ✅ | ✅ (read-only) |
| Assign disputes | ✅ | ❌ | ❌ | ✅ | ❌ |
| Make decisions | ✅ | ❌ | ❌ | ✅ | ❌ |
| Handle appeals | ✅ | ❌ | ❌ | ✅ | ❌ |
| **Escrow Module** |
| View escrow | ✅ | ❌ | ✅ | ✅ (read-only) | ✅ (read-only) |
| Release escrow | ✅ | ❌ | ✅ | ✅ (disputes only) | ❌ |
| Process refunds | ✅ | ❌ | ✅ | ✅ (disputes only) | ❌ |
| Hold/freeze escrow | ✅ | ❌ | ✅ | ✅ | ❌ |
| **Transactions Module** |
| View transactions | ✅ | ❌ | ✅ | ❌ | ✅ (read-only) |
| Export reports | ✅ | ❌ | ✅ | ❌ | ❌ |
| Reconcile | ✅ | ❌ | ✅ | ❌ | ❌ |
| **Payouts Module** |
| View payouts | ✅ | ❌ | ✅ | ❌ | ✅ (read-only) |
| Approve payouts | ✅ | ❌ | ✅ | ❌ | ❌ |
| Reject payouts | ✅ | ❌ | ✅ | ❌ | ❌ |
| **Wallet Operations** |
| View wallets | ✅ | ❌ | ✅ | ❌ | ✅ (read-only) |
| Adjust balances | ✅ | ❌ | ✅ | ❌ | ❌ |
| Freeze wallets | ✅ | ❌ | ✅ | ❌ | ❌ |
| **Financial Management** |
| View reports | ✅ | ❌ | ✅ | ❌ | ❌ |
| Generate reports | ✅ | ❌ | ✅ | ❌ | ❌ |
| Forecasting | ✅ | ❌ | ✅ | ❌ | ❌ |
| **Admin Management** |
| Create admins | ✅ | ❌ | ❌ | ❌ | ❌ |
| Edit admin roles | ✅ | ❌ | ❌ | ❌ | ❌ |
| View audit logs | ✅ | ❌ | ✅ (financial only) | ✅ (disputes only) | ❌ |

---

### Audit Trail Requirements

**All admin actions must be logged with:**
- Admin user ID and name
- Action performed
- Timestamp
- IP address
- Entity affected (user, campaign, transaction, etc.)
- Before and after values (for modifications)
- Reason/notes (for critical actions)

**Critical Actions Requiring Approval:**
- Large escrow releases (>50K SAR): Requires senior admin approval
- Wallet balance adjustments: Requires reason and second admin verification
- User account deletion: Requires reason and Super Admin approval
- Permanent dispute decisions: Automatically logged, appealable for 5 days

**Audit Log Access:**
- Super Admin: Full access to all logs
- Finance Admin: Access to financial logs
- Dispute Manager: Access to dispute-related logs
- Other roles: No direct access (escalate to Super Admin)

---

## Integration Points

### Government Integrations

#### 1. Nafath (National Digital Identity)

**Purpose:** Verify Saudi national ID for influencers (mandatory)

**Integration:**
- **API Provider:** Saudi Digital Government
- **Authentication:** OAuth 2.0
- **Data Retrieved:**
  - Full name (Arabic and English)
  - National ID number
  - Date of birth
  - Nationality
  - ID expiration date

**Workflow:**
1. Influencer clicks "Verify with Nafath"
2. Redirected to Nafath authentication
3. User authenticates with biometric/OTP
4. Nafath returns verified identity data
5. JUSOR stores verification status (not raw ID data for privacy)

**Admin Panel Impact:**
- Verification status shown in Users module
- Green checkmark for successful Nafath verification
- Name matching against Nafath name for payouts

---

#### 2. Wathiq (Business Registry)

**Purpose:** Verify business Commercial Registration (CR) or Freelance License (FL)

**Integration:**
- **API Provider:** Ministry of Commerce
- **Authentication:** API Key
- **Data Retrieved:**
  - Business name
  - CR/FL number
  - Business status (active, suspended, cancelled)
  - Registration date
  - Expiration date
  - Authorized signatories

**Workflow:**
1. Business enters CR/FL number
2. System queries Wathiq API
3. Validates business is active
4. Retrieves business details
5. Admin reviews and approves

**Admin Panel Impact:**
- Verification status in Users module
- Business details displayed for admin review
- Auto-rejection if business is inactive/cancelled

---

#### 3. SADQ (Digital Contract Signing)

**Purpose:** Legally binding digital signatures on contracts

**Integration:**
- **API Provider:** Saudi Digital Government
- **Authentication:** OAuth 2.0
- **Functionality:**
  - Generate contract PDF
  - Send for signing to both parties
  - Collect digital signatures
  - Store signed contract securely

**Workflow:**
1. Business selects influencer for campaign
2. JUSOR generates contract from template
3. Contract includes:
   - Campaign details
   - Payment terms
   - Content requirements
   - Dispute resolution clause
   - Platform terms and conditions
4. Sent to both parties via SADQ
5. Both parties sign digitally
6. Signed contract stored and linked to campaign

**Admin Panel Impact:**
- Contract status visible in Campaign details
- Link to view/download signed contract
- Used as evidence in dispute resolution

---

#### 4. ZATCA (E-Invoicing)

**Purpose:** Tax compliance and e-invoicing as per Saudi tax law

**Integration:**
- **API Provider:** Zakat, Tax and Customs Authority
- **Authentication:** X.509 Certificate
- **Functionality:**
  - Generate compliant e-invoices
  - Submit to ZATCA in real-time
  - Receive UUID and cryptographic stamp
  - Store for 7 years (legal requirement)

**Invoice Types:**

**A. Tax Invoice (Simplified)** - For each campaign transaction:
- Invoice number (unique)
- Date and time
- Seller: JUSOR Platform (CR, VAT number)
- Buyer: Business (CR, VAT number)
- Item: Influencer marketing service (Campaign #X)
- Amount: Campaign budget
- Commission: 3%
- VAT on Commission: 15%
- Total
- QR code
- Cryptographic stamp

**B. Credit Note** - For refunds:
- References original invoice
- Reason for refund
- Amount refunded

**Workflow:**
1. Business pays to escrow → Tax invoice generated and submitted to ZATCA
2. Content approved, payment released → Invoice finalized
3. If refunded → Credit note generated and submitted
4. All invoices stored in JUSOR system for 7 years

**Admin Panel Impact:**
- Link to view ZATCA invoice in Transaction details
- Invoice status (submitted, accepted, rejected)
- If rejected: Error message and ability to correct and resubmit

---

### Payment Gateway Integrations

**Purpose:** Process payments securely

**Potential Gateways:**
- **Stripe:** International cards
- **Hyperpay:** Mada, STC Pay, local methods
- **PayTabs:** Saudi-focused gateway
- **Moyasar:** Simplified Saudi payments

**Integration Points:**
- Campaign payment (business to escrow)
- Payout processing (influencer withdrawals)
- Wallet deposits

**Admin Panel Impact:**
- Payment status monitoring
- Failed payment alerts
- Gateway transaction IDs for reconciliation

---

### Social Media Platform Integrations

**Purpose:** Verify influencer social media accounts and follower counts

**Platforms:**
- Instagram
- Twitter (X)
- TikTok
- Snapchat
- YouTube

**Integration:**
- OAuth authentication
- API access to retrieve follower count
- Periodic re-verification

**Admin Panel Impact:**
- Linked accounts shown in User details
- Follower counts displayed
- Verification status per platform

---

## Summary

The **JUSOR Admin Panel** is a comprehensive operational hub designed to:

1. **Ensure Trust:** Through rigorous verification processes and government integrations
2. **Protect Transactions:** Via escrow management and dispute resolution
3. **Maintain Compliance:** With ZATCA e-invoicing and SADQ contracts
4. **Enable Efficiency:** Through organized modules and clear workflows
5. **Provide Intelligence:** Via financial analytics and reporting
6. **Support Growth:** By monitoring platform health and user satisfaction

**Key Success Metrics for Admin Operations:**
- User verification SLA: ≤2 business days
- Dispute resolution SLA: ≤5 business days
- Payout processing SLA: ≤3 business days
- Escrow release accuracy: 100%
- Financial reconciliation: Daily, 100% accuracy
- User satisfaction with admin support: >90%

**Future Enhancements:**
- AI-powered fraud detection
- Automated content moderation
- Batch operations for efficiency
- Advanced analytics and forecasting
- Real-time dashboard updates
- Mobile admin app for urgent actions

---

**Document Version:** 1.0
**Last Updated:** January 24, 2026
**Maintained By:** JUSOR Platform Team

**Related Documentation:**
- See `SYSTEM_DESIGN.md` for technical architecture
- See original SRS documents for complete functional requirements
