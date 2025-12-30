//Middleware for authentication using Clerk

import { clerkClient } from "@clerk/express";

export const auth = async (req, res, next) => {
    try {
        const { userId } = await req.auth();

        const user = await clerkClient.users.getUser(userId);

        // Check premium plan from user metadata instead of Clerk billing
        const hasPremiumPlan = user.privateMetadata?.plan === 'premium';

        if (!hasPremiumPlan && user.privateMetadata?.free_usage) {
            req.free_usage = user.privateMetadata.free_usage;
        } else if (!hasPremiumPlan) {
            await clerkClient.users.updateUserMetadata(userId, {
                privateMetadata: { free_usage: 0 }
            });
            req.free_usage = 0;
        }

        req.plan = hasPremiumPlan ? 'premium' : 'free';
        next();
    } catch (error) {
        res.json({ success: false, message: error.message});
    }
}