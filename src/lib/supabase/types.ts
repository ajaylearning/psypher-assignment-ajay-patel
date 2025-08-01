export const tierList = ["free", "silver", "gold", "platinum"] as const;

export type Tier = (typeof tierList)[number];

export type Event = {
  id: string;
  event_date: string;
  title: string;
  description: string;
  image_url: string;
  tier: Tier;
};