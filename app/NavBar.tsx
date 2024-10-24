"use client";
import Link from "next/link";
import React from "react";
import { FaBug } from "react-icons/fa";
import classNames from "classnames";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  Avatar,
  Box,
  Container,
  DropdownMenu,
  Flex,
  Text,
} from "@radix-ui/themes";
import Skeleton from "@/app/components/Skeleton";

const NavBar = () => {
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];

  const { status, data: session } = useSession();

  const currentPath = usePathname();
  return (
    <div className="border-b mb-5 py-3">
      <Container>
        <Flex justify="between">
          <Flex align="center" gap="3">
            <Link href="/">
              <FaBug />
            </Link>
            <ul className="flex space-x-7">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    className={classNames({
                      "nav-link": true,
                      "!text-zinc-900": currentPath === link.href,
                    })}
                    href={link.href}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Flex>
          <Box>
            {status === "loading" && <Skeleton width="3rem" />}
            {status === "unauthenticated" && (
              <Link className="nav-link" href="/api/auth/signin">
                Log In
              </Link>
            )}
            {status === "authenticated" && (
              <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                  <Avatar
                    src={session?.["user"]?.["image"]!}
                    fallback="?"
                    size="1"
                    radius="full"
                    className="cursor-pointer"
                    referrerPolicy="no-referrer" // to fix an error where image fetching giving an issue.
                  />
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                  <DropdownMenu.Label>
                    <Text>{session?.["user"]?.["email"]!}</Text>
                  </DropdownMenu.Label>
                  <DropdownMenu.Item>
                    <Link href="/api/auth/signout">Log Out</Link>
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            )}
          </Box>
        </Flex>
      </Container>
    </div>
  );
};

export default NavBar;
