import {  auth } from "@/auth";
import db from "@/lib/db";

export async function PUT(request: Request) {
    const session = await auth()
    if (!session || !session.user) {
        return Response.json({
            success: false,
            message: "Not authenticated"
        },{
            status: 401
        })
    }
    const userId = session.user.userId
    const { acceptMessages } = await request.json()
    try {
        const updatedUser = await db.user.update({
            where: {
                id: Number(userId)
            },
            data: {
                isAcceptingMessages: !acceptMessages
            }
        })
        if (!updatedUser) {
            return Response.json({
                success: false,
                message: "User not found"
            },{
                status: 411
            })
        }
        return Response.json({
            success: true,
            message: updatedUser.isAcceptingMessages? "You are now acepting messages!" : "You stopped accepting messages!"
        },{
            status: 200
        })

    } catch (error) {
        console.error("Error toggling accept message",error)
        return Response.json({
            success: false,
            message: "Error toggling accept message"
        },{
            status: 401
        })
    }
    
}

export async function GET(request: Request) {
    const session = await auth()
    if (!session || !session.user) {
        return Response.json({
            success: false,
            message: "Not authenticated"
        },{
            status: 401
        })
    }
    const userId = session.user.userId
    try {
        const user = await db.user.findUnique({
            where: {
                id: Number(userId)
            }
        })
        if (!user) {
            return Response.json({
                success: false,
                message: "User not found"
            },{
                status: 411
            })
        }
        return Response.json({
            success: true,
            isAcceptingMessages: user.isAcceptingMessages
        },{
            status: 200
        })
    } catch (error) {
        console.error("Error getting accept message",error)
        return Response.json({
            success: false,
            message: "Error getting accept message"
        },{
            status: 401
        })
    }
}