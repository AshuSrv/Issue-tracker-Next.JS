"use client";
import Link from "next/link";
import React from "react";
import { FaBug } from "react-icons/fa";
import classNames from "classnames";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { Box, Container, Flex } from "@radix-ui/themes";

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
                    // className="text-zinc-500 hover:text-zinc-800 transition-colors"
                    className={classNames({
                      "text-zinc-500": currentPath !== link.href,
                      "text-zinc-900": currentPath === link.href,
                      "hover:text-zinc-800 transition-colors": true,
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
            {status === "unauthenticated" && (
              <Link href="/api/auth/signin">Log In</Link>
            )}
            {status === "authenticated" && (
              <Link href="/api/auth/signout">Log Out</Link>
            )}
          </Box>
        </Flex>
      </Container>
    </div>
  );
};

export default NavBar;
