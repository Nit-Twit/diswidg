export async function APIRequest(route: string) {
    const res = await fetch(`https://discord.com/api/v10/${route}`, {
        headers: {
            "Authorization": `Bot ${process.env.BOT_TOKEN}`,
            "Accept": "application/json"
        },
        keepalive: false
    });

    if (!res.ok) {
        return false
    }

    const response = await res.json()
    return response;
}

export async function getUser(id: string) {
    return await APIRequest(`users/${id}`)
}

export interface User {
    id: string;
    username: string;
    global_name: string;
    avatar: string;
    discriminator: string;
    public_flags: number;
    flags: number;
    banner: string;
    banner_color: string | null;
    accent_color: number;
    avatar_decoration: string;
}

const flagNames: Record<number, string> = {
    0: "Staff",
    1: "Partner",
    2: "Hypesquad Events",
    3: "BugHunter 1",
    6: "Bravery",
    7: "Brilliance",
    8: "Balance",
    9: "Early Supporter",
    14: "BugHunter 2",
    22: "Developer",
};

const getExt = (asset: string) => asset.startsWith("a_") ? "gif" : "webp";

export function getUserAvatar(user: User, format?: "webp" | "png") {
    if (!user.avatar) {
        const n = Number(BigInt(user.id) >> 22n) % 6

        return `https://cdn.discordapp.com/embed/avatars/${n}.png`;
    }

    return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${format ?? getExt(user.avatar)}?size=256`;
}

export function getUserBanner(user: User) {
    if (!user.banner) return null;
    return `https://cdn.discordapp.com/banners/${user.id}/${user.banner}.${getExt(user.banner)}?size=512`;
}

export function getUserFlags(user: User): string[] {
    const flags: string[] = [];

    if (user.public_flags) {
        Object.entries(flagNames).forEach(([position, flagName]) => {
            if (user.public_flags & (1 << Number(position))) {
                flags.push(flagName.toLowerCase().replaceAll(" ", "_"));
            }
        });
    }

    return flags;
}