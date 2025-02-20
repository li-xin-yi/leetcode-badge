export const contentPresets = {
  ranking: {
    presetLabel: "Ranking",
    badgeLabel: "Ranking",
    badgeValue: "ranking",
    badgeValueDisplay: "Ranking",
  },
  solved: {
    presetLabel: "Solved",
    badgeLabel: "Solved",
    badgeValue: "solved",
    badgeValueDisplay: "Solved",
  },
  "solved-over-total": {
    presetLabel: "Solved over total",
    badgeLabel: "Solved",
    badgeValue: "solvedOverTotal",
    badgeValueDisplay: "Solved over total",
  },
  "solved-percentage": {
    presetLabel: "Solved percentage",
    badgeLabel: "Solved",
    badgeValue: "solvedPercentage",
    badgeValueDisplay: "Solved percentage",
  },
  "contest-rating": {
    presetLabel: "Contest rating",
    badgeLabel: "Rating",
    badgeValue: "rating",
    badgeValueDisplay: "Contest rating",
  },
  "contest-rating-quantile": {
    presetLabel: "Contest rating & quantile",
    badgeLabel: "Rating",
    badgeValue: "ratingQuantile",
    badgeValueDisplay: "Contest rating & quantile",
  },
} as const;

export const styles = {
  plastic: { width: "99px", height: "18px" },
  flat: { width: "81px", height: "20px" },
  "flat-square": { width: "125px", height: "20px" },
  "for-the-badge": { width: "210px", height: "28px" },
  social: { width: "98px", height: "20px" },
} as const;

export type ContentPresetName = keyof typeof contentPresets;

type Style = keyof typeof styles;

export interface Badge {
  username: string;
  style: Style;
  labelColor: string;
  color: string;
  contentPreset: ContentPresetName | "custom";
  label: string;
  value: ContentPresetName;
  showLogo: boolean;
  cn: boolean;
  logoColor: string;
}

export const DEFAULT_BADGE: Badge = {
  username: "cascandaliato",
  style: "for-the-badge",
  labelColor: "black",
  color: "#ffa116",
  contentPreset: "solved-over-total",
  label: "Solved",
  value: "solved-over-total",
  showLogo: true,
  cn: false,
  logoColor: "yellow",
};

const host_url = "badge.xyli.tech/";

export const getUrl = (badge: Badge): string =>
  `https://img.shields.io/badge/dynamic/json?style=${
    badge.style
  }&labelColor=${encodeURIComponent(
    badge.labelColor
  )}&color=${encodeURIComponent(badge.color)}&label=${encodeURIComponent(
    badge.label
  )}&query=${
    contentPresets[badge.value].badgeValue
  }&url=https%3A%2F%2F${host_url}%2Fapi%2Fusers%2F${encodeURIComponent(
    badge.username
  )}${badge.cn ? "%2Fcn%2F" : ""}${
    badge.showLogo
      ? `&logo=leetcode&logoColor=${encodeURIComponent(badge.logoColor)}`
      : ""
  }`;

export const getMarkdown = (badge: Badge): string =>
  `[![LeetCode user ${badge.username}](${getUrl(badge)})](https://leetcode.${
    badge.cn ? "cn" : "com"
  }/${badge.username}/)`;
