# Dispute Resolution System

## 📊 Overview

Professional dispute resolution system for the JUSOR admin panel. Allows admins to manage, review, and resolve disputes between influencers and businesses.

## ✨ Features

### 1. Disputes List Page (`/disputes`)
- **Stats Dashboard**: 4 KPI cards showing key metrics
  - Total Open Disputes
  - In Review Count
  - Resolved Count
  - Total Value at Stake
- **Advanced Filtering**:
  - Status filter (All, Open, In Review, Resolved, Closed)
  - Priority filter (Low, Medium, High, Critical)
  - Real-time search
- **Professional Table**:
  - Dispute ID and title
  - Both parties (Influencer vs Business)
  - Amount in dispute
  - Status and Priority badges
  - Campaign name
  - Quick actions

### 2. Dispute Details Page (`/disputes/[id]`)
- **Comprehensive Tabs**:
  - **Overview**: Parties info, dispute reason, resolution
  - **Evidence**: Uploaded files from both parties
  - **Messages**: Chat communication
  - **Timeline**: Dispute progression steps
- **Party Cards**: Show influencer and business details
- **Quick Info Bar**: Amount, campaign, date, type
- **Action Sidebar**:
  - Issue Decision button
  - Send Reminder
  - Escalate to Senior
  - View Campaign
  - Admin Notes textarea

### 3. Decision Modal
**3-Step Wizard**:

**Step 1: Select Resolution Type**
- Full to Influencer
- Partial Split (with slider)
- Full Refund to Business

**Step 2: Add Reasoning**
- Textarea with minimum 30 characters
- Character counter
- Will be shared with both parties

**Step 3: Confirm**
- Summary of decision
- Required confirmations:
  - ✓ Reviewed all evidence
  - ✓ Understand decision is binding
- Appeal notice (5 days to appeal)

## 📁 File Structure

```
app/
├── disputes/
│   ├── page.tsx                    # Main disputes list
│   └── [id]/
│       └── page.tsx                # Dispute details

components/
├── disputes/
│   ├── DisputeStatusBadge.tsx      # Status badge component
│   ├── DisputePriorityBadge.tsx    # Priority badge component
│   ├── DisputePartyCard.tsx        # Party info card
│   ├── EvidenceSection.tsx         # Evidence display
│   ├── TimelineSection.tsx         # Timeline steps
│   ├── ChatSection.tsx             # Messages interface
│   └── DecisionModal.tsx           # Decision wizard modal

lib/
└── constants.ts                    # MOCK_DISPUTES data

types/
└── index.ts                        # All dispute types
```

## 🎨 Components

### DisputeStatusBadge
```tsx
<DisputeStatusBadge status="open" />
```
Shows color-coded status (Open, In Review, Resolved, Closed)

### DisputePriorityBadge
```tsx
<DisputePriorityBadge priority="high" />
```
Shows priority with dot indicator

### DisputePartyCard
```tsx
<DisputePartyCard
  party={dispute.initiator}
  role="Initiator"
/>
```
Displays party information with action buttons

### EvidenceSection
```tsx
<EvidenceSection
  evidence={dispute.evidence}
  partyName="Noura Al-Rashid"
  partyType="influencer"
/>
```
Shows uploaded evidence files

### TimelineSection
```tsx
<TimelineSection dispute={dispute} />
```
Progress timeline with 5 steps

### ChatSection
```tsx
<ChatSection
  messages={dispute.messages}
  initiatorName="Noura"
  respondentName="TechStart Inc."
/>
```
Chat interface with send functionality

### DecisionModal
```tsx
<DecisionModal
  dispute={dispute}
  onClose={() => setShowModal(false)}
  onSubmit={(decision) => handleDecision(decision)}
/>
```
Full decision wizard

## 📊 Data Types

### Dispute
```typescript
interface Dispute {
  id: string;
  title: string;
  description: string;
  campaignId: string;
  campaignName: string;
  status: 'open' | 'in_review' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'critical';
  type: 'payment' | 'content' | 'communication' | 'contract' | 'other';
  createdAt: string;
  updatedAt: string;
  resolvedAt?: string;
  initiator: DisputeParty;
  respondent: DisputeParty;
  assignedAdmin?: string;
  messages: DisputeMessage[];
  evidence: DisputeEvidence[];
  amountInDispute?: number;
  resolution?: string;
  resolutionNote?: string;
}
```

### DisputeParty
```typescript
interface DisputeParty {
  id: string;
  name: string;
  type: 'influencer' | 'business';
  avatar?: string;
}
```

## 🔗 Backend Integration

### Expected API Endpoints

```typescript
// Get all disputes
GET /api/disputes?status=open&priority=high

// Get specific dispute
GET /api/disputes/:id

// Issue decision
POST /api/disputes/:id/decision
{
  type: 'split',
  percentage: 70,
  reasoning: '...',
  influencerAmount: 31500,
  businessAmount: 13500
}

// Send message
POST /api/disputes/:id/messages
{
  message: 'Admin response...'
}

// Upload evidence
POST /api/disputes/:id/evidence
FormData with file

// Escalate dispute
POST /api/disputes/:id/escalate
```

## 🎯 Usage Flow

1. **Admin opens `/disputes`**
   - Sees all disputes in table
   - Can filter by status/priority
   - Can search by ID or party names

2. **Admin clicks on dispute row**
   - Navigates to `/disputes/DSP-1247`
   - Sees full details in tabs

3. **Admin reviews evidence and messages**
   - Switches between tabs
   - Reviews uploaded files
   - Reads communication

4. **Admin clicks "Issue Decision"**
   - Modal opens with 3-step wizard
   - Selects resolution type
   - Writes reasoning (min 30 chars)
   - Confirms decision

5. **Decision is submitted**
   - Both parties notified
   - Amounts transferred
   - Dispute marked as resolved

## 🚀 Next Steps

- [ ] Connect to real backend API
- [ ] Add file upload for evidence
- [ ] Implement real-time chat with WebSocket
- [ ] Add email notifications
- [ ] Create appeal system
- [ ] Add dispute analytics dashboard
- [ ] Export dispute reports to PDF

## 💡 Tips

- Use `router.push()` for navigation
- All colors follow Tailwind config
- Mock data in `lib/constants.ts`
- TypeScript types in `types/index.ts`
- Components are fully reusable

---

Built with ❤️ for JUSOR Platform
