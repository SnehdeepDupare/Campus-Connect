import { MessagesSquare } from "lucide-react";

export const sidebarLinks = [
  {
    imgURL: "/home.svg",
    route: "/",
    label: "Home",
  },
  {
    imgURL: "/search.svg",
    route: "/search",
    label: "Search",
  },
  {
    imgURL: "/create.svg",
    route: "/create-post",
    label: "Create Post",
  },
  {
    imgURL: "/community.svg",
    route: "/communities",
    label: "Communities",
  },
  {
    imgURL: "/heart.svg",
    route: "/activity",
    label: "Activity",
  },
  {
    imgURL: "/user.svg",
    route: "/profile",
    label: "Profile",
  },
];

export const profileTabs = [
  { value: "posts", label: "Posts", icon: "/messages-square.svg" },
];

export const communityTabs = [
  { value: "posts", label: "Posts", icon: "/messages-square.svg" },
  { value: "members", label: "Members", icon: "/community.svg" },
];
