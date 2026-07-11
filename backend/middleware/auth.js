// this fx is created as a middleware which protects admin routes so that it will not be accessible by anyone except admin

import { clerkClient } from '@clerk/express'

export const protectAdmin = async (req, res, next) => {
  try {
    const { userId } = req.auth();
    // console.log("UserId:", userId);

    const user = await clerkClient.users.getUser(userId);
    // console.log(user.privateMetadata);

    if (!user.privateMetadata || user.privateMetadata.role !== 'admin') {
      res.json({ success: false, message: "not authorized" }) //status 403 (Forbidden)
    }

    next();

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}