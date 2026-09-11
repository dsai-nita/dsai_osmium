import { useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { motion } from "framer-motion";
import { useAuth } from "../Context/AuthContext";
import { usersApi } from "../lib/endpoints";

import {
  Home,
  Calendar,
  Lightbulb,
  Users,
  Sparkles,
  ClipboardList,
  BookOpen,
  Image,
  Info,
  Menu,
  Sun,
  Moon,
  User,
  Zap,
} from "./LucidIcon";

interface NavigationProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
  isLoggedIn?: boolean;
  userData?: {
    name: string;
    role?: string;
    profileImage?: {
      url?: string;
      publicId?: string;
    } | string;
  };
}

/* =========================================================
   ALL NAVIGATION ITEMS
   This is the single source of truth for navigation.
   ========================================================= */

const baseNavItems = [
  {
    path: "/",
    label: "Home",
    icon: Home,
  },
  {
    path: "/events",
    label: "Events",
    icon: Calendar,
  },
  {
    path: "/innovations",
    label: "Innovations",
    icon: Lightbulb,
  },
  {
    path: "/squad",
    label: "Squad",
    icon: Users,
  },
  {
    path: "/aispire",
    label: "AIspire",
    icon: Sparkles,
  },
  {
    path: "/quiz",
    label: "Quiz",
    icon: ClipboardList,
  },
  {
    path: "/blog",
    label: "Blog",
    icon: BookOpen,
  },
  {
    path: "/gallery",
    label: "Gallery",
    icon: Image,
  },
  {
    path: "/developers",
    label: "Developers",
    icon: Zap,
  },
  {
    path: "/founders",
    label: "Founders",
    icon: Sparkles,
  },
  {
    path: "/about",
    label: "About Us",
    icon: Info,
  },
];

