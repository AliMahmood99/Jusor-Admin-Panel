# JUSOR Admin Panel

Professional Next.js admin dashboard for the JUSOR influencer marketing platform.

## 🚀 Features

- **Modern Stack**: Built with Next.js 15, React 19, TypeScript, and Tailwind CSS
- **Modular Architecture**: Well-organized component structure for easy maintenance
- **Professional UI**: Clean, modern interface with smooth animations
- **Type-Safe**: Full TypeScript support with proper type definitions
- **Responsive Design**: Works seamlessly across all device sizes
- **Performance Optimized**: Fast load times and smooth interactions

## 📁 Project Structure

```
jusor-admin/
├── app/                        # Next.js app directory
│   ├── globals.css            # Global styles
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Dashboard page
├── components/
│   ├── common/                # Reusable components
│   │   ├── Icons.tsx          # Icon components
│   │   └── KPICard.tsx        # KPI card component
│   ├── layout/                # Layout components
│   │   ├── Sidebar.tsx        # Sidebar navigation
│   │   └── DashboardHeader.tsx # Dashboard header
│   └── dashboard/             # Dashboard-specific components
│       ├── ActivityFeed.tsx
│       ├── CampaignStatusCard.tsx
│       ├── MiniChart.tsx
│       ├── PendingActionsCard.tsx
│       ├── QuickStatsRow.tsx
│       ├── RevenueCard.tsx
│       ├── SystemHealthCard.tsx
│       ├── TopPerformersCard.tsx
│       └── UserGrowthCard.tsx
├── lib/                       # Utility functions and constants
│   ├── constants.ts           # App constants and data
│   └── utils.ts               # Utility functions
├── types/                     # TypeScript type definitions
│   └── index.ts               # Type definitions
└── public/                    # Static assets
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Install dependencies**:
```bash
npm install
```

2. **Run development server**:
```bash
npm run dev
```

3. **Open your browser**:
Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
# Build the application
npm run build

# Start production server
npm start
```

### Type Checking

```bash
npm run type-check
```

## 🎨 Components Overview

### Layout Components
- **Sidebar**: Main navigation with collapsible menu groups
- **DashboardHeader**: Top header with date range selector and actions

### Common Components
- **KPICard**: Reusable card for displaying key metrics
- **Icons**: Centralized icon management system

### Dashboard Components
- **RevenueCard**: Revenue tracking with trend chart
- **PendingActionsCard**: Items requiring admin attention
- **ActivityFeed**: Recent platform activities
- **CampaignStatusCard**: Campaign distribution by status
- **UserGrowthCard**: User growth statistics
- **TopPerformersCard**: Top influencers leaderboard
- **QuickStatsRow**: Quick statistics display
- **SystemHealthCard**: System health monitoring

## 🔧 Configuration

### Tailwind CSS
Configure Tailwind in `tailwind.config.ts`

### TypeScript
TypeScript configuration in `tsconfig.json`

### Next.js
Next.js configuration in `next.config.js`

## 📦 Dependencies

- **next**: ^16.1.1
- **react**: ^19.2.3
- **react-dom**: ^19.2.3
- **typescript**: ^5.9.3
- **tailwindcss**: ^4.1.18
- **clsx**: ^2.1.1

## 🤝 Backend Integration

This admin panel is designed to work with a backend API. To integrate:

1. Create an API client in `lib/api.ts`
2. Add environment variables in `.env.local`:
```env
NEXT_PUBLIC_API_URL=https://api.jusor.com
NEXT_PUBLIC_API_KEY=your_api_key
```

3. Use React hooks for data fetching:
```typescript
// Example in hooks/useUsers.ts
export function useUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`)
      .then(res => res.json())
      .then(setUsers);
  }, []);

  return users;
}
```

## 📝 Best Practices

1. **Component Organization**: Keep components small and focused
2. **Type Safety**: Always define proper TypeScript types
3. **Constants**: Store data in `lib/constants.ts`
4. **Utilities**: Add helper functions to `lib/utils.ts`
5. **Styling**: Use Tailwind CSS utility classes

## 🚧 Future Enhancements

- [ ] Add authentication system
- [ ] Implement data fetching with React Query
- [ ] Add form validation with Zod
- [ ] Create more admin pages (Users, Campaigns, etc.)
- [ ] Add dark mode support
- [ ] Implement real-time notifications
- [ ] Add export functionality
- [ ] Create analytics dashboard

## 📄 License

ISC

## 👨‍💻 Development

This project was created with a focus on:
- **Clean Code**: Well-organized and readable code
- **Modularity**: Reusable components
- **Scalability**: Easy to extend and maintain
- **Professional UI**: Modern and polished interface
- **Type Safety**: Full TypeScript support

---

Built with ❤️ for the JUSOR platform
