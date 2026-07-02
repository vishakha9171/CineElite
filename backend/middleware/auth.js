// this fx is created as a middleware which protects admin routes so that it will not be accessible by anyone except admin

import { clerkClient } from "@clerk/express";

export const protectAdmin = async (req, res, next) => {
  try {
    const { userId } = req.auth();

    const user = await clerkClient.users.getUser(userId);

    if (user.privateMetadata.role !== 'admin') {
      return res.json({ success: false, message: "not authorized" })
    }

    next();
  } catch (error) {
    return res.json({ success: false, message: "not authorized" });
  }
}