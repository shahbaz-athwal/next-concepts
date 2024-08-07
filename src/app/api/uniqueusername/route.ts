import db from "@/lib/db";
import z from "zod"
import { usernameSchema } from "@/schema/signUp";
import { NextRequest } from "next/server";

const UsernameQuerySchema = z.object({
    username: usernameSchema
})

export async function GET(request: NextRequest) {
    const query = request.nextUrl.searchParams.get("username")
    try {
        const queryParam= {
            username: query 
        }
        const result = UsernameQuerySchema.safeParse(queryParam)

        if (!result.success) {
            return Response.json({
                success: false,
                message: "username format in incorrect"
            },
            {
                status: 400
            })

        }
        const { username } = result.data
        const userFromDb = await db.user.findUnique({
            where: {
                username: username,
                isVerified: true
            }
        })
        if (userFromDb) {
            return Response.json({
                success: false,
                message: "username is taken"
            },
            {
                status: 409
            })
        }
        return Response.json({
            success: true,
            message: `username is available`
        },
        {
            status: 200
        })
    } catch (error) {
        console.error("Error checking username.",error)
        return Response.json({
            success: false,
            message: "Error checking username."
        },
        {
            status: 400
        })
    }
}