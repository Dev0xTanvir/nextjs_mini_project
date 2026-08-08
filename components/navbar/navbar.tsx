"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ChevronDown, User, Settings, LogOut } from "lucide-react";

type getmedata = {
  data: {
    profile: {
      id: string;
      name: string;
      email: string;
      activestatus: string;
      role: string;
      createdAt: string;
      updateAt: string;
      profile: {
        id: string;
        profilePhoto: string;
        bio: string | null;
        userId: string;
        createdAt: string;
        updateAt: string;
      };
    };
  };
};

type Navbarprops = {
  iuser: getmedata;
};

const Navbar = ({ iuser }: Navbarprops) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  
  const user = {
    name: iuser.data.profile.name,
    email: iuser.data.profile.email,
    profile: iuser.data.profile.profile.profilePhoto
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold tracking-tight">
          MyApp
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-6 md:flex">
          <Link
            href="/"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Home
          </Link>

          <Link
            href="/about"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            About
          </Link>

          <Link
            href="/dashboard"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Dashboard
          </Link>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 rounded-md border bg-background px-3 py-2 text-sm font-medium transition-colors hover:bg-accent"
            >
              <User className="h-4 w-4" />

              <span>{user.name}</span>

              <ChevronDown
                className={`h-4 w-4 transition-transform ${
                  dropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Dropdown */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 overflow-hidden rounded-lg border bg-background p-1 shadow-lg">
                {/* User Information */}
                <div className="px-3 py-3">
                  <div className="flex items-center gap-3">
                    {/* Avatar */}
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                      {user.name.charAt(0).toUpperCase()}
                    </div>

                    {/* Name & Email */}
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold">
                        {user.name}
                      </p>

                      <p className="truncate text-xs text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="my-1 h-px bg-border" />

                {/* Profile */}
                <Link
                  href="/profile"
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent"
                >
                  <User className="h-4 w-4" />
                  { user.profile}
                </Link>

                {/* Settings */}
                <Link
                  href="/settings"
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent"
                >
                  <Settings className="h-4 w-4" />
                  Settings
                </Link>

                <div className="my-1 h-px bg-border" />

                {/* Logout */}
                <button
                  type="button"
                  onClick={() => {
                    setDropdownOpen(false);
                    console.log("Logout");
                  }}
                  className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-red-500 transition-colors hover:bg-red-500/10"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-md p-2 transition-colors hover:bg-accent md:hidden"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="border-t bg-background md:hidden">
          <div className="mx-auto max-w-7xl space-y-1 px-4 py-4 sm:px-6">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="block rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent"
            >
              Home
            </Link>

            <Link
              href="/about"
              onClick={() => setIsOpen(false)}
              className="block rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent"
            >
              About
            </Link>

            <Link
              href="/dashboard"
              onClick={() => setIsOpen(false)}
              className="block rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent"
            >
              Dashboard
            </Link>

            {/* Mobile Profile */}
            <div className="border-t pt-3">
              <button
                type="button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent"
              >
                <span className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  {user.name}
                </span>

                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    dropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Mobile Dropdown */}
              {dropdownOpen && (
                <div className="mt-2 rounded-lg border p-2">
                  {/* User Info */}
                  <div className="px-2 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                        {user.name.charAt(0).toUpperCase()}
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold">
                          {user.name}
                        </p>

                        <p className="truncate text-xs text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="my-1 h-px bg-border" />

                  <Link
                    href="/profile"
                    onClick={() => {
                      setDropdownOpen(false);
                      setIsOpen(false);
                    }}
                    className="flex items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-accent"
                  >
                    <User className="h-4 w-4" />
                    Profile
                  </Link>

                  <Link
                    href="/settings"
                    onClick={() => {
                      setDropdownOpen(false);
                      setIsOpen(false);
                    }}
                    className="flex items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-accent"
                  >
                    <Settings className="h-4 w-4" />
                    Settings
                  </Link>

                  <div className="my-1 h-px bg-border" />

                  <button
                    type="button"
                    onClick={() => {
                      setDropdownOpen(false);
                      setIsOpen(false);
                      console.log("Logout");
                    }}
                    className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-red-500 hover:bg-red-500/10"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
