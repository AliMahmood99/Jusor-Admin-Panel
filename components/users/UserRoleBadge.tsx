/**
 * User Role Badge Component
 * Displays user type (influencer/business) with appropriate styling
 */

'use client';

import React from 'react';
import { Icons } from '@/components/common/Icons';

interface UserRoleBadgeProps {
  type: 'influencer' | 'business';
}

const UserRoleBadge = React.memo(({ type }: UserRoleBadgeProps) => {
  return type === 'influencer' ? (
    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-violet-50 text-violet-600">
      <Icons.user className="w-3 h-3" />
      Influencer
    </div>
  ) : (
    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-blue-50 text-blue-600">
      <Icons.building className="w-3 h-3" />
      Business
    </div>
  );
});

UserRoleBadge.displayName = 'UserRoleBadge';

export default UserRoleBadge;