export function Navigation({}: NavigationProps) {
  const {
    isDarkMode,
    toggleTheme,
    isLoggedIn,
    userData,
  } = useAuth();

  /* =========================================================
     IMPORTANT:
     Separate state for mobile and desktop menus.
     ========================================================= */

  const [isMobileMenuOpen, setIsMobileMenuOpen] =
    useState(false);

  const [isDesktopMoreOpen, setIsDesktopMoreOpen] =
    useState(false);

  const location = useLocation();
  const currentPath = location.pathname;

  /* =========================================================
     Dashboard
     ========================================================= */

  const role =
    userData?.role?.toLowerCase() || "";

  const isAdminRole =
    role.includes("president") ||
    role.includes("admin") ||
    role.includes("general secretary") ||
    role.includes("assistant general secretary");

  const dashboardPath = isAdminRole
    ? "/admin-dashboard"
    : "/member-dashboard";

  /* =========================================================
     ALL NAVIGATION ITEMS
     ========================================================= */

  const allNavItems = isLoggedIn
    ? [
        ...baseNavItems,
        {
          path: dashboardPath,
          label: "Dashboard",
          icon: User,
        },
      ]
    : baseNavItems;

  /* =========================================================
     DESKTOP NAVIGATION
     Only the main links appear directly in desktop navbar.
     ========================================================= */

  const desktopNavPaths = [
    "/",
    "/events",
    "/innovations",
    "/squad",
    "/aispire",
    dashboardPath,
  ];

  const desktopNavItems = allNavItems.filter((item) =>
    desktopNavPaths.includes(item.path)
  );

  /* =========================================================
     DESKTOP MORE MENU
     Secondary navigation only.
     ========================================================= */

  const desktopMoreItems = allNavItems.filter(
    (item) => !desktopNavPaths.includes(item.path)
  );

  /* =========================================================
     MOBILE NAVIGATION
     
     IMPORTANT:
     DO NOT FILTER THIS ARRAY.

     Every navigation item must appear in the mobile sidebar.
     ========================================================= */

  const mobileNavItems = allNavItems;

  return (
    <nav
      className="
        fixed
        top-0
        left-0
        right-0
        w-full
        z-50
        bg-background/80
        backdrop-blur-lg
        border-b
        border-border
      "
    >
      <div
        className="
          max-w-7xl
          mx-auto
          px-4
          sm:px-6
          lg:px-8
        "
      >
        <div
          className="
            flex
            justify-between
            items-center
            h-16
          "
        >
          {/* =================================================
              LOGO
              ================================================= */}

          <Link
            to="/"
            className="
              flex
              items-center
              space-x-3
              group
              shrink-0
            "
          >
            <img
              src="/logo.png"
              alt="DSAI Logo"
              className="
                h-10
                w-10
                rounded-full
                object-contain
                transition-transform
                group-hover:scale-105
              "
            />

            <span
              className="
                text-2xl
                font-bold
                gradient-text
              "
            >
              DSAI
            </span>
          </Link>

          {/* =================================================
              DESKTOP MAIN NAVIGATION
              ================================================= */}

          <div
            className="
              hidden
              md:flex
              flex-1
              justify-center
              items-center
              mx-4
            "
          >
            <div
              className="
                flex
                items-center
                space-x-1
              "
            >
              {desktopNavItems.map((item) => (
                <NavLink
                  key={item.path}
                  item={item}
                  currentPath={currentPath}
                />
              ))}
            </div>
          </div>

          {/* =================================================
              MOBILE CONTROLS

              Only visible below md breakpoint.
              ================================================= */}

          <div
            className="
              flex
              md:hidden
              items-center
              space-x-1
            "
          >
            {/* Theme */}

            <ThemeToggleButton
              isDarkMode={isDarkMode}
              onToggleTheme={toggleTheme}
            />

            {/* Mobile Menu */}

            <Sheet
              open={isMobileMenuOpen}
              onOpenChange={setIsMobileMenuOpen}
            >
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Open mobile navigation"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>

              {/* =================================================
                  MOBILE SIDEBAR
                  ================================================= */}

              <SheetContent
                side="right"
                className="
                  w-[85vw]
                  max-w-sm
                  h-screen
                  p-0
                  bg-card
                  border-border
                  flex
                  flex-col
                "
              >
                {/* Mobile Sidebar Header */}

                <div
                  className="
                    flex
                    items-center
                    px-5
                    py-5
                    border-b
                    border-border
                    shrink-0
                  "
                >
                  <Link
                    to="/"
                    onClick={() =>
                      setIsMobileMenuOpen(false)
                    }
                    className="
                      flex
                      items-center
                      gap-3
                    "
                  >
                    <img
                      src="/logo.png"
                      alt="DSAI Logo"
                      className="
                        h-9
                        w-9
                        rounded-full
                        object-contain
                      "
                    />

                    <span
                      className="
                        text-xl
                        font-bold
                        gradient-text
                      "
                    >
                      DSAI Club
                    </span>
                  </Link>
                </div>

                {/* =================================================
                    MOBILE ALL NAVIGATION

                    ALL items are rendered here.

                    Home
                    Events
                    Innovations
                    Squad
                    AIspire
                    Quiz
                    Blog
                    Gallery
                    Developers
                    Founders
                    About Us
                    Dashboard
                    ================================================= */}

                <div
                  className="
                    flex-1
                    min-h-0
                    overflow-y-auto
                    px-4
                    py-5
                  "
                >
                  <div className="space-y-1">
                    {mobileNavItems.map((item) => (
                      <MobileNavItem
                        key={item.path}
                        item={item}
                        currentPath={currentPath}
                        onClick={() =>
                          setIsMobileMenuOpen(false)
                        }
                      />
                    ))}
                  </div>
                </div>

                {/* Mobile Authentication */}

                <div
                  className="
                    shrink-0
                    p-4
                    border-t
                    border-border
                  "
                >
                  <AuthButton
                    isLoggedIn={isLoggedIn}
                    userData={userData}
                    isMobile
                  />
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* =================================================
              DESKTOP CONTROLS
              ================================================= */}

          <div
            className="
              hidden
              md:flex
              items-center
              space-x-2
            "
          >
            {/* Theme */}

            <ThemeToggleButton
              isDarkMode={isDarkMode}
              onToggleTheme={toggleTheme}
            />

            {/* Authentication */}

            <AuthButton
              isLoggedIn={isLoggedIn}
              userData={userData}
            />

            {/* Desktop More Menu */}

            <Sheet
              open={isDesktopMoreOpen}
              onOpenChange={setIsDesktopMoreOpen}
            >
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Open more navigation"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>

              <SheetContent
                side="right"
                className="
                  w-[80vw]
                  max-w-xs
                  bg-card
                  border-border
                  flex
                  flex-col
                  p-0
                "
              >
                {/* Desktop More Header */}

                <div
                  className="
                    flex
                    items-center
                    px-5
                    py-5
                    border-b
                    border-border
                    shrink-0
                  "
                >
                  <Link
                    to="/"
                    onClick={() =>
                      setIsDesktopMoreOpen(false)
                    }
                    className="
                      flex
                      items-center
                      gap-3
                    "
                  >
                    <img
                      src="/logo.png"
                      alt="DSAI Logo"
                      className="
                        h-9
                        w-9
                        rounded-full
                        object-contain
                      "
                    />

                    <span
                      className="
                        text-xl
                        font-bold
                        gradient-text
                      "
                    >
                      DSAI Club
                    </span>
                  </Link>
                </div>

                {/* Desktop More Navigation */}

                <div
                  className="
                    flex-1
                    min-h-0
                    overflow-y-auto
                    p-4
                  "
                >
                  <div className="space-y-1">
                    {desktopMoreItems.map((item) => (
                      <MobileNavItem
                        key={item.path}
                        item={item}
                        currentPath={currentPath}
                        onClick={() =>
                          setIsDesktopMoreOpen(false)
                        }
                      />
                    ))}
                  </div>
                </div>

                {/* Desktop More Auth */}

                <div
                  className="
                    shrink-0
                    p-4
                    border-t
                    border-border
                  "
                >
                  <AuthButton
                    isLoggedIn={isLoggedIn}
                    userData={userData}
                    isMobile
                  />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}

