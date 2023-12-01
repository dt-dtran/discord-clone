"use client";

import { Member, Profile, Server, MemberRole } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

import { Crown, ShieldCheck, Dot } from "lucide-react";
import { UserAvatar } from "@/components/user-avatar";
import { ActionTooltip } from "@/components/action-tooltip";

interface ServerMemberProps {
  member: Member & { profile: Profile };
  server: Server;
}

const roleIconMap = {
  [MemberRole.GUEST]: null,
  [MemberRole.MODERATOR]: <ShieldCheck className="h-4 w-4 text-indigo-500" />,
  [MemberRole.ADMIN]: (
    <Crown className="h-4 w-4 text-amber-500 dark:text-amber-400" />
  ),
};

export const ServerMember = ({ member, server }: ServerMemberProps) => {
  const params = useParams();
  const router = useRouter();
  const icon = roleIconMap[member.role];

  const onClick = () => {
    router.push(`/servers/${params?.serverId}/conversations/${member.id}`);
  };

  return (
    <div>
      <ActionTooltip side="right" align="center" label={member.role}>
        <button
          onClick={onClick}
          className={cn(
            "group px-2 py-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition mb-1",
            params?.memberId === member.id && "bg-zinc-700/20 dark:bg-zinc-700"
          )}
        >
          <UserAvatar
            src={member.profile.imageUrl}
            className="h-4 w-4 md:h-6 md:w-6"
          />
          <p
            className={cn(
              "font-semibold text-sm text-zinc-500 group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition",
              params?.memberId === member.id &&
                "text-primary dark:text-zinc-200 dark:group-hover:text-white"
            )}
          >
            {member.profile.name}
          </p>
          {icon}
          {server.profileId == member.profile.id && <Dot className="h-4 w-4" />}
        </button>
      </ActionTooltip>
    </div>
  );
};
