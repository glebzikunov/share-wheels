export const sidebarLinks = [
  {
    imgURL: "/assets/search.svg",
    route: "/search",
    label: "Search",
  },
  {
    imgURL: "/assets/heart.svg",
    route: "/favourites",
    label: "Favourites",
  },
  {
    imgURL: "/assets/add-vehicle.svg",
    route: "/add-vehicle",
    label: "Add Vehicle",
  },
  {
    imgURL: "/assets/garage.svg",
    route: "/vehicles",
    label: "Your Vehicles",
  },
  {
    imgURL: "/assets/user.svg",
    route: "/profile",
    label: "Profile",
  },
]

export const profileTabs = [
  {
    value: "rentals",
    label: "Rentals",
    icon: "/assets/current-rentals.svg",
  },
  {
    value: "rentalHistory",
    label: "History",
    icon: "/assets/rental-history.svg",
  },
]

export const vehicleTabs = [
  {
    value: "comments",
    label: "Comments",
    icon: "/assets/comments.svg",
  },
]

export const mapStyles = [
  {
    featureType: "all",
    elementType: "all",
    stylers: [
      {
        invert_lightness: true,
      },
      {
        saturation: 20,
      },
      {
        lightness: 50,
      },
      {
        gamma: 0.4,
      },
      {
        hue: "#00ffee",
      },
    ],
  },
  {
    featureType: "all",
    elementType: "geometry",
    stylers: [
      {
        visibility: "simplified",
      },
    ],
  },
  {
    featureType: "all",
    elementType: "labels",
    stylers: [
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "administrative",
    elementType: "all",
    stylers: [
      {
        color: "#ffffff",
      },
      {
        visibility: "simplified",
      },
    ],
  },
  {
    featureType: "administrative.land_parcel",
    elementType: "geometry.stroke",
    stylers: [
      {
        visibility: "simplified",
      },
    ],
  },
  {
    featureType: "landscape",
    elementType: "all",
    stylers: [
      {
        color: "#405769",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#232f3a",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
]

export const paymentStyle = {
  iconColor: "#3DB39E",
  color: "#fff",
  fontWeight: "500",
  fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
  fontSize: "16px",
  fontSmoothing: "antialiased",
  ":-webkit-autofill": {
    color: "#fff",
  },
  "::placeholder": {
    color: "#3DB39E",
  },
}