/* =========================================================
   DESKTOP NAVIGATION LINK
   ========================================================= */

function NavLink({
  item,
  currentPath,
}: {
  item: {
    path: string;
    label: string;
  };
  currentPath: string;
}) {
  const isActive =
    currentPath === item.path;

  return (
    <Link
      to={item.path}
      className={`
        relative
        px-3
        py-2
        text-sm
        font-medium
        transition-colors
        hover:text-accent
        ${
          isActive
            ? "text-accent"
            : "text-foreground"
        }
      `}
    >
      {item.label}

      {isActive && (
        <motion.div
          className="
            absolute
            bottom-0
            left-0
            right-0
            h-0.5
            bg-accent
          "
          layoutId="active-nav-link"
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 25,
          }}
        />
      )}
    </Link>
  );
}

/* =========================================================
   MOBILE NAVIGATION ITEM
   ========================================================= */

function MobileNavItem({
  item,
  currentPath,
  onClick,
}: {
  item: {
    path: string;
    label: string;
    icon: any;
  };
  currentPath: string;
  onClick: () => void;
}) {
  const isActive =
    currentPath === item.path;

  const Icon = item.icon;

  return (
    <Link
      to={item.path}
      onClick={onClick}
      className={`
        flex
        items-center
        gap-4
        w-full
        px-4
        py-3
        text-sm
        font-medium
        rounded-lg
        transition-all
        duration-200
        ${
          isActive
            ? "text-accent bg-accent/10"
            : "text-foreground hover:bg-muted"
        }
      `}
    >
      <Icon
        className="
          h-5
          w-5
          shrink-0
        "
      />

      <span>
        {item.label}
      </span>
    </Link>
  );
}

/* =========================================================
   THEME TOGGLE
   ========================================================= */

function ThemeToggleButton({
  isDarkMode,
  onToggleTheme,
}: Pick<
  NavigationProps,
  "isDarkMode" | "onToggleTheme"
>) {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onToggleTheme}
      aria-label={
        isDarkMode
          ? "Switch to light mode"
          : "Switch to dark mode"
      }
    >
      <Sun
        className="
          h-5
          w-5
          rotate-0
          scale-100
          transition-all
          dark:-rotate-90
          dark:scale-0
        "
      />

      <Moon
        className="
          absolute
          h-5
          w-5
          rotate-90
          scale-0
          transition-all
          dark:rotate-0
          dark:scale-100
        "
      />
    </Button>
  );
}

/* =========================================================
   AUTHENTICATION BUTTON
   ========================================================= */

function AuthButton({
  isLoggedIn,
  userData,
  isMobile = false,
}: Pick<
  NavigationProps,
  "isLoggedIn" | "userData"
> & {
  isMobile?: boolean;
}) {
  const [showProfile, setShowProfile] =
    useState(false);

  const [selectedImage, setSelectedImage] =
    useState<string | null>(null);

  const [selectedFile, setSelectedFile] =
    useState<File | null>(null);

  const [isUpdating, setIsUpdating] =
    useState(false);

  const fileInputRef =
    useRef<HTMLInputElement>(null);

  const buttonClass = isMobile
    ? "w-full text-base py-3"
    : "px-2";

  /* =========================================================
     LOGGED IN USER
     ========================================================= */

  if (isLoggedIn && userData) {
    const role =
      userData.role?.toLowerCase() || "";

    const isAdminRole =
      role.includes("president") ||
      role.includes("admin") ||
      role.includes("general secretary") ||
      role.includes("assistant general secretary");

    const profileImage =
      typeof userData.profileImage === "string"
        ? userData.profileImage
        : userData.profileImage?.url;

    const fallbackImage =
      `https://ui-avatars.com/api/?name=${encodeURIComponent(
        userData.name || "User"
      )}&background=random`;

    const currentImage =
      selectedImage ||
      profileImage ||
      fallbackImage;

    /* =======================================================
       IMAGE SELECT
       ======================================================= */

    const handleImageSelect = (
      e: React.ChangeEvent<HTMLInputElement>
    ) => {
      const file =
        e.target.files?.[0];

      if (!file) {
        return;
      }

      if (!file.type.startsWith("image/")) {
        toast.error(
          "Please select a valid image."
        );

        e.target.value = "";
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        toast.error(
          "Image size must be less than 5MB."
        );

        e.target.value = "";
        return;
      }

      setSelectedFile(file);

      const reader =
        new FileReader();

      reader.onloadend = () => {
        setSelectedImage(
          reader.result as string
        );
      };

      reader.readAsDataURL(file);
    };

    /* =======================================================
       UPDATE PROFILE IMAGE
       ======================================================= */

    const handleUpdateImage = async () => {
      if (
        !selectedFile ||
        !selectedImage ||
        isUpdating
      ) {
        return;
      }

      try {
        setIsUpdating(true);

        const formData =
          new FormData();

        formData.append(
          "image",
          selectedFile
        );

        const res =
          await usersApi.updateProfile(
            formData
          );

        const updatedImage =
          res?.data?.profileImage?.url;

        if (updatedImage) {
          localStorage.setItem(
            "profileImage",
            updatedImage
          );
        }

        setSelectedFile(null);
        setSelectedImage(null);
        setShowProfile(false);

        toast.success(
          "Profile image updated successfully!"
        );
      } catch (error) {
        console.error(
          "Profile image update failed:",
          error
        );

        toast.error(
          "Failed to update profile image"
        );
      } finally {
        setIsUpdating(false);
      }
    };

    return (
      <>
        {/* Profile Button */}

        <Button
          variant="ghost"
          className={`${buttonClass} rounded-full`}
          onClick={() =>
            setShowProfile(true)
          }
          title={userData.name}
        >
          <img
            src={currentImage}
            alt={
              userData.name ||
              "Profile"
            }
            className="
              h-9
              w-9
              rounded-full
              object-cover
              border-2
              border-border
              hover:border-accent
              transition-all
              duration-200
            "
          />
        </Button>

        {/* =================================================
            PROFILE MODAL
            ================================================= */}

        {showProfile && (
          <div
            className="
              fixed
              inset-0
              z-[100]
              flex
              items-center
              justify-center
              bg-black/50
              backdrop-blur-sm
              p-4
            "
            onClick={() => {
              if (!isUpdating) {
                setShowProfile(false);
              }
            }}
          >
            <div
              className="
                relative
                w-full
                max-w-sm
                rounded-2xl
                bg-card
                border
                border-border
                shadow-2xl
                p-6
              "
              onClick={(e) =>
                e.stopPropagation()
              }
            >
              {/* Header */}

              <div
                className="
                  text-center
                  mb-6
                "
              >
                <h2
                  className="
                    text-xl
                    font-bold
                  "
                >
                  Profile
                </h2>

                <p
                  className="
                    text-sm
                    text-muted-foreground
                    mt-1
                  "
                >
                  Your profile picture
                </p>
              </div>

              {/* Profile Preview */}

              <div
                className="
                  flex
                  justify-center
                  mb-6
                "
              >
                <img
                  src={currentImage}
                  alt="Profile Preview"
                  className="
                    h-32
                    w-32
                    rounded-full
                    object-cover
                    border-4
                    border-border
                    shadow-lg
                  "
                />
              </div>

              {/* Hidden File Input */}

              <input
                ref={fileInputRef}
                type="file"
                accept="
                  image/png,
                  image/jpeg,
                  image/jpg,
                  image/webp
                "
                className="hidden"
                onChange={handleImageSelect}
              />

              {/* User Information */}

              <div
                className="
                  text-center
                  mb-6
                "
              >
                <h3
                  className="
                    font-semibold
                    text-lg
                  "
                >
                  {userData.name}
                </h3>

                {userData.role && (
                  <p
                    className="
                      text-sm
                      text-muted-foreground
                      capitalize
                    "
                  >
                    {userData.role}
                  </p>
                )}
              </div>

              {/* Choose Image */}

              <Button
                variant="outline"
                className="
                  w-full
                  mb-3
                "
                disabled={isUpdating}
                onClick={() =>
                  fileInputRef.current?.click()
                }
              >
                📷 Choose New Image
              </Button>

              {/* Update Image */}

              {selectedFile && (
                <Button
                  className="w-full"
                  onClick={
                    handleUpdateImage
                  }
                  disabled={isUpdating}
                >
                  {isUpdating ? (
                    <>
                      <span
                        className="
                          mr-2
                          animate-spin
                        "
                      >
                        ⟳
                      </span>

                      Updating...
                    </>
                  ) : (
                    "✓ Update Profile Image"
                  )}
                </Button>
              )}

              {/* Cancel */}

              <button
                disabled={isUpdating}
                onClick={() => {
                  setSelectedImage(null);
                  setSelectedFile(null);
                  setShowProfile(false);
                }}
                className="
                  w-full
                  mt-3
                  py-2
                  text-sm
                  text-muted-foreground
                  hover:text-foreground
                  transition
                  disabled:opacity-50
                  disabled:cursor-not-allowed
                "
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  /* =========================================================
     LOGGED OUT USER
     ========================================================= */

  return (
    <div
      className={
        isMobile
          ? "space-y-2"
          : "flex items-center gap-2"
      }
    >
      <Button
        asChild
        className={buttonClass}
        variant={
          isMobile
            ? "outline"
            : "default"
        }
      >
        <Link to="/login">
          Login
        </Link>
      </Button>

      <Button
        asChild
        className={buttonClass}
        variant={
          isMobile
            ? "default"
            : "outline"
        }
      >
        <Link to="/register">
          Register
        </Link>
      </Button>
    </div>
  );
}
